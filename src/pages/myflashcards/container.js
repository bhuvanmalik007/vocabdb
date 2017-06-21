import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import HomePage from './main'

const mapDispatchToProps = dispatch => ({
  initState: () => dispatch({ type: 'INIT_STATE' }),
  filterWords: (payload) => dispatch({ type: 'FILTER_WORDS', payload }),
  deleteFromAll: (payload) => dispatch({ type: 'DELETE_FROM_ALL', payload }),
  deleteFromList: (payload) => dispatch({ type: 'DELETE_FROM_LIST', payload }),
  toggleMultipleSelect: () => dispatch({ type: 'TOGGLE_MULTIPLE_SELECT' }),
  select: (index) => dispatch({ type: 'SELECT', index }),
  sort: () => dispatch({ type: 'SORT_WORDS' }),
  onListChange: (payload) => dispatch({ type: 'FETCH_LIST_WORDS', payload }),
  fetchAll: () => dispatch({ type: 'FETCH_MYFLASHCARDS' }),
  showModal: (payload) => dispatch({ type: 'SHOW_MODAL', payload })
})

const mapStateToProps = state => ({
  ...pick(['wordsArray', 'isLoading', 'multipleSelect', 'searchString',
    'filteredArray', 'multipleSelect', 'sorted', 'lists', 'currentListId', 'currentListName'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
