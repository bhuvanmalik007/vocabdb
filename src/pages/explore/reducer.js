import Reducer from '../../futils/reducecreator'
import initialState from './initialstate'

const actionHandlers = {
  SET_RESULTS: (state, action) => Object.assign({}, state, { results: action.payload }),
  UPDATE_GLOBAL_SEARCH_STRING: (state, action) =>
   Object.assign({}, state, { searchString: action.payload, isLoading: true }),
  IS_LOADING: (state, action) => Object.assign({}, state, { isLoading: action.bool })
}

export default Reducer(initialState, actionHandlers)
