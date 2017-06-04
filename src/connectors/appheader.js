import React from 'react'
import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Menu from 'grommet/components/Menu'
import Image from 'grommet/components/Image'
import PropTypes from 'prop-types'
import Logo from '../static/final.png'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import RCompose from '../futils/composer'
import { pick } from 'ramda'

const StyledImage = styled(Image)`
  width: 320px;
`

const AppHeader = ({ showLogin, authenticated, location }) =>
  <div>
    {authenticated && <Header justify='between' colorIndex='grey-1'>
      <Box size={{ width: { max: 'xxlarge' } }} direction='row'
        responsive={false} justify='start' align='center'
        pad={{ horizontal: 'medium' }} flex='grow'>
        <StyledImage src={Logo} size='medium' />
        <Menu label='Label' inline direction='row' flex='grow' align='end' justify='start'
          pad={{ horizontal: 'medium' }}>
          <Link to='myflashcards'>My Flashcards</Link>
          <Link>Add</Link>
          <Link to='explore'>Explore Words</Link>
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

export default RCompose(connect(mapStateToProps, mapDispatchToProps), withRouter)(AppHeader)
