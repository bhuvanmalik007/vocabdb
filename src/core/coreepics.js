import { Observable } from 'rxjs/Observable' //eslint-disable-line

const goHome = action$ =>
  action$.ofType('AUTHENTICATED')
  .map(() => ({
    type: 'LOCATION_CHANGE',
    payload: '/myflashcards'
  }))

export default [goHome]
