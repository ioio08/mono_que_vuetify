<template>
    <PostList
    :exist-posts="setColumn"
    :post-path="postPath">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  components: {
    PostList
  },
  // vuexfireでfirestoreとリアルタイムバインディング
  // created()で非同期通信を終わらせておく
  created() {
    this.$store.dispatch('column/setColumnsRef', db.collection('column'))
  },

  // column/setColumnsRef actionsをcreated()で初期化した状態でgetters
  computed: {
    ...mapGetters({ setColumn: 'column/setColumnPost' })
  },

  data() {
    return {
      // columnPostPreviewへのpath
      postPath: '/contents/columns/'
    }
  }

}
</script>
