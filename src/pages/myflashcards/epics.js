import { Observable } from 'rxjs/Observable' //eslint-disable-line

const fetchWords = state => {
  const request = fetch('https://dbinterceptor-f.now.sh/user/' + state.core.profile.identities[0].user_id, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + state.core.idToken
    }
  })
  .then(response => response.json())
  return Observable.from(request)
}

const fetchMyFlashcards = (action$, store) =>
  action$.ofType('INIT_MYFLASHCARDS')
  .mergeMap(action => fetchWords(store.getState()))
  .map((payload) => ({ type: 'INIT_WORDS', payload }))

export default [fetchMyFlashcards]
