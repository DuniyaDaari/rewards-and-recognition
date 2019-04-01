import container from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'

export async function getUserDetails ({ commit, state }) {
  commit('setIsUserDetailsLoading', true)

  let userDetailsService = container.get(USER_DETAILS_SERVICE)

  let userDetails = await userDetailsService.fetchUserDetails(state.userEmail)
  let pagesVisible = await userDetailsService.getVisiblePages(userDetails)

  commit('setUserDetails', userDetails)
  commit('setPagesVisible', pagesVisible)
  commit('setIsUserDetailsLoading', false)
}
