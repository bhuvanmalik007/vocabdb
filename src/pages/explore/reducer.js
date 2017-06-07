import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  SET_RESULTS: (state, action) => Object.assign({}, state,
    { words: action.payload.words, pronounciation: action.payload.pronounciation }),
  UPDATE_GLOBAL_SEARCH_STRING: (state, action) =>
    Object.assign({}, state, { searchString: action.payload, isLoading: true }),
  IS_LOADING: (state, action) => Object.assign({}, state, { isLoading: action.bool }),
  SELECT_WORD: (s, a) => Object.assign({}, s, { words: [
    ...s.words.slice(0, a.index),
    { ...s.words[a.index], selected: true },
    ...s.words.slice(a.index)
  ] })
}

export default Reducer(initialState, actionHandlers)
