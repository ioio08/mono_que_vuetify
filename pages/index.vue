<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">
      <Explain v-show="user === false"><v-btn to="/admins/about" style="margin-top:5%;" v-bind="size">
        アプリについてはこちら
      </v-btn> </Explain>

      <!-- Components  "Question" "Column" -->
        <!-- Column component -->
        <PostList
        :exist-posts="columns"
        :post-path="columnPath"
        :tags="columnTags"
        >コラム</PostList>

        <!-- Question component -->
        <PostList
        :exist-posts="questions"
        :post-path="questionPath"
        :tags="questionTags"
        >質問</PostList>

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
      columns: 'column/getColumns',
      columnTags: 'tag/getColumnTags',
      questions: 'question/getQuestions',
      questionTags: 'tag/getQuestionTags',
      user: 'auth/authStatus'
    }),
    size () {
      const size = {xs:'x-small',sm:'small',lg:'large',xl:'x-large'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    }
  },
  created() {
    this.$store.dispatch('question/setQuestionRef', db.collection('question'))
    this.$store.dispatch('column/setColumnRef', db.collection('column'))
    this.$store.dispatch('tag/initAllTags')
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

.v-btn {

  @include tab {
    font-size: .4rem;
  }
}
</style>
