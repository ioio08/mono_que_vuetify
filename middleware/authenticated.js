export default ({ store, route, redirect }) => {

  // routing の際に、 ログイン状態によってページ遷移を制御できる設定
  // store.getters['auth/authStatus'] : true, false でログイン状態が返却される。
  // true: ログイン中,  false: 未ログイン => ログインページに遷移させる。
  if (!store.getters['auth/authStatus'] && route.name !== 'login' ) {
    redirect('/auth/login')
  }


}