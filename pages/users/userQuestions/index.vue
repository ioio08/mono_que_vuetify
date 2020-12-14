<template>
  <!-- Userが投稿したQuestion一覧 -->
  <PostList
  :exist-posts="userQuestions"
  :post-path="postPath"
  :tags="tags"
  >質問</PostList>
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

// ユーザー固有の質問と関連するタグを取得
  async asyncData({ store }){
  // uidを取得
    const uid = store.getters['auth/getUid']

  // uidが一致するドキュメントのみを取得する
  // postPath をuserQuestionsに設定
    const userQuestions = []
    await db.collection('question')
    .where('text.uid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userQuestions.push(doc.data())
      })
    });

    // 関連するタグのみを取得する
    await store.dispatch('tag/initUserTags', uid)
    const tags = await store.getters['tag/getQuestionTags']

    return { userQuestions, tags }
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