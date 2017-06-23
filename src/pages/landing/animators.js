import React from 'react'
import Animate from 'grommet/components/Animate'
import PropTypes from 'prop-types'

export const StandardLandingAnimator = ({ component, style }) => {
  return <Animate enter={{ 'animation': style, 'duration': 1000, 'delay': 0 }}
    keep={false} visible='scroll'>
    {component}
  </Animate>
}

StandardLandingAnimator.propTypes = {
  component: PropTypes.element,
  style: PropTypes.string
}
