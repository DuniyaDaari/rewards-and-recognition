import container, { ROUTER, Register } from '../../di'

export const COMMON_SERVICE = Symbol('CommonService')

@Register(COMMON_SERVICE)
export default class CommonService {
  getPId () {
    let router = container.get(ROUTER)
    console.log(`router------>`)
    console.log(router.currentRoute.params.pid)
    return router.currentRoute.params.pid
  }
}
