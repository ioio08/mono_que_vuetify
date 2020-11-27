export default ({ store, route, redirect }) => {

  // routing の際に ログイン状態によって制御
  // store.getters['auth/authStatus'] : true:ログイン中, false: 未ログイン
  if (!store.getters['auth/authStatus'] && route.name !== 'login' && route.name !== 'users') {
    console.log(route);
    redirect('/auth/login')
  }
    console.log(route);

}