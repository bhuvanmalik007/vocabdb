import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  SET_LISTS: (state, action) => Object.assign({}, state, {
    lists: action.payload.data
  }),
  SET_TESTS_LIST: (state, action) => Object.assign({}, state, {
    savedTests: action.payload.data
  }),
  START_TEST: (state, action) => Object.assign({}, state, {
    ongoingTest: true,
    testWordsArray: action.payload.test.data.wordsToPlay,
    correct: action.payload.stats.correctWords,
    incorrect: action.payload.stats.incorrectWords,
    remaining: action.payload.stats.wordsToPlay,
    listName: action.payload.stats.listName
  }),
  GO_BACK: (state) => Object.assign({}, state, {
    ongoingTest: false
  }),
  REVEAL: (state) => Object.assign({}, state, {
    revealed: true
  })
}

export default Reducer(initialState, actionHandlers)
