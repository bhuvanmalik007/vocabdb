import Reducer from '../futils/reducecreator'

const ACTION_HANDLERS = {
  AUTHENTICATED: (s, a) => {
    return ({ ...s, authenticated: true, profile: a.pld.profile, idToken: a.pld.idToken })
  },
  UNPROTECTED: (s, a) => {
    return ({ ...s, authenticated: false, profile: {}, idToken: null })
  }
}

const initialState = { authenticated: false, profile: {}, idToken: null }

// MODAL REDUCER STARTS -->
const MODAL_ACTION_HANDLERS = {
  SHOW_MODAL: (s, a) => Object.assign({}, s, {
    visibility: !s.visibility, ...a.payload })
}

const modalInitialState = { visibility: false }

// NOTIFICATION REDUCER STARTS -->
const NotificatonActionHandlers = {
  SHOWTOAST: (s, a) => ({ ...s, toasted: true, content: a.content }),
  HIDETOAST: (s, a) => ({ ...s, toasted: false })
}

const NotifierInit = { toasted: false, content: '', danger: false }

export const CoreReducer = Reducer(initialState, ACTION_HANDLERS)
export const ReduxModalReducer = Reducer(modalInitialState, MODAL_ACTION_HANDLERS)
export const NotifierReducer = Reducer(NotifierInit, NotificatonActionHandlers)
