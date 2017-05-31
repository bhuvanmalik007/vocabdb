import React from 'react'
import PropTypes from 'prop-types'
import Anchor from 'grommet/components/Anchor'
import Card from 'grommet/components/Card'
import Hero from 'grommet/components/Hero'
import Heading from 'grommet/components/Heading'

const Header = props => <div>
  {
    props.authenticated && <Hero size='large' background={props.image} colorIndex={props.grommetColor} justify='end'>
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
    </Hero> || <div />
  }
</div>

Header.propTypes = {
  authenticated: PropTypes.bool,
  image: PropTypes.string,
  grommetColor: PropTypes.string,
  cardColor: PropTypes.string,
  heading: PropTypes.string,
  desc: PropTypes.string,
  label: PropTypes.string,
  getStarted: PropTypes.string
}

export default Header
