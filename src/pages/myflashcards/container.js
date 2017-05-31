import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import HomePage from './main'

const mapDispatchToProps = dispatch => ({
  initState: () => dispatch({ type: 'INIT_STATE' }),
  filterWords: (payload) => dispatch({ type: 'FILTER_WORDS', payload }),
  deleteWords: (payload) => dispatch({ type: 'DELETE_WORDS', payload }),
  toggleMultipleSelect: () => dispatch({ type: 'TOGGLE_MULTIPLE_SELECT' }),
  select: (index) => dispatch({ type: 'SELECT', index }),
  multipleDeleteTransformer: () => dispatch({ type: 'DELETE_MULTIPLE_TRANSFORM' }),
  sort: () => dispatch({ type: 'SORT_WORDS' }),
  onListChange: (payload) => dispatch({ type: 'FETCH_LIST_WORDS', payload }),
  fetchAll: () => dispatch({ type: 'FETCH_MYFLASHCARDS' })
})

const mapStateToProps = state => ({
  ...pick(['wordsArray', 'isLoading', 'multipleSelect', 'searchString',
    'filteredArray', 'multipleSelect', 'sorted', 'lists'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
