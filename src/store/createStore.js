import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
// import { hashHistory } from 'react-router'
import makeRootReducer from './reducers'
import createRootEpic from './epics'
import thunk from 'redux-thunk'
import { updateLocation } from './location'
import { createEpicMiddleware } from 'redux-observable'
import persistState from 'redux-localstorage'
import 'rxjs'

const epicMiddleware = createEpicMiddleware(createRootEpic())
export default(initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    epicMiddleware,
    thunk
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [
    persistState('core')
  ]

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.replaceEpic = epicMiddleware.replaceEpic

  store.asyncReducers = {}
  // store.sagas = []
  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
