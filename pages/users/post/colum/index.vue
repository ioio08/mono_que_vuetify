<template>
  <PostForm @submit="postContents">Colum</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'
// import { db, storage } from '~/plugins/firebase'

export default {
  components: {
    PostForm
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