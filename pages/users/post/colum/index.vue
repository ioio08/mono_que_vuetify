<template>
  <PostForm @submit="postContents">New Colum</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'

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