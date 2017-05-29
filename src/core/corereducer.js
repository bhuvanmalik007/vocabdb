import Reducer from '../futils/reducecreator'

const ACTION_HANDLERS = {
  AUTHENTICATED: (s, a) => {
    debugger;
    return ({ ...s, authenticated: true, profile: a.pld.profile, idToken: a.pld.idToken })
  }
}

const initialState = { authenticated: false, profile: {}, idToken: null }

export default Reducer(initialState, ACTION_HANDLERS)
