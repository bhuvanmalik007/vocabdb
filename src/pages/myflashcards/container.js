import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import HomePage from './main'

const mapDispatchToProps = dispatch => ({
  initState: () => dispatch({ type: 'INIT_MYFLASHCARDS' }),
  filterWords: (payload) => dispatch({ type: 'FILTER_WORDS', payload })
})

const mapStateToProps = state => ({
  ...pick(['wordsArray', 'isLoading', 'multipleSelect', 'searchString', 'filteredArray'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
