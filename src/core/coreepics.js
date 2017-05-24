import { Observable } from 'rxjs/Observable' //eslint-disable-line

const EpicCheck = action$ => action$.ofType('EPICCHECK').delay(3000).map(() => ({ type: 'EPICWORKING' }))

export default [EpicCheck]
