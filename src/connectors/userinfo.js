import React from 'react'
import PropTypes from 'prop-types'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { pick } from 'ramda'
import { connect } from 'react-redux'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import styled from 'styled-components'
import Anchor from 'grommet/components/Anchor'

const VocabDBButton = styled(PrimaryButton)`
  width: 300px;
  background-color: #865cd6 !important;
  &:focus{
    background-color: #501eb4 !important;
  }
`
const mail = () => window.open('mailTo:vocabdbedu@gmail.com', '_self')

const UserInfoPanel = props =>
  <Panel
    isOpen={props.infoOpen}
    type={PanelType.smallFluid}
    onDismiss={() => props.closeInfo()}
  >
    {props.profile && <Box full justify='center' align='center'>
      <Heading>Give us a shout, we'll be listening</Heading>
      <Heading tag='h3' margin='large'>Send us feedback at <Anchor
        onClick={mail}>vocabdbedu@gmail.com</Anchor></Heading>
      <Persona
        imageUrl={props.profile && props.profile.picture}
        size={PersonaSize.extraLarge}
      />
      <Heading>{props.profile.nickname}</Heading>
      <VocabDBButton
        text='Logout'
        onClick={() => props.logout()}
      />
    </Box>}
  </Panel>

UserInfoPanel.propTypes = {
  infoOpen: PropTypes.bool,
  closeInfo: PropTypes.func,
  profile: PropTypes.object,
  logout: PropTypes.func
}

const md2p = dispatch => ({
  closeInfo: () => dispatch({ type: 'CLOSEINFO' }),
  logout: () => {
    dispatch({ type: 'CLOSEINFO' })
    dispatch({ type: 'UNPROTECTED' })
  }
})

const ms2p = state => ({
  ...pick(['infoOpen'], state.userInfo),
  ...pick(['profile'], state.core)
})

export default connect(ms2p, md2p)(UserInfoPanel)
