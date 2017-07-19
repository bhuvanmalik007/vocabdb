import React from 'react'
import Form from 'grommet/components/Form'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import Heading from 'grommet/components/Heading'
import { LowPadButton } from '../pages/myflashcards/localcomponents'

let SelectListForm = ({ handleSubmit, pristine, submitting, lists }) => {
  return (
    <Box pad='large'>
      <Heading tag='h3'>Select List to Add Words to</Heading>
      <Form onSubmit={handleSubmit}>
        <Field name='listObj' component={props => <Dropdown
          options={lists.map((list, index) => ({ key: list.listId, text: list.listName }))}
          selectedKey={props.input.value.key}
          onChanged={param => {
            return props.input.onChange(param)
          }} />} />
        <LowPadButton primary type='submit' disabled={pristine || submitting}
          label='Add!' fill onClick={pristine || submitting ? undefined : _ => null} />
      </Form>
    </Box>
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
