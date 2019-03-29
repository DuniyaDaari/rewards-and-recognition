import { Register } from '../../../di'
// import axios from 'axios'

import { mockTeamsDetails } from './mockTeamsDetails'

export const TEAMS_DETAILS_SERVICE = Symbol('TeamDetailsService')

@Register(TEAMS_DETAILS_SERVICE)
export default class TeamsDetailsService {
  fetchTeamsDetails (pid) {
    // return axios.get('/rewards-and-recognition-rest/teams-details').then(({ data }) => data)
    console.log(pid)
    return Promise.resolve(mockTeamsDetails)
  }
}
