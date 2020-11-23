<template>
  <PostForm
  :post-data="loadedColumData"
  @submit="postContents">Edit Colum</PostForm>

</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostForm
  },
  async asyncData({ params }){
    const loadedColumData = await db.collection("colum").doc(params.id).get().then(doc => doc.data());
    return { loadedColumData }
  },
  methods: {
    // Form送信でFireStore(collection:colum)にデータ格納
    async postContents(newPost) {
      await this.$store.dispatch('colum/postContents', newPost)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>