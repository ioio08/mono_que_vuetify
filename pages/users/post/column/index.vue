<template>
<!-- Colum 新規登録Form -->
  <PostForm :user-datas="userDatas" @submit="postContents">新しいコラムを投稿する</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'


export default {
  // ログイン中のみ参照できる様に制御
  middleware : 'authenticated',
  components: {
    PostForm
  },
  methods: {
    // Form送信でFireStore(collection:colum)にデータ格納
    async postContents(newPost) {
      await this.$store.dispatch('column/postContents', newPost)
    },
  },
  async asyncData({ store }){
    const user = store.getters['auth/user']
    // ログイン中のユーザー情報を取得
    let userDatas;
    await db.collection('users').doc(user.uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    return { userDatas }
  },
}
</script>
