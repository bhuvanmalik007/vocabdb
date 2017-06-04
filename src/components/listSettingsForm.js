import React from 'react'
import { Form, Segment, Container, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

const ListSettingsForm = ({ handleSubmit, pristine, submitting, deleteList, currentListId }) => {
  return (
    <Container>
      <Segment raised padded className='animated fadeIn'>
        <Form onSubmit={handleSubmit}>
          <Form.Field width={7}>
            <label>Rename List</label>
            <Field name='listName' type='text' component='input' placeholder='Enter a name for the new list' />
          </Form.Field>
          <br />
          <Form.Group>
            <Button type='button' color='red' onClick={() => deleteList(currentListId)}>Delete List</Button>
          </Form.Group>
          <Form.Group>
            <Button type='submit' disabled={pristine || submitting}>Rename!</Button>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

ListSettingsForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  deleteList: PropTypes.func,
  currentListId: PropTypes.string
}

// Decorate the form component
const ListSettingsFormRedux = reduxForm({
  form: 'selectList' // a unique name for this form
})(ListSettingsForm)

export default ListSettingsFormRedux
