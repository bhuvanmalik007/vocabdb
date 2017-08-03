import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'

export const StandardLandingAnimator = ({ component, animation }) =>
  <ScrollAnimation animateIn={animation} offset='1000'>
    {component}
  </ScrollAnimation>

StandardLandingAnimator.propTypes = {
  component: PropTypes.element,
  animation: PropTypes.string
}

export const StandardTestAnimator = ({ children }) =>
  <ScrollAnimation animateIn='slideInRight' offset='1000'>
    {children}
  </ScrollAnimation>

StandardTestAnimator.propTypes = {
  children: PropTypes.element
}
