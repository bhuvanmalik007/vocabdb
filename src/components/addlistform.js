import React from 'react'
import { Form, Segment, Container, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

let AddListForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <Container>
      <Segment raised padded className='animated fadeIn'>
        <Form onSubmit={handleSubmit}>
          <Form.Field width={7}>
            <label>Enter List Name</label>
            <Field name='listName' type='text' component='input' placeholder='Enter a name for the new list' />
          </Form.Field>
          <br />
          <Form.Group>
            <Button type='submit' disabled={pristine || submitting}>Create!</Button>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

AddListForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

// Decorate the form component
AddListForm = reduxForm({
  form: 'addList' // a unique name for this form
})(AddListForm)

export default AddListForm
