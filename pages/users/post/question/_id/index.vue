<template>
<!-- Question 編集Form -->
  <PostForm
  :post-data="loadeQuestionData"
  :post-path="postPath"
  :user-datas="userDatas"
  @submit="postContents">質問 編集</PostForm>

</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostForm
  },
  async asyncData({ params, store }){
    // QuestionのPostデータを取得
    const loadeQuestionData = await db.collection("question").doc(params.id).get().then(doc => doc.data());

    // ユーザーデータを取得
    const user = store.getters['auth/user']
    let userDatas;
    await db.collection('users').doc(user.uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    return { loadeQuestionData, userDatas }
  },
  data() {
    return {
      // questionPostPreviewへのpath
      postPath: '/users/userQuestions/'
    }
  },
  methods: {
    // Form送信でFireStore(collection:question)にデータ格納
    async postContents(newPost) {
      await this.$store.dispatch('question/postContents', newPost)
    },
  },


}
</script>

<style lang="scss" scoped>


</style>