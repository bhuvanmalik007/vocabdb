import React from 'react'
import Form from 'grommet/components/Form'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Select from 'grommet/components/Select'
import Box from 'grommet/components/Box'
import FormField from 'grommet/components/FormField'
import GrommetButton from 'grommet/components/Button'
import styled from 'styled-components'

const LowPadButton = styled(GrommetButton)`
  border-radius: 0px;
  span {
    padding: 10px !important;
  }
`

let SelectListForm = ({ handleSubmit, pristine, submitting, lists }) => {
  return (
    <Box pad='large'>
      <Form onSubmit={handleSubmit}>
        <FormField width={7}>
          <Field name='listId' component={props => <Select
            label={props.input}
            options={lists.map((list, index) => ({ value: list.listId, label: list.listName }))}
            value={props.input.value}
            onChange={param => {
              return props.input.onChange(param.value.value)
            }} />} />
        </FormField>
        <Box pad={{ vertical: 'medium' }}>
          <LowPadButton primary type='submit' disabled={pristine || submitting}
            label='Add!' fill='false' onClick={pristine || submitting ? undefined : _ => null} />
        </Box>
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
