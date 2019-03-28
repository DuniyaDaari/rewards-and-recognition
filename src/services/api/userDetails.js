import { Register } from '../../di'
// import axios from 'axios'

import { mockUserDetails } from './mockUserDetails'

export const USER_DETAILS_SERVICE = Symbol('UserDetailsService')

@Register(USER_DETAILS_SERVICE)
export default class UserDetailsService {
  fetchUserDetails () {
    // return axios.get('/rewards-and-recognition-rest/user-roles').then(({ data }) => data)
    return Promise.resolve(mockUserDetails)
  }

  async getVisiblePages (details) {
    let userDetails = details || await this.fetchUserDetails()
    let pagesVisible = []

    switch (userDetails.role) {
      case 'EMPLOYEE':
        pagesVisible = ['rewards']
        break

      case 'EMPLOYEE_MANAGER':
        pagesVisible = ['rewards', 'teams']
        break

      case 'EMPLOYEE_ADMIN':
        pagesVisible = ['rewards', 'admin']
        break

      case 'EMPLOYEE_MANAGER_ADMIN':
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
