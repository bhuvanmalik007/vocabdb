import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from '../connectors/appheader'
import ReduxModal from '../connectors/reduxmodal'
import Notifier from '../connectors/notifier'
import { withRouter } from 'react-router'

const CoreLayout = ({ children, location }) => (
  <div>
    <AppHeader />
    <ReduxModal />
    <Notifier />
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
}

export default withRouter(CoreLayout)
