import { Register } from '../../di'
import axios from 'axios'

import { mockRewardsDetails } from './mockRewardsDetails'

export const REWARDS_DETAILS_SERVICE = Symbol('RewardsDetailsService')

@Register(REWARDS_DETAILS_SERVICE)
export default class RewardsDetailsService {
  fetchRewardsDetails (pid) {
    return axios.get('http://localhost:8085/employee/' + pid + '/rewards').then(({ data }) => data)
    // return Promise.resolve(mockRewardsDetails)
  }
}
