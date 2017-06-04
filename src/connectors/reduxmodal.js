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

const ReduxModal = (props) =>
  <Modal
    open={props.reduxModal.visibility}
    size='small'
    header={props.reduxModal.header}
    content={modalContentMapper[props.reduxModal.content]}
    closeIcon='close'
    onClose={props.showModal}
  />

ReduxModal.propTypes = {
  reduxModal: PropTypes.object,
  showModal: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch({ type: 'SHOW_MODAL' })
})

const mapStateToProps = state => ({
  ...pick(['reduxModal'], state.core)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal)
