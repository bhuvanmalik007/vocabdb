import { Observable } from 'rxjs/Observable' //eslint-disable-line

const EpicCheck = action$ => action$.ofType('EPICCHECK').delay(3000).map(() => ({ type: 'EPICWORKING' }))

const goHome = action$ =>
  action$.ofType('AUTHENTICATED')
  .map(() => ({
    type: 'AUTHENTICATED',
    payload: '/myflashcards'
  }))

export default [EpicCheck, goHome]
