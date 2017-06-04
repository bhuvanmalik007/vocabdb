import Reducer from '../futils/reducecreator'

const ACTION_HANDLERS = {
  AUTHENTICATED: (s, a) => {
    return ({ ...s, authenticated: true, profile: a.pld.profile, idToken: a.pld.idToken })
  },
  SHOW_MODAL: (s, a) => Object.assign({}, s, {
    reduxModal: { visibility: !s.reduxModal.visibility, ...a.payload } })
}

const initialState = { authenticated: false, profile: {}, idToken: null, reduxModal: { visibility:false } }

export default Reducer(initialState, ACTION_HANDLERS)
