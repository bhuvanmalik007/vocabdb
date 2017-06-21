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
    .map((payload) => ({ type: 'START_TEST',
      payload: { index: action.payload.index, test: payload, listId: action.payload.listId } }))

const startTest = (action$, store) =>
  action$.ofType('GET_TEST')
  .mergeMap(action =>
    postRequest({ listId: action.payload.listId }, '/getgame/', store)
    .map((payload) => ({ type: 'START_TEST',
      payload: { index: action.payload.index, test: payload, listId: action.payload.listId } }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

// const startTest = (action$, store) =>
//   action$.ofType('GET_TEST')
//   .mergeMap(action =>
//     postRequest({ listId: action.payload.listId }, '/getgame/', store)
//     .map((payload) => ({ type: 'START_TEST', payload: { stats: action.payload, test: payload } }))
//     .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
//   )

const resetTest = (action$, store) =>
  action$.ofType('RESET_TEST')
  .mergeMap(action =>
    postRequest({ listId: action.payload }, '/refreshgame/', store)
    .map((payload) => ({ type: 'START_TEST',
      payload: { index: store.getState().test.testIndex, test: payload, listId: store.getState().test.listId } }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

// const setStatus = (action$, store) =>
//   action$.ofType('SET_STATUS')
//   .mergeMap(action =>
//     postRequest({
//       listId: action.payload.wordObj.listId,
//       status: action.payload.wordObj.status,
//       mindex: action.payload.wordObj.mindex
//     }, '/setwordstatus/', store)
//     .map((payload) => ({ type: 'START_TEST', payload: { stats: action.payload, test: payload } }))
//     .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
//   )

export default [initMapper, fetchLists, fetchTests, startTest, resetTest, createTest]
