import Vue from 'vue'
import 'reflect-metadata'
import 'popper.js/dist/popper'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { registerConstantValue, ROUTER, STORE } from './di'
import { createStore } from './store'
import { createRouter } from './router'
import App from './App'

Vue.config.productionTip = false

let store = createStore(Vue)
registerConstantValue(STORE, store)

let router = createRouter(Vue)
registerConstantValue(ROUTER, router)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
