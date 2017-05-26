import React from 'react'
import { pick } from 'ramda' //eslint-disable-line
import { connect } from 'react-redux'
import { Link } from 'react-router' //eslint-disable-line
import PropTypes from 'prop-types' //eslint-disable-line
import { Menu, Segment, Statistic } from 'semantic-ui-react'

const AppHeader = props => (
  <div>
    <Segment inverted attached>
      <Menu inverted pointing secondary size='large' stackable>
        <Menu.Item header as='h3' className='animated zoomInDown'>Mission-Admission  🚀</Menu.Item>
        <Menu.Item name='My Flashcards' active={props.pathName==='/'} />
        <Menu.Item name='Add' active={props.pathName === '/add'} />
        <Menu.Item name='Explore Words' active={props.pathName==='/explore'} />
        <Menu.Item position='right'><Statistic inverted horizontal value={props.total}
          size='mini' color='green' label='words saved' /></Menu.Item>
        {/* <Statistic inverted horizontal value={this.props.total} size='mini' color='green' label='words saved' /> */}
      </Menu>
    </Segment>
    <br />
  </div>
)

AppHeader.propTypes = {}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(AppHeader)
