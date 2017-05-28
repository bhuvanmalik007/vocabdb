import { Observable } from 'rxjs/Observable' //eslint-disable-line
import IP from '../../futils/identitypromise'

const postWord = (wordObj, state) => {
  fetch('https://dbinterceptor-f.now.sh/addword/' + state.core.profile.identities[0].user_id, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + state.core.idToken
    },
    body: JSON.stringify(wordObj)
  })
  .then(response => response.json())
  return IP(wordObj)
}

const fetchWord = (word, state) => {
  if (word.trim() === '') return IP({ words:[] })
  const request = fetch('https://madoxford-f.now.sh/search/' + word, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + state.core.idToken
    }
  })
    .then(response => response.json())
  return Observable.from(request)
}

const loaded = () => ({ type: 'IS_LOADING', bool: false })
const setResults = payload =>
 payload.words ? ({ type: 'SET_RESULTS', payload }) : ({ type: 'SET_RESULTS', payload:{ words:[] } })

const search = (action$, store) =>
  action$.ofType('SEARCH')
  .debounceTime(1000)
  .mergeMap(action =>
    fetchWord(action.payload, store.getState()))
  .flatMap((results) => ([loaded(), setResults(results)]))

const sendWord = (action$, store) =>
  action$.ofType('ADD_WORD')
  .mergeMap(action =>
    postWord(action.payload, store.getState()))
  .map((payload) => ({ type:'SET_FLASHCARD', payload }))

export default [search, sendWord]
