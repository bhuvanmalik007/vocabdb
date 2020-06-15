import { applyMiddleware, compose, createStore } from 'redux'
import { hashHistory } from 'react-router'
// import { hashHistory } from 'react-router'
import makeRootReducer from './reducers'
import createRootEpic from './epics'
import thunk from 'redux-thunk'
import { updateLocation } from './location'
import { createEpicMiddleware } from 'redux-observable'
import persistState from 'redux-localstorage'
import 'rxjs'
import { middleware as tooltip } from 'redux-tooltip'

const epicMiddleware = createEpicMiddleware(createRootEpic(), {
  dependencies: { history:hashHistory }
})

export default(initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    epicMiddleware,
    thunk,
    tooltip
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
  store.unsubscribeHistory = hashHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
