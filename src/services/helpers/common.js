import { Register } from '../../di'

export const COMMON_SERVICE = Symbol('CommonService')

@Register(COMMON_SERVICE)
export default class CommonService {
  getId () {
    return '1'
  }
}
