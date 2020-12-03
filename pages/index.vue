<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">

      <!-- Components  "Question" "Column" -->
        <!-- Column component -->
        <PostList
        :exist-posts="setColumn"
        :post-path="postColumnPath">コラム</PostList>

        <v-divider style="margin-bottom:5%;"></v-divider>

        <!-- Question component -->
        <PostList
        :exist-posts="setQuestion"
        :post-path="postQuestionPath">質問</PostList>

    </v-col>
  </v-row>
</template>

<script>

// pages
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      setQuestion: 'question/setQuestionPost',
      setColumn: 'column/setColumnPost'
      })
  },
  components: {
    PostList
  },
  created() {
    this.$store.dispatch('question/setQuestionRef', db.collection('question'))
    this.$store.dispatch('column/setColumnsRef', db.collection('column'))
  },
  data() {
    return {
      postQuestionPath: '/contents/questions/',
      postColumnPath: '/contents/columns/',
    }
  }
}
</script>

<style lang="scss" scoped>

.tab {
  @include tab {
    display: none;
  }
}
</style>
