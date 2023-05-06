<!--这是页面顶部导航栏-->
<template>
  <div class="hello">
    <div class="header">
      <div class="logo">
        <el-menu :default-active="activeIndex"
                 router
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#fafafa"
                 text-color="black"
                 @select="handleSelect">
<!--          active-text-color="#fff"-->
          <el-menu-item index="/dashboard/homepage">大学生智能心理疏导平台</el-menu-item>
        </el-menu>
          <img src="../views/img/psychoLogo.png" alt="图片加载中" style="height: 50px;width: auto"></img>
<!--        <span>大学生智能心理疏导平台</span>-->
      </div>
<!--      <div class="frame-right" v-if="this.$store.state.token"></div> token存在才会显示-->
      <div class="frame-right">
        <el-menu :default-active="activeIndex"
                 router
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#fafafa"
                 active-text-color="#409eff"
                 text-color="black"
                 @select="handleSelect">
<!--          active-text-color="khaki"-->
<!--          <el-menu-item index="/dashboard/homepage">首页</el-menu-item>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title">系统管理</template>-->
<!--            <el-menu-item index="/dashboard/user">用户管理</el-menu-item>-->
<!--            <el-menu-item index="/dashboard/role">角色管理</el-menu-item>-->
<!--            <el-menu-item index="/dashboard/loginLog">登录日志</el-menu-item>-->
<!--            <el-menu-item index="/dashboard/operateLog">操作日志</el-menu-item>-->
<!--            <el-menu-item index="/dashboard/uploadMOCK">文件分片上传</el-menu-item>-->
<!--            <el-menu-item index="/dashboard/videoMock">视频播放</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-menu-item v-for="(v,i) in this.$store.state.power" :key="i" :index=v.path>-->
<!--            <span>{{v.comment}}</span>-->
<!--          </el-menu-item>-->

          <el-menu-item index="/dashboard/homepage">首页</el-menu-item>
          <el-menu-item index="/dashboard/psychologicalArticle">文章</el-menu-item>
          <el-menu-item index="/dashboard/psychologicalAssessment">心理测评</el-menu-item>
<!--          <el-menu-item index="/dashboard/quiz_kokology">问答</el-menu-item>-->
          <el-menu-item index="/dashboard/videoLecture">视频讲座</el-menu-item>
          <el-menu-item v-if="this.isManager === true" index="/videoManage/video">后台管理</el-menu-item>
<!--          <el-menu-item index="/dashboard/excels">excel测试</el-menu-item>-->
          <el-menu-item index="/dashboard/useExcels">excel测试</el-menu-item>
<!--          <el-menu-item v-for="(v,i) in this.roles" :key="i">-->
<!--            <span v-if="v.name === '管理员'">进入后台管理</span>-->
<!--          </el-menu-item>-->

<!--          <el-menu-item index="/dashboard/consultation_appointment">预约咨询</el-menu-item>-->
        </el-menu>
      </div>
      <div class="login-info">
        <ul>
<!--          <li v-if="this.token||this.Token !== 0">-->
          <li v-if="this.Token !== '0' && this.Token">
<!--            <el-menu :default-active="activeIndex"-->
<!--                     router-->
<!--                     class="el-menu-demo"-->
<!--                     mode="horizontal"-->
<!--                     background-color="#42b983"-->
<!--                     text-color="#000"-->
<!--                     @select="handleSelect">-->
<!--              <el-menu-item index="/login">立即登录</el-menu-item>-->
<!--            </el-menu>-->
            <el-menu :default-active="activeIndex"
                     router
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#fafafa"
                     text-color="#000"
                     @select="handleSelect">
              <el-menu-item index="/dashboard/personData">个人信息</el-menu-item>
              <el-submenu index="3">
                <template v-slot:title>更多</template>
<!--                <el-menu-item index="/Register">导师申请</el-menu-item>-->
                <el-menu-item index="/dashboard/operation">使用帮助</el-menu-item>
                <el-menu-item index="/dashboard/updatePassword">修改密码</el-menu-item>
                <el-menu-item index="/login" @click="back">注销账号</el-menu-item>
              </el-submenu>
            </el-menu>
          </li>
          <li v-else>
<!--            <el-menu :default-active="activeIndex"-->
<!--                     router-->
<!--                     class="el-menu-demo"-->
<!--                     mode="horizontal"-->
<!--                     background-color="#42b983"-->
<!--                     text-color="#000"-->
<!--                     @select="handleSelect">-->
<!--              <el-menu-item index="/dashboard/person_data">个人信息</el-menu-item>-->
<!--              <el-submenu index="3">-->
<!--                <template slot="title">更多</template>-->
<!--                <el-menu-item index="/login_dashboard/Register">导师申请</el-menu-item>-->
<!--                <el-menu-item index="/dashboard/update_password">修改密码</el-menu-item>-->
<!--                <el-menu-item index="/login" @click="back">注销账号</el-menu-item>-->
<!--              </el-submenu>-->
<!--            </el-menu>-->
            <el-menu :default-active="activeIndex"
                     router
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#fafafa"
                     text-color="#000"
                     @select="handleSelect">
              <el-menu-item index="/login">立即登录</el-menu-item>
            </el-menu>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import global from "@/js/global";
export default {
  name: 'TopFrame',
  props: {
    msg: String
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      token: global.Token,
      Token: sessionStorage.getItem('Token'),
      roles: this.$store.state.data.roles,
      isManager: false,
    };
  },
  created() {
    // this.getToken()
    this.isRole()
  },
  methods: {
    getToken(){
      // this.token = sessionStorage.getItem('Token')
      // console.log('Token:',this.token)
      // location.reload()
    },
    isRole(){
      console.log(this.token)
      console.log(this.Token)
      for (let i in this.roles){
        // console.log(i)
        if (this.roles[i].name === '管理员'){
          this.$store.state.data.isManager = true
          this.isManager = true
        }
        // console.log(this.isManager)
      }
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    back(){
      this.$store.commit("logout");
      console.log(this.$store.state);
      sessionStorage.setItem('Token',"0");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*header是设置右上角这一块的*/
.header {
  width: 100vw;
  height: 60px;
  position: fixed;

  top: 0;
  left: 0;
  /*box-shadow: 0 2px 13px #42b983;*/
  /*右上角这一块产生的阴影数据及颜色*/
  background-color: #fafafa;
  /*background-color: #409eff;*/
  /*右上角这一块的背景颜色*/
  color: black;
  /*顶部导航栏字体颜色*/
}
/*logo专门设置左上角健康这一小块*/
.logo {
  position: absolute;
  left: 0;
  width: 28%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 60px;
  overflow: hidden;
  font-size: 1.6vw;
}
.login-info {
  position: absolute;
  top: 0;
  right: 20px;
  line-height: 60px;
}
.login-info li{
  display: inline-block;
  margin-right: 1vw;
}
.frame-right{
  width: 60vw;
  height: 60px;
  position: fixed;
  /*position: relative;*/
  top: 0;
  margin-left:30%;
  line-height: 60px;
  text-align-all: center;
}
</style>
