<template>
  <PostList
  :exist-posts="userQuestionDatas"
  :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db, storage } from '~/plugins/firebase'

export default {
  middleware : 'authenticated',
  
  // uidが一致するドキュメントのみを取得する
  // postPath をuserQuestionsに設定
  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userQuestionDatas = []
    await db.collection('question')
    .where('text.uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userQuestionDatas.push(doc.data())
      })
    });
    return { userQuestionDatas }
  },
  methods: {
    onBackPage() {
      this.$router.push('/users/userQuestions')
    },
    onEdit() {
      this.$router.push('/users/post/question/' + this.$route.params.id)
    },
    deletePost() {
      // ドキュメントの削除
      db.collection("question").doc(this.userQuestionDatas.text.docId).delete()
      .catch(err => {
        console.error("Error removing document: ", err);
      });

      // FireStorageのimage削除
      const deleteRef = storage.ref().child('images/' + this.userQuestionDatas.image.src)
      deleteRef.delete().catch(err => {
        console.log('エラー:' + err)});

      this.onBackPage()
    },
  },
  data() {
    return {
      dialog: false,
      postPath: '/users/userQuestions/'
    }
  }
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