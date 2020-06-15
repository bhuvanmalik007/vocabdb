export default (store) => ({
  path:'auth',
  onEnter: (nextState, replace) => {
    replace('landing')
  }
})
