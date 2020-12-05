<template>
    <PostList
    :exist-posts="columns"
    :post-path="columnPath">コラム</PostList>
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
    this.$store.dispatch('column/setColumnRef', db.collection('column'))
  },
  // column/setColumnsRef actionsをcreated()で初期化した状態でgetters
  computed: {
    ...mapGetters({ columns: 'column/getColumns' })
  },
  data() {
    return {
      // columnPostPreviewへのpath
      columnPath: '/contents/columns/'
    }
  }

}
</script>
