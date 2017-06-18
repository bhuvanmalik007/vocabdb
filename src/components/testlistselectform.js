import React from 'react'
import { Form, Segment, Container, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

let TestListSelectForm = ({ handleSubmit, pristine, submitting, lists }) => {
  return (
    <Container>
      <Segment raised padded className='animated fadeIn'>
        <Form onSubmit={handleSubmit}>
          <Form.Field width={7}>
            <Field name='listId' component='select'>
              {/* <option /> */}
              {
                lists.map((list, index) => <option key={index} value={list.listId}>{list.listName}
                </option>)
              }
            </Field>
          </Form.Field>
          <br />
          <Form.Group>
            <Button type='submit' disabled={pristine || submitting}>Create Test!</Button>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

TestListSelectForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  lists: PropTypes.array
}

// Decorate the form component
TestListSelectForm = reduxForm({
  form: 'selectList' // a unique name for this form
})(TestListSelectForm)

export default TestListSelectForm
