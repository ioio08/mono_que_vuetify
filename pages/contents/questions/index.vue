<template>
    <PostList
    :exist-posts="questions"
    :post-path="questionPath"
    :tags="questionTags"
    >質問</PostList>
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
    this.$store.dispatch('tag/initAllTags')
  },
  // question/getQuestionRef actionsをcreated()で初期化した状態でgetters
  computed: {
    ...mapGetters({
      questions: 'question/getQuestions',
      questionTags: 'tag/getQuestionTags',
    })
  },
  data() {
    return {
      // questionPostPreviewへのpath
      questionPath: '/contents/questions/'
    }
  }
}
</script>