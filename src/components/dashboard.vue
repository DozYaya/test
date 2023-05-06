<!--这应该是设置右下角主界面样式-->
<template>
<div>
  <el-container>
<!--    <el-container>：外层容器。当子元素中包含<el-header>或<el-footer>时，内部子元素会垂直排列。针对其他元素，则会水平排列。-->
<!--      <el-header>：顶部栏容器。-->
<!--        <el-aside>：侧边栏容器。-->
<!--          <el-main>：内容区域容器。-->
<!--            <el-footer>：底部栏容器。-->

    <el-header>
      <topframe></topframe>
      <!--这是引入页面顶部导航栏-->
    </el-header>
<!--    <el-aside>-->
<!--      <aside-frame></aside-frame>-->
<!--    </el-aside>-->
    <el-main>
      <div class="router-center">
        <router-view/>
<!--        这句话引入右下页面，注释则不出现-->
<!--        在app.vue中出现过-->
<!--        在展示内容区域，用<router-view>占位，会自动在该区域展示组件内容:-->
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>

import topframe from './TopFrame'
import asideFrame from "@/components/AsideFrame";
export default {
  name: 'DashboardVue',
  components: {
    topframe,
    // eslint-disable-next-line vue/no-unused-components
    asideFrame
  },
  data(){
    return {
      isCollapse:false
    }
  },


}
</script>

<style scoped>
.router-center{

  width: 98%;
  height: calc(100vh - 138px);
  position: fixed;
  overflow-y:auto;
  /*background-color: white;*/
}
/*这是task.vue里面使用*/
.login-info li{
  display: inline-block;
  margin-right: 1vw;
}
::v-deep(.el-dropdown){
  color: #fff;
}
</style>
