<!--&lt;!&ndash;这是设置登录界面&ndash;&gt;-->
<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="login_box">
        <!-- 左侧的注册盒子 -->
        <div class="login_box-in">
          <el-form :rules="rules" :model="loginData" ref="loginData">
            <div class="user_box">
              <span class="iconfont">&#xe817;</span>
              <el-form-item label="" prop="phone">
                <el-input v-model="loginData.phone" type="text" placeholder="电话号码" @change="Search"></el-input>
              </el-form-item>
            </div><br>
            <div class="pwd_box">
              <span class="iconfont">&#xe775;</span>
              <el-form-item label="" prop="password">
                <el-input v-model="loginData.password" type="password" placeholder="用户密码"></el-input>
              </el-form-item>
            </div>
          </el-form>
<!--          <div class="user_box" >-->
<!--            <span class="iconfont">&#xe817;</span>-->
<!--            <input type="text" placeholder="电话号码" v-model="loginData.phone" @change="Search">-->
<!--          </div>-->
<!--          <br>-->
<!--          <div class="pwd_box">-->
<!--            <span class="iconfont">&#xe775;</span>-->
<!--            <input  class="pwd" id ="password" type="password"  v-model="loginData.password" placeholder="密码">-->
<!--          </div>-->
          <br>
          <div class="log-box">
            <button type="primary"  class="login_btn" @click="login" v-prevent-re-click>立即登录</button>
          </div>
          <div class="log-box">
            <button type="primary"  class="login_btn" @click="ForgotPassword" v-prevent-re-click>忘记密码</button>
          </div>

          <br>
          <div class="warn"></div>
          <button type="primary"  class="register_btn" @click="register" v-prevent-re-click>若无账号请点击注册</button>
        </div>
        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">欢迎使用大学生智能心理疏导平台</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {debounce} from "@/views/Login/common";
import global from "@/js/global";
import servicesApi from "@/utils/servicesApi";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",

  data: function () {
    var validatePass = (rule,value,callback)=>{
      // this.$refs['loginData'].resetFields()
      console.log(value);
      // let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/
      let reg = /^[^\u4e00-\u9fa5 ]{6,16}$/
      if (!value){
        return callback(new Error('请输入密码'))
      } else {
        let ret = this.passwordRules(value)
        // console.log(ret)
        if (ret){
          return callback()
        } else {
          return callback(new Error('密码格式错误,应为6-18位字符串'))
        }
      }
    }
    return {
      loginData: {
        phone: '',
        password: '',
      },
      // phone: '',
      // password: '',
      rules: {
        password: [
          {
            pattern:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/,
            required: true,
            validator: validatePass,
            min: 6,max: 18,
            // message: '为最少6位，最大18位的字符串',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    Search:debounce(function (){
      //console.log(1234);
      this.handle();
      console.log(new Date())
    },300),

    passwordRules(value){
      // console.log(value)
      let reg = /^[^\u4e00-\u9fa5 ]{6,18}$/
      // let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/
      if (reg.test(value)){
        return true
      } else {
        return false
      }
    },

    handle(){//手机号输入限制
      let reg = /^1[0-9]{10}$/g;
      if (reg.test(this.loginData.phone)){
        // console.log('1111',reg.test(this.loginData.phone))
        this.statu = true;
        console.log('格式正确');
      } else {
        this.statu = false;
        if (this.loginData.phone){
          alert("手机号码格式错误，请确认后再输入");
          console.log('格式错误');
        }
      }
    },

    register() {//跳转注册界面
      // this.$router.push("/login_dashboard/Register")
      this.$router.push("/Register")
    },

    ForgotPassword() {//跳转忘记密码界面
      // this.$router.push("/login_dashboard/ForgotPassword")
      this.$router.push("/ForgotPassword")
    },

    login(){
      if (this.loginData.phone.length !== 11){
        alert("手机号码格式错误，请确认后再输入");
        return;
      }
      if (!this.loginData.phone || !this.loginData.password){
        alert("账号或密码不能为空");
      } else {
        //判断后台是否有账号信息存在
        let data = {phone: this.loginData.phone}
        servicesApi.userIsHave(data).then(resp=>{
          console.log('asd',resp.data); //输出输入数据
          // console.log(resp.data.code);
          if (resp.data.code === "200"){
            //账号存在，进行登陆操作
            let loginData = {
              phone: this.loginData.phone,
              password: this.$md5(this.loginData.password)
            }
            servicesApi.login(loginData).then(res=>{
               console.log(res.data);
              // console.log(res.data.code);
              if (res.data.code === "200"){//跳转首页
                // localStorage.setItem('token','true');
                global.Token = true
                this.$store.state.password = this.loginData.password
                this.$message({
                  message:"用户" + res.data.data.username + "登陆成功",
                  type: 'success'
                })
                this.$router.push("/dashboard/homepage",()=>{
                  // this.$store.commit("update",res.data);
                  console.log(this.$store.state);
                });
                //console.log('登陆成功');
                console.log(res.data.msg);
                sessionStorage.setItem('Token',res.data.data.token)
                //将后台返回数据放入store中
                this.$store.commit("update",res.data);
                console.log(this.$store.state);
              } else {
                console.log(res.data);
                alert(res.data.msg);
              }
            })
          } else {
            alert(resp.data.msg);
            //alert("账号不存在，请先注册账号，再登录使用。");
          }
        }).catch(()=>{
          console.log('异常');
        })
      }
    },
  },
}

</script>

<style scoped>

.login_box{
  display:flex;
  position:absolute;
  width:70%;
  height:400px;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}
.login_box-in{
  background-color:#89AB9E;
  width:40%;
}
.user_box{
  margin-top:25% ;
  height:30px;
  width:230px;
  display: flex;
  margin-left:10%;
}
.pwd_box{
  margin-top: 10%;
  height:30px;
  width:230px;
  display: flex;
  margin-left:10%;
}

.background{
  width:570px;
  background-image:url('../img/Christmas_Trees.png');
  background-size:cover;
  font-family:sans-serif;
}
.title{
  margin-top:320px;
  font-weight:bold;
  font-size:20px;
  color:#4E655D;

}
.title:hover{
  font-size:21px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}

input{
  outline-style: none ;
  border: 0;
  border-bottom:1px solid #E9E9E9;
  background-color:transparent;
  height:20px;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;
}
/* input::-webkit-input-placeholder{
   color:#E9E9E9;
} */
input:focus{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;

}
input:hover{
  border-bottom:2px solid #445b53;
  background-color:transparent;
  transition: all 0.2s ease-in;
  font-family:sans-serif;
  font-size:15px;
  color:#445b53;
  font-weight:bold;

}

input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0 1000px  #89AB9E inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight:bold;
}
.log-box{
  font-size:12px;
  display: flex;
  justify-content: space-between ;
  width:40%;
  margin-left:35%;
  color:#4E655D;
  margin-top:5%;
  align-items: center;
}
/*.log-box-text{*/
/*  color:#4E655D;*/
/*  font-size:12px;*/
/*  text-decoration:underline;*/
/*}*/
.login_btn{
  background-color: #5f8276; /* Green */
  border: none;
  color: #FAFAFA;
  padding: 5px 22px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  outline:none;
}
.login_btn:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}

.warn{
  margin-top:60px;
  /* margin-right:120px; */
  margin-left:-120px;
  margin-bottom: 5px;
  font-weight:bold;
  font-size:17px;
}

.register_btn{
  background-color: transparent; /* Green */
  border: none;
  font-size: 12px;
  /* border-radius: 20px;   */
  color:#4E655D;
  text-decoration:underline;
  display: flex;
  margin-left:25px;
  outline:none;
}
.register_btn:hover{
  font-weight:bold;
  cursor: pointer;
}
@font-face {
  font-family: "iconfont";
  src: url('../font/iconfont.eot');
  src: url('../font/iconfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../font/iconfont.woff2') format('woff2'), url('../font/iconfont.woff') format('woff'), url('../font/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('../font/iconfont.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:22px;
  color:#4E655D;
  margin-right:10px;
  margin-top:3px;
}

/*.icon-key:before {*/
/*  content: "\e775";*/
/*}*/

/*.icon-account:before {*/
/*  content: "\e817";*/
/*}*/

</style>
