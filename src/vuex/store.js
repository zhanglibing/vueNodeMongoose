import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
//获取session值
function getSessionByName(name) {
  var val = 0;
  if (sessionStorage[name] != "-1" && sessionStorage[name]) {
    val = JSON.parse(sessionStorage[name]);
  }
  return val;
}
//设置session值
function setSessionVal(name, val) {
  sessionStorage[name] = JSON.stringify(val);
}

//状态
const state = {
  authorizd: getSessionByName("jizhaoAuthorizd"),  //是否登录
  userinfo: getSessionByName("userinfo"),
  isShowMenu:false, //菜单栏是否显示
}

const mutations = {
  setAuthorizd(state, val){ //激活登录状态
    state.authorizd = val;
    setSessionVal("jizhaoAuthorizd", val);
  },
  setUserinfo(state, val){ //激活登录状态
    state.userinfo = val;
    setSessionVal("userinfo", val);
  },
  setIsShowMenu(state, val){
    state.isShowMenu = val;
  },
}

const getters = {}

const actions = {
  addAction(context){
    context.commit('add', 10)
  },
  reduceAction({commit}){
    commit('reduce')
  }
}

export default new Vuex.Store({
  state, mutations, getters, actions
})
