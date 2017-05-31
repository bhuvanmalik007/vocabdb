import { Observable } from 'rxjs/Observable' //eslint-disable-line
import IP from '../../futils/identitypromise'
import request, { withAuthentication } from '../../futils/requestutil'

const postWord = (wordObj, store) => {
  return Observable.from(withAuthentication(store.getState())(
    request,
    'https://dbinterceptor-f.now.sh/addword/' + store.getState().core.profile.identities[0].user_id,
    'POST',
    JSON.stringify(wordObj)))
}

const fetchWord = (word, store) => {
  if (word.trim() === '') return Observable.from(IP(() => ({ words: [] })))
  return Observable.from((withAuthentication(store.getState())(
    request,
    'https://madoxford-f.now.sh/search/' + word,
    'GET'
  )))
}

const loaded = () => ({ type: 'IS_LOADING', bool: false })
const setResults = payload => payload.words
? ({ type: 'SET_RESULTS', payload })
: ({ type: 'SET_RESULTS', payload: { words: [] } })

const search = (action$, store) =>
  action$.ofType('SEARCH')
  .debounceTime(1000)
  .mergeMap(action =>
    fetchWord(action.payload, store)
    .flatMap((results) => ([loaded(), setResults(results)]))
    .catch(payload => Observable.of({ type:'API_ERROR', payload }))
  )

const sendWord = (action$, store) =>
  action$.ofType('ADD_WORD')
  .mergeMap(action =>
    postWord(action.payload, store)
    .map((payload) => ({ type: 'SUCCESS' }))
    .catch(payload => Observable.of({ type:'API_ERROR', payload }))
  )

export default [search, sendWord]
