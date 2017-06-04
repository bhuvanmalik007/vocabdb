import Reducer from '../futils/reducecreator'

const ACTION_HANDLERS = {
  AUTHENTICATED: (s, a) => {
    return ({ ...s, authenticated: true, profile: a.pld.profile, idToken: a.pld.idToken })
  }
}

const initialState = { authenticated: false, profile: {}, idToken: null }

const MODAL_ACTION_HANDLERS = {
  SHOW_MODAL: (s, a) => Object.assign({}, s, {
    visibility: !s.visibility, ...a.payload })
}

const modalInitialState = { visibility:false }

export const CoreReducer = Reducer(initialState, ACTION_HANDLERS)
export const ReduxModalReducer = Reducer(modalInitialState, MODAL_ACTION_HANDLERS)
