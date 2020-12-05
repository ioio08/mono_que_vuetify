import { firestoreAction } from 'vuexfire'
import firebase from "@firebase/app"
import { db, auth } from '~/plugins/firebase.js'

// login中のuser情報を保持するState
// user:{ user.email , user.uid }
// userStatus: true or false
export const state = () => ({
  user: null,
  userImage:null,
  authStatus: false,
  errorMessage: '  ',
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
  async signUp({ commit }, { email, password }) {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      auth.createUserWithEmailAndPassword(email, password)
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

        this.$router.push('/')
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
  async signInWithEmail({ commit }, { email, password } ) {
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

      // usersコレクションのインタスタンス作成
      const userRef = await db.collection('users').doc(user.uid).get()

      // 初めてのログインの場合
      if (!userRef) {
        userRef.set({
          name: 'ナナシさん',
          penName: 'ナナシさん',
          email: user.email,
          uid: user.uid,
          image: '/images/smile.png',
        })
      }

      // ログイン状態をtrue, falseで管理
      // true: ログイン中 , false: 未ログイン
      let authStatus = true

      // errorMessageの初期化
      let errorMessage = ''

      this.$router.push('/')
      commit('setUser', user )
      commit('setAuthStatus', authStatus )
      commit('setErrorMessage', errorMessage)

    // エラーメッセージの描画処理
    } catch (error) {
      let errorMessage = errorHandling(error, 'signin')
      commit('setErrorMessage', errorMessage)

    }
  },
  errorHandling(error, method) {
    switch (error.code) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return null;
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/user-disabled':
        return 'サービスの利用が停止されています';
      case 'auth/user-not-found':
        return 'メールアドレスまたはパスワードが違います';
      case 'auth/wrong-password':
        return 'メールアドレスまたはパスワードが違います';
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

  },

  // Google認証でのログイン処理＋ユーザー情報取得
  async signInWithGoogle({ commit }) {
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

      // usersコレクションのインタスタンス作成
      const userRef = await db.collection('users').doc(user.uid).get()
      // 初めてのログインの場合
      if (!userRef) {
        try {
          userRef.set({
            name: user.name,
            penName: user.name,
            email: user.email,
            uid: user.uid,
            image: {
              name: user.image,
              src: user.image,
            }
          })

        } catch (error) {
          let errorMessage = 'ログインに失敗しました。もう一度確認してください。'
          commit('setErrorMessage', errorMessage)

        }
      }

      // ログイン状態をtrue, falseで管理
      // true: ログイン中 , false: 未ログイン
      let authStatus = true

      // errorMessageの初期化
      let errorMessage = ''

      commit('setUser', user )
      commit('setAuthStatus', authStatus )
      commit('setErrorMessage', errorMessage)
      this.$router.push('/')

    } catch (error) {
      let errorMessage = 'ログインに失敗しました。もう一度確認してください。'
      commit('setErrorMessage', errorMessage)
    }

  },

  // サインアウト処理
  signOut() {
    return auth.signOut().then(() => {
      const user = null
      let authStatus = false
      this.$router.push('/')
      commit('setUser', user )
      commit('setAuthStatus', authStatus )
    })
  },
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