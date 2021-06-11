import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Index'
import Home from '@/views/home/Index'
import Layout from '@/views/layout/Index'
import Article from '@/views/article/Index'
import Publish from '@/views/publish/Index'
import Image from "@/views/image/Index"
import Commnet from "@/views/comment/Index"
import Settings from "@/views/settings/Index"

Vue.use(VueRouter)

// 路由配置表
const routes = [{
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/',
  // 如果有默认子路由，就不要给父路由起名字了
  // name: 'layout',
  component: Layout,
  children: [{
    path: '', // 子路由 path为空的话 ，默认渲染这个路由  只能有一个
    name: 'home',
    component: Home
  }, {
    path: '/article',
    name: 'article',
    component: Article
  }, {
    path: '/publish',
    name: 'publish',
    component: Publish
  }, {
    path: '/image',
    name: 'image',
    component: Image
  }, {
    path: '/comment',
    name: 'comment',
    component: Commnet
  }, {
    path: '/settings',
    name: 'settings',
    component: Settings
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 通过导航守卫判断页面访问权限
// to：要去的路由信息
// from:从哪里来的路由信息
// next：放行方法
// 所有的页面导航都要经过这里
router.beforeEach((to, from, next) => {
  // 判断登录 如果是 /login 就放行 如果不是 /login 判断如果登录过了就放行 没登录就回到登录页面
  const user = JSON.parse(window.localStorage.getItem('user'))
    // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      //  登录过了 允许通过
      next()
    } else {
      // 没登录就回到登录页面
      next('/login')
    }
  } else {
    // 是登录页面就放行
    next()
  }
})

export default router