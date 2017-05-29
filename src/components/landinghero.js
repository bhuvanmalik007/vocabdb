import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Card from 'grommet/components/Card'
import Hero from 'grommet/components/Hero'
import Heading from 'grommet/components/Heading'

export default props =>
  <Hero size='large' background={props.image} colorIndex={props.grommetColor} justify='end'>
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
  </Hero>
