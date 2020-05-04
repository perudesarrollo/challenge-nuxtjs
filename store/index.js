export const getters = {
  isAuthenticated (state) {
    console.log('isAuthenticated::', state)
    return state.auth.loggedIn
  },

  loggedInUser (state) {
    console.log('loggedInUser::', state)
    return state.auth.user
  },

  token (state) {
    return state.getToken('local')
  }
}
