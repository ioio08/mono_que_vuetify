<template>
<!-- Colum 新規登録Form -->
  <PostForm @submit="postContents">新しいコラムを投稿する</PostForm>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'

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
}
</script>
