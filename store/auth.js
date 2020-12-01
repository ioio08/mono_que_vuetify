import { firestoreAction } from 'vuexfire'
import firebase from "@firebase/app"
import { db, auth } from '~/plugins/firebase.js'

// login中のuser情報を保持するState
// user:{ user.email , user.uid }
// userStatus: true or false
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
      .then(doc => {
        // 取得したデータからuserのemail, uidを取得
        const user = {}
        user.email = doc.user.email
        user.uid = doc.user.uid

        // ログイン状態をtrue, falseで管理
        // true: ログイン中 , false: 未ログイン
        let authStatus = true

        // errorMessageの初期化
        let errorMessage = ''

        this.$router.push('/main')
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
          .then(doc => {
          // 取得したデータからuserのemail, uidを取得
          const user = {}
          user.email = doc.user.email
          user.uid = doc.user.uid

          // アプリにuser情報がすでに保存されているユーザーか判別する関数
          // 初回：userをusersコレクションに追加
          // 既存：usersコレクションからログインユーザーのuser情報を取得してstateに保存する→auth.jsに保存

          // usersコレクションのインタスタンス作成
          const userRef = db.collection('users').doc(user.uid)
          userRef.get().then(doc => {

          // 初めてのログインの場合
          if (!doc.exists) {
            userRef.set({
              name: 'ナナシさん',
              penName: 'ナナシさん',
              email: user.email,
              uid: user.uid,
              image: '/images/smile.png',
            })
            .catch(error => {
              console.log(`Error userData setting: ${error}`);
            });
          }})

          // ログイン状態をtrue, falseで管理
          // true: ログイン中 , false: 未ログイン
          let authStatus = true

          // errorMessageの初期化
          let errorMessage = ''

          this.$router.push('/main')
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
      .then(doc => {
        const user = {}
        user.name = doc.user.displayName
        user.penName = doc.user.displayName
        user.email = doc.user.email
        user.uid = doc.user.uid
        user.image = doc.user.photoURL

        // アプリにuser情報がすでに保存されているユーザーか判別する関数
        // 初回：userをusersコレクションに追加
        // 既存：usersコレクションからログインユーザーのuser情報を取得してstateに保存する→auth.jsに保存

        // usersコレクションのインタスタンス作成
        const userRef = db.collection('users').doc(user.uid)
        userRef.get().then(doc => {

          // 初めてのログインの場合
          if (!doc.exists) {
            userRef.set({
              name: user.name,
              penName: user.name,
              email: user.email,
              uid: user.uid,
              image: user.image,
            })
            .catch(error => {
              console.log(`Error userData setting: ${error}`);
            });
          }})

        // ログイン状態をtrue, falseで管理
        // true: ログイン中 , false: 未ログイン
        let authStatus = true

        // errorMessageの初期化
        let errorMessage = ''

        commit('setUser', user )
        commit('setAuthStatus', authStatus )
        commit('setErrorMessage', errorMessage)
        this.$router.push('/main')
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
  },
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