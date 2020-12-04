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
        let users = {}
        users.uid = user.uid

        // usersコレクションのインタスタンス作成
        const userRef = db.collection('users').doc(user.uid)
        let userImage = {}
        userRef.get().then(doc => {
          // users = doc.data().images.src
          if (doc.data().image.src) {
            userImage.image = doc.data().image.src
            store.commit('auth/setUserImage', userImage.image)
          } else {
            userImage.image = doc.data().image
            store.commit('auth/setUserImage', userImage.image)
          }
        })

        let authStatus = true
        store.commit('auth/setUser', users)
        store.commit('auth/setAuthStatus', authStatus)
        resolve( users )

      } else {
        // ** ログインしていないユーザーもしくは認証が切れている
        let authStatus = false
        store.commit('auth/setAuthStatus', authStatus)
        resolve(false)
      }
    })
  })
}