// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
import axios from 'axios'

Vue.config.productionTip = false

// 替换vue本来的http模块
Vue.prototype.$http = axios

/* eslint-disable no-new */


var router = createRouter ();
export function createApp(){
  const app =new Vue({
    router,
    render: h => (App),
  })
  return {
    app,
    router
  }
}