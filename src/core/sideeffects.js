import Lock from '../utils/lock'

export const LockThunk = () => dispatch => Lock.show()

export const OnAuthFunction = router => dispatch => Lock.on('authenticated', function (authResult) {
  Lock.getProfile(authResult.idToken, function (error, profile) {
    if (error) {
      dispatch({ type: 'ERROR IN AUTHENTICATION' })
      Lock.hide()
    }
    console.log(authResult)
    dispatch({ type: 'AUTHENTICATED', pld: { profile, idToken: authResult.idToken } })
    Lock.hide()
    router.push({ pathname: '/myflashcards' })
  })
})
