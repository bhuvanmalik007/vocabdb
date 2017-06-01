import SelectListForm from '../components/selectListForm'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line

const AddList = ({ lists }) => {
  const submit = (formData) => {
    console.log(formData)
  }
  return (
    <SelectListForm onSubmit={submit} lists={lists} />
  )
}

AddList.propTypes = {
  lists: PropTypes.array
}

const mapStateToProps = state => ({
  ...pick(['lists'], state.wordsState)
})

const mapDispatchToProps = (dispatch) => ({
  createList: (payload) => dispatch({ type: 'CREATE_LIST', payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList)
