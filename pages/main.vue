<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">

      <!-- Components  "Question" "Column" -->
      <div class="text-center">

        <!-- Question component -->
        <PostList
        :exist-posts="setQuestion"
        :post-path="postQuestionPath">質問</PostList>

        <!-- Column component -->
        <PostList
        :exist-posts="setColumn"
        :post-path="postColumnPath">コラム</PostList>
      </div>

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
    this.$store.dispatch('tagKeyword/setColumnTag')
  },
  data() {
    return {
      postQuestionPath: '/contents/questions/',
      postColumnPath: '/contents/columns/',
    }
  }
}
</script>

<style lang="scss" >
// keyword
.keyword {
  padding-bottom: 20px;
}

.v-chip-group {
  background: rgb(187, 222, 251);
  padding: 10px 0;
}

.v-chip {
  margin: 4px 8px 4px 4px !important;
}

.tab {
  @include tab {
    display: none;
  }
}
</style>
