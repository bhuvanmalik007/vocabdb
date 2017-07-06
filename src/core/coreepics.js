import { Observable } from 'rxjs/Observable' //eslint-disable-line
import { browserHistory } from 'react-router'

const NotifierEpic = action$ =>
  action$.ofType('SHOWTOAST').delay(2500).mapTo({ type: 'HIDETOAST' })

const ApiErrorEpic = action$ =>
  action$.ofType('API_ERROR').map(action => {
    if (action.payload === 500) {
      return { type: 'SHOWTOAST', content: 'Something Went Wrong', danger: true }
    }

    if (action.payload === 403) {
      return { type: 'UNPROTECTED' }
    }

    return { type: 'UNIDENTIFIEDAPIERROR' }
  })

const UnprotectedEpic = action$ =>
  action$.ofType('UNPROTECTED').do(() => browserHistory.replace('/landing')).mapTo({ type: 'LOGGEDOUT' })

export default [NotifierEpic, ApiErrorEpic, UnprotectedEpic]
