//该文件用于创建整个应用的路由器
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入组件，这里引入需要配置跳转路径的组件，这种组件也称为路由组件

Vue.use(VueRouter);//使用router插件

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
// //默认显示静态路由

const routes = [//配置路由规则
  {
    path: '/',
    redirect: '/dashboard/homepage'//重定向
  },
  {//登录
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login')//要跳转的组件
  },
  {//注册
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Login/Register')
  },
  {//忘记密码
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: () => import('../views/Login/ForgotPassword')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/dashboard'),
    // meta: {
    //   requiresAuth: true//校验是否需要登录
    // },
    children: [
      {
        path: 'homepage',//首页
        name: 'homepage',
        component: () => import('../views/HomePage/HomePage')
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('../components/operation')
      },

        //心理测试
      {
        path: 'psychologicalAssessment',
        name: 'psychologicalAssessment',
        component: () => import('../views/PsychologicalAssessment/psychologicalAssessment')
      },
      {
        path: 'psychoTest',
        name: 'psychoTest',
        component: () => import('../views/PsychologicalAssessment/clickTest/psychoTest')
      },
      {
        path: 'testReady',
        name: 'testReady',
        component: () => import('../views/PsychologicalAssessment/clickTest/testReady'),
      },
      {
        path: 'testResult',
        name: 'testResult',
        component: () => import('../views/PsychologicalAssessment/clickTest/testResult'),
      },
      {
        path: 'character',
        name: 'character',
        component: () => import('../views/PsychologicalAssessment/character')
      },
      {
        path: 'emotion',
        name: 'emotion',
        component: () => import('../views/PsychologicalAssessment/emotion')
      },
      {
        path: 'testAbility',
        name: 'testAbility',
        component: () => import('../views/PsychologicalAssessment/testAbility')
      },
      {
        path: 'testCareer',
        name: 'testCareer',
        component: () => import('../views/PsychologicalAssessment/testCareer')
      },
      {
        path: 'testHealth',
        name: 'testHealth',
        component: () => import('../views/PsychologicalAssessment/testHealth')
      },
      {
        path: 'testInterpersonal',
        name: 'testInterpersonal',
        component: () => import('../views/PsychologicalAssessment/testInterpersonal')
      },
      //视频讲座
      {
        path: 'videoPlay',
        name: 'videoPlay',
        component: () => import('@/views/VideoLecture/videoPlay/videoPlay')
      },
      {
        path: 'uploadVideo',
        name: 'uploadVideo',
        component: () => import('@/views/VideoLecture/videoAdd/uploadVideo')
      },
      {
        path: 'videoLecture',
        name: 'videoLecture',
        component: () => import('../views/VideoLecture/videoLecture')
      },
      {
        path: 'videoMain',
        name: 'videoMain',
        component: () => import('../views/VideoLecture/components/videoMain')
      },
      {
        path: 'career',
        name: 'career',
        component: () => import('../views/VideoLecture/career')
      },
      {
        path: 'growth',
        name: 'growth',
        component: () => import('../views/VideoLecture/growth')
      },
      {
        path: 'health',
        name: 'health',
        component: () => import('../views/VideoLecture/health')
      },
      {
        path: 'interpersonal',
        name: 'interpersonal',
        component: () => import('../views/VideoLecture/interpersonal')
      },
      {
        path: 'relation',
        name: 'relation',
        component: () => import('../views/VideoLecture/relation')
      },
      {
        path: 'science',
        name: 'science',
        component: () => import('../views/VideoLecture/science')
      },
      {
        path: 'sex',
        name: 'sex',
        component: () => import('../views/VideoLecture/sex')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/VideoLecture/components/video')
      },
        //个人中心
      {
        path: 'personData',
        name: 'personData',
        component: () => import('../views/Personal/personData'),
      },
      {
        path: 'updatePassword',
        name: 'updatePassword',
        component: () => import('../views/Personal/updatePassword')
      },
      //心理文章
      {
        path: 'psychologicalArticle',
        name: 'psychologicalArticle',
        component: () => import('../views/PsychologicalArticle/psychologicalArticle')
      },
      {
        path: 'humanRelations',
        name: 'humanRelations',
        component: () => import('../views/PsychologicalArticle/humanRelations')

      },
      {
        path: 'psychologyScience',
        name: 'psychologyScience',
        component: () => import('../views/PsychologicalArticle/psychologyScience')

      },
      {
        path: 'marriage',
        name: 'marriage',
        component: () => import('../views/PsychologicalArticle/marriage')

      },
      {
        path: 'growthLearning',
        name: 'growthLearning',
        component: () => import('../views/PsychologicalArticle/growthLearning')

      },
      {
        path: 'selfHealth',
        name: 'selfHealth',
        component: () => import('../views/PsychologicalArticle/selfHealth')

      },
      {
        path: 'careerSkills',
        name: 'careerSkills',
        component: () => import('../views/PsychologicalArticle/careerSkills')

      },
      {
        path: 'sexPsychology',
        name: 'sexPsychology',
        component: () => import('../views/PsychologicalArticle/sexPsychology')
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('../views/PsychologicalArticle/readAssay/article')
      },
      {
        path: 'newArticle',
        name: 'newArticle',
        component: () => import('../views/PsychologicalArticle/addArticle/newArticle')
      },
        //实训测试页面
      {
        path: 'excels',
        name: 'excels',
        component: () => import('../components/teaching/excels')
      },
      {
        path: 'excels2',
        name: 'excels2',
        component: () => import('../components/teaching/excels2')
      },
      {
        path: 'useExcels',
        name: 'useExcels',
        component: () => import('../views/teaching/useExcels')
      },
      //后台管理模拟页面
      // {
      //   path: 'user',
      //   name: 'user',
      //   component: () => import('../views/moni/user')
      // },
      // {
      //   path: 'role',
      //   name: 'role',
      //   component: () => import('../views/moni/Role')
      // },
      // {
      //   path: 'loginLog',
      //   name: 'loginLog',
      //   component: () => import('../views/moni/loginLog')
      // },
      // {
      //   path: 'operateLog',
      //   name: 'operateLog',
      //   component: () => import('../views/moni/operateLog')
      // },
      // {
      //   path: 'uploadMOCK',
      //   name: 'uploadMOCK',
      //   component: ()=> import('../views/moni/uploadMOCK')
      // },
      // {
      //   path: 'videoMock',
      //   name: 'videoMock',
      //   component: ()=> import('../views/moni/videoMOCK')
      // },
    ]
  },
  //后台管理系统迁移Router
  {
    path: '/index',
    name: '首页',
    component: () => import('../views/Manage/index'),
    iconCls: 'el-icon-tickets',
    children: [{
      path: '/videoManage/video',
      name: '视频管理',
      component: () => import('../views/Manage/videoManage/video'),
      meta: {
        requireAuth: true
      }
    },
      {
      path: '/videoManage/uploadVideo',
      name: '视频上传',
      component: () => import('../views/Manage/videoManage/videoAdd/uploadVideo'),
      meta: {
        requireAuth: true
      }
    },
      {
        path: '/videoManage/videoClass',
        name: '视频分类',
        component: () => import('../views/Manage/videoManage/videoClass'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/videoManage/videoPlay',
        name: '视频播放',
        component: () => import('../views/Manage/videoManage/videoPlay/videoPlay'),
        meta: {
          requireAuth: true
        }
      },

      {
        path: '/testManage/test',
        name: '心理测试管理',
        component: () => import('../views/Manage/testManage/test'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/testManage/testClass',
        name: '心理测试分类',
        component: () => import('../views/Manage/testManage/testClass'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/testManage/questions',
        name: '测试题目管理',
        component: () => import('../views/Manage/testManage/questions'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/testManage/result',
        name: '测试结果管理',
        component: () => import('../views/Manage/testManage/result'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/user',
        name: '用户管理',
        component: () => import('../views/Manage/system/user'),
        meta: {
          requireAuth: true
        }
      },

      {
        path: '/system/Role',
        name: '角色管理',
        component: () => import('../views/Manage/system/Role'),
        meta: {
          requireAuth: true
        }
      },

      {
        path: '/system/Permission',
        name: '权限管理',
        component: () => import('../views/Manage/system/Permission'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/operateLog',
        name: '操作日志',
        component: () => import('../views/Manage/system/operateLog'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/loginLog',
        name: '登录日志',
        component: () => import('../views/Manage/system/loginLog'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/system/dataDictionary',
        name: '数据字典',
        component: () => import('../views/Manage/system/dataDictionary'),
        meta: {
          requireAuth: true
        },
      },
      {
        path: '/assayManage/assay',
        name: '心理文章',
        component: () => import('../views/Manage/assayManage/assay'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/assayManage/assayAdd',
        name: '文章上传',
        component: () => import('../views/Manage/assayManage/addArticle/newArticle'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/assayManage/assayClass',
        name: '文章分类',
        component: () => import('../views/Manage/assayManage/assayClass'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/assayManage/article',
        name: '查看文章',
        component: () => import('@/views/Manage/assayManage/readAssay/article')
      }
    ]
  }
];


//创建一个路由器对象
const router = new VueRouter({
  //ConstRouterMap
  routes,//导入上方的路由规则
  mode: 'history'
});
//暴露路由器的对象
export default router;
