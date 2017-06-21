import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import Test from './main'

const mapDispatchToProps = dispatch => ({
  initTestState: () => dispatch({ type: 'INIT_TEST_STATE' }),
  showModal: (payload) => dispatch({ type: 'SHOW_MODAL', payload }),
  getTest: (payload) => dispatch({ type: 'GET_TEST', payload }),
  goBack: () => dispatch({ type: 'GO_BACK' }),
  reveal: () => dispatch({ type: 'REVEAL' }),
  setStatus: (payload) => dispatch({ type: 'SET_STATUS', payload }),
  reset: (payload) => dispatch({ type: 'RESET_TEST', payload }),
  delete: (payload) => dispatch({ type: 'DELETE_TEST', payload })
})

const mapStateToProps = state => ({
  ...pick(['savedTests', 'ongoingTest', 'correct', 'incorrect', 'remaining',
    'listName', 'revealed', 'testWordsArray', 'testWordsCounter', 'listId', 'testIndex'], state.test)
})

export default connect(mapStateToProps, mapDispatchToProps)(Test)
