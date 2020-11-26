import { auth } from '~/plugins/firebase.js'


export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // ** ログイン済のユーザー
        console.log('ok!!Login User!!')
        const users = {}
        users.email = user.email
        users.uid = user.uid

        let authStatus = true
        store.commit('auth/setUser', users)
        store.commit('auth/setAuthStatus', authStatus)
        resolve(users)
      } else {
        // ** ログインしていないユーザーもしくは認証が切れている
        console.log("not login");
        let authStatus = false
        store.commit('auth/setAuthStatus', authStatus)
        resolve(false)
      }
    })
  })
}