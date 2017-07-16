import { connect } from 'react-redux'
import { pick } from 'ramda'
import Explore from './main'

const mapDispatchToProps = dispatch => ({
  updateSearchString: (payload) => dispatch({ type: 'UPDATE_GLOBAL_SEARCH_STRING', payload }),
  search: (payload) => dispatch({ type: 'SEARCH', payload }),
  setLoader: () => dispatch({ type: 'IS_LOADING', bool: true }),
  addWord: (payload) => dispatch({ type: 'SELECT_WORD', payload })
})

const mapStateToProps = state => ({
  ...pick(['words', 'pronounciation', 'isLoading', 'searchString'], state.globalSearchState)
})

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
