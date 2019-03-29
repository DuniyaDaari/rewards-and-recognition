import { Register } from '../../../di'
// import axios from 'axios'

import { mockTeamData } from './mockTeamData'

export const TEAM_DATA_SERVICE = Symbol('TeamDataService')

@Register(TEAM_DATA_SERVICE)
export default class TeamDataService {
  fetchTeamsDetails (pid, teamId) {
    // return axios.get('/rewards-and-recognition-rest/teams-details').then(({ data }) => data)
    console.log(pid, teamId)
    return Promise.resolve(mockTeamData)
  }
}
