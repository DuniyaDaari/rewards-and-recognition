import Vue from 'vue'
import Router from 'vue-router'
import Component from 'vue-class-component'

let HomeView = () => import('../views/home')

export function createRouter (vueInstance = Vue) {
  Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
  ])

  vueInstance.use(Router)

  let routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]

  let router = new Router({
    mode: 'history',
    routes
  })

  return router
}
