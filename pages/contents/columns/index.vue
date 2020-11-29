<template>
    <PostList
    :exist-posts="loadedColumnPosts"
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
  // loadedColumnPostsに格納してv-forで描画
  async asyncData({ params }){
    const loadedColumnPosts = []
    await db.collection("column").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedColumnPosts.push(doc.data())
      });
    });

    // 分割代入で配列からオブジェクトを取り出す

    return { loadedColumnPosts }
  },
  data() {
    return {
      // columnPostPreviewへのpath
      postPath: '/contents/columns/'
    }
  }

}
</script>
