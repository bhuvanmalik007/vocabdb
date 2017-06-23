import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Title from 'grommet/components/Title'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import composeR from 'compose-r'
import { pick } from 'ramda'
import styled from 'styled-components'

const Styledlink = styled(Link)`
  color : #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
`

const NotBlackHeader = styled(Header)`
  background-color: #2E294E;
`

const MontserretTitle = styled(Title)`
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
`

const AppHeader = ({ showLogin, authenticated, location }) =>
  <div>
    {authenticated && <NotBlackHeader justify='between' colorIndex='grey-1'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center' alignSelf='center'
        pad={{ horizontal: 'medium', vertical:'small' }} flex='grow'>
        <MontserretTitle>VocabDB</MontserretTitle>
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='start'
          pad={{ horizontal: 'medium' }}>
          <Styledlink to='myflashcards' className='montserret'>My Flashcards</Styledlink>
          <Styledlink to='explore' className='montserret'>Explore Words</Styledlink>
          <Styledlink to='test' className='montserret'>Test</Styledlink>
        </Menu>
      </Box>
      <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'
        pad={{ horizontal: 'medium' }}>
        <Anchor onClick={() => showLogin()}>Words Saved</Anchor>
      </Menu>
    </NotBlackHeader>}
  </div>

AppHeader.propTypes = {
  showLogin: PropTypes.func,
  authenticated: PropTypes.bool,
  location: PropTypes.object
}

const mapStateToProps = state => ({
  ...pick(['authenticated'], state.core)
})

const mapDispatchToProps = dispatch => ({
  routeTo: path => dispatch({ type: 'LOCATION_CHANGE', payload: path })
})

export default composeR(connect(mapStateToProps, mapDispatchToProps), withRouter)(AppHeader)
