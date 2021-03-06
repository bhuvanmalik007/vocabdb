import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pick } from 'ramda'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const NotificationWrapper = styled.div `
  background-color: ${props => props.danger ? '#FF8552' : '#85FFC7'};
  color: black;
  padding: 20px;
  position: absolute;
  top: 100px;
  right: 50px;
  z-index: 1000;
  cursor: pointer;
`

const Notification = props =>
  <ReactCSSTransitionGroup transitionName='notifier' transitionEnterTimeout={1500} transitionLeaveTimeout={1500}>
    {props.toasted &&
      <NotificationWrapper
        onClick={() => props.removeNotification()}
        danger={props.danger}
      >
        {props.content}
      </NotificationWrapper>
    }
  </ReactCSSTransitionGroup>

Notification.propTypes = {
  removeNotification: PropTypes.func,
  danger: PropTypes.bool,
  toasted: PropTypes.bool,
  content: PropTypes.string
}

const mapStateToProps = state => ({
  ...pick(['content', 'danger', 'toasted'], state.notify)
})

const mapDispatchToProps = d => ({
  removeNotification: () => d({ type: 'HIDETOAST' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
