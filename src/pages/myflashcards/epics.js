import { Observable } from 'rxjs/Observable' //eslint-disable-line
import request, { withAuthuntication } from '../../futils/requestutil'

const fetchWords = store => {
  // const request = fetch('https://dbinterceptor-f.now.sh/user/' + state.core.profile.identities[0].user_id, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + state.core.idToken
  //   }
  // })
  // .then(response => response.json())
  return Observable.from(
      withAuthuntication(store.getState())(
      request,
      'https://dbinterceptor-f.now.sh/user/' + store.getState().core.profile.identities[0].user_id,
      'GET'
    )
  )
}

const fetchMyFlashcards = (action$, store) =>
  action$.ofType('INIT_MYFLASHCARDS')
  .mergeMap(action => fetchWords(store))
  .map((payload) => ({ type: 'INIT_WORDS', payload }))

export default [fetchMyFlashcards]
