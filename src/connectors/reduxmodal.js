import React from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { pick } from 'ramda' //eslint-disable-line
import { connect } from 'react-redux'

const ReduxModal = (props) =>
  <Modal
    trigger={props.triggerButton}
    open={props.modalVisibility}
    size='small'
    header={props.header}
    content={props.content}
    closeIcon='close'
    closeOnDocumentClick
    onClose={props.toggleModalVisibility}
  />

ReduxModal.propTypes = {
  triggerButton: PropTypes.element,
  modalVisibility: PropTypes.bool,
  header: PropTypes.string,
  content: PropTypes.element,
  toggleModalVisibility: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  toggleModalVisibility: () => dispatch({ type: 'TOGGLE_MODAL_VISIBILITY' })
})

const mapStateToProps = state => ({
  ...pick(['modalVisibility'], state.wordsState)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal)
