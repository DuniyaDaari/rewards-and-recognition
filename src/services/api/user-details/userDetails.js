import { Register } from '../../../di'
import axios from 'axios'

// import { mockUserDetails } from './mockUserDetails'

export const USER_DETAILS_SERVICE = Symbol('UserDetailsService')

@Register(USER_DETAILS_SERVICE)
export default class UserDetailsService {
  fetchUserDetails (emailId) {
    return axios.get(`http://localhost:8085/user/${emailId}`).then(({ data }) => data)
    // return Promise.resolve(mockUserDetails)
  }

  async getVisiblePages (details) {
    let userDetails = details
    let pagesVisible = []

    switch (userDetails.role) {
      case 'EMPLOYEE':
        pagesVisible = ['rewards']
        break

      case 'MANAGER':
        pagesVisible = ['rewards', 'teams']
        break

      case 'ADMIN':
        pagesVisible = ['rewards', 'admin']
        break

      case 'ADMIN_MANAGER':
        pagesVisible = ['rewards', 'teams', 'admin']
        break

      default:
        pagesVisible = []
        break
    }

    return pagesVisible
  }

  async isUserAuthorized (pageName) {
    let pagesVisible = await this.getVisiblePages()
    return pagesVisible.includes(pageName)
  }
}
