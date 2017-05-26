import Reducer from '../../futils/reducecreator'

const actionHandlers = {
  INIT_STATE: (state, action) => Object.assign({}, state, {
    wordsArray: action.data,
    filteredArray: action.data,
    isLoading: false,
    total: action.data.length
  }),
  ADD_WORD: (state, action) => Object.assign({}, state, {
    wordsArray: [action.wordObj, ...state.wordsArray],
    total: state.total + 1
  }),
  DELETE_WORD: (state, action) => Object.assign({}, state, {
    wordsArray: state.wordsArray.filter(wordObj => wordObj._id !== action.id),
    filteredArray: state.filteredArray.filter(wordObj => wordObj._id !== action.id),
    total: state.total - 1
  }),
  FILTER_WORDS: (state, action) => Object.assign({}, state, {
    filteredArray: state.wordsArray.filter(element => element.word.search(action.searchString) > -1),
    searchString: action.searchString
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

export default Reducer({}, actionHandlers)
