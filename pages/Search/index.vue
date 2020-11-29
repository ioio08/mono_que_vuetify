<template>
    <PostList
    :exist-posts="searchTagPosts"
    :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostList
  },
  // columnコレクションの全てのデータを取得
  // searchTagPostsに格納してv-forで描画
  async asyncData({ params }){
    const searchTagPosts = []
    await db.collection("column").where('tags', '==', this.searchTerm).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        searchTagPosts.push(doc.data())
      });
    });
    await db.collection("Question").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        searchTagPosts.push(doc.data())
      });
    });

    // 分割代入で配列からオブジェクトを取り出す
    return { searchTagPosts }
  },
  data() {
    return {
      // columnPostPreviewへのpath
      postPath: '/Search/'
    }
  }

}
</script>
