import cloneDeep from 'lodash/cloneDeep'

import * as actions from './actions'
import * as mutations from './mutations'

let defaultState = {
  isUserDetailsLoading: true,
  appImages: {},
  pagesVisible: []
}

export function createModule () {
  return {
    state: cloneDeep(defaultState),
    actions,
    mutations,
    namespaced: true
  }
}
