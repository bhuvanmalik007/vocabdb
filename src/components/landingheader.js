import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Title from 'grommet/components/Title'
import PropTypes from 'prop-types'
import Pulse from 'grommet/components/icons/Pulse'
import { Image } from 'semantic-ui-react'

const LandingHeader = props =>
  <Header justify='center' colorIndex='grey-1'>
    <Box size={{ width: { max: 'xxlarge' } }} direction='row'
      responsive={false} justify='start' align='center'
      pad={{ horizontal: 'medium' }} flex='grow'>
      <Title>Mission Admission 🚀</Title>
      {!props.authenticated && <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
        <Anchor onClick={() => props.showLogin()}>Get Started</Anchor>
      </Menu>}
      {!!props.authenticated && <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'>
        <Anchor onClick={() => props.showLogin()}>Go to Dashboard, {props.profile.nickname}</Anchor>
        <Pulse icon={<Image src={props.profile.picture} avatar />} />
      </Menu>}
    </Box>
  </Header>

LandingHeader.props = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool,
  profile: PropTypes.object
}

export default LandingHeader
