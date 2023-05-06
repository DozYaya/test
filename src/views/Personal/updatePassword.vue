<template>
  <div class="container">
    <div class="main">
      <div class="dataBox">
<!--        <el-header style="margin-left: 40%;position: center">修改密码</el-header>-->
        <h1 style="margin-left: 40%;font-size: 25px;margin-top: 15px">修改密码</h1>
        <div class="userBox">
          <el-form :rules="rules" :model="updateData" style=";width: 60%">
            <el-form-item label="手机号：" prop="phone">
              {{this.updateData.phone}}
<!--              <input  class="pwd"  id="password" v-model="password" type="password"  placeholder="密码">-->
            </el-form-item>
            <el-form-item label="密码：" prop="password" >
              <input  class="pwd"  id="password" v-model="updateData.password" type="password"  placeholder="密码" style="background-color: #FAFAFA">
            </el-form-item>
            <el-form-item label="重复密码：" prop="rep">
              <input  class="pwd"  id="rep" v-model="updateData.rep" type="password"  placeholder="重复密码" style="background-color: #FAFAFA">
            </el-form-item>
            <el-form-item>
              <el-button @click.native="on">确认修改</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click.native="cancel">取消</el-button>
            </el-form-item>
          </el-form>
<!--      <span>-->
<!--        手机号码：{{this.$store.getters.showPhone}}-->
        <!--        <item>{{this.$store.getters.showPhone}}</item>-->
<!--      </span>-->
<!--        </div>-->
<!--        <div class="password">-->
<!--      <span>-->
<!--        密码：<input  class="pwd"  id="password" v-model="password" type="password"  placeholder="密码">-->
<!--      </span>-->
<!--        </div>-->
<!--        <div class="re_password">-->
<!--      <span>-->
<!--        重复密码：<input  class="pwd"  id="rep" v-model="rep" type="password"  placeholder="重复密码">-->
<!--      </span>-->
<!--        </div>-->
<!--        <div class="button">-->
<!--          <button @click="on">确认修改</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import servicesApi from "@/utils/servicesApi";

export default {
  name: "update_password",

  data:function (){
    var validatePass = (rule,value,callback)=>{
      // this.$refs['loginData'].resetFields()
      console.log(value);
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
          return callback(new Error('密码格式错误,应为6-18位字符串'))
        }
      }
    }
    return {
      updateData:{
        phone: this.$store.getters.showPhone,
        password: '',
        rep: '',
      },

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
        ],
        rep: [
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
  methods:{
    on(){
      if (!this.updateData.password || !this.updateData.rep){
        alert("修改信息不能为空。");
      } else {
        if (this.$md5(this.updateData.password) === this.$md5(this.updateData.rep)){
          let data = {
            phone: this.updateData.phone,
            password: this.$md5(this.updateData.password)
          }
          servicesApi.userIsHave(data).then(resp=>{
          // axios.post('/api/users/account-have',{
          //   phone: this.updateData.phone,
          //   password: this.$md5(this.updateData.password)
          // }).then(resp=>{
            console.log(resp.data);
            let Token = this.$store.getters.showToken
            console.log(Token)
            if (resp.data.code === "200") {
              let updateData = {
                phone: this.updateData.phone,
                password: this.$md5(this.updateData.password),
              }
              servicesApi.updatePassword(updateData).then(res=>{
              // axios.post('/api/users/updater-password',{
              //   phone: this.updateData.phone,
              //   password: this.$md5(this.updateData.password),
              // }).then(res=>{
                console.log(res.data);
                if (res.data.code === "200"){
                  alert(res.data.msg);
                } else {
                  alert(res.data.msg);
                }
              })
            } else {
              alert(resp.data.msg);
            }
          })
        } else {
          alert("密码与确认密码不同，请确认后重新输入。");
        }
      }
    },
    cancel(){
      this.$confirm('你确定要取消修改并返回首页吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$router.push('/dashboard/homepage')
      })
    }
  }
}
</script>

<style scoped>
  .dataBox{
    display:flex;
    position:absolute;
    width: 50%;
    height: 80%;
    margin-top: 10%;
    left: 25%;
    background-color: #f1f1f1;
  }
  .userBox{
    display:flex;
    position:absolute;
    width: 80%;
    margin-top: 10%;
    margin-left: 25%;
  }
  .password{
    display:flex;
    position:absolute;
    width: 50%;
    height: 8%;
    margin-top: 20%;
    margin-left: 25%;
  }
  .re_password{
    display:flex;
    position:absolute;
    width: 50%;
    height: 8%;
    margin-top: 30%;
    left: 25%;
  }
  .button{
    display:flex;
    position:absolute;
    width: 50%;
    height: 8%;
    margin-top: 40%;
    left: 40%;
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
</style>
