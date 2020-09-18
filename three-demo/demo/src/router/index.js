/*
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\router\index.js
 * @Author: huangzq
 * @Date: 2020-09-18 16:59:52
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-18 17:40:25
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/ground',
    name: 'ground',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Ground.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
