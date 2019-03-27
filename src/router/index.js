import Vue from 'vue'
import Router from 'vue-router'
import Component from 'vue-class-component'

let AdminView = () => import('../views/admin')
let HomeView = () => import('../views/home')
let MyRewardsView = () => import('../views/my-rewards')
let MyTeamsView = () => import('../views/my-teams')

export function createRouter (vueInstance = Vue) {
  Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
  ])

  vueInstance.use(Router)

  let routes = [
    {
      path: '/:pid',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/:pid/my-rewards',
      name: 'rewards',
      component: MyRewardsView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/:pid/redeem-rewards',
      name: 'redeem',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/:pid/my-teams',
      name: 'teams',
      component: MyTeamsView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/:pid/team/:teamId',
      name: 'teamDetails',
      component: HomeView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/:pid/configure-rewards',
      name: 'admin',
      component: AdminView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '*',
      redirect: '/1234'
    }
  ]

  let router = new Router({
    mode: 'history',
    routes
  })

  return router
}
