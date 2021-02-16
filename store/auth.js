import firebase from "@firebase/app"
import "@firebase/firestore";

export const state = () => ({
  userData: null,
  authStatus: false,
  errorMessage: null,
})

export const mutations = {
  setUserData(state, userData) {
    state.userData = userData
  },

  setAuthStatus(state, status) {
    state.authStatus = status
  },

  setErrorMessage(state, errorMessage) {
    state.errorMessage = errorMessage
  }
}

export const actions = {

  async signUp({ commit, dispatch }, { email, password }) {

    try {
      const { user } = await this.$fb.auth().createUserWithEmailAndPassword(email, password)

      // アプリのユーザー情報登録済みかを確認
      const userData = await this.$fb.usersRef.doc(user.uid).get()

      // 初ログインの場合のみ
      if (!userData) {
        await this.$fb.userRef.set({
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

      commit('setUserData', userData)
      commit('setAuthStatus', true)
      commit('setErrorMessage', null)
    } catch (error) {
      const errorMessage = await dispatch('errorHandling', {error: error.code, method: 'signUp'})
      commit('setErrorMessage', errorMessage)
    }
  },

  async signInWithEmail({ commit, dispatch }, { email, password }) {
    try {
      const { user } = await this.$fb.auth().signInWithEmailAndPassword(email, password)

      // ユーザー情報の登録を確認
      const userData = await this.$fb.usersRef.doc(user.uid).get()

      commit('setUserData', userData)
      commit('setAuthStatus', true)
      commit('setErrorMessage', null)

    } catch (error) {
      const errorMessage = await dispatch('errorHandling', {error: error.code, method: 'signIn'})
      commit('setErrorMessage', errorMessage)
    }
  },

  async signInWithGoogle({ commit, dispatch }) {
    const auth = this.$fb.auth
    const usersRef = this.$fb.usersRef

    try {
      const { user } = await auth().signInWithPopup(new auth.GoogleAuthProvider())
      const { displayName: userName, email, uid, photoURL: imageURL, photoURL: imageName } = { ...user }
      const image = { imageURL, imageName }

      // ユーザー情報の登録を確認
      const { exists } = await usersRef.doc(user.uid).get()
      // 未登録の場合 users collection に user情報を登録
      if (!exists) {
          await userRef.set({
            userName: userName,
            penName: userName,
            email: email,
            uid: uid,
            image: image
          })
      }

      commit('setUserData', { userName, email, uid, image })
      commit('setAuthStatus', true)
      commit('setErrorMessage', null)

    } catch (error) {
      let errorMessage = dispatch('errorHandling', await (error, 'popup'))
      commit('setErrorMessage', errorMessage)
    }

  },

  // サインアウト処理
  signOut() {
    this.$fb.auth().signOut()
    commit('setUid', null )
    commit('setAuthStatus', false )
  },

  async onUserStateChanged(ctx, { authUser, claims }, args3rd) {
    console.log('ctx',ctx) // 1st args {state, commit, dispatch, getters, rootGetters, rootState}
    // 2nd args {authUser, claims} のみ
    console.log('authUser', authUser) // authUser: Firebase Authentication の 登録情報
    console.log('claims', claims)     // claims: Firebase 上記と似たような情報（詳細わからず）
    console.log('args3rd', args3rd) // 3rd args は取得できない。


    // import で直接firebaseモジュールを利用すればuserDataを取得できるが、
    // @nuxtjs/firebase モジュール の ショートカットで統一し、 極力 import せずに統一したい。
    // plugin/firebase.js でよく使う @nuxtjs/firebaseのショートカット を inject で 各ファイルからアクセスできるように設定している。
    if (authUser) {
      const userData = await firebase.firestore().collection('users').doc(authUser.uid).get()

      const { name: userName, email, uid, image } = await userData.data()

      // commit('setUserData', { userName, email, uid, image })
      // commit('setAuthStatus', true)
    } else {
      commit('setUserData', null)
      commit('setAuthStatus', false)
    }

  },

  //  エラーコードによって描画するメッセージをswitchする関数
  errorHandling( { ctx }, { error, method } ) {
    switch (error) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        return null;
      case 'auth/email-already-in-use':
        if (method === 'signUp') {
          return 'このメールアドレスは使用されています';
        } else {
          return 'メールアドレスまたはパスワードが違います';
        }
      case 'auth/invalid-email':
        return 'メールアドレスの形式が正しくありません';
      case 'auth/user-disabled':
        return 'サービスの利用が停止されています';
      case 'auth/user-not-found':
        return 'ユーザー情報が登録されていません。新規登録に進んでください。';
      case 'auth/user-mismatch':
        if (method === 'signIn/popup') {
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
        if (method === 'signIn' ) {
          return '認証に失敗しました。しばらく時間をおいて再度お試しください';
        } else {
          return 'エラーが発生しました。しばらく時間をおいてお試しください';
        }
    }
  },
}

export const getters = {
  getUserData(state) {
    return state.userData
  },
  getAuthStatus(state) {
    return state.authStatus
  },
  getErrorMessage(state) {
    return state.errorMessage
  }
}