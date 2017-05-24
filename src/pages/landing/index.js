import { injectReducer } from '../../store/reducers'

// Sync route definition
export default(store) => ({
  path:'landing',
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const container = require('./container').default
      const reducer = require('./reducer').default
      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'landing', reducer })
      /*  Return getComponent   */
      cb(null, container)
      /* Webpack named bundle   */
    }, 'landing')
  }
})
