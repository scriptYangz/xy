<template>
	<div @click="rshow" class="courseback">
		<div class="header">
			<mt-header title="学习反馈">

				<router-link to="/user" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<mt-button @click="rightbar" class="rightbar" icon="more" slot="right"></mt-button>
			</mt-header>

			<ul class="rightSelect">
				<li @click="add">添加</li>
				<li @click="delMany">批量删除</li>
			</ul>

			<mt-search class="search" v-model="sValue"></mt-search>
		</div>
		<div class="cbList">
			<mt-cell-swipe class="all" title="全选"><input type="checkbox" v-model="acheck" v-on:click.stop="all" /></mt-cell-swipe>
			<mt-cell-swipe v-for="(item,index) in items" :key="index" @click.native.stop="detail(item.id)" :title="item.instructtime" :label="item.instruct | instruct" :right="[{
				content: '删除',
				 style: { background: 'red', color: '#fff' },
				 handler:()=> del(item.id,index)
				}]">
				<input class="mcs" type="checkbox" v-model="sid" v-on:click.stop="" name="" :value="item.id" />
			</mt-cell-swipe>
		</div>

		<mt-button class="last" id="last" @click="golast" type="primary">{{last}}</mt-button>
		<mt-button class="next" id="next" @click="gonext" type="primary">{{next}}</mt-button>

		<div class="bottom">
			<mt-button class="dl" id="dl" @click="dl" type="danger">删除选中</mt-button>
			<mt-button class="caldl" id="caldl" @click="caldl" type="default">取消</mt-button>
		</div>

	</div>
</template>

<script>
	import { sumDelect, sumSelect, sumList } from '../../api/Courseback/courseback';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	let mcs = document.getElementsByClassName("mcs");
	let dl = document.getElementsByClassName("dl");
	let caldl = document.getElementsByClassName("caldl");
	let all = document.getElementsByClassName("all");
	let next = document.getElementsByClassName("next");
	let last = document.getElementsByClassName("last");

	Array.prototype.unique2 = function() { // 去重
		this.sort(); //先排序
		var res = [this[0]];
		for(var i = 1; i < this.length; i++) {
			if(this[i] !== res[res.length - 1]) {
				res.push(this[i]);
			}
		}
		return res;
	}

	export default {
		name: 'couserback',
		data() {
			return {
				
				acheck: false,
				sValue: "",
				items: [],
				list: [],
				params: {},
				sid: [],
				size: "100",
				page: "",
				current: "1",
				next: "下一页",
				last: "上一页"

			}
		},
		filters: {
			instruct: function(value) {
				if(value == 1) {
					return "以前就会";
				} else if(value == 2) {
					return "完整掌握";
				} else if(value == 3) {
					return "基本掌握";
				} else if(value == 4) {
					return "听不懂";
				}
			}
		},
		methods: {
			couserList() {
				//加载列表
				sumList({
					"size": this.size,
					"current": this.current,
					"condition": {
						"instructtime": null
					}
				}).then((res) => {
					let {
						code,
						content
					} = res.data;
					if(code == 1000) {

						this.list = content.records.reverse();
						this.items = this.list;
						if(content.pages <= "1") { //如果只有一页，不显示分页按钮
							console.log("只有一页");
						} else { //如果不止一页
							if(content.current == 1) { //如果是第一页
								this.pageInF();
							} else if(content.pages == this.current) { //如果是最后一页
								this.pageInL();
							} else if(content.pages>1 && content.current<content.pages) {
								this.pageInM();
							}else{
								this.current = 1;
								this.couserList();
							}

						}

					}

				}).catch(
					err => {
						console.log(err)
					}
				)

			},
			rightbar() {
				//显示下拉框
				document.getElementsByClassName("rightSelect")[0].style.display = "block";
			},
			rshow(e) {
				if(!e.target.className.match("mintui-more")) {
					document.getElementsByClassName("rightSelect")[0].style.display = "none";
				}
			},

			add() { //跳转到添加页面
				sessionStorage.setItem("current", this.current);
				this.$router.push("/addcourseback");
			},
			del(cid, index) { //删除这条学习反馈

				let _this = this;
				MessageBox.confirm('确定要删除吗?').then(action => {

					sumDelect({
						"id": [cid]
					}).then((res) => {
						let {
							code,
							msg
						} = res.data;

						if(code == 1000) {

							Toast('已删除' + this.list[index].instructtime);
							//一秒之后刷新页面
							let tout = setTimeout(function() {
								//删除完毕，刷新页面
								_this.items = [];
								_this.couserList();
							}, 1000)

						}

					})
				}).catch(
					err => {
						console.log("取消")
					}
				);

			},
			delMany() { //弹出批量删除
				caldl[0].style.display = "inline-block";
				dl[0].style.display = "inline-block";
				all[0].style.display = "block";
				last[0].style.display = "none";
				next[0].style.display = "none";
				for(let i = 0; i < mcs.length; i++) {
					mcs[i].style.display = "inline-block";
				}
			},
			dl() { //批量删除确定
				let _this = this;

				MessageBox.confirm('确定要删除选中吗?').then(action => {

					//批量删除
					sumDelect({
						"id": this.sid
					}).then((res) => {
						//let {code} = res.data;
						console.log(res)

						for(let i = 0; i < mcs.length; i++) {
							mcs[i].style.display = "none";
							mcs[i].checked = false;
						}
						this.sid = [];
						dl[0].style.display = "none";
						caldl[0].style.display = "none";
						all[0].style.display = "none";
						Toast('删除成功');
						//半秒之后刷新页面
						let tout = setTimeout(function() {
							//批量删除完毕，刷新页面
							_this.items = [];
							_this.couserList();
						}, 500)

					})

				}).catch(
					err => {
						console.log("取消")
					}
				);

			},
			detail(cid) { //跳转到详情
				sessionStorage.setItem("cid", cid);
				sessionStorage.setItem("current", this.current);
				this.$router.push("/cbdetail");
			},
			caldl() { //取消批量删除
				this.sid = [];
				let _this = this;
				//零点一秒之后隐藏
				let tout = setTimeout(function() {
					for(let i = 0; i < mcs.length; i++) {
						mcs[i].style.display = "none";
						mcs[i].checked = false;
					}
					dl[0].style.display = "none";
					caldl[0].style.display = "none";
					all[0].style.display = "none";
					_this.couserList();
				}, 100)

			},
			pageInF() { //如果是第一页
				next[0].style.display = "block";
				next[0].style.width = "99%";
				last[0].style.display = "none";
			},
			pageInM() { //如果是中间页
				next[0].style.display = "inline-block";
				next[0].style.width = "49%";
				last[0].style.display = "inline-block";
				last[0].style.width = "49%";
			},
			pageInL() { //如果是最后一页
				last[0].style.display = "block";
				last[0].style.width = "99%";
				document.getElementsByClassName("next")[0].style.display = "none";
			},
			gonext() { //下一页
				this.current++;
				this.couserList();
			},
			golast() { //上一页
				this.current--;
				this.couserList();
			},
			all() { //勾选全部

				if(this.acheck != true) {
					this.sid = [];
					for(let i = 0; i < this.items.length; i++) {
						this.sid.push(this.items[i].id)
					}

				} else {
					this.sid = [];
				}

			}

		},
		watch: {
			sValue: function(val, oldval) {
				let _this = this;

				if(val == "") {
					_this.items = _this.list;				
				} else {

					_this.items = [];
					let j = 0;
					//监听搜索
					_this.list.forEach(function(v, i) {

						let reg = new RegExp(val); //正则判断是否含有该文字
						if(v.instructtime.match(reg) || ("" + v.id).match(reg)) {
							_this.items[j] = v;
							j++;
						}
					})

					//查找完之后如果不能找到，就到数据库去找
					if(_this.items.length == 0) {
						sumSelect({
							"id": val
						}).then((res) => {
							if(res.data.content != null) {
								_this.items.push(res.data.content);
							}
						})
					}

				}

			},
			sid: function(val, oldval) {
				//当选择更变的时候，判断长度和items是否相等；

				if(this.sid.length == this.items.length) {
					console.log(this.sid.length)
					//把勾子勾上
					this.acheck = true;
				} else {
					this.acheck = false;
				}
				console.log(val)
			}
		},
		mounted() {
			if(sessionStorage.getItem("current")) {
				this.current = sessionStorage.getItem("current");
			}

			this.couserList();
		}
	}
</script>

<style>
	ul {
		margin: 0;
		padding: 0;
	}
	
	.courseback {
		height: 100%;
		position: relative;
	}
	
	.cbList {
		padding-top: 100px;
	}
	
	.search {
		height: 60px;
	}
	
	.header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100px;
		z-index: 1;
	}
	
	.rightSelect {
		display: none;
		width: 100px;
		position: absolute;
		right: 0;
		top: 28px;
		background-color: white;
		z-index: 2;
	}
	
	.rightSelect li {
		border: 1px black solid;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	
	.mcs {
		display: none;
	}
	
	.dl,
	.caldl {
		width: 48%;
		margin: 0 2px;
		display: none;
	}
	
	.bottom {
		width: 100%;
	}
	
	.next,
	.last {
		margin: 1px;
		width: 48%;
		display: none;
	}
	
	.next {
		float: right;
	}
	
	.last {
		float: left;
	}
	
	.all {
		display: none;
	}
</style>