import Lock from '../utils/lock'

export const LockThunk = () => dispatch => Lock.show()

export const OnAuthFunction = () => dispatch => Lock.on('authenticated', function (authResult) {
  Lock.getProfile(authResult.idToken, function (error, profile) {
    if (error) {
      dispatch({ type: 'ERROR IN AUTHENTICATION' })
    }
    dispatch({ type: 'AUTHENTICATED', pld: { profile, idToken: authResult.idToken } })
  })
})

export const compose = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
