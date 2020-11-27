export default ({ store, route, redirect }) => {

  // routing の際に ログイン状態によって制御
  // store.getters['auth/authStatus'] : true:ログイン中, false: 未ログイン
  if (!store.getters['auth/authStatus'] && route.name !== 'login' ) {
    redirect('/auth/login')
  }


}