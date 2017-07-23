import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import PropTypes from 'prop-types'
import Title from 'grommet/components/Title'
import styled from 'styled-components'

const NotBlackHeader = styled(Header)`
  background-color: #000;
  position : absolute;
  z-index : 3;
  top : 0;
  left : 0;
  box-shadow : 0 1px 5px black;
`

const MontserretTitle = styled(Title)`
  font-size: 32px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
`
const SMenu = styled(Anchor)`
  color: #fff;
`
const LandingHeader = ({ showLogin, authenticated }) =>
  <div>
    {!authenticated && <NotBlackHeader justify='center'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center'
        pad={{ horizontal: 'medium' }} flex='grow'>
        <MontserretTitle>VocabDB</MontserretTitle>
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
          <SMenu onClick={() => showLogin()}>Sign in/Sign up</SMenu>
        </Menu>
      </Box>
    </NotBlackHeader>}
  </div>

LandingHeader.propTypes = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool
}

export default LandingHeader
