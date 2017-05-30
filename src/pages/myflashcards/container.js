import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import HomePage from './main'

const mapDispatchToProps = dispatch => ({
  initState: () => dispatch({ type: 'INIT_MYFLASHCARDS' }),
  filterWords: (payload) => dispatch({ type: 'FILTER_WORDS', payload }),
  deleteWords: (payload) => dispatch({ type: 'DELETE_WORDS', payload }),
  toggleMultipleSelect: () => dispatch({ type: 'TOGGLE_MULTIPLE_SELECT' }),
  select: (index) => dispatch({ type: 'SELECT', index }),
  transformToSenses: () => dispatch({ type: 'TRANSFORM_TO_SENSES' }),
  sort: () => dispatch({ type: 'SORT_WORDS' })
})

const mapStateToProps = state => ({
  ...pick(['wordsArray', 'isLoading', 'multipleSelect', 'searchString',
    'filteredArray', 'multipleSelect', 'sorted'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
