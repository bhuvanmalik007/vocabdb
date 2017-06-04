import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from '../connectors/Header'
import ReduxModal from '../connectors/reduxmodal'

export const CoreLayout = store => ({ children }) => (
  <div>
    {store.getState().core.authenticated && <AppHeader pathName={store.getState().location.pathName} />}
    <ReduxModal />
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
