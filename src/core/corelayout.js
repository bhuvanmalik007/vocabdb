import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from '../connectors/appheader'
import ReduxModal from '../connectors/reduxmodal'
import Info from '../connectors/userinfo'
import Notifier from '../connectors/notifier'
import { withRouter } from 'react-router'
import styled from 'styled-components'

const HeightLimiter = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`

const CoreLayout = ({ children, location }) => (
  <HeightLimiter>
    <AppHeader />
    <ReduxModal />
    <Info />
    <Notifier />
    {children}
  </HeightLimiter>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
}

export default withRouter(CoreLayout)
