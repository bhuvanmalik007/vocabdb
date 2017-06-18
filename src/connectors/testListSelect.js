import TestListSelectForm from '../components/testlistselectform'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line

const TestListSelect = ({ lists, createTest }) => {
  const submit = (formData) => {
    createTest(formData.listId)
  }
  return (
    <TestListSelectForm onSubmit={submit} lists={lists} />
  )
}

TestListSelect.propTypes = {
  lists: PropTypes.array,
  createTest: PropTypes.func
}

const mapStateToProps = state => ({
  ...pick(['lists'], state.test)
})

const mapDispatchToProps = (dispatch) => ({
  createTest: (payload) => dispatch({ type: 'CREATE_TEST', payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestListSelect)
