import React, { Component } from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Card from 'grommet/components/Card'
import Hero from 'grommet/components/Hero'
import Heading from 'grommet/components/Heading'

export default props =>
   <Hero size='xlarge' backgroundImage={props.image} colorIndex={props.grommetColor} justify={props.justify}>
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
