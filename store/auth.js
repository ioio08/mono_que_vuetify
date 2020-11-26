
import { auth } from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  signUp({ commit }, { email, password }) {
    return auth.createUserWithEmailAndPassword(email, password)
  },

  signInWithEmail({ commit }, { email, password } ) {
    return auth.signInWithEmailAndPassword(email, password)
    .then(data => {
      const user = {}
      user.email = data.user.email
      user.uid = data.user.uid
      this.$router.push('/users/userProfile')
      commit('setUser', user )
    })
    // .catch(e => this.error = e)

  },

  signInWithGoogle({ commit }){
    return auth.signInWithPopup(new auth.GoogleAuthProvider())
  },

  signOut() {
    return auth.signOut()
  }
}

export const getters = {
  user(state){
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  }
}