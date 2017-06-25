import React from 'react'
import PT from 'prop-types'

const IdentityComponent = ({ fn, children, ...props }) => {
  const Component = fn
  if (children) {
    return <Component {...props}>{children}</Component>
  }
  return <Component {...props} />
}

IdentityComponent.propTypes = {
  fn: PT.function,
  children: PT.element
}

export default IdentityComponent
