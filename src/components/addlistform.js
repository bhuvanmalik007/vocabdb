import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'
import GrommetButton from 'grommet/components/Button'
import styled from 'styled-components'
import Heading from 'grommet/components/Heading'

const LowPadButton = styled(GrommetButton)`
  border-radius: 0px;
  span {
    padding: 10px !important;
  }
`
const customInput = props => <TextInput
  placeHolder='Enter a name for the new list'
  onDOMChange={param => props.input.onChange(param.target.value)} />

customInput.propTypes = {
  input: PropTypes.object
}

let AddListForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <Box pad='large'>
      <Heading tag='h3'>Create New List</Heading>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Field name='listName' component={customInput} />
        </FormField>
        <Box pad={{ vertical: 'medium' }}>
          <LowPadButton primary type='submit' disabled={pristine || submitting}
            label='Create!' fill onClick={pristine || submitting ? undefined : _ => null} />
        </Box>
      </Form>
    </Box>
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
