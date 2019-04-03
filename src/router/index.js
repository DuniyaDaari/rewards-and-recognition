import Auth from '@okta/okta-vue'

import Vue from 'vue'
import Router from 'vue-router'
import Component from 'vue-class-component'

let AdminView = () => import('../views/admin')
let HomeView = () => import('../views/home')
let MyRewardsView = () => import('../views/my-rewards')
let MyTeamsView = () => import('../views/my-teams')
let TeamDataView = () => import('../views/team-data')
let RedeemPoints = () => import('../views/redeem-points')
let ConfigureRewards = () => import('../views/configure-rewards')
let ReporteesView = () => import('../views/reportees')

export function createRouter (vueInstance = Vue) {
  Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate'
  ])

  vueInstance.use(Auth, {
    issuer: 'https://dev-841967.okta.com/oauth2/default',
    client_id: '0oaejf7f3YM1av6DK356',
    redirect_uri: window.location.origin + '/implicit/callback',
    scope: 'openid email'
  })

  vueInstance.use(Router)

  let routes = [
    {
      path: '/',
      name: 'login'
    },
    {
      path: '/:pid',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
        title: 'Home'
      }
    },
    {
      path: '/:pid/my-rewards',
      name: 'rewards',
      component: MyRewardsView,
      meta: {
        requiresAuth: true,
        pageCategory: 'rewards',
        title: 'Home'
      }
    },
    {
      path: '/:pid/configure-rewards',
      name: 'configureRewards',
      component: ConfigureRewards,
      meta: {
        requiresAuth: true,
        pageCategory: 'admin',
        title: 'Home'
      }
    },
    {
      path: '/:pid/redeem-rewards',
      name: 'redeem',
      component: RedeemPoints,
      meta: {
        requiresAuth: true,
        pageCategory: 'rewards',
        title: 'Redeem Points'
      }
    },
    {
      path: '/:pid/my-teams',
      name: 'teams',
      component: MyTeamsView,
      meta: {
        requiresAuth: true,
        pageCategory: 'teams',
        title: 'Home'
      }
    },
    {
      path: '/:pid/my-reportees',
      name: 'reportees',
      component: ReporteesView,
      meta: {
        requiresAuth: true,
        pageCategory: 'reportees',
        title: 'Home'
      }
    },
    {
      path: '/:pid/team/:teamId',
      name: 'teamDetails',
      component: TeamDataView,
      meta: {
        requiresAuth: true,
        pageCategory: 'teams',
        title: 'Home'
      }
    },
    {
      path: '/:pid/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        requiresAuth: true,
        pageCategory: 'admin',
        title: 'Home'
      }
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
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

  router.beforeEach(vueInstance.prototype.$auth.authRedirectGuard())

  return router
}
