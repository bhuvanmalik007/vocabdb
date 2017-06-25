import { Observable } from 'rxjs/Observable' //eslint-disable-line
import request, { withAuthentication } from '../../futils/requestutil'
import { DBINTERCEPTOR_API } from '../../constants'

const getRequest = (urlPath, store) => {
  return Observable.from(
    withAuthentication(store.getState())(
      request,
      DBINTERCEPTOR_API + urlPath + store.getState().core.profile.identities[0].user_id,
      'GET'
    )
  )
}

const postRequest = (reqBody, urlPath, store) => {
  return Observable.from(
    withAuthentication(store.getState())(
      request,
      DBINTERCEPTOR_API + urlPath + store.getState().core.profile.identities[0].user_id,
      'POST',
      JSON.stringify(reqBody)
    )
  )
}

const initMapper = (action$, store) =>
  action$.ofType('INIT_TEST_STATE')
  .flatMap((action) => ([{ type: 'FETCH_TESTS' }, { type: 'FETCH_TEST_LISTS' }]))

const fetchLists = (action$, store) =>
  action$.ofType('FETCH_TEST_LISTS')
  .mergeMap(action =>
    getRequest('/unplayedgames/', store)
    .map((payload) => ({ type: 'SET_LISTS', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const fetchTests = (action$, store) =>
  action$.ofType('FETCH_TESTS')
  .mergeMap(action =>
    getRequest('/previousgames/', store)
    .map((payload) => ({ type: 'SET_TESTS_LIST', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const createTest = (action$, store) =>
  action$.ofType('CREATE_TEST')
    .flatMap((action) => [{ type: 'GET_TEST', payload: { index: 0, listId: action.payload.listId } },
    { type: 'SHOW_MODAL' }])

const startTest = (action$, store) =>
  action$.ofType('GET_TEST')
  .mergeMap(action =>
    postRequest({ listId: action.payload.listId }, '/getgame/', store)
    .flatMap((payload) => [{ type: 'START_TEST',
      payload: { index: action.payload.index, test: payload, listId: action.payload.listId } },
      { type: 'FETCH_TEST_LISTS' }])
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const setStatus = (action$, store) =>
  action$.ofType('SET_STATUS')
  .mergeMap(action =>
    postRequest({
      listId: store.getState().test.listId,
      status: action.payload.status,
      mindex: action.payload.wordObj.mindex
    }, '/setwordstatus/', store)
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const resetTest = (action$, store) =>
  action$.ofType('RESET_TEST')
  .mergeMap(action =>
    postRequest({ listId: action.payload }, '/refreshgame/', store)
    .flatMap((payload) => [{ type: 'START_TEST',
      payload: { index: store.getState().test.testIndex, test: payload, listId: store.getState().test.listId } },
    { type: 'RESET_STATS', payload: payload.data.wordsToPlay.length }])
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const deleteTest = (action$, store) =>
  action$.ofType('DELETE_TEST')
  .mergeMap(action =>
    postRequest({ listId: action.payload.listId }, '/deletegame/', store)
    .map((payload) => ({ type: 'FETCH_TEST_LISTS' }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

export default [initMapper, fetchLists, fetchTests, startTest, resetTest, createTest, deleteTest, setStatus]
