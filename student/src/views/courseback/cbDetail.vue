<template>
	<div @click="rshow" class="cbdetail">
		<div class="header">
			<mt-header title="学习反馈:详情">
				<router-link to="/courseback" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>

				<mt-button @click="rb" class="rightbar" icon="more" slot="right"></mt-button>
			</mt-header>
			<ul class="rightSelect">
				<li @click="cg">修改</li>
			</ul>

		</div>
		<div class="main">
			<div class="day">
				<font>&nbsp;&nbsp;id:{{cid}}</font>
				<span>{{today}}</span>
			</div>

			<div class="cb1">
				<span>讲授接受情况：</span>
				<p>{{instruct}}</p>
			</div>

			<div class="cb2">
				<span>练习完成情况：</span>
				<p>{{practice}}</p>
			</div>
			<div class="cb3">
				<span>知识深浅评估：</span>
				<p>{{knowledge}}</p>
			</div>
			<div class="cb4">
				<span>期望补充知识点和建议：</span>
				<p>{{expectation}}</p>
			</div>
			<div class="change1">
				<mt-radio title="讲授接受情况" v-model="instruct" :options="options1">
				</mt-radio>
			</div>
			<div class="change2">
				<mt-radio title="练习完成情况" v-model="practice" :options="options2">
				</mt-radio>
			</div>
			<div class="change3">
				<mt-radio title="知识深浅评估" v-model="knowledge" :options="options3">
				</mt-radio>
			</div>
			<div class="change4">
				<span>期望补充知识点和建议：</span>
				<textarea rows="15" v-model="expectation"></textarea>
			</div>

		</div>
		<mt-button class="ch" id="ch" @click="ch" type="primary">修改</mt-button>
		<mt-button class="calch" id="calch" @click="calch" type="danger">取消</mt-button>

	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { sumLnsert, sumDelect, sumSelect, sumUpdate } from '../../api/Courseback/courseback';
	export default {
		name: 'addcourseback',
		components: {

		},
		data() {
			return {
				cid: [],
				pickerVisible: "",
				today: "",
				instruct: "",
				practice: "",
				knowledge: "",
				content: "",
				expectation: "",
				options1: [{
						label: '以前就会',
						value: '以前就会'
					},
					{
						label: '完整掌握',
						value: '完整掌握'
					},
					{
						label: '基本掌握',
						value: '基本掌握'
					},
					{
						label: '听不懂',
						value: '听不懂'
					}
				],
				options2: [{
						label: '已完成',
						value: '已完成'
					},
					{
						label: '课下完成',
						value: '课下完成'
					},
					{
						label: '不能完成',
						value: '不能完成'
					},
					{
						label: '不想完成',
						value: '不想完成'
					}
				],
				options3: [{
						label: '太浅',
						value: '太浅'
					},
					{
						label: '刚刚好',
						value: '刚刚好'
					},
					{
						label: '有点难',
						value: '有点难'
					},
					{
						label: '太难',
						value: '太难'
					}
				],
			}
		},
		created() {

		},
		methods: {
			init() {
				let d = new Date();
				this.pickerVisible = d;

				let cid = sessionStorage.getItem("cid") * 1;
				this.cid = cid;
				sumSelect({
					"id": cid
				}).then((res) => {

					console.log(res)
					this.today = res.data.content.instructtime;
					this.instruct = this.getinstruct(res.data.content.instruct);
					this.practice = this.getpractice(res.data.content.practice);
					this.knowledge = this.getknowledge(res.data.content.knowledge);
					this.expectation = res.data.content.expectation;
				})

			},
			calch() { //取消修改
				document.getElementsByClassName("change1")[0].style.display = "none";
				document.getElementsByClassName("change2")[0].style.display = "none";
				document.getElementsByClassName("change3")[0].style.display = "none";
				document.getElementsByClassName("change4")[0].style.display = "none";
				document.getElementsByClassName("rightSelect")[0].style.display = "none";
				document.getElementsByClassName("ch")[0].style.display = "none";
				document.getElementsByClassName("calch")[0].style.display = "none";
				this.init();
			},
			rb() {
				//显示下拉框
				document.getElementsByClassName("rightSelect")[0].style.display = "block";
			},
			rshow(e) {
				if(!e.target.className.match("mintui-more")) {
					document.getElementsByClassName("rightSelect")[0].style.display = "none";
				}
			},
			cg() {
				document.getElementsByClassName("change1")[0].style.display = "block";
				document.getElementsByClassName("change2")[0].style.display = "block";
				document.getElementsByClassName("change3")[0].style.display = "block";
				document.getElementsByClassName("change4")[0].style.display = "block";
				document.getElementsByClassName("ch")[0].style.display = "inline-block";
				document.getElementsByClassName("calch")[0].style.display = "inline-block";
			},
			getinstruct(i) {
				let instruct;
				if(i == "1") {
					instruct = "以前就会";
				} else if(i == "2") {
					instruct = "完整掌握";
				} else if(i == "3") {
					instruct = "基本掌握";
				} else if(i == "4") {
					instruct = "听不懂";
				}
				return instruct;
			},
			getpractice(p) {
				let practice;
				if(p == "1") {
					practice = "已完成";
				} else if(p == "2") {
					practice = "课下完成";
				} else if(p == "3") {
					practice = "不能完成";
				} else if(p == "4") {
					practice = "不想完成";
				}
				return practice;
			},
			getknowledge(k) {
				let knowledge;
				if(k == "1") {
					knowledge = "太浅";
				} else if(k == "2") {
					knowledge = "刚刚好";
				} else if(k == "3") {
					knowledge = "有点难";
				} else if(k == "4") {
					knowledge = "太难";
				}
				return knowledge;
			},
			setinstruct(i) {
				let instruct;
				if(i == "以前就会") {
					instruct = "1";
				} else if(i == "完整掌握") {
					instruct = "2";
				} else if(i == "基本掌握") {
					instruct = "3";
				} else if(i == "听不懂") {
					instruct = "4";
				}
				return instruct;
			},
			setpractice(p) {
				let practice;
				if(p == "已完成") {
					practice = "1";
				} else if(p == "课下完成") {
					practice = "2";
				} else if(p == "不能完成") {
					practice = "3";
				} else if(p == "不想完成") {
					practice = "4";
				}
				return practice;
			},
			setknowledge(k) {
				let knowledge;
				if(k == "太浅") {
					knowledge = "1";
				} else if(k == "刚刚好") {
					knowledge = "2";
				} else if(k == "有点难") {
					knowledge = "3";
				} else if(k == "太难") {
					knowledge = "4";
				}
				return knowledge;
			},
			ch() {
				MessageBox.confirm('确定要修改这条学习反馈吗?').then(action => {
					let params = {
						"id": [this.cid],
						"instructtime": this.today,
						"instruct": this.setinstruct(this.instruct),
						"practice": this.setpractice(this.practice),
						"knowledge": this.setknowledge(this.knowledge),
						"expectation": this.expectation
					}; //封装提交内容

					/*//删除
					sumDelect({
						"id": [this.cid]
					}).then((res) => {
						let {
							code
						} = res.data;

						if(code == 1000) { //如果成功删除，添加一条

							setTimeout(function() {

								sumLnsert(params).then((res) => {

									let {
										code
									} = res.data;
									if(code == 1000) {
										_this.calch();
									}

								}).catch(
									err => {
										console.log('修改失败');
									}
								)

							}, 1000)

						}

					})*/

					//提交修改
					sumUpdate(params).then((res) => {
						console.log(res)
						let {
							code,
							content
						} = res.data;
						if(code == 1000) {
							console.log("修改成功")
						    this.init();
						}
					}).catch(
						err => {
							console.log("修改失败");
						}
					)

				}).catch(
					err => {
						console.log("取消")
					}
				);

			}
		},
		watch: {

		},
		mounted() {
			this.init();
		}
	}
</script>

<style>
	.cbdetail {
		height: 100%;
		position: relative;
	}
	
	.header {
		z-index: 2;
	}
	
	.main {
		margin-top: 50px;
	}
	
	.day span {
		position: absolute;
		right: 10px;
	}
	
	.main p {
		display: inline-block;
		background-color: antiquewhite;
	}
	
	.cb4 p {
		margin: 0 10px;
		padding: 10px 0;
		background-color: burlywood;
		padding-left: 20px;
		display: block;
		border-radius: 6px;
	}
	
	.cb1,
	.cb2,
	.cb3,
	.cb4 {
		margin-left: 10px;
	}
	
	.change1,
	.change2,
	.change3,
	.change4 {
		display: none;
	}
	
	.change4 textarea {
		display: block;
		width: 98%;
		margin: 0 auto;
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
	
	.ch,
	.calch {
		width: 48%;
		margin: 0 auto;
		display: none;
	}
</style>