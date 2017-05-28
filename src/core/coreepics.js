import { Observable } from 'rxjs/Observable' //eslint-disable-line

const EpicCheck = action$ => action$.ofType('EPICCHECK').delay(3000).map(() => ({ type: 'EPICWORKING' }))

const goHome = action$ =>
  action$.ofType('AUTHENTICATED')
  .map(() => ({
    type: 'LOCATION_CHANGE',
    payload: '/myflashcards'
  }))

// const filterWords = action$ =>
//   action$.ofType('SET_FLASHCARD')
//   .map(() => ({ type: 'FILTER_WORDS' }))

export default [EpicCheck, goHome]
