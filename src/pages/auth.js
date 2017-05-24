export default (store) => ({
  path:'auth',
  onEnter: (nextState, replace) => {
    console.log(nextState.location)
    replace('/landing')
  }
})
