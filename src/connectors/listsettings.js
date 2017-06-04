import ListSettingsForm from '../components/listSettingsForm'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line

const ListSettings = ({ currentListId, renameList, deleteList }) => {
  const submit = (formData) => {
    renameList(formData.listName, currentListId)
  }
  return (
    <ListSettingsForm onSubmit={submit} deleteList={deleteList} currentListId={currentListId} />
  )
}

ListSettings.propTypes = {
  currentListId: PropTypes.string,
  renameList: PropTypes.func,
  deleteList: PropTypes.func
}

const mapStateToProps = state => ({
  ...pick(['currentListId'], state.wordsState)
})

const mapDispatchToProps = (dispatch) => ({
  renameList: (newName, listId) => dispatch({ type: 'RENAME_LIST', payload: { newName, listId } }),
  deleteList: (payload) => dispatch({ type: 'DELETE_LIST', payload })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSettings)
