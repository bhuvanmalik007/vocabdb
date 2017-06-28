import React from 'react'
import Animate from 'grommet/components/Animate'
import PropTypes from 'prop-types'

export const StandardLandingAnimator = ({ component, style }) =>
  <Animate
    enter={{ 'animation': style, 'duration': 1000, 'delay': 100 }}
    keep visible='scroll'>
    {component}
  </Animate>

StandardLandingAnimator.propTypes = {
  component: PropTypes.element,
  style: PropTypes.string
}

export const StandardTestAnimator = ({ children, style }) =>
  <Animate
    enter={{ 'animation': style, 'duration': 500, 'delay': 100 }}
    keep>
    {children}
  </Animate>

StandardTestAnimator.propTypes = {
  children: PropTypes.element,
  style: PropTypes.string
}
