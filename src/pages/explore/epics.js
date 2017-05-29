import { Observable } from 'rxjs/Observable' //eslint-disable-line
import IP from '../../futils/identitypromise'
import request, { withAuthuntication, withCatch } from '../../futils/requestutil'

const postWord = (wordObj, state) => {
  withCatch(state)(withAuthuntication(state)(
    request,
    'https://dbinterceptor-f.now.sh/addword/' + state.core.profile.identities[0].user_id,
    'POST',
    JSON.stringify(wordObj)))
  return IP(() => wordObj)
}

const fetchWord = (word, state) => {
  if (word.trim() === '') return IP(() => ({ words: [] }))
  return Observable.from(withCatch(state)(withAuthuntication(state)(
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
    fetchWord(action.payload, store.getState()))
  .flatMap((results) => ([loaded(), setResults(results)]))

const sendWord = (action$, store) =>
  action$.ofType('ADD_WORD')
  .mergeMap(action =>
    postWord(action.payload, store.getState()))
  .map((payload) => ({ type: 'SET_FLASHCARD', payload }))

export default [search, sendWord]
