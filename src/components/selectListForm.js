import React from 'react'
import { Form, Segment, Container, Button, Dropdown, Select } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

let SelectListForm = ({ handleSubmit, pristine, submitting, lists }) => {
  return (
    <Container>
      <Segment raised padded className='animated fadeIn'>
        <Form onSubmit={handleSubmit}>
          <Form.Field
            width={7}
            control={Select}
            options={lists.map((list, index) => <option key={index} value="ff0000">Red</option>)}
          >
            {/* {lists.map((list, index) => <option key={index} value="ff0000">Red</option>)} */}
            {/* <Field name='listName'
              type='text'
              component={Select}
              placeholder='Enter a name for the new list'
              options={lists.map((list, index) => ({ key: index, text: list.listName, value: list.listId }))}
            /> */}
            {/* <Select
              // text='Select List'
              // closeOnChange
              // floating
              // labeled
              // button
              // selection
              // selectOnBlur={false}
              // className='icon'
              // icon='list layout'
              options={lists.map((list, index) => <option key={index} value="ff0000">Red</option>)}
            /> */}
            {/* {list.map((list, index) => <option value="ff0000">Red</option>)} */}
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

SelectListForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  lists: PropTypes.array
}

// Decorate the form component
SelectListForm = reduxForm({
  form: 'selectList' // a unique name for this form
})(SelectListForm)

export default SelectListForm
