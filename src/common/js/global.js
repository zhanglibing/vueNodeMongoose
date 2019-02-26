import Vue from 'vue'
import {axios,apiHost} from '../../api/Ajax'
import api from '../../api/index'

function initGlobal() {

//全局title
  Vue.directive('title', {
    inserted: (el, binding) => {
      document.title = el.innerText;
      $(el).css({display: 'none'});
    },
    update: (el, binding) => {//组件更新后重新赋值
      document.title = el.innerText;
    },
  })

  Vue.prototype.$http = axios;
  Vue.prototype.api = api;
  window.apiHost = apiHost;
  //视屏服务器路劲
  Vue.prototype.VideoPre='http://www.jizhaojk.com/video/';
}

export {
  initGlobal
}
