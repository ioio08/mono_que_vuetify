<template>
    <PostList
    :exist-posts="loadedQuestionPosts"
    :post-path="postPath">質問</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'

export default {
  // questionコレクションの全てのデータを取得
  // loadedQuestionPostsに格納してv-forで描画
  async asyncData({ params }){
    const loadedQuestionPosts = []
    await db.collection("question").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedQuestionPosts.push(doc.data())
      });
    });
    // 分割代入で配列からオブジェクトを取り出す
    return { loadedQuestionPosts }
  },
  data() {
    return {
      // questionPostPreviewへのpath
      postPath: '/contents/questions/'
    }
  }
}
</script>