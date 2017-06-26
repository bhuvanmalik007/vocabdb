import React from 'react'
import PT from 'prop-types'

const IdentityComponent = ({ fn, children, ...props }) => {
  if (!fn) return null
  const Component = fn
  if (children) {
    return <Component {...props}>{children}</Component>
  }
  return <Component {...props} />
}

IdentityComponent.propTypes = {
  fn: PT.func,
  children: PT.oneOfType([
    PT.element,
    PT.arrayOf(PT.element),
    PT.string
  ])
}

export default IdentityComponent
