<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">
      <!-- <Explain/> -->

      <!-- Components  "Question" "Column" -->
        <!-- Column component -->
        <PostList
        :exist-posts="columns"
        :post-path="columnPath">コラム</PostList>

        <v-divider style="margin-bottom:5%;"></v-divider>

        <!-- Question component -->
        <PostList
        :exist-posts="questions"
        :post-path="questionPath">質問</PostList>

    </v-col>
  </v-row>
</template>

<script>

// pages
import PostList from '@/components/Posts/PostList'
import Explain from '~/components/UI/Explain'
import { db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  components: {
    PostList,
    Explain,
  },
  computed: {
    ...mapGetters({
      questions: 'question/getQuestions',
      columns: 'column/getColumns'
      })
  },
  created() {
    this.$store.dispatch('question/setQuestionRef', db.collection('question'))
    this.$store.dispatch('column/setColumnRef', db.collection('column'))
  },
  data() {
    return {
      questionPath: '/contents/questions/',
      columnPath: '/contents/columns/',
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
