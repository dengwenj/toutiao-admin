import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Index'
import Home from '@/views/home/Index'
import Layout from '@/views/layout/Index'

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
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
