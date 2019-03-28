export function setAppImages (state, images) {
  state.appImages = { ...images }
}

export function setIsUserDetailsLoading (state, isLoading) {
  state.isUserDetailsLoading = isLoading
}

export function setUserDetails (state, userDetails) {
  state.userDetails = userDetails
}
