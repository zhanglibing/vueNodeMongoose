import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import page from '@/views/page'
import user from '@/views/user/list'
import category from '@/views/category/list'
import addCategory from '@/views/category/add'


Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      component: resolve => require(['@/views/admin'], resolve),
      meta: {auth: true},
      children: [
        {
          path: '',
          name:'home',
          component: resolve => require(['@/views/home'], resolve)
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'category',
          component: page,
          children:[
            {
              path:'',
              component: category,
            },
            {
              path:'add',
              component: addCategory,
            },
          ]
        },
        {
          path: 'content',
          component: page,
          children:[
            {
              path:'',
              component: resolve => require(['@/views/content/list'], resolve),
            },
            {
              path:'add',
              component: resolve => require(['@/views/content/add'], resolve),
            },
          ]
        },

      ]
    },
    {path: '*', redirect: '/404'}
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

