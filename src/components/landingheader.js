import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import PropTypes from 'prop-types'
import Title from 'grommet/components/Title'
import styled from 'styled-components'

const LandingHeader = ({ showLogin, authenticated }) =>
  <div>
    {!authenticated && <RifleGreenHeader justify='center' colorIndex='#41463D'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center'
        pad={{ horizontal: 'medium' }} flex='grow'>
        <Title className='lato-logo'>VocabDB</Title>
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
          <Anchor onClick={() => showLogin()}>Get Started</Anchor>
        </Menu>
      </Box>
    </RifleGreenHeader>}
  </div>

LandingHeader.propTypes = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool
}

export default LandingHeader
