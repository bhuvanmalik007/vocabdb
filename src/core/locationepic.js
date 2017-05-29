const LocationPushEpic = (action$, store, { history }) =>
  action$.ofType('LOCATION_CHANGE').do(action => history.push(action.payload))

export default [LocationPushEpic]
