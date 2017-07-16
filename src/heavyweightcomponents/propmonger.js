/* eslint-disable react/prop-types */
import React from 'react'

const propMonger = ({ swallowProps = [] } = {}) => (WrappedComponent) => {
  const Wrapper = ({ children, ...props }) => {
    swallowProps.forEach(propName => {
      delete props[propName]
    })
    return <WrappedComponent {...props}>{children}</WrappedComponent>
  }
  return Wrapper
}

export default propMonger
