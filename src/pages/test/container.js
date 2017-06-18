import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import Test from './main'

const mapDispatchToProps = dispatch => ({
  initTestState: () => dispatch({ type: 'INIT_TEST_STATE' }),
  showModal: (payload) => dispatch({ type: 'SHOW_MODAL', payload }),
  getTest: (payload) => dispatch({ type: 'GET_TEST', payload }),
  goBack: () => dispatch({ type: 'GO_BACK' }),
  reveal: () => dispatch({ type: 'REVEAL' })
})

const mapStateToProps = state => ({
  ...pick(['savedTests', 'ongoingTest', 'correct', 'incorrect', 'remaining',
    'listName', 'revealed', 'testWordsArray', 'testWordsCounter'], state.test)
})

export default connect(mapStateToProps, mapDispatchToProps)(Test)
