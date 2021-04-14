/*
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\router\index.js
 * @Author: huangzq
 * @Date: 2020-09-18 16:59:52
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-28 10:46:46
 */
/*
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\router\index.js
 * @Author: huangzq
 * @Date: 2020-09-18 16:59:52
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-21 16:55:13
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
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
  },
  {
    path: '/line',
    name: 'line',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/line.vue')
  },
  {
    path: '/earth',
    name: 'earth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Earth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
