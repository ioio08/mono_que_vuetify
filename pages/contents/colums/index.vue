<template>
    <PostList
    :exist-posts="loadedColumDatas"
    :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'

export default {
  // columコレクションの全てのデータを取得
  // loadedColumDatasに格納してv-forで描画
  async asyncData({ params }){
    const loadedColumDatas = []
    await db.collection("colum").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        loadedColumDatas.push(doc.data())
      });
    });
    // 分割代入で配列からオブジェクトを取り出す
    return { loadedColumDatas }
  },
  data() {
    return {
      // columPostPreviewへのpath
      postPath: 'colums/'
    }
  }

}
</script>
