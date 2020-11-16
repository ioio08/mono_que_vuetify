<template>
    <PostList :exist-posts="columsPosts" :post-path="columsPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('colum', ['columsPosts'])
  },
  data() {
    return {
      columsPath: '/contents/colums/',
    }
  }

}
</script>
