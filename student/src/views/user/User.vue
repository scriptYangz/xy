<template>
  <div class="user-bg">
    <div class="user">
      <div class="user-info">
        <div class="user-info-fl">
          <ul>
            <li>姓名：{{userinfo.ossstuctnt}}</li>
            <li>班级：{{userinfo.clzname}}</li>
          </ul>
        </div>
        <div class="user-info-fr">
          <img v-bind:src="userImg" alt="">
        </div>
      </div>

      <div class="user-menu">
        <mt-button class="menu-btn" @click="goto">
          <img src="../../assets/test.png" height="50" width="50" slot="icon"><br>
          每日一考
        </mt-button>
        <mt-button class="menu-btn" @click="next">
          <img src="../../assets/exam.png" height="50" width="50" slot="icon"><br>
          考试
        </mt-button>
        <mt-button class="menu-btn">
          <img src="../../assets/power.png" height="50" width="50" slot="icon"><br>
          个人能力
        </mt-button>
        <mt-button class="menu-btn" @click="records">
          <img src="../../assets/records.png" height="50" width="50" slot="icon"><br>
          考试记录
        </mt-button>
        <mt-button class="menu-btn" @click="phaseexam">
          <img src="../../assets/全部考试.png" height="50" width="50" slot="icon"><br>
          阶段考
        </mt-button>
        <mt-button  class="menu-btn">
          <img src="../../assets/考试记录.png" height="50" width="50" slot="icon"><br>
          日总结
        </mt-button>
        <mt-button @click="courseback" class="menu-btn">
          <img src="../../assets/phaseexam.png" height="50" width="50" slot="icon"><br>
          学习反馈
        </mt-button>
        <mt-button class="menu-btn">
          <img src="../../assets/司法考试.png" height="50" width="50" slot="icon"><br>
          面试总结
        </mt-button>
        <mt-button class="menu-btn" @click="loginOut">
          <img src="../../assets/power-off.png" height="50" width="50" slot="icon"><br>
          退出
        </mt-button>
      </div>
    </div>
  </div>

</template>

<script>
  import {getUserinfo} from '../../api/User/user';
  import userimg from "@/assets/mayun.jpg"
  import { Button } from 'mint-ui';
    export default {
        name: "user",
      components: {
        [Button.name]:Button,
      },
      created(){
        this.getUserinfo();
        
      },
      data () {
          return {
            userinfo:'',
            userImg:userimg
          }
      },
      methods:{
        getUserinfo(){
          getUserinfo().then((res) => {
            let {code, msg, content} = res.data;
            this.userinfo=content;
          })
        },
        goto(){
          this.$router.push('/litexam')
        },
        next(){
          this.$router.push('/exampaper')
        },
        records(){
          this.$router.push('/records')
        },
        loginOut(){
//        localStorage.clear();
          this.$router.push('/')
        },
        phaseexam(){
        	this.$router.push('/phaseexam')
        },
        courseback(){
        	this.$router.push('/courseback')
        }
      }
    }
</script>
@import '/static/css/reset.css';
<style lang="less" rel="stylesheet/less">
  .user-bg{
    width: 100%;
    height: 100%;
    background:#579fde ;
  }
.user{
  width: 95%;
  margin: 0 auto;
  .user-info{
    width: 100%;
    padding-top: 15px;
    height: 100px;
    .user-info-fl{
      ul{
        margin: 0;
        padding-left: 30px;
        float: left;
        color: #ffffff;
        font-weight: bold;
        li{
          font-size: 16px;
          line-height: 35px;
        }
      }
    }
    .user-info-fr{
    float: right;
    margin-right: 10px;
      img{
        width: 95px;
        height: 100px;
     	border-radius:8px;
      }
    }
  }
  .user-menu{
    clear: both;
    width: 92%;
    padding: 4%;
    padding-top: 50px;
    .menu-btn{
    	text-align: center;
      width: 32.3%;
      height: 100px;
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
}
</style>
