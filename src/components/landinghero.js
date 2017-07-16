import React from 'react'
import PropTypes from 'prop-types'
import Card from 'grommet/components/Card'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import styled from 'styled-components'

const Scard = styled(Card)`
  box-shadow : 0 0 10px black;
`

const LandingHero = props =>
  <Box align='end' pad='large' className='wallpaper' full justify='center'>
    <Scard
      margin='large'
      colorIndex={props.cardColor}
      heading={
        <Heading strong>
          {props.heading}
        </Heading>
      }
      description={props.desc}
      label={props.label}
      size='large' />
  </Box>

LandingHero.propTypes = {
  authenticated: PropTypes.bool,
  image: PropTypes.string,
  grommetColor: PropTypes.string,
  cardColor: PropTypes.string,
  heading: PropTypes.string,
  desc: PropTypes.string,
  label: PropTypes.string,
  getStarted: PropTypes.string
}

export default LandingHero
