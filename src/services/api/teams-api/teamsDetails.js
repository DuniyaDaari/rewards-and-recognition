import { Register } from '../../../di'
import axios from 'axios'

// import { mockTeamsDetails } from './mockTeamsDetails'

export const TEAMS_DETAILS_SERVICE = Symbol('TeamDetailsService')

@Register(TEAMS_DETAILS_SERVICE)
export default class TeamsDetailsService {
  fetchTeamsDetails (pid) {
    return axios.get(`http://localhost:8085/teams/${pid}`).then(({ data }) => data)
    // return Promise.resolve(mockTeamsDetails)
  }
}
