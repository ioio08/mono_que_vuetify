<template>
    <PostList
    :exist-posts="loadedColumPosts"
    :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostList
  },
  // columコレクションの全てのデータを取得
  // loadedColumPostsに格納してv-forで描画
  async asyncData({ params }){
    const loadedColumPosts = []
    await db.collection("colum").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedColumPosts.push(doc.data())
      });
    });

    // 分割代入で配列からオブジェクトを取り出す
    return { loadedColumPosts }
  },
  data() {
    return {
      // columPostPreviewへのpath
      postPath: '/contents/colums/'
    }
  }

}
</script>
