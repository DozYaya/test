<template>
  <div>
    <el-container>
      <el-header>

      </el-header>
      <el-main>
        <div class="router-center">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "login_dashboard",
  data(){
    return {
      isCollapsed: false
    }
  }
}
</script>

<style scoped>
.router-center{
  width: calc(100vw - 276px);
  /*border:1px solid #83c0fe;*/
  height: calc(100vh - 138px);
  position: fixed;
  top:80px;
  left: 220px;
  padding: 18px;
  overflow-y:auto;
  box-shadow: 0 0 5px #ccc;
}
</style>
