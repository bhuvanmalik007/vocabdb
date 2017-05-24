import Lock from '../utils/lock'

export const LockThunk = () => dispatch => Lock.show()

export const OnAuthFunction = () => dispatch => Lock.on('authenticated', function (authResult) {
  Lock.getProfile(authResult.idToken, function (error, profile) {
    if (error) {
      return dispatch({ type: 'ERROR IN AUTHENTICATION' })
    }
    return dispatch({ type: 'AUTHENTICATED', pld: { profile, idToken: authResult.idToken } })
  })
})
