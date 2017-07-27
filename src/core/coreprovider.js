import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-103446063-1')

const tracking = () => ReactGA.pageview(window.location.pathname)

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} onUpdate={tracking} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
