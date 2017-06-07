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
  return Observable.from(
    (withAuthentication(store.getState())(
      request,
      'https://madoxford-f.now.sh/search/' + word,
      'GET'
    )).then(
      result => IP(() => Object.assign({},
        result, { words: result.words.map(x => ({ ...x, selected: false })) }
      )))
  )
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
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const sendWord = (action$, store) =>
  action$.ofType('SELECT_WORD')
  .mergeMap(action =>
    postWord({ ...action.payload, index:undefined }, store)
    .map((payload) => ({ type: 'SUCCESS' }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const addWordEpic = action$ =>
  action$.ofType('SELECT_WORD')
  .map(action => ({ type: 'ADD_WORD', payload: { ...action.payload, index:undefined } }))

export default [search, sendWord, addWordEpic]
