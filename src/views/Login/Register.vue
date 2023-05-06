<template>
  <div class="container">
    <div class="main">
        <!-- 整个注册盒子 -->
      <div class="login_box">
          <!-- 左侧的注册盒子 -->
          <div class="login_box-in">
            <el-form :rules="rules" :model="registerData" ref="registerData">
              <div class="user_box">
                <span class="iconfont">&#xe817;</span>
                <el-form-item label="" prop="username">
                  <el-input v-model="registerData.username" type="text" placeholder="用户名"></el-input>
                </el-form-item>
              </div>
              <div class="phone">
                <span class="iconfont">&#xe817;</span>
                <el-form-item label="" prop="phone">
                  <el-input v-model="registerData.phone" type="text" placeholder="电话号码" @change="Search"></el-input>
                </el-form-item>
              </div>
              <div class="pwd_box">
                <span class="iconfont">&#xe775;</span>
                <el-form-item label="" prop="password">
                  <el-input v-model="registerData.password" type="password" placeholder="用户密码"></el-input>
                </el-form-item>
              </div>
              <div class="pwd_box">
                <span class="iconfont">&#xe775;</span>
                <el-form-item label="" prop="re_password">
                  <el-input v-model="registerData.re_password" type="password" placeholder="重复密码"></el-input>
                </el-form-item>
              </div>
            </el-form>
<!--            <div class="userbox">-->
<!--              <span class="iconfont">&#xe817;</span>-->
<!--              <input  class="user" id="username" type="text"  v-model="username" placeholder="昵称">-->
<!--            </div>-->
<!--            <br>-->
<!--            <div class="phone">-->
<!--              <span class="iconfont">&#xe817;</span>-->
<!--              <input type="text" placeholder="电话号码" v-model="phone" @change="Search">-->
<!--            </div>-->
<!--            <br>-->
<!--            <div class="pwdbox">-->
<!--              <span class="iconfont">&#xe775;</span>-->
<!--              <input  class="pwd"  id="password" v-model="password" type="password"  placeholder="密码">-->
<!--            </div>-->
<!--            <br>-->
<!--            <div class="pwdbox">-->
<!--              <span class="iconfont">&#xe775;</span>-->
<!--              <input  class="pwd"  id="re_password"  v-model="re_password" type="password"  placeholder="确认密码">-->
<!--            </div>-->
            <br>
            <button type="primary"  class="register_btn" @click="register" v-prevent-re-click>注册</button>
            <br><br>
            <button type="primary" class="cancel_btn" @click="cancel">取消</button>
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
import axios from "axios";
import {debounce} from "@/views/Login/common";
import servicesApi from "@/utils/servicesApi";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",

  data:function (){
    var validatePass = (rule,value,callback)=>{
      // this.$refs['loginData'].resetFields()
      // let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/
      let reg = /^[^\u4e00-\u9fa5 ]{6,16}$/
      if (!value){
        return callback(new Error('请输入密码'))
      } else {
        let ret = this.passwordRules(value)
        console.log(ret)
        if (ret){
          return callback()
        } else {
          return callback(new Error('密码格式错误,应为6-18位除空格与中文外字符串'))
        }
      }
    }
    return {
      registerData: {
        username: '',
        phone: '',
        password: '',
        re_password: '',
      },
      rules:{
        password: [
          {
            pattern:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/,
            required: true,
            validator: validatePass,
            min: 6,max: 18,
            // message: '为最少6位，最大18位的字符串',
            trigger: 'blur'
          }
        ],
        re_password: [
          {
            // pattern:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,18}$/,
            required: true,
            validator: validatePass,
            min: 6,max: 18,
            // message: '为最少6位，最大18位的字符串',
            trigger: 'blur'
          }
        ]
      },
      statu: false
    }
  },
  methods:{
    Search:debounce(function (){
      //console.log(1234);
      this.handle();
      console.log(new Date())
    },300),

    passwordRules(value){
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
      if (reg.test(this.registerData.phone)){
        this.statu = true;
        console.log('格式正确');
        //alert("yes");
      } else {
        this.statu = false;
        if (this.registerData.phone){
          alert("手机号码格式错误，请确认后再输入");
          console.log('格式错误');
        }
      }
    },

    register(){
      if (this.registerData.phone.length !== 11){
        alert("手机号码格式错误，请确认后再输入");
        return;
      }
      if (!this.registerData.username || !this.registerData.phone || !this.registerData.password || !this.registerData.re_password){
        alert("注册信息不能为空。");
      } else {
        //判断后台是否有账号信息存在
        let data = {phone: this.registerData.phone}
        servicesApi.userIsHave(data).then(resp=>{
        // axios.post('/api/users/account-have',{
        //   phone: this.registerData.phone
        // }).then(resp=>{
          console.log(resp.data);
          console.log(resp.data.code);
          if (resp.data.code === "200"){
            //账号存在，进行登陆操作
            //alert(resp.data.msg);
            alert("账号已存在，可直接登录。");
            this.$router.replace('/login')
          } else {//账号不存在，进行注册操作
            this.registerData.password = this.registerData.password.toString()
            this.registerData.re_password = this.registerData.re_password.toString()
            // console.log('13213213')
            if (this.$md5(this.registerData.password) === this.$md5(this.registerData.re_password)){
              let regData = {
                username: this.registerData.username,
                phone: this.registerData.phone,
                password: this.$md5(this.registerData.password)
              }
              servicesApi.register(regData).then(res=>{
              // axios.post('/api/users/register',{
              //   username: this.registerData.username,
              //   phone: this.registerData.phone,
              //   password: this.$md5(this.registerData.password)
              // }).then(res=>{
                console.log(res.data);
                console.log(res.data.code);
                if (res.data.code === "200"){
                  //alert(res.data.msg);
                  this.$message({
                    message: "用户" + this.registerData.username + "注册成功",
                    type: 'success'
                  })
                  // alert("注册成功，请返回登录界面登录使用。");
                  this.$router.replace('/login');
                } else {
                  alert(res.data.msg);
                  //alert("系统错误，请稍后重试。");
                }
              }).catch(()=>{
                console.log('异常')
              })
            } else {
              alert("密码与确认密码不同，请确认后重新输入。");
            }
          }
        })
      }
    },
    cancel(){//跳转登录界面
      this.$router.push({
        path: '/login',
      })
    }
  }
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

/*.loginbox{*/
/*    display:flex;*/
/*    position:absolute;*/
/*    width:800px;*/
/*    height:400px;*/
/*    top:40%;*/
/*    left:50%;*/
/*    transform:translate(-50%,-50%);*/
/*    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;*/
/*}*/
.login_box-in{
     background-color:#89AB9E;
     width:40%;
}
.user_box{
  margin-top:15% ;
  height:30px;
  width:230px;
  display: flex;
  margin-left:10%;
}
.phone {
  margin-top: 10%;
  height: 30px;
  width: 230px;
  display: flex;
  margin-left: 10%;
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
/*.uesr-text{*/
/*     position:left;*/
/*}*/
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
 box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
 -webkit-text-fill-color: #445b53;

}

input:-webkit-autofill::first-line {
 font-size: 15px;
 font-weight:bold;
 }
.log-box{
    font-size:12px;
    display: flex;
    justify-content: space-between ;
    width:174px;
    margin-left:30px;
    color:#4E655D;
    margin-top:-5px;
    align-items: center;

}
.log-box-text{
    color:#4E655D;
    font-size:12px;
      text-decoration:underline;
    }
.register_btn{
    background-color: #5f8276; /* Green */
    border: none;
    color: #FAFAFA;
    padding: 7px 35px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 20px;
    outline:none;
  margin-top: 7%;
}
.register_btn:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    cursor: pointer;
     background-color: #0b5137;
    transition: all 0.2s ease-in;
}
.cancel_btn{
  background-color: #5f8276; /* Green */
  border: none;
  color: #FAFAFA;
  padding: 7px 35px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  outline:none;
}
.cancel_btn:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}

.warn{
    margin-top:60px;
    margin-right:110px;
    margin-bottom: 5px;
    font-weight:bold;
    font-size:17px;
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
    color:white;
    margin-right:10px;
    margin-top:3px;
}

.icon-key:before {
    content: "\e775";
}

.icon-account:before {
    content: "\e817";
}

</style>
