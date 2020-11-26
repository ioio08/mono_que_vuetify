import firebase from "@firebase/app"
import { auth } from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
  authStatus: false,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setAuthStatus(state, payload) {
    state.authStatus = payload
  }
}

export const actions = {
  signUp({ commit }, { email, password }) {
    return auth.createUserWithEmailAndPassword(email, password)
  },

  signInWithEmail({ commit }, { email, password } ) {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        auth.signInWithEmailAndPassword(email, password)
          .then(data => {
          // 取得したデータからuserのemail, uidを取得
          const user = {}
          user.email = data.user.email
          user.uid = data.user.uid

          // ログイン状態をtrue, falseで管理
          // true: ログイン中 , false: 未ログイン
          let authStatus = true
          this.$router.push('/users/userProfile')
          commit('setUser', user )
          commit('setAuthStatus', authStatus )
        })

    })

  },

  signInWithGoogle({ commit }){
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      auth.signInWithPopup(new auth.GoogleAuthProvider())

    })
  },

  signOut() {
    return auth.signOut()
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  authStatus(state) {
    return state.authStatus
  }
}