import React, { Component } from 'react';
import Headline from 'grommet/components/Headline';
import Tile from 'grommet/components/Tile'
import Paragraph from 'grommet/components/Paragraph';

export default props =>
  <Tile pad="medium" basis="1/3" colorIndex='grey-2'>
    {props.icon}
    <Headline size="small" strong={true} margin="medium">
      {props.heading}
    </Headline>
    <Paragraph margin="none">
      {props.para}
    </Paragraph>
  </Tile>
