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

const VocabDBButton = styled(PrimaryButton)`
  width: 300px;
  background-color: #865cd6 !important;
  &:focus{
    background-color: #501eb4 !important;
  }
`

const UserInfoPanel = props =>
  <Panel
    isOpen={props.infoOpen}
    type={PanelType.smallFluid}
    onDismiss={() => props.closeInfo()}
  >
    <Box full justify='center' align='center'>
      <Persona
        imageUrl={props.profile.picture}
        size={PersonaSize.extraLarge}
      />
      <Heading>{props.profile.nickname}</Heading>
      <VocabDBButton
        text='Logout'
        onClick={() => props.logout()}
      />
    </Box>
  </Panel>

UserInfoPanel.propTypes = {
  infoOpen: PropTypes.bool,
  closeInfo: PropTypes.func,
  profile: PropTypes.obj,
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
