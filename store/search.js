import firebase from "@firebase/app"
import { auth } from '~/plugins/firebase.js'

export const state = () => ({
  user: null,
  authStatus: false,
  errorMessage: '  ',
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setAuthStatus(state, payload) {
    state.authStatus = payload
  },

  setErrorMessage(state, payload) {
    state.errorMessage = payload
  }
}

export const actions = {
  // Mailでの新規ユーザー登録, ユーザー情報取得
  signUp({ commit }, { email, password }) {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        // 取得したデータからuserのemail, uidを取得
        const user = {}
        user.email = data.user.email
        user.uid = data.user.uid

        // ログイン状態をtrue, falseで管理
        // true: ログイン中 , false: 未ログイン
        let authStatus = true

        // errorMessageの初期化
        let errorMessage = ''

        this.$router.push('/users/userProfile')
        commit('setUser', user )
        commit('setAuthStatus', authStatus )
        commit('setErrorMessage', errorMessage)
      })
      .catch(() => {
        let errorMessage = 'ログインに失敗しました。もう一度確認してください。'
        commit('setErrorMessage', errorMessage)
      })
    })
  },

  // ここからログイン用関数
  // Mailで登録しているユーザーのログイン処理＋ユーザー情報取得
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

          // errorMessageの初期化
          let errorMessage = ''

          this.$router.push('/users/userProfile')
          commit('setUser', user )
          commit('setAuthStatus', authStatus )
          commit('setErrorMessage', errorMessage)
        })
        .catch(() => {
          let errorMessage = 'ログインに失敗しました。もう一度確認してください。'
          commit('setErrorMessage', errorMessage)
        })
    })
  },

  // Google認証でのログイン処理＋ユーザー情報取得
  signInWithGoogle({ commit }){
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        const user = {}
        user.email = data.user.email
        user.uid = data.user.uid

        // ログイン状態をtrue, falseで管理
        // true: ログイン中 , false: 未ログイン
        let authStatus = true

        // errorMessageの初期化
        let errorMessage = ''

        this.$router.push('/users/userProfile')
        commit('setUser', user )
        commit('setAuthStatus', authStatus )
        commit('setErrorMessage', errorMessage)
      })
      .catch(() => {
        let errorMessage = 'ログインに失敗しました。もう一度確認してください。'
        commit('setErrorMessage', errorMessage)
      })
    })
  },


  // サインアウト処理
  signOut() {
    return auth.signOut().then(() => {
      const user = null
      let authStatus = false
      this.$router.push('/main')
      commit('setUser', user )
      commit('setAuthStatus', authStatus )
    })
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  authStatus(state) {
    return state.authStatus
  },
  errorMessage(state) {
    return state.errorMessage
  }
}