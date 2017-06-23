import React from 'react'
import styled from 'styled-components' //eslint-disable-line
import Button from 'grommet/components/Button'
import PT from 'prop-types'

export const TestButton = ({ text, color, onClick, accent, icon }) =>
  <Button icon={icon}
    label={text}
    onClick={() => onClick()}
    accent={accent}
    colorIndex={color}
  />

TestButton.propTypes = {
  text: PT.string,
  color: PT.string,
  onClick: PT.function,
  accent: PT.string,
  icon: PT.string
}
// <Button icon={<TrashIcon size='large' />}
// onClick={() => this.props.delete({ index, listId: test.listId })} />
