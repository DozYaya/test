/**
* 左边菜单
*/
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="@/assets/img/logo1.png" alt="logo">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
// import { menu } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: '视频讲座管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 2,
              icon: 'icon-cat-skuQuery',
              menuname: '视频讲座',
              hasThird: 'N',
              url: 'videoManage/video',
              menus: null
            },
            {
              menuid: 3,
              icon: 'icon-cat-skuQuery',
              menuname: '视频分类管理',
              hasThird: 'N',
              url: 'videoManage/videoClass',
              menus: null
            }
          ]
        },
        {
          menuid: 33,
          icon: 'li-icon-dingdanguanli',
          menuname: '心理测试管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 34,
              icon: 'icon-order-manage',
              menuname: '测试管理',
              hasThird: 'N',
              url: 'testManage/test',
              menus: null
            },
            {
              menuid: 35,
              icon: 'icon-order-manage',
              menuname: '测试题目管理',
              hasThird: 'N',
              url: 'testManage/questions',
              menus: null
            },
            {
              menuid: 36,
              icon: 'icon-order-manage',
              menuname: '测试分类管理',
              hasThird: 'N',
              url: 'testManage/testClass',
              menus: null
            },
            {
              menuid: 37,
              icon: 'icon-order-manage',
              menuname: '测试结果管理',
              hasThird: 'N',
              url: 'testManage/result',
              menus: null
            },
          ]
        },
        {
          menuid: 128,
          icon: 'li-icon-shangchengxitongtubiaozitihuayuanwenjian91',
          menuname: '心理文章管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 129,
              icon: 'icon-provider-manage',
              menuname: '文章管理',
              hasThird: 'N',
              url: 'assayManage/assay',
              menus: null
            },
            {
              menuid: 130,
              icon: 'icon-provider-manage',
              menuname: '文章分类管理',
              hasThird: 'N',
              url: 'assayManage/assayClass',
              menus: null
            },
            // {
            //   menuid: 175,
            //   icon: 'icon-provider-manage',
            //   menuname: '支付配置',
            //   hasThird: 'N',
            //   url: 'pay/Config',
            //   menus: null
            // }
          ]
        },
        {
          menuid: 71,
          icon: 'li-icon-xitongguanli',
          menuname: '系统管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 72,
              icon: 'icon-cus-manage',
              menuname: '用户管理',
              hasThird: 'N',
              url: 'system/user',
              menus: null
            },
            {
              menuid: 73,
              icon: 'icon-news-manage',
              menuname: '角色管理',
              hasThird: 'N',
              url: 'system/Role',
              menus: null
            },
            {
              menuid: 74,
              icon: 'icon-cms-manage',
              menuname: '权限管理',
              hasThird: 'N',
              url: 'system/Permission',
              menus: null
            },
            {
              menuid: 75,
              icon: 'icon-cms-manage',
              menuname: '登录日志',
              hasThird: 'N',
              url: 'system/loginLog',
              menus: null
            },
            {
              menuid: 76,
              icon: 'icon-cms-manage',
              menuname: '操作日志',
              hasThird: 'N',
              url: 'system/operateLog',
              menus: null
            },
            // {
            //   menuid: 77,
            //   icon: 'icon-cms-manage',
            //   menuname: '数据字典',
            //   hasThird: 'N',
            //   url: 'system/dataDictionary',
            //   menus: null
            // },
          ]
        },
      ],
      msg: 'success'
    }
          this.allmenu = res.data

    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    // 监听
    // this.$root.Bus.$on('toggle', value => {
    //   this.collapsed = !value
    // })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 60px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 60px;
}
</style>
