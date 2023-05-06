<template>
  <div class="menu-root">

    <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#42b983"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item>
        <router-link to="/dashboard/homepage">首页</router-link>
      </el-menu-item>

<!--      <el-menu-item index="/dashboard/homepage">首页</el-menu-item>-->
      <div v-if="$store.state.token">
        <el-menu-item v-for="(v,i) in this.$store.state.power" :key="i">
          <router-link :to=v.path>
            <span>{{v.comment}}</span>
          </router-link>
        </el-menu-item>
      </div>
<!--      <el-submenu index="2">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>心理文章</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/psychological_article">心理文章</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/。。。">文章管理</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->

<!--      <el-submenu index="3">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>心理测评</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/psychological_assessment">心理测评</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/测评管理">测评管理</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->

<!--      <el-submenu index="4">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>心理问答</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/quiz_kokology">心理问答</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/问答管理">问答管理</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->

<!--      <el-submenu index="5">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>视频讲座</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/video_lecture">视频讲座</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/讲座管理">讲座管理</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->

<!--      <el-submenu index="6">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>咨询预约</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/consultation_appointment">咨询预约</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/查看预约">查看预约</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->

<!--      <el-submenu index="7">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-location"></i>-->
<!--          <span>系统管理</span>-->
<!--        </template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="/dashboard/user_manage">用户管理</el-menu-item>-->
<!--          <el-menu-item index="/dashboard/role_manage">角色管理</el-menu-item>-->
<!--        </el-menu-item-group>-->
<!--      </el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
import { HappyScroll } from'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  name: "AsideFrame",
  props: {
    msg:String
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components:{
    'happy-scroll': HappyScroll
    //'happy-scroll': HappyScroll
  }
}
</script>
<style scoped>
.menu-root{
  position: fixed;
  top:60px;
  width: 18%;
  height:calc(100vh - 60px ) ;
  /*background-color: #42b983;*/
  overflow-y: auto;
}
</style>
