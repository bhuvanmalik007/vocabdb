import React from 'react'
import { pick } from 'ramda' //eslint-disable-line
import { connect } from 'react-redux'
import { Link } from 'react-router' //eslint-disable-line
import PropTypes from 'prop-types' //eslint-disable-line

export const AppHeader = props => (
  <div>Header Here</div>
)

AppHeader.propTypes = {
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(AppHeader)
