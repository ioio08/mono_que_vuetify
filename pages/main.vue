<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">

      <!-- Components  "Question" "Colum" -->
      <div class="text-center">

        <!-- Question component -->
        <PostList
        :exist-posts="loadedQuestionPosts"
        :post-path="postQuestionPath">質問</PostList>

        <!-- Colum component -->
        <PostList
        :exist-posts="loadedColumPosts"
        :post-path="postColumPath">コラム</PostList>
      </div>

      <!-- Keywords Card -->
      <v-card style="background-color: #C5CAE9" class="keyword">
        <v-card-title>
          カテゴリー
        </v-card-title>
        <v-chip-group column >
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

  // Colums, Questions のPostDataをFirebaseから取得してレンダリング
  async asyncData({ params }){
    const loadedColumPosts = []
    await db.collection("colum").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedColumPosts.push(doc.data())
      });
    });

    const loadedQuestionPosts = []
    await db.collection("question").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedQuestionPosts.push(doc.data())
      });
    });

    // 分割代入で配列からオブジェクトを取り出す
    return { loadedQuestionPosts, loadedColumPosts }
  },
  data() {
    return {
      page: 1,
      postQuestionPath: '/contents/questions/',
      postColumPath: '/contents/colums/',
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
