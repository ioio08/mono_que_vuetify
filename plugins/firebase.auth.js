// Firebaseへの認証状態を管理するファイル
// ※特にリロードした際にログイン状況を取得し、アプリ全体に状況を反映できる
// auth.onAuthStateChangedメソッドでログイン、ログアウトを監視

import { auth, db } from '~/plugins/firebase.js'

// contextからstoreへの参照を取得
export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      //  ログイン済のユーザー
      if (user) {
        // ログインした場合に登録画像をリアルタイムで描画する為の処理
        // usersコレクションのインタスタンス作成
        const userRef = db.collection('users').doc(user.uid)

        // ログイン中のユーザー情報を確認し、フィールド状況に合わせて画像を取得
        userRef.get().then(doc => {
          store.commit('auth/setUserImage', doc.data().image.src)
        })

        store.commit('auth/setUid', user.uid)
        store.commit('auth/setAuthStatus', true)
        resolve( user )

      } else {
        // ** ログインしていないユーザーもしくは認証が切れている
        let authStatus = false
        store.commit('auth/setAuthStatus', false)
        resolve(false)
      }
    })
  })
}