import container from '../../di'
import { USER_DETAILS_SERVICE } from '../../services/api/userDetails'

export async function getUserDetails ({ commit }) {
  commit('setIsUserDetailsLoading', true)

  let userDetailsService = container.get(USER_DETAILS_SERVICE)

  let userDetails = await userDetailsService.fetchUserDetails()
  let pagesVisible = await userDetailsService.getVisiblePages(userDetails)
  console.log(userDetails)

  commit('setUserDetails', userDetails)
  commit('setPagesVisible', pagesVisible)
  commit('setIsUserDetailsLoading', false)
}
