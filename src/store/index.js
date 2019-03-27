import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { Action, Getter, Mutation, State, namespace } from 'vuex-class'

import { createModule as createRrCommonModule } from './rr-common'

export const RR_COMMON_MODULE = 'rrCommon'

export function createStore (vueInstance = Vue) {
  vueInstance.use(Vuex)

  let store = new Store({
    state: {},
    strict: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testing',
    modules: {
      [RR_COMMON_MODULE]: createRrCommonModule()
    }
  })

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept([
      './rr-common'
    ], () => {
      store.hotUpdate({
        modules: {
          [RR_COMMON_MODULE]: require('./rr-common').createModule()
        }
      })
    })
  }

  return store
}

export { Action, Getter, Mutation, State }

let { State: RrCommmonState, Action: RrCommmonAction, Mutation: RrCommmonMutation } = namespace(RR_COMMON_MODULE)
export { RrCommmonState, RrCommmonAction, RrCommmonMutation }
