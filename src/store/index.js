import Vue from 'vue';
import Vuex from 'vuex';
import {fastKey} from "core-js/internals/internal-metadata";
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {//属性
    token: '',
    data: {
      id: '',//用户id
      username: '',//用户名
      phone: '',//手机号码
      age: '',//年龄
      sex: '',//性别
      roles: [],//拥有角色
      isManager: false,//是否为管理员
    },
    power: [],//拥有权限
    buttonPower: [],//按钮权限
    password: '',
  },
  getters: {//加工state
    showToken(state){
      return state.data.token;
    },
    showData(state){
      return state.data;
    },
    showPhone(state){
      return state.data.phone
    },
    showUsername(state){
      return state.data.username
    },
    showAge(state){
      return state.data.age
    },
    showSex(state){
      return state.data.sex
    },
    showRoles(state){
      let role = ''
      for (let i in state.data.roles){
        if (i > 0){
          role += '，'
        }
        role += state.data.roles[i].name
        // return state.data.roles[i].name
      }
      return role
    }
  },
  mutations: {//更改state
    update(state,data){
      state.token = data.data.token;
      // state.data.username = data.username;
      // state.data.phone = data.phone;
      // state.data.age = data.age;
      // state.data.sex = data.sex;
      state.data = data.data;
      state.power = data.data.permissions
      state.power.forEach(function (item,index){
        item.path = "/dashboard"+item.path;
      })
      state.buttonPower = data.data.childButtons
    },
    logout(state){
      state.token = null;
      state.data.id = null;
      state.data.username = null;
      state.data.phone = null;
      state.data.age = null;
      state.data.sex = null;
      sessionStorage.setItem('keepStore',null)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    persistedState({
      key: 'keepStore',
      storage: window.sessionStorage,
      // reducer(state){
      //   return{
      //     stateData:state
      //   }
      // }
    })
  ]
});
