<template>
<!-- Column 編集Form -->
  <PostForm
  :post-data="loadedColumnData"
  :post-path="postPath"
  :user-datas="userDatas"
  @submit="postContents">コラム 編集</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostForm
  },
  async asyncData({ params, store }){
    // ColumnのPostデータを取得
    const loadedColumnData = await db.collection("column").doc(params.id).get().then(doc => doc.data());

    // uidを取得
    const uid = store.getters['auth/getUid']
    let userDatas;
    await db.collection('users').doc(uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    return { loadedColumnData, userDatas }
  },
  data() {
    return {
      // columnPostPreviewへのpath
      postPath: '/users/userColumns/'
    }
  },
  methods: {
    // Form送信でFireStore(collection:column)にデータ格納
    postContents(newPost) {
      this.$store.dispatch('column/postContents', newPost)
    },
  },

}
</script>
