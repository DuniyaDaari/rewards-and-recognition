import { Register } from '../../../di'
// import axios from 'axios'

import { mockRewardData } from './mockRewardData'

export const REWARD_DATA_SERVICE = Symbol('RewardDataService')

@Register(REWARD_DATA_SERVICE)
export default class RewardDataService {
  fetchRewards () {
    // return axios.get('/rewards').then(({ data }) => data)
    return Promise.resolve(mockRewardData)
  }
}
