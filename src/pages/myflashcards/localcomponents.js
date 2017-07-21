import React from 'react'
import styled from 'styled-components'
import GrommetButton from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import mediumBoxer from '../../heavyweightcomponents/mediumboxer'
import propMonger from '../../heavyweightcomponents/propmonger'
import ComposeR from '../../futils/composer'
import Card from 'grommet/components/Card'
import Paragraph from 'grommet/components/Paragraph'
import Heading from 'grommet/components/Heading'

export const SharpButton = styled(GrommetButton)`
  border-radius: 0px;
  &:active{
    background-color : #865cd6;
    color : white;
  }
`

export const ShadowBox = styled(Box)`
  background-color: #ffffff;
  z-index: 3;
  width: 100%;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2);
  -webkit-box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.2);
`

export const LowPadButton = styled(GrommetButton)`
  border-radius: 0px;
  span {
    padding: 10px !important;
  }
`

export const DashButton = mediumBoxer(SharpButton)

export const IconButton = mediumBoxer(LowPadButton)

// Ignore Non Styled Components- Styled Components Syntax Highlighting
export const Hovercard = ComposeR(propMonger({ swallowProps: ['selecting'] }), styled)(Card)`
  transition : all 0.5s ease;
  &:hover {
   border: ${props => props.selecting ? `1px solid #865cd6` : `none`};
   transform: translateY(-2px);
   box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
   transition: transform .3s,-webkit-transform .3s;
  }
`

export const HelloCard = () =>
  <Box full justify='center' align='center'>
    <Hovercard
      textSize='small'
      colorIndex='light-1'
      margin='small'
      contentPad='medium'
      direction='column'>
      <Heading>
        Hey 👋
      </Heading>
      <Paragraph margin='small' size='large'>
        This is how your flashcards will look like.
      </Paragraph>
      <Paragraph margin='small' size='large'>
        Get started by going through some predefined lists prepared by experts or explore and save new words!
      </Paragraph>
      <Paragraph margin='small' size='medium'>
        Happy learning!
      </Paragraph>
    </Hovercard>
  </Box>
