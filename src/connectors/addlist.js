import AddListForm from '../components/addlistform'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pick } from 'ramda'
import { selectedCountReducer, reduceToSenseIds } from '../futils/selectionreducers'

const AddList = ({ createList, multipleSelect, filteredArray }) => {
  const submit = (formData) => {
    createList({ listName: formData.listName,
      wordIds: multipleSelect && selectedCountReducer(filteredArray) > 0 ? reduceToSenseIds(filteredArray) : [] })
  }
  return (
    <AddListForm onSubmit={submit} />
  )
}

AddList.propTypes = {
  createList: PropTypes.func,
  multipleSelect: PropTypes.bool,
  filteredArray: PropTypes.array
}

const mapStateToProps = state => ({
  ...pick(['multipleSelect', 'filteredArray'], state.wordsState)
})

const mapDispatchToProps = (dispatch) => ({
  createList: (payload) => dispatch({ type: 'CREATE_LIST', payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddList)
