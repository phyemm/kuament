/*
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\main.js
 * @Author: huangzq
 * @Date: 2020-09-18 16:59:52
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-18 17:10:48
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
