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
  color : #ccc;
`

const AppHeader = ({ showLogin, authenticated, location }) =>
  <div>
    {authenticated && <Header justify='between' colorIndex='grey-1'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center' alignSelf='center'
        pad={{ horizontal: 'medium', vertical:'small' }} flex='grow'>
        <Title className='lato-logo'>VocabDB</Title>
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='start'
          pad={{ horizontal: 'medium' }}>
          <Styledlink to='myflashcards' className='header-texts'>My Flashcards</Styledlink>
          <Styledlink to='explore' className='header-texts'>Explore Words</Styledlink>
          <Styledlink to='test' className='header-texts'>Test</Styledlink>
        </Menu>
      </Box>
      <Menu label='Label' inline direction='row' flex='grow' align='end' justify='end'
        pad={{ horizontal: 'medium' }}>
        <Anchor onClick={() => showLogin()}>Words Saved</Anchor>
      </Menu>
    </Header>}
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
