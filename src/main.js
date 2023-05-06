import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import axios from 'axios';
import md5 from 'js-md5';
//引入组件实现富文本编辑框
import {mavonEditor} from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
//引入组件实现悬浮球
import {jvuewheel} from '@jyeontu/jvuewheel';
//引入样式
import '@jyeontu/jvuewheel/lib/jvuewhell.css';

import 'element-ui/lib/theme-chalk/index.css';

import uploader from 'vue-simple-uploader'


// import VideoPlayer from "vue-video-player";
// import 'vue-video-player/src/custom-theme.css' // 视频插件样式
// import 'video.js/dist/video-js.css' // 视频插件样式

// 填写preventReClick.js路径
import {preventReClick} from "@/views/Login/preventReClick";
// prototype
Vue.prototype.$preventReClick = preventReClick

Vue.prototype.$http = axios
Vue.prototype.$md5 = md5

// event Bus 用于无关系组件间的通信。
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false;

Vue.component("mavon-editor", mavonEditor);
// Vue.component('video-player',VueVideoPlayer)
// Vue.component("j-hover-btn", jvuewheel);
Vue.use(ElementUI,axios,jvuewheel,uploader);

// const whiteList = ['/login','/Register','/ForgotPassword','/dashboard/homepage','/dashboard/psychological_article']
const whiteList = ['/dashboard/article',
    '/dashboard/newArticle',
    '/dashboard/personData',
    '/dashboard/updatePassword',
    '/dashboard/user',
    '/dashboard/role',
    '/dashboard/loginLog',
    '/dashboard/operateLog',
    '/dashboard/uploadMOCK',
    '/dashboard/videoMock',
    '/dashboard/uploadVideo',
    '/dashboard/videoPlay',
    '/dashboard/testReady',
    '/dashboard/testResult',
    '/dashboard/psychoTest',
    '/videoManage/video',
    '/videoManage/videoClass',
    '/testManage/test',
    '/testManage/questions',
    '/testManage/testClass',
    '/testManage/result',
    '/assayManage/assay',
    '/assayManage/assayClass',
    '/system/user',
    '/system/Role',
    '/system/Permission',
    '/system/loginLog',
    '/system/operateLog',
]
//管理员专属路径
const manageList = ['/videoManage/video',
    '/videoManage/videoClass',
    '/testManage/test',
    '/testManage/questions',
    '/testManage/testClass',
    '/testManage/result',
    '/assayManage/assay',
    '/assayManage/assayClass',
    '/system/user',
    '/system/Role',
    '/system/Permission',
    '/system/loginLog',
    '/system/operateLog',
]
router.beforeEach(function (to,from,next){
    const hasToken = window.sessionStorage.getItem('Token')
    // console.log('hasToken',hasToken)
    if (to.path === '/login'){
        return next()
    }
    let isManager = store.state.data.isManager

    if (hasToken){
        if (isManager === true){
            // console.log(isManager)
            return next();
        } else {
            if (manageList.indexOf(to.path) !== -1){
                ElementUI.Message({
                    message: "您不是管理员，没有权限进入此页面",
                    type: 'warning'
                })
                return next(from.path)
            } else {
                // console.log(store.state.data.isManager)
                return next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1){
            // console.log('222')
            ElementUI.Message({
                message: "您还未登录，请登陆后再使用本功能",
                type: "info"
            })
            setTimeout(()=>{
                next('/login')
            },1000)
        } else {
            return next()
        }
    }
});
axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.token = store.state.token;
        // console.log('token:',store.state.token)
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);


new Vue({//使用router插件后，Vue对象中，就可以定义router属性了，然后把暴露出来的router对象传进去。
  router,
  store,
  render: h => h(App)
}).$mount('#app');


