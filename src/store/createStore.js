import { applyMiddleware, compose, createStore } from 'redux'
// import { browserHistory } from 'react-router'
import { hashHistory } from 'react-router'
import makeRootReducer from './reducers'
import CoreSaga from '../core/coresagas'
import { updateLocation } from './location'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'

const sagaMiddleware = createSagaMiddleware()
export default(initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    sagaMiddleware
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

  sagaMiddleware.run(CoreSaga)

  store.asyncReducers = {}
  store.runSaga = sagaMiddleware.run
  // store.sagas = []
  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = hashHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
