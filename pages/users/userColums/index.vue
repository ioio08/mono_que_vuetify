<template>
<!-- Userが投稿したColum一覧 -->
  <PostList
  :exist-posts="userColumDatas"
  :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db, storage } from '~/plugins/firebase'

export default {
  // ログイン中のみ確認できる用に制御
  middleware : 'authenticated',

  // uidが一致するドキュメントのみを取得する
  // postPath をuserColumsに設定
  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userColumDatas = []
    await db.collection('colum')
    .where('text.uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userColumDatas.push(doc.data())
      })
    });

    return { userColumDatas }
  },
  data:() => ({
      postPath: '/users/userColums/'
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