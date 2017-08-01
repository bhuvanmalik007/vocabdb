import React from 'react'
import PropTypes from 'prop-types'

export const StandardLandingAnimator = ({ component, style }) =>
  <div>
    {component}
  </div>

StandardLandingAnimator.propTypes = {
  component: PropTypes.element,
  style: PropTypes.string
}

export const StandardTestAnimator = ({ children, style }) =>
  <div>
    {children}
  </div>

StandardTestAnimator.propTypes = {
  children: PropTypes.element,
  style: PropTypes.string
}
