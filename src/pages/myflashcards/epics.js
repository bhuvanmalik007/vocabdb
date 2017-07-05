import { Observable } from 'rxjs/Observable' //eslint-disable-line
import request, { withAuthentication } from '../../futils/requestutil'
import { reduceToSenseIds } from '../../utils/selectionreducers'
import { DBINTERCEPTOR_API } from '../../constants'

const getRequest = (urlPath, store) => Observable.from(
    withAuthentication(store.getState())(
      request,
      DBINTERCEPTOR_API + urlPath + store.getState().core.profile.identities[0].user_id,
      'GET'
    )
  )

const postRequest = (reqBody, urlPath, store) => Observable.from(
    withAuthentication(store.getState())(
      request,
      DBINTERCEPTOR_API + urlPath + store.getState().core.profile.identities[0].user_id,
      'POST',
      JSON.stringify(reqBody)
    )
  )

const initMapper = (action$, store) =>
  action$.ofType('INIT_STATE')
  .flatMap((action) => ([{ type: 'FETCH_MYFLASHCARDS' }, { type: 'FETCH_LISTS' }]))

const fetchMyFlashcards = (action$, store) =>
  action$.ofType('FETCH_MYFLASHCARDS')
  .mergeMap(action =>
    getRequest('/user/', store)
    .map((payload) => ({ type: 'INIT_WORDS', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload: payload.status }))
  )

const fetchMyLists = (action$, store) =>
  action$.ofType('FETCH_LISTS')
  .mergeMap(action =>
    getRequest('/lists/', store)
    .map((lists) => ({ type: 'INIT_LISTS', payload: [{ listId: 'all', listName: 'ALL' }, ...lists.data] }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const deleteWords = (action$, store) =>
  action$.ofType('DELETE_WORDS')
  .mergeMap(action =>
    postRequest(action.payload.requestObj, action.payload.route, store)
    .map((payload) => ({ type: 'TOGGLE_MULTIPLE_SELECT', payload: true }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const deleteFromAll = (action$, store) =>
  action$.ofType('DELETE_FROM_ALL')
  .map((action) => ({ type: 'DELETE_WORDS', payload: { route: '/deleteword/', requestObj: action.payload } }))

const deleteFromList = (action$, store) =>
  action$.ofType('DELETE_FROM_LIST')
  .map((action) => ({ type: 'DELETE_WORDS', payload: { route: '/deletelistwords/', requestObj: action.payload } }))

const fetchMyListWords = (action$, store) =>
  action$.ofType('FETCH_LIST_WORDS')
  .mergeMap(action =>
    postRequest({ listId: action.payload.listId }, '/getlistwords/', store)
    .map((payload) => ({ type: 'INIT_WORDS', payload }))
    .catch(payload => Observable.of({ type: 'API_ERROR', payload }))
  )

const createList = (action$, store) =>
  action$.ofType('CREATE_LIST')
  .mergeMap(action =>
    postRequest(action.payload, '/addlist/', store)
    .flatMap(({ id }) => [{ type: 'ADD_LIST', payload: { listId: id, listName: action.payload.listName } },
      { type: 'SHOW_MODAL' }, { type: 'TOGGLE_MULTIPLE_SELECT', payload: true },
      { type: 'SHOWTOAST', content: 'List successfuly created!' }
    ])
    .catch(payload => Observable.of({ type: 'API_ERROR' }))
  )

const addWordsToList = (action$, store) =>
  action$.ofType('ADD_WORDS_TO_LIST')
  .mergeMap(action =>
    postRequest({
      listId: action.payload,
      wordIds: reduceToSenseIds(store.getState().wordsState.filteredArray)
    }, '/addlist/', store)
    .flatMap((payload) => [{ type: 'SHOW_MODAL' }, { type: 'TOGGLE_MULTIPLE_SELECT', payload: true },
  { type: 'SHOWTOAST', content: 'Words successfuly added to list!' }])
    .catch(payload => Observable.of({ type: 'API_ERROR' }))
  )

const renameList = (action$, store) =>
  action$.ofType('RENAME_LIST')
  .mergeMap(action =>
    postRequest(action.payload, '/renamelist/', store)
    .flatMap((payload) => [{ type: 'SHOW_MODAL' }, { type: 'SHOWTOAST', content: 'List successfuly renamed!' }])
    .catch(payload => Observable.of({ type: 'API_ERROR' }))
  )

const deleteList = (action$, store) =>
  action$.ofType('DELETE_LIST')
  .mergeMap(action =>
    postRequest({ listIds: [action.payload] }, '/deletelist/', store)
    .flatMap((payload) => [{ type: 'SHOW_MODAL' }, { type: 'FETCH_MYFLASHCARDS' },
  { type: 'SHOWTOAST', content: 'List successfuly deleted!' }])
    .catch(payload => Observable.of({ type: 'API_ERROR' }))
  )

export default [initMapper, fetchMyFlashcards, fetchMyLists, deleteWords,
  fetchMyListWords, createList, addWordsToList,
  renameList, deleteList, deleteFromList, deleteFromAll
]
