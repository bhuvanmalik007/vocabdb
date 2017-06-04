import React from 'react'
import PropTypes from 'prop-types'
import Anchor from 'grommet/components/Anchor'
import Card from 'grommet/components/Card'
import Hero from 'grommet/components/Hero'
import Heading from 'grommet/components/Heading'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'

const LandingHero = props =>
  <Hero size='large' background={<Image src={props.image} fit='cover' full />} >
    <Box align='end' pad='medium'>
      <Card colorIndex={props.cardColor}
        heading={
          <Heading strong>
            {props.heading}
          </Heading>
        }
        description={props.desc}
        label={props.label}
        size='large'
        link={
          <Anchor href='#' primary label={props.getStarted} />
        } />
    </Box>
  </Hero>

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
