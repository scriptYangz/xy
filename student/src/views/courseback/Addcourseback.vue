<template>
	<div @click="rshow" class="addcourseback">
		<div class="header">
			<mt-header title="学习反馈">
				<router-link to="/courseback" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<mt-button @click="rightbar" class="rightbar" icon="more" slot="right"></mt-button>
			</mt-header>
			<ul class="rightSelect">
				<li @click="openPicker">设置时间</li>
			</ul>
		</div>
		<div class="main">

			<div class="day">
				<span>{{today}}</span>
			</div>
			<!--	<div class="content">
				<span>学习内容：</span><textarea v-model="content" rows="20" cols="45"></textarea>
			</div>-->

			<div class="cb1">
				<mt-radio title="掌握情况" v-model="instruct" :options="options1">
				</mt-radio>
			</div>
			<div class="cb2">
				<mt-radio title="练习完成情况" v-model="practice" :options="options2">
				</mt-radio>
			</div>
			<div class="cb3">
				<mt-radio title="知识深浅评估" v-model="knowledge" :options="options3">
				</mt-radio>
			</div>
			<div class="cb4">
				<span>期望补充知识点和建议：</span><textarea v-model="expectation" rows="20" cols="45"></textarea>
			</div>

			<mt-datetime-picker class="datetime" @confirm="handleConfirm" ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
			</mt-datetime-picker>

		</div>

		<mt-button class="add" @click="Add" type="primary">添加</mt-button>

	</div>
</template>

<script>
	import { sumLnsert } from '../../api/Courseback/courseback';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: 'addcourseback',
		components: {

		},
		data() {
			return {
				pickerVisible: "",
				today: "",
				instruct: "",
				practice: "",
				knowledge: "",
				content: "",
				expectation: "",
				options1: [{
						label: '以前就会',
						value: '1'
					},
					{
						label: '完整掌握',
						value: '2'
					},
					{
						label: '基本掌握',
						value: '3'
					},
					{
						label: '听不懂',
						value: '4'
					}
				],
				options2: [{
						label: '已完成',
						value: '1'
					},
					{
						label: '课下完成',
						value: '2'
					},
					{
						label: '不能完成',
						value: '3'
					},
					{
						label: '不想完成',
						value: '4'
					}
				],
				options3: [{
						label: '太浅',
						value: '1'
					},
					{
						label: '刚刚好',
						value: '2'
					},
					{
						label: '有点难',
						value: '3'
					},
					{
						label: '太难',
						value: '4'
					}
				],
			}
		},
		created() {
			let d = new Date();
			this.pickerVisible = d;
			this.td(d);
		},
		methods: {
			td(d) {
				if(d.getDate() < 10 && 0 < (d.getMonth() + 1) && (d.getMonth() + 1) < 10) {
					this.today = d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + "0" + d.getDate();
				} else if(d.getDate() < 10) {
					this.today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate();
				} else if(0 < (d.getMonth() + 1) && (d.getMonth() + 1) < 10) {
					this.today = d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + d.getDate();
				} else {
					this.today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				}
			},
			openPicker() {
				this.$refs.picker.open();
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
			handleConfirm() {
				let p = this.pickerVisible;
				this.td(p);
			},
			Add() {

				if(this.instruct == "" || this.practice == "" || this.knowledge == "" || this.expectation == "") { //如果有空没填
					Toast('没有填写完');
				} else {

					MessageBox.confirm('确定要添加这条学习反馈吗?').then(action => {
						sumLnsert({
							"instructtime": this.today,
							"instruct": this.instruct,
							"practice": this.practice,
							"knowledge": this.knowledge,
							"expectation": this.expectation
						}).then((res) => {

							let {
								code
							} = res.data;
							if(code == 1000) {
								Toast('添加成功！');
								this.$router.push("/courseback");
							}

						}).catch(
							err => {
								Toast('添加失败');
							}
						)
					}).catch(
						err=>{
							console.log("取消")
						}
					);

				}

			}
		},
		watch: {
			
		},
		mounted() {

		}
	}
</script>

<style>
	.addcourseback {
		position: relative;
	}
	
	.main {
		margin-top: 50px;
	}
	
	.day span {
		position: absolute;
		right: 10px;
	}
	
	.content span {
		padding-left: 20px;
	}
	
	textarea {
		display: block;
		margin: auto;
		width: 94%;
	}
	
	.cb4 {
		margin: 30px 0;
	}
	
	.cb4 span {
		padding-left: 20px;
	}
	
	.add {
		width: 94%;
		margin: 0 auto;
		display: block;
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
	.datetime{
		z-index: 2;
	}
</style>