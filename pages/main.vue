<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">

      <!-- Components  "Question" "Column" -->
      <div class="text-center">

        <!-- Question component -->
        <PostList
        :exist-posts="loadedQuestionPosts"
        :post-path="postQuestionPath">質問</PostList>

        <!-- Column component -->
        <PostList
        :exist-posts="loadedColumnPosts"
        :post-path="postColumnPath">コラム</PostList>
      </div>

      <!-- Keywords Card -->
      <v-card style="background-color: #C5CAE9" class="keyword">
        <v-card-title>
          カテゴリー
        </v-card-title>
        <v-chip-group columnn >
          <v-chip
          v-for="keyword in keywords"
          :key="keyword.title"
          :to="keyword.to"
          link
          >{{ "#" + " " + keyword.title }}</v-chip>
        </v-chip-group>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

// pages
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('keyword', ['keywords'])
  },
  components: {
    PostList
  },

  // Columns, Questions のPostDataをFirebaseから取得してレンダリング
  async asyncData({ params }){
    const loadedColumnPosts = []
    await db.collection("column").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedColumnPosts.push(doc.data())
      });
    });

    const loadedQuestionPosts = []
    await db.collection("question").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedQuestionPosts.push(doc.data())
      });
    });

    // 分割代入で配列からオブジェクトを取り出す
    return { loadedQuestionPosts, loadedColumnPosts }
  },
  data() {
    return {
      page: 1,
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
