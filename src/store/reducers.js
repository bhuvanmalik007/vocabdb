import { combineReducers } from 'redux'
import locationReducer from './location'
import { CoreReducer, ReduxModalReducer, NotifierReducer, UserInfoReducer } from '../core/corereducers'
import { reducer as formReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    core: CoreReducer,
    reduxModal: ReduxModalReducer,
    location: locationReducer,
    form: formReducer,
    notify: NotifierReducer,
    userInfo: UserInfoReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
