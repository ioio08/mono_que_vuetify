<template>
    <PostList :exist-posts="questionPosts" :post-path="questionsPath">質問</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('questions/question', ['questionPosts'])
  },
  data() {
    return {
      questionsPath: '/contents/questions/'
    }
  }
}
</script>