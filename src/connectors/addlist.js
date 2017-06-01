import AddListForm from '../components/addlistform'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AddList = ({ createList }) => {
  const submit = (formData) => {
    createList(formData.listName)
  }
  return (
    <AddListForm onSubmit={submit} />
  )
}

AddList.propTypes = {
  createList: PropTypes.func
}

function mapStateToProps (state) {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  createList: (payload) => dispatch({ type: 'CREATE_LIST', payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList)
