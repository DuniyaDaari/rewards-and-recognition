import cloneDeep from 'lodash/cloneDeep'

import * as actions from './actions'
import * as mutations from './mutations'

let defaultState = {
  userEmail: '',
  isUserDetailsLoading: true,
  appImages: {},
  pagesVisible: [],
  totalRewardPoints: 0
}

export function createModule () {
  return {
    state: cloneDeep(defaultState),
    actions,
    mutations,
    namespaced: true
  }
}
