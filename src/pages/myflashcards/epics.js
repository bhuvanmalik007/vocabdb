import { Observable } from 'rxjs/Observable' //eslint-disable-line
import request, { withAuthentication } from '../../futils/requestutil'
import reduceToSenseIds from '../../futils/senseidreducer'

const fetchWords = store => {
  return Observable.from(
    withAuthentication(store.getState())(
      request,
      'https://dbinterceptor-f.now.sh/user/' + store.getState().core.profile.identities[0].user_id,
      'GET'
    )
  )
}

const fetchMyFlashcards = (action$, store) =>
  action$.ofType('INIT_MYFLASHCARDS')
  .mergeMap(action =>
    fetchWords(store)
    .map((payload) => ({ type: 'INIT_WORDS', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const deleteRequest = (sensesArray, store) => {
  return Observable.from(
    withAuthentication(store.getState())(
      request,
      'https://dbinterceptor-f.now.sh/deleteword/' + store.getState().core.profile.identities[0].user_id,
      'POST',
      JSON.stringify({ senseIds: sensesArray })
    )
  )
}

const deleteWords = (action$, store) =>
  action$.ofType('DELETE_WORDS')
  .mergeMap(action =>
    deleteRequest(action.payload, store)
    .map((payload) => ({ type: 'SUCCESS', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const multipleDeleteTransformer = (action$, store) =>
  action$.ofType('DELETE_MULTIPLE_TRANSFORM')
  .map((action) => ({
    type: 'DELETE_WORDS',
    payload: reduceToSenseIds(store.getState().wordsState.filteredArray)
  }))

export default [fetchMyFlashcards, deleteWords, multipleDeleteTransformer]
