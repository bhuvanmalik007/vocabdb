import React, { Component } from 'react'
import Anchor from 'grommet/components/Anchor'
import Card from 'grommet/components/Card'
import Paragraph from 'grommet/components/Paragraph'

export default props =>
  <Card
    textSize='small'
    colorIndex='grey-2'
    margin='small'
    contentPad='medium'
    direction='column'
    heading={props.heading}>
    <Paragraph margin='small'>
      {props.para}
    </Paragraph>
  </Card>
