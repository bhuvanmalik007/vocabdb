/* eslint-disable react/prop-types */
import React from 'react'
import Box from 'grommet/components/Box'

const mediumBoxer = Component => ({ children, ...props }) =>
  <Box pad='medium'>
    <Component {...props}>{children}</Component>
  </Box>

export default mediumBoxer
