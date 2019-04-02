import { Register } from '../../../di'
import axios from 'axios'

// import { mockTeamData } from './mockTeamData'

export const TEAM_DATA_SERVICE = Symbol('TeamDataService')

@Register(TEAM_DATA_SERVICE)
export default class TeamDataService {
  fetchTeamsDetails (teamId) {
    return axios.get(`http://localhost:8085/team/${teamId}`).then(({ data }) => data)
  }

  assignRewardToEmployee (pid, rewardId, teamId, nominatedBy, comments) {
    let dataToSend = {
      'employeePid': pid,
      'rewardId': rewardId,
      'teamId': teamId,
      'nominatedBy': nominatedBy,
      'comments': comments
    }
    let url = `http://localhost:8085/employee/${pid}/reward`
    return axios.post(url, dataToSend).then(({ data }) => data)
  }
}
