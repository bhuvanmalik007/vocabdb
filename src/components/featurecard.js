/* eslint-disable react/prop-types */
import React from 'react'
import Headline from 'grommet/components/Headline'
import Tile from 'grommet/components/Tile'
import Paragraph from 'grommet/components/Paragraph'

export default props =>
  <Tile pad='medium' basis='1/3' colorIndex='light-1'>
    {props.icon}
    <Headline size='small' strong margin='medium'>
      {props.heading}
    </Headline>
    <Paragraph margin='none'>
      {props.para}
    </Paragraph>
  </Tile>
