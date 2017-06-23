import React from 'react'
import Section from 'grommet/components/Section'
import styled from 'styled-components'
import Box from 'grommet/components/Box'
import Headline from 'grommet/components/Headline'
import PT from 'prop-types'

const NoPadSection = styled(Section)`
  background-color: ${props => props.color};
`

export const LandingSection = ({ children, heading, text, color, reverse }) =>
  <NoPadSection
    justify='center'
    color={color}
    align='center' full direction='row' pad={{ vertical: 'large' }} reverse={reverse}>
    <Box direction='column' alignContent='start' pad='large' basis='1/2'>
      <Headline size='medium' className='monserret'>{heading}</Headline>
      <Headline size='small' className='lato'>
        {text}
      </Headline>
    </Box>
    {children}
  </NoPadSection>

LandingSection.propTypes = {
  children: PT.element,
  heading: PT.string,
  text: PT.element,
  color: PT.string,
  reverse: PT.boolean
}
