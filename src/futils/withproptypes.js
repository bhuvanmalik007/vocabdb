import PT from 'prop-types'

const PropTypeLens = type => PT[type]

const PropTypeDistributer = proptypes => {
  const propTypeObject = {}
  Object.keys(proptypes).forEach(x => {
    propTypeObject[x] = PropTypeLens(proptypes[x])
  })
}

const withPropTypes = (component, propTypes) => {
  component.propTypes = { ...PropTypeDistributer(propTypes) }
  return component
}

export default withPropTypes
