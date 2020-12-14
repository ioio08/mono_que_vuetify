<template>
<!-- Userが投稿したColumn一覧 -->
  <PostList
  :exist-posts="userColumns"
  :post-path="postPath"
  :tags="tags"
  >コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  // ログイン中のみ確認できる用に制御
  middleware : 'authenticated',
  components: {
    PostList
  },

// ユーザー固有のコラムと関連するタグを取得
  async asyncData({ store }){
    const uid =  await store.getters['auth/getUid']

    // uidが一致するドキュメントのみを取得する
    // postPath をuserColumnsに設定
    let userColumns = []
    await db.collection('column')
    .where('text.uid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userColumns.push(doc.data())
      })
    });

    // 関連するタグのみを取得する
    await store.dispatch('tag/initUserTags', uid)
    const tags = await store.getters['tag/getColumnTags']

    return { userColumns, tags }
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