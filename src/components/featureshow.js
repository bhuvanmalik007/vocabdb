import React, { Component } from 'react';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';

export default props =>
  <Box pad="medium" basis="1/3">
    {props.icon}
    <Headline size="small" strong={true} margin="medium">
      {props.heading}
    </Headline>
    <Paragraph margin="none">
      {props.para}
    </Paragraph>
  </Box>
