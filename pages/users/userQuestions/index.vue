<template>
  <!-- Userが投稿したQuestion一覧 -->
  <PostList
  :exist-posts="userQuestions"
  :post-path="postPath">質問</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'

export default {
  // ログイン中のみ確認できる用に制御
  middleware : 'authenticated',
  components: {
    PostList
  },

  // uidが一致するドキュメントのみを取得する
  // postPath をuserQuestionsに設定
  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userQuestions = []
    await db.collection('question')
    .where('text.uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userQuestions.push(doc.data())
      })
    });

    return { userQuestions }
  },
  data:()  => ({
    postPath: '/users/userQuestions/'
  })
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