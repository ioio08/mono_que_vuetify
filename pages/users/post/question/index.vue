<template>
  <PostForm @submit="postContents">Question</PostForm>
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
      await this.$store.dispatch('question/postContents', newPost)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>