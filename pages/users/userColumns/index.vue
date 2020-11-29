<template>
<!-- Userが投稿したColumn一覧 -->
  <PostList
  :exist-posts="userColumnDatas"
  :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db, storage } from '~/plugins/firebase'

export default {
  // ログイン中のみ確認できる用に制御
  middleware : 'authenticated',

  // uidが一致するドキュメントのみを取得する
  // postPath をuserColumnsに設定
  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userColumnDatas = []
    await db.collection('column')
    .where('text.uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userColumnDatas.push(doc.data())
      })
    });

    return { userColumnDatas }
  },
  data:() => ({
      postPath: '/users/userColumns/'
  }),
}
</script>

<style>

.v-card__title {
  text-align: center !important;
}

.v-card__text {
  padding-bottom: 5%;
  max-width: 100%;
}

pre {
  white-space: pre-wrap ;
  line-height: 2rem;
  letter-spacing: 3px;
  font-weight: normal;
}

</style>