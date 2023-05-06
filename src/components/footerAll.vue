<template>
  <div class='footer'>
    <!--        <span class="scroll"></span>-->
    <el-divider></el-divider>
    <span>法律声明</span>
    <el-divider direction="vertical"></el-divider>
    <span>友情链接</span>
    <el-divider direction="vertical"></el-divider>
    <span @click="drawer = true">联系我</span>
    <br/>
    <br/>
    <span class="copyright">版权所有 JEmbrace</span>
    <!--        <el-drawer-->
    <!--                title="联系我"-->
    <!--                :visible.sync="drawer"-->
    <!--                :direction="direction"-->
    <!--                :before-close="handleClose">-->
    <!--            <p class='info'>-->
    <!--                <i class="el-icon-phone"></i>电话：18822299999<br/>-->
    <!--                <i class="el-icon-message"></i>邮箱：18822299999@163.com<br/>-->
    <!--            </p>-->
    <!--        </el-drawer>-->
    <el-drawer
        title="联系我"
        :show-close="true"
        v-model:visible="drawer"
        :direction="direction"
        :before-close="handleClose">
      <p class='info'>
        <i class="el-icon-phone"></i>电话：18822299999<br/>
        <i class="el-icon-message"></i>邮箱：18822299999@163.com<br/>
      </p>
    </el-drawer>
  </div>
</template>
<style>

</style>
<style scoped>
.footer{
  height: 250px;
  text-align: center;
  font-size: 16px;
  padding: 0px 100px;
  position: relative;
  background-color: #baccd9;
}
.footer{
  cursor: pointer;
}
.copyright{
  font-size: 12px;
}
.info{
  font-size: 14px;
  color: #fafafa;
  line-height: 25px;
}
.footer .scroll{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border:1px solid #448aff;
  background-color: rgba(68,138,255,0.2);
  position: absolute;
  left: 5%;
  top: -25px;
  z-index: 10;
  animation: scrollA infinite 20s linear alternate;
}

</style>
<script>
export default {
  name: 'footerAll',
  data() {
    return {
      drawer: false,
      direction: 'btt'
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    getDate(){

    },

  }
}
</script>

