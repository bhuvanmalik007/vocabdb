import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import Explore from './main'

const mapDispatchToProps = dispatch => ({
  updateSearchString: (payload) => dispatch({ type: 'UPDATE_GLOBAL_SEARCH_STRING', payload }),
  search: (payload) => dispatch({ type: 'SEARCH', payload }),
  setLoader: () => dispatch({ type: 'IS_LOADING', bool: true }),
  addWord: (payload) => dispatch({ type: 'ADD_WORD', payload })
  // filterWords: (searchString) => dispatch({ type: 'FILTER_WORDS', searchString })
})

const mapStateToProps = state => ({
  ...pick(['results', 'isLoading', 'searchString'], state.globalSearchState)
})

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
