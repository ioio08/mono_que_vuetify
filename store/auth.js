import { firestoreAction } from 'vuexfire'
import firebase from "@firebase/app"
import { db, auth } from '~/plugins/firebase.js'

// login中のuser情報を保持するState
// user:{ user.email , user.uid }
// userStatus: true or false
export const state = () => ({
  user: null,
  userImage: null,
  authStatus: false,
  errorMessage: null,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },

  setUserImage(state, payload) {
    state.userImage = payload
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
  async signUp({ commit, dispatch }, { email, password }) {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    try {
      const doc = await auth.createUserWithEmailAndPassword(email, password)
      // 取得したデータからuserのemail, uidを取得
      const user = {}
      user.email = doc.user.email
      user.uid = doc.user.uid

      // アプリにuser情報がすでに保存されているユーザーか判別する関数
      // 初回：userをusersコレクションに追加
      // 既存：usersコレクションからログインユーザーのuser情報を取得してstateに保存する→auth.jsに保存

      // usersコレクションからログインユーザーのデータを取得
      const userData = await db.collection('users').doc(user.uid).get()

      // 初めてのログインの場合
      if (!userData.data()) {
        await db.collection('users').doc(user.uid).set({
          name: 'ナナシさん',
          penName: 'ナナシさん',
          email: user.email,
          uid: user.uid,
          image: {
            name: '/images/smile.png',
            src: '/images/smile.png',
          }
        })
      }

      // ユーザー情報をセット
      commit('setUser', user.uid)

      // ログイン状態をtrue, falseで管理
      // true: ログイン中 , false: 未ログイン
      commit('setAuthStatus', true )
      // errorMessageの初期化
      commit('setErrorMessage', null)
      this.$router.push('/')

    } catch (error) {
      // エラー分によってメッセージをswitchさせる関数
      let errorMessage = dispatch('errorHandling', await (error, 'signin'))
      commit('setErrorMessage', errorMessage)

    }
  },

  // ここからログイン用関数
  // Mailで登録しているユーザーのログイン処理＋ユーザー情報取得
  async signInWithEmail({ commit, dispatch }, { email, password } ) {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    try {
      const doc = await auth.signInWithEmailAndPassword(email, password)
      // 取得したデータからuserのemail, uidを取得
      const user = {}
      user.email = doc.user.email
      user.uid = doc.user.uid

      // アプリにuser情報がすでに保存されているユーザーか判別する関数
      // 初回：userをusersコレクションに追加
      // 既存：usersコレクションからログインユーザーのuser情報を取得してstateに保存する→auth.jsに保存

      // usersコレクションからログインユーザーのデータを取得
      const userData = await db.collection('users').doc(user.uid).get()

      // 初めてのログインの場合
      if (!userData.data()) {
        await db.collection('users').doc(user.uid).set({
          name: 'ナナシさん',
          penName: 'ナナシさん',
          email: user.email,
          uid: user.uid,
          image: {
            name: '/images/smile.png',
            src: '/images/smile.png',
          }
        })
      }

      // ユーザー情報をセット
      commit('setUser', user.uid)

      // ログイン状態をtrue, falseで管理
      // true: ログイン中 , false: 未ログイン
      commit('setAuthStatus', true )

      // errorMessageの初期化
      commit('setErrorMessage', null)

      this.$router.push('/')

    // エラーメッセージの描画処理
    } catch (error) {
      // エラー分によってメッセージをswitchさせる関数
      let errorMessage = dispatch('errorHandling', await (error, 'signin'))
      commit('setErrorMessage', errorMessage)

    }
  },

  // Google認証でのログイン処理＋ユーザー情報取得
  async signInWithGoogle({ commit, dispatch }) {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    try {
      const doc = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      const user = {}
      user.name = doc.user.displayName
      user.penName = doc.user.displayName
      user.email = doc.user.email
      user.uid = doc.user.uid
      user.image = doc.user.photoURL

      // アプリにuser情報がすでに保存されているユーザーか判別する関数
      // 初回：userをusersコレクションに追加
      // 既存：usersコレクションからログインユーザーのuser情報を取得してstateに保存する→auth.jsに保存

      // usersコレクションからログインユーザーのデータを取得
      const userData = await db.collection('users').doc(user.uid).get()

      // 初めてのログインの場合
      if (!userData.data()) {
          await db.collection('users').doc(user.uid).set({
            name: user.name,
            penName: user.name,
            email: user.email,
            uid: user.uid,
            image: {
              name: user.image,
              src: user.image,
            }
          })
      }

      // ユーザー情報をセット
      commit('setUser', user.uid)

      // ログイン状態をtrue, falseで管理
      // true: ログイン中 , false: 未ログイン
      commit('setAuthStatus', true)

      // errorMessageの初期化
      commit('setErrorMessage', null)
      this.$router.push('/')

    } catch (error) {
      // エラー分によってメッセージをswitchさせる関数
      let errorMessage = dispatch('errorHandling', await (error, 'signin'))
      commit('setErrorMessage', errorMessage)
    }

  },

  // サインアウト処理
  signOut() {
    return auth.signOut().then(() => {
      this.$router.push('/')
      commit('setUser', null )
      commit('setAuthStatus', false )
    })
  },

  //  エラーコードによって描画するメッセージをswitchする関数
  errorHandling(error, method) {
    switch (error.code) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return null;
      case 'auth/email-already-in-use':
        if (method.indexOf('signup') !== -1) {
          return 'このメールアドレスは使用されています';
        } else {
          return 'メールアドレスまたはパスワードが違います';
        }
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/user-disabled':
        return 'サービスの利用が停止されています';
      case 'auth/user-not-found':
        return 'メールアドレスまたはパスワードが違います';
      case 'auth/user-mismatch':
        if (method === 'signin/popup') {
          return '認証されているユーザーと異なるアカウントが選択されました';
        } else {
          return 'メールアドレスまたはパスワードが違います';
        }
      case 'auth/weak-password':
        return 'パスワードは6文字以上にしてください';
      case 'auth/wrong-password':
        return 'メールアドレスまたはパスワードが違います';
      case 'auth/popup-blocked':
        return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
      case 'auth/operation-not-supported-in-this-environment':
      case 'auth/auth-domain-config-required':
      case 'auth/operation-not-allowed':
      case 'auth/unauthorized-domain':
        return '現在この認証方法はご利用頂けません';
      case 'auth/requires-recent-login':
        return '認証の有効期限が切れています';
      default:
        if (method.indexOf('signin') !== -1) {
          return '認証に失敗しました。しばらく時間をおいて再度お試しください';
        } else {
          return 'エラーが発生しました。しばらく時間をおいてお試しください';
        }
    }
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  userImage(state) {
    return state.userImage
  },
  authStatus(state) {
    return state.authStatus
  },
  errorMessage(state) {
    return state.errorMessage
  }
}