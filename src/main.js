// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import store from './store/store'
import {Button} from 'mint-ui' 
import '../static/mock/mock.js'
Vue.config.productionTip = false
Vue.component(Button.name, Button) // 引入 mint-ui 中的button 组件， 使用方式为 <mt-button> 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
