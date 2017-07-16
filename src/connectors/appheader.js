import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Title from 'grommet/components/Title'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import composeR from '../futils/composer'
import { pick } from 'ramda'
import styled from 'styled-components'

const Styledlink = styled(Link)`
  color : #fff;
  font-size: 18px;
  &:hover{
    color: #d1d1d1
  }
`

const StyledUserInfo = styled(Anchor)`
  color : #fff !important;
  &:hover{
    color: #d1d1d1
  }
`

const NotBlackHeader = styled(Header)`
  background-color: #000;
`

const MontserretTitle = styled(Title)`
  font-size: 32px;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
`

const AppHeader = ({ showLogin, authenticated, profile, openInfo, location }) =>
  <div>
    {authenticated && <NotBlackHeader justify='between' colorIndex='grey-1'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center' alignSelf='center'
        pad={{ horizontal: 'medium', vertical:'small' }} flex='grow'>
        <MontserretTitle>VocabDB</MontserretTitle>
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='start'
          pad={{ horizontal: 'medium' }}>
          <Styledlink to='myflashcards'>My Flashcards</Styledlink>
          <Styledlink to='explore'>Explore Words</Styledlink>
          <Styledlink to='test'>Test</Styledlink>
        </Menu>
      </Box>
      <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'
        pad={{ horizontal: 'medium' }}>
        <StyledUserInfo onClick={() => openInfo()}>{profile.nickname}</StyledUserInfo>
      </Menu>
    </NotBlackHeader>}
  </div>

AppHeader.propTypes = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool,
  location: PropTypes.object,
  profile: PropTypes.object,
  openInfo: PropTypes.func
}

const mapStateToProps = state => ({
  ...pick(['authenticated', 'profile'], state.core)
})

const mapDispatchToProps = dispatch => ({
  routeTo: path => dispatch({ type: 'LOCATION_CHANGE', payload: path }),
  openInfo: () => dispatch({ type: 'OPENINFO' })
})

export default composeR(connect(mapStateToProps, mapDispatchToProps), withRouter)(AppHeader)
