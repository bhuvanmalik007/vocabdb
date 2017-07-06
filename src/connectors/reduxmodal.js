import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'ramda'
import { connect } from 'react-redux'
import AddList from '../connectors/addlist'
import SelectList from '../connectors/addwordlistselect'
import ListSettings from '../connectors/listsettings'
import SlideShow from '../connectors/slideshow'
import TestListSelect from '../connectors/testListSelect'
import { Modal } from 'office-ui-fabric-react/lib/Modal'

const modalContentMapper = {
  ADD_LIST: <AddList />,
  SELECT_LIST: <SelectList />,
  LIST_SETTINGS: <ListSettings />,
  SLIDESHOW: <SlideShow />,
  TEST_LIST_SELECT: <TestListSelect />
}

const ReduxModal = ({ visibility, header, content, showModal, size }) =>
  <Modal
    isOpen={visibility}
    isBlocking={false}
    onDismiss={showModal}
  >
    {modalContentMapper[content]}
  </Modal>

ReduxModal.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.string,
  header: PropTypes.string,
  showModal: PropTypes.func,
  size: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch({ type: 'SHOW_MODAL' })
})

const mapStateToProps = state => ({
  ...pick(['visibility', 'content', 'header'], state.reduxModal)
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxModal)
