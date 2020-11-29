<template>
<!-- Column 編集Form -->
  <PostForm
  :post-data="loadedColumnData"
  :post-path="postPath"
  @submit="postContents">Edit Column</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostForm
  },
  async asyncData({ params }){
    const loadedColumnData = await db.collection("column").doc(params.id).get().then(doc => doc.data());

    return { loadedColumnData }
  },
  data() {
    return {
      // columnPostPreviewへのpath
      postPath: '/users/userColumns/'
    }
  },
  methods: {
    // Form送信でFireStore(collection:column)にデータ格納
    async postContents(newPost) {
      await this.$store.dispatch('column/postContents', newPost)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>