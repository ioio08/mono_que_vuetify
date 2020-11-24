export default function({ store, route, redirect }) {
    const user = store.state.users.user
    const unAuthRoute = /\authed\/*/g
    const loginRoute = '/contents/login'

  if (!user && route.path.match(unAuthRoute)) {
      // 未ログインの場合はログイン画面に戻る
      redirect('/contents/login');
    }

  if (user && route.path === loginRoute) {
      //ログイン済の場合は認証済の画面へ
        redirect("/contents/logout");
    }
}