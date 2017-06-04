import React from 'react'
import PropTypes from 'prop-types'

export const CoreLayout = store => ({ children }) => (
  <div>
    {children}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
