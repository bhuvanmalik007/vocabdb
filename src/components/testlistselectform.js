import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { LowPadButton } from '../pages/myflashcards/localcomponents'

let TestListSelectForm = ({ handleSubmit, pristine, submitting, lists }) => {
  return (
    <Box pad='large'>
      <Form onSubmit={handleSubmit}>
        <Field name='listObj' component={props => <Dropdown
          options={lists.map((list, index) => ({ key: list.listId, text: list.listName, index }))}
          selectedKey={props.input.value.key}
          onChanged={param => {
            return props.input.onChange(param)
          }} />} />
        <LowPadButton
          primary type='submit' disabled={pristine || submitting}
          label='Create Test!' fill onClick={pristine || submitting ? undefined : _ => null} />
      </Form>
    </Box>
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
