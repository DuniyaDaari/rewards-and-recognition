import Vue from 'vue'

export function setUserEmail (state, email) {
  Vue.set(state, 'userEmail', email)
}

export function setAppImages (state, images) {
  // state.appImages = { ...images }
  Vue.set(state, 'appImages', images)
}

export function setIsUserDetailsLoading (state, isLoading) {
  // state.isUserDetailsLoading = isLoading
  Vue.set(state, 'isUserDetailsLoading', isLoading)
}

export function setUserDetails (state, details) {
  // state.userDetails = details
  Vue.set(state, 'userDetails', details)
}

export function setPagesVisible (state, pages) {
  // state.pagesVisible = [ ...pages ]
  Vue.set(state, 'pagesVisible', pages)
}

export function setTotalRewardPoints (state, totalRewardPoints) {
  Vue.set(state, 'totalRewardPoints', totalRewardPoints)
}
