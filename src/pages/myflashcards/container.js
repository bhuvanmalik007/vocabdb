import { connect } from 'react-redux'
import { pick } from 'ramda' //eslint-disable-line
import HomePage from './main'

const mapDispatchToProps = dispatch => ({
  // showLogin: () => dispatch(LockThunk()),
  // prepareLockAuth: () => dispatch(OnAuthFunction())
})

const mapStateToProps = state => ({
  // ...pick(['authenticated', 'profile'], state.core)
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
