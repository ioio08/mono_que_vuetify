export default ({ $fireModule }, inject) => {
  const db = $fireModule.firestore
  const auth = $fireModule.auth
  const storage= $fireModule.storage
  const columnRef= db().collection('column')
  const questionRef= db().collection('question')
  const usersRef = db().collection('users')

  const fb = { db, auth, storage, columnRef, questionRef, usersRef }
  inject('fb', fb)
}
// this.$fb. で参照できる

