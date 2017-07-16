import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import Heading from 'grommet/components/Heading'
import { LowPadButton } from '../pages/myflashcards/localcomponents'

const customInput = props => <TextInput
  placeHolder='Enter New Name for List'
  onDOMChange={param => props.input.onChange(param.target.value)} /> //eslint-disable-line

const ListSettingsForm = ({ handleSubmit, pristine, submitting, deleteList, currentListId }) => {
  return (
    <Box pad='medium'>
      <Heading tag='h3'>List Settings</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Field name='listName' component={customInput} />
        </FormField>
        <Box pad={{ vertical: 'medium' }}>
          <LowPadButton primary type='submit' disabled={pristine || submitting}
            label='Rename!' fill onClick={pristine || submitting ? undefined : _ => null} />
        </Box>
        <Box pad={{ vertical: 'medium' }}>
          <LowPadButton primary label='Delete!' fill onClick={() => deleteList(currentListId)} />
        </Box>
      </Form>
    </Box>
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
