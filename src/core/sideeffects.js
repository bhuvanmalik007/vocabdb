import Lock from '../utils/lock'

export const LockThunk = () => dispatch => Lock.show()

export const OnAuthFunction = router => dispatch => Lock.on('authenticated', function (authResult) {
  Lock.getProfile(authResult.idToken, function (error, profile) {
    if (error) {
      dispatch({ type: 'ERROR IN AUTHENTICATION' })
    }
    dispatch({ type: 'AUTHENTICATED', pld: { profile, idToken: authResult.idToken } })
    router.push({ pathname: '/myflashcards' })
  })
})
