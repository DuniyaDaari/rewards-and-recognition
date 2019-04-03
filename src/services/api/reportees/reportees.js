import { Register } from '../../../di'
// import axios from 'axios'

import { mockReportees } from './mockReportees'

export const REPORTEES_SERVICE = Symbol('ReporteesService')

@Register(REPORTEES_SERVICE)
export default class ReporteesService {
  mockReporteesList = mockReportees

  fetchReportees (pid) {
    let response = this.mockReporteesList[pid]
    return Promise.resolve(response)
  }
}
