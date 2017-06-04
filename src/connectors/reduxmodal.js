import React from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line
import { connect } from 'react-redux'
import AddList from '../connectors/addlist'
import SelectList from '../connectors/addwordlistselect'
import ListSettings from '../connectors/listsettings'

const modalContentMapper = {
  ADD_LIST: <AddList />,
  SELECT_LIST: <SelectList />,
  LIST_SETTINGS: <ListSettings />
}

const ReduxModal = ({ visibility, header, content, showModal }) =>
  <Modal
    open={visibility}
    size='small'
    header={header}
    content={modalContentMapper[content]}
    closeIcon='close'
    onClose={showModal}
  />

ReduxModal.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.string,
  header: PropTypes.string,
  showModal: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch({ type: 'SHOW_MODAL' })
})

const mapStateToProps = state => ({
  ...pick(['visibility', 'content', 'header'], state.reduxModal)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal)
