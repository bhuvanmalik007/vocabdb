import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  INIT_TEST_STATE: (state, action) => Object.assign({}, state, {
    leftLoader: true
  }),
  SET_LISTS: (state, action) => Object.assign({}, state, {
    lists: action.payload.data
  }),
  SET_TESTS_LIST: (state, action) => Object.assign({}, state, {
    savedTests: action.payload.data,
    leftLoader: false
  }),
  CREATE_TEST: (state, action) => Object.assign({}, state, {
    savedTests: [action.payload, ...state.savedTests]
  }),
  START_TEST: (state, action) => Object.assign({}, state, {
    ongoingTest: true,
    testWordsArray: action.payload.test.data.wordsToPlay,
    testIndex: action.payload.index,
    listId: action.payload.listId
  }),
  GO_BACK: (state) => Object.assign({}, state, {
    ongoingTest: false
  }),
  REVEAL: (state) => Object.assign({}, state, {
    revealed: true
  }),
  SET_STATUS: (state, action) => Object.assign({}, state, {
    testWordsCounter: state.testWordsCounter + 1,
    savedTests: [...state.testWordsArray.slice(0, state.testIndex),
      Object.assign({}, state, {
        incorrectWords: action.payload.status === -1
        ? state.savedTests[state.testIndex].incorrectWords + 1 : state.savedTests[state.testIndex].incorrectWords,
        correctWords: action.payload.status === 1
        ? state.savedTests[state.testIndex].correctWords + 1 : state.savedTests[state.testIndex].correctWords,
        wordsToPlay: state.savedTests[state.testIndex].wordsToPlay - 1
      }), ...state.savedTests.slice(state.testIndex + 1)],
    revealed: false
  }),
  DELETE_TEST: (state, action) => Object.assign({}, state, {
    savedTests: [
      ...state.savedTests.slice(0, action.payload.index), ...state.savedTests.slice(action.payload.index + 1)
    ]
  })
}

export default Reducer(initialState, actionHandlers)
