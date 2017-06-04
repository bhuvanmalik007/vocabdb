import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Image from 'grommet/components/Image'
import PropTypes from 'prop-types'
import Logo from '../static/final.png'
import styled from 'styled-components'

const StyledImage = styled(Image)`
  width: 320px;
`

const LandingHeader = ({ showLogin, authenticated }) =>
  <div>
    {!authenticated && <Header justify='center' colorIndex='grey-1'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center'
        pad={{ horizontal: 'medium' }} flex='grow'>
        <StyledImage src={Logo} size='medium' />
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
          <Anchor onClick={() => showLogin()}>Get Started</Anchor>
        </Menu>
      </Box>
    </Header>}
  </div>

LandingHeader.propTypes = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool
}

export default LandingHeader
