<template>
  <div class="login-bg">
    <div class="Login form-group">
      <div class="login_header">
        <h1>jkoss 答题库</h1>
      </div>
      <div class="feild">
        <div class="feild-wrap">
          <mt-field label="用户名 :" placeholder="请输入用户名" v-model="username" class="user-name"></mt-field>
          <mt-field label="密码 :" placeholder="请输入密码" type="password" v-model="password" class="user-pwd"></mt-field>
          <mt-button @click="login1" class="submit-btn" >登录</mt-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {login} from '../api/index';
  import { Header } from 'mint-ui';
  import { Field } from 'mint-ui';
  import { Button } from 'mint-ui';
  export default {
    name: 'login',
    components: {
      [Field.name]:Field,
      [Button.name]:Button,
      [Header.name]:Header,
    },
    data() {
      return {
        username:'',
        password:''
      }
    },
    methods: {
      login1(){
        var loginParams = {name:this.username, pwd: this.password};//先获取用户输入的数据
       login(loginParams).then(data => {
            //相应的逻辑
            let {msg, code, content} = data;
            if(code == 1000){
              //成功的逻辑
              console.log("登录成功");
              this.$router.push('/user')
              //保存token
              sessionStorage.setItem('userid', content);
            }else{
              console.log(msg);
            }
       });
      }
    }
  }
</script>
@import '../static/css/reset.css';
<style lang="less" rel="stylesheet/less">

  .login-bg{
    width: 100%;
    height: 100%;
    background:#579fde ;
  }
  .Login{
   .login_header{
     padding: 10px;
     text-align: center;
     font-size: 10px;
     color: #ffffff;
     text-shadow: 0 0px 0 #101010;
   }
    .feild{
      width: 80%;
      margin: 40px auto;
      padding: 0 10%;
      border-radius: 10px;
      .feild-wrap{
        padding: 50px 20px ;
        background: #ffffff;
        border-radius: 5px;
      }
      .mint-cell-title{
        width: 90px;
      }
      .user-name{
        height: 46px;
        line-height: 20px;
        opacity: 0.5;
        border-radius: 20px;
        text-align: center;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 20px auto;
        background: none !important;
      }
      .user-pwd{
        height: 46px;
        line-height: 20px;
        opacity: 0.5;
        border-radius: 20px;
        text-align: center;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 20px auto;
      }
      .submit-btn{
        width: 200px;
        font-size: 18px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 20px auto;
        display: block;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
</style>
