import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  INIT_TEST_STATE: (state, action) => Object.assign({}, state, {
    leftLoader: !state.ongoingTest
  }),
  SET_LISTS: (state, action) => Object.assign({}, state, {
    lists: action.payload.data
  }),
  SET_TESTS_LIST: (state, action) => Object.assign({}, state, {
    savedTests: action.payload.data,
    leftLoader: false
  }),
  CREATE_TEST: (state, action) => Object.assign({}, state, {
    savedTests: [state.lists[action.payload.index], ...state.savedTests]
  }),
  GET_TEST: (state, action) => Object.assign({}, state, {
    rightLoader: true,
    ongoingTest: true,
    testIndex: action.payload.index,
    listId: action.payload.listId,
    listName: state.savedTests[action.payload.index].listName
  }),
  START_TEST: (state, action) => Object.assign({}, state, {
    testWordsArray: action.payload.test.data.wordsToPlay,
    // listId: action.payload.listId,
    rightLoader: false
  }),
  GO_BACK: (state) => Object.assign({}, state, {
    ongoingTest: false
  }),
  REVEAL: (state) => Object.assign({}, state, {
    revealed: true
  }),
  SET_STATUS: (state, action) => Object.assign({}, state, {
    testWordsCounter: state.testWordsCounter + 1,
    savedTests: [...state.savedTests.slice(0, state.testIndex),
      Object.assign({}, state.savedTests[state.testIndex], {
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
  }),
  RESET_TEST: (state, action) => Object.assign({}, state, {
    testWordsCounter: 0,
    leftLoader: true,
    rightLoader: true,
    revealed: false
  }),
  RESET_STATS: (state, action) => Object.assign({}, state, {
    leftLoader: false,
    rightLoader: false,
    savedTests: [...state.savedTests.slice(0, state.testIndex),
      Object.assign({}, state.savedTests[state.testIndex], {
        incorrectWords: 0,
        correctWords: 0,
        wordsToPlay: action.payload
      }), ...state.savedTests.slice(state.testIndex + 1)]
  })
}

export default Reducer(initialState, actionHandlers)
