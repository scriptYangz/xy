<template>
	<div class="answering">

		<div class="time">
			<img class="back" src="../../assets/back.png" @click="goback">
			<p>考试:{{ phaseexamName }} 距离考试结束还有{{ minute}}分:{{second}}秒</p>
		</div>
		<div class="nav">
			<mt-button size="small" @click.native.prevent="active = 'tab-container1'" v-if="danxuan.length > 0">单选题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container2'" v-if="duoxuan.length > 0">多选题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container3'" v-if="panduan.length > 0">判断题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container4'" v-if="tiankong.length > 0">填空题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container5'" v-if="jianda.length > 0">简答题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container6'" v-if="fenxi.length > 0">分析题</mt-button>
			<mt-button size="small" @click.native.prevent="active = 'tab-container7'" v-if="lunsu.length > 0">论述题</mt-button>
		</div>

		<div class="page-tab-container">
			<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
				<mt-tab-container-item id="tab-container1">
					<!-- 单选题组件 -->
					<div class="page-radio">
						<div class="page-radio-title" v-for="item in danxuan">{{item.title}}
							<mt-radio class="page-radio-part" v-model="val[item.id]" :options="item.answer" />
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container2">

					<!-- 多选题组件 -->
					<div class="page-checklist">
						<div class="page-checklist-title" v-for="item in duoxuan">{{item.title}}
							<mt-checklist class="page-checklist-part" v-model="val[item.id]" :options="item.answer">
							</mt-checklist>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container3">

					<!-- 判断题组件 -->
					<div class="page-judge">
						<div class="page-judge-title" v-for="item in panduan">{{item.title}}
							<mt-radio class="page-judge-part" v-model="val[item.id]" :options="item.answer" />
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container4">

					<!-- 填空题组件 -->
					<div class="fill-in-title" v-for="item in tiankong">{{item.title}}
						<mt-field placeholder="请依次填入答案" type="textarea" v-for="(item1,index) in item.answer" :key="index" v-model="val[item1]" rows="2"></mt-field>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container5">

					<!-- 简答题组件 -->
					<div class="short-answer-title" v-for="item in jianda">{{item.title}}
						<mt-field placeholder="请填入答案" type="textarea" v-model="val[item.id]" rows="2"></mt-field>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container6">

					<!-- 分析题组件 -->
					<div class="Analysis-title" v-for="item in fenxi">{{item.title}}
						<mt-field placeholder="请填入答案" type="textarea" v-model="val[item.id]" rows="2"></mt-field>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab-container7">

					<!-- 论述题组件 -->
					<div class="duiscuss-title" v-for="item in lunsu">{{item.title}}
						<mt-field placeholder="请填入答案" type="textarea" v-model="val[item.id]" rows="2"></mt-field>
					</div>
				</mt-tab-container-item>

			</mt-tab-container>
		</div>
		<div class="page-msgbox">
			<mt-button @click.native="openConfirm" size="large">提交</mt-button>
		</div>
	</div>
</template>

<script>
	import { TabContainer, TabContainerItem } from 'mint-ui'
	import { Button } from 'mint-ui';
	import { Radio } from 'mint-ui';
	import { Checklist } from 'mint-ui';
	import { Field } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import { listExampaper, insertanswer } from '../../api/Phaseexam/phaseexam';
	var time;
	export default {
		name: 'phaseexam',
		components: {
			[Button.name]: Button,
			[TabContainer.name]: TabContainer,
			[TabContainerItem.name]: TabContainerItem,
			[Radio.name]: Radio,
			[Checklist.name]: Checklist,
			[Field.name]: Field,
		},
		data() {
			return {
				active: 'tab-container1',
				minutes: 120,
				seconds: 0,
				phaseexamName: "阶段考",
				value1: [],
				value2: [],
				value3: '',
				options1: ['一般', '很帅', '非常帅'],
				options2: ['选项A', '选项B', '选项C'],
				options3: ['正确', '错误'],
				//单选题
				danxuan: [],
				duoxuan: [],
				panduan: [],
				tiankong: [],
				jianda: [],
				fenxi: [],
				lunsu: [],
				//绑定值
				val: {}
			}
		},
		/*		
		 * beforecreated：el 和 data 并未初始化
		created:完成了 data 数据的初始化，el没有
		beforeMount：完成了 el 和 data 初始化 
		mounted ：完成挂载*/
		created() {
			
			if(time){
			window.clearInterval(time); //清除定时器
			}

			{
				//如果不在考试时间之内，跳转到主页面
				let d = new Date();
				//获取当前时间
				let now = {
					hour: d.getHours(),
					minute: d.getMinutes()
				}
				// 判断是否为考试时间
				if(!this.$examtimes.isExamTimes(now)) {
					Toast('不是考试时间!');
					//返回user
					this.$router.push('/user')
				}

			}

			if(this.$storage.getStorage("lastuser") == sessionStorage.getItem("userid")) { //如果上一个用户和现在这个用户是同一个id,读取上一个id的答题数据和剩余时间

				if(this.$storage.getStorage("phaseAnswer")) {
					let a = this.$storage.getStorage("phaseAnswer");
					this.val = a;
				}

			} //（sessionStorage）if结束

		},
		watch: {

			val: {
				handler: function(val, oldVal) {
					this.$storage.setStorage("phaseAnswer", val);　　
					this.$storage.setStorage("lastuser", sessionStorage.getItem("userid"));　　
				},
				deep: true
			}

		},
		methods: {

			goback() {
				window.clearInterval(time); //清除定时器
				this.$storage.setStorage("phaseAnswer", this.val);　 //在考试时间内，保存答案
				this.$router.go(-1);
			},
			//倒计时
			num: function(n) {
				return n < 10 ? "0" + n : "" + n
			},
			countdown: function() {
				var _this = this;
				time = window.setInterval(function() {

					if(_this.seconds == 0 && _this.minutes != 0) {
						_this.seconds = 59;
						_this.minutes -= 1;
					} else if(_this.minutes <= 0 && _this.seconds <= 0) {
						_this.seconds = 0;
						console.log('交卷时间已到，系统将帮您自动交卷');
						//提交试卷的方法
						_this.submit();

					} else {
						_this.seconds -= 1;
					}

				}, 1000);

			},
			submit() {

				window.clearInterval(time);
				//封装答案
				let answer = {
					type: [],
					content: [],
				};

				if(this.danxuan.length > 0) {
					answer.type.push(1);
					this.initAnswer(this.danxuan, answer.content, 1);
				}
				if(this.duoxuan.length > 0) {
					answer.type.push(2);
					this.initAnswer(this.duoxuan, answer.content, 2);
				}
				if(this.panduan.length > 0) {
					answer.type.push(3);
					this.initAnswer(this.panduan, answer.content, 3);
				}
				if(this.tiankong.length > 0) {
					answer.type.push(4);
					this.initAnswer(this.tiankong, answer.content, 4);
				}
				if(this.jianda.length > 0) {
					answer.type.push(5);
					this.initAnswer(this.jianda, answer.content, 5);
				}
				if(this.fenxi.length > 0) {
					answer.type.push(6);
					this.initAnswer(this.fenxi, answer.content, 6);
				}
				if(this.lunsu.length > 0) {
					answer.type.push(7);
					this.initAnswer(this.lunsu, answer.content, 7);
				}
				//提交试卷的逻辑
				insertanswer(answer).then((res) => {
					console.log(answer)
					console.log(res)
				});

				//答案提交完之后，把剩余时间和答案清空，并跳到分数页面
				this.$storage.removeStorage("phaseAnswer");
				this.$router.push('/score');
			},
			//弹框确认提交试题
			openConfirm() {
				MessageBox.confirm('', {
					message: '确定提交试题',
					title: '提示',
				}).then(action => {
					if(action == 'confirm') {
						window.clearInterval(time); //清除定时器
						this.submit();
					}
				}).catch(err => {
					if(err == 'cancel') {}
				});
			},
			listExampaper() {
				listExampaper().then((res) => {
					//获取数据
					let {
						code,
						content,
						msg
					} = res.data;
					if(code == 1000) {
						for(let i in content.content) {
							if(i == 1) {
								this.initQuestion(i, content.content[i], this.danxuan)
							} else if(i == 2) {
								this.initQuestion(i, content.content[i], this.duoxuan)
							} else if(i == 3) {
								this.initQuestion(i, content.content[i], this.panduan)
							} else if(i == 4) {
								this.initQuestion(i, content.content[i], this.tiankong)
							} else if(i == 5) {
								this.initQuestion(i, content.content[i], this.jianda)
							} else if(i == 6) {
								this.initQuestion(i, content.content[i], this.lunsu)
							} else if(i == 7) {
								this.initQuestion(i, content.content[i], this.fenxi)
							}
						}

						this.countdown(); //试题加载完成，考试倒计时开始

					} else {
						this.$router.push('/user')
					}
				})
			},
			initAnswer(content, answer, type) {
				let temp = new Array();
				for(let i = 0; i < content.length; i++) {
					if(type != 4) {
						//每个问题绑定的值
						let qid = content[i].id;
						//通过题目id去取组件值
						temp.push(this.val[qid]);
					} else {
						//每个问题绑定的值
						//迭代空格数，取到填空题绑定值
						let kg = this.tiankong[i].answer;
						//拼接填空题字符串
						let tcontent = '';
						for(let j = 0; j < kg.length; j++) {
							if(j != kg.length - 1) {
								tcontent = tcontent + this.val[kg[j]] + ','
							} else {
								tcontent = tcontent + this.val[kg[j]];
							}
						}
						temp.push(tcontent);
					}
				}
				answer.push(temp);

			},
			initQuestion(type, content, result) {
				for(let j = 0; j < content.length; j++) {
					let question = content[j];
					let temp = {
						type: null,
						id: '',
						title: '',
						answer: [],
					};

					//多选题选择框绑定的是数组
					if(!this.val[question.id] && type == 2) {
						this.val[question.id] = new Array();
					}

					temp.type = type;
					temp.id = question.id;
					temp.title = (j + 1).toString() + "、" + JSON.parse(question.content).title

					let answer = JSON.parse(question.content).choiceList;
					if(type == 1 || type == 2 || type == 3) {
						for(let k in answer) {
							let tanswer = {
								label: type == 3 ? k : k + "、" + answer[k],
								value: type == 3 ? answer[k] : k,
							}
							temp.answer.push(tanswer)
						}
					} else if(type == 4) {
						//判断需要填空的次数,填空题绑定id
						let count = temp.title.split("(__)").length - 1;
						for(let k = 0; k < count; k++) {
							temp.answer.push(temp.id.toString() + k)
						}
					}

					result.push(temp);
				}
			}
		},
		computed: {
			second: function() {
				return this.num(this.seconds)
			},
			minute: function() {
				return this.num(this.minutes)
			}
		},
		mounted() {
			this.listExampaper();
		}
	};
</script>
@import '../static/css/reset.css';
<style lang="less" rel="stylesheet">
	.time {
		width: 100%;
		padding-top: 5px;
		background: #579fde;
		text-align: center;
		display: inline-flex;
		p {
			margin: 5px 30px;
			color: #fff;
		}
	}
	
	.back {
		width: 40px;
		height: 30px;
	}
	
	.item {
		display: inline-block;
	}
	
	.nav {
		width: 100%;
		height: 34px;
		display: block;
		-webkit-overflow-scrolling: touch;
		white-space: nowrap;
		overflow-y: hidden;
	}
	
	.link {
		color: inherit;
		padding: 20px;
		display: block;
	}
	
	.mint-field-core {
		border: 1px solid #ccc;
	}
	
	.page-part {
		margin-top: 20px;
	}
	
	.page-tab-container {
		padding-bottom: 40px;
	}
	
	.page-msgbox {
		width: 100%;
		position: fixed;
		bottom: 0;
	}
</style>

<!--localstorage-->
<!--https://www.cnblogs.com/zhihou/p/8042936.html-->

<!--watch:-->
<!--https://www.cnblogs.com/hity-tt/p/6677753.html-->