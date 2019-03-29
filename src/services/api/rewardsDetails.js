import { Register } from '../../di'
// import axios from 'axios'

import { mockRewardsDetails } from './mockRewardsDetails'

export const REWARDS_DETAILS_SERVICE = Symbol('RewardsDetailsService')

@Register(REWARDS_DETAILS_SERVICE)
export default class RewardsDetailsService {
  fetchRewardsDetails () {
    // return axios.get('/rewards-and-recognition-rest/rewards-details').then(({ data }) => data)
    return Promise.resolve(mockRewardsDetails)
  }
}
