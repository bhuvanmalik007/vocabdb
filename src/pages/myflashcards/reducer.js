import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  INIT_WORDS: (state, action) => Object.assign({}, state, {
    wordsArray: action.payload.data,
    filteredArray: [...action.payload.data],
    isLoading: false,
    total: action.payload.length
  }),
  INIT_LISTS: (state, action) => Object.assign({}, state, {
    lists: action.payload
  }),
  ADD_WORD: (state, action) => Object.assign({}, state, {
    wordsArray: [action.payload, ...state.wordsArray],
    total: state.total + 1
  }),
  DELETE_WORDS: (state, action) => Object.assign({}, state, {
    wordsArray: state.wordsArray.filter(wordObj => !action.payload.find(senseId => wordObj.word.id === senseId)),
    filteredArray: state.filteredArray.filter(wordObj => !action.payload.find(senseId => wordObj.word.id === senseId)),
    total: state.total - 1
  }),
  FILTER_WORDS: (state, action) => Object.assign({}, state, {
    filteredArray: state.wordsArray.filter(element => element.word.word.search(action.payload) > -1),
    searchString: action.payload
  }),
  SORT_WORDS: (state, action) => Object.assign({}, state, {
    filteredArray: state.sorted
      ? [...state.wordsArray.filter(element => element.word.word.search(state.searchString) > -1)]
      : [...state.filteredArray.sort((a, b) => a.word.word > b.word.word ? 1 : -1)],
    sorted: !state.sorted
  }),
  ADD_MULTIPLE_WORDS: (state, action) => Object.assign({}, state, {
    wordsArray: [...action.wordsArray, ...state.wordsArray],
    filteredArray: [...action.wordsArray, ...state.wordsArray],
    total: state.total + action.wordsArray.length
  }),
  TOGGLE_MULTIPLE_SELECT: (state) => Object.assign({}, state, {
    multipleSelect: !state.multipleSelect,
    filteredArray: state.filteredArray.map(wordObj => ({ ...wordObj, selected: false }))
  }),
  SELECT: (state, action) => Object.assign({}, state, {
    filteredArray: [...state.filteredArray.slice(0, action.index),
      { ...state.filteredArray[action.index],
        selected: state.filteredArray[action.index].hasOwnProperty('selected')
        ? !state.filteredArray[action.index].selected : true
      },
      ...state.filteredArray.slice(action.index + 1)]
  })

}

export default Reducer(initialState, actionHandlers)
