<!--不知道干啥用的-->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<style>
@import "css/global.css";
body,html{
  padding: 0;
  margin: 0;
  background-color: #FAFAFA;
  /*background-color: #c5d5d0;*/
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>
<script>
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function (){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
