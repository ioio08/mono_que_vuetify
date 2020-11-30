<template>
    <PostList
    :exist-posts="setQuestion"
    :post-path="postPath">質問</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  components: {
    PostList
  },
  // vuexfireでfirestoreとリアルタイムバインディング(asyncより早い)
  // created()で非同期通信を終わらせておく
  created() {
    this.$store.dispatch('question/setQuestionRef', db.collection('question'))
  },
  // question/setQuestionRef actionsをcreated()で初期化した状態でgetters
  computed: {
    ...mapGetters({ setQuestion: 'question/setQuestionPost' })
  },
  data() {
    return {
      // questionPostPreviewへのpath
      postPath: '/contents/questions/'
    }
  }
}
</script>