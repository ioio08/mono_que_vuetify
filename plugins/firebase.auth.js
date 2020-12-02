// Firebaseへの認証状態を管理するファイル
// ※特にリロードした際にログイン状況を取得し、アプリ全体に状況を反映できる
// auth.onAuthStateChangedメソッドでログイン、ログアウトを監視

import { auth, db } from '~/plugins/firebase.js'

// contextからstoreへの参照を取得
export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      // ** ログイン済のユーザー
      if (user) {
        // ログイン済みユーザーの情報保持
        const users = {}
        users.uid = user.uid
        
        let authStatus = true
        store.commit('auth/setUser', users)
        store.commit('auth/setAuthStatus', authStatus)
        resolve(users)
      } else {
        // ** ログインしていないユーザーもしくは認証が切れている
        let authStatus = false
        store.commit('auth/setAuthStatus', authStatus)
        resolve(false)
      }
    })
  })
}