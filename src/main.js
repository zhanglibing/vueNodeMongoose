// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require("es6-promise").polyfill();
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './vuex/store'

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

import './common/css/common.css';

import $ from 'jquery'

import {initGlobal} from './common/js/global'
initGlobal()


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MintUI)



// 全局判断登录访问权限
router.beforeEach((to, from, next) => {
      store.commit('setIsShowMenu',false);
      next()

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
