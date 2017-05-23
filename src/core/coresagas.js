import { call, put, takeLatest } from 'redux-saga/effects' //eslint-disable-line
import Request from '../futils/requestutil' //eslint-disable-line

export function* getMovieCrawls () {
  // yield put({ type: 'SHOWHIDELOADER', payload: true })
  // try {
  //   const crawls = yield call(Request, 'http://swapi.co/api/films/?format=json')
  //   yield put({ type: 'HOMEACTIONGOTMOVIES', payload: crawls.results.sort((a, b) => a.episode_id - b.episode_id) })
  //   yield put({ type: 'SHOWHIDELOADER', payload: false })
  // } catch (err) {
  //   yield put({ type: 'ERROROCCURED' })
  // }
}

export function* rootSaga () {
  // yield takeLatest('HOMEACTIONGETMOVIES', getMovieCrawls)
}

export default rootSaga
