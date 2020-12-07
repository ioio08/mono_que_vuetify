<template>
<!-- Userが投稿したColumn一覧 -->
  <PostList
  :exist-posts="userColumns"
  :post-path="postPath"
  :tags="columnTags"
  >コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { db, storage } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  // ログイン中のみ確認できる用に制御
  middleware : 'authenticated',
  components: {
    PostList
  },

  // uidが一致するドキュメントのみを取得する
  // postPath をuserColumnsに設定
  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userColumns = []
    await db.collection('column')
    .where('text.uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userColumns.push(doc.data())
      })
    });

    return { userColumns }
  },
  created() {
    this.$store.dispatch('tag/initUserTags', this.$store.getters['auth/user'].uid)
  },
  computed: {
    ...mapGetters({
      columnTags: 'tag/getColumnTags',
    })
  },
  data:() => ({
      postPath: '/users/userColumns/'
  }),
}
</script>

<style>

.v-card__title {
  text-align: center !important;
}

.v-card__text {
  padding-bottom: 5%;
  max-width: 100%;
}

pre {
  white-space: pre-wrap ;
  line-height: 2rem;
  letter-spacing: 3px;
  font-weight: normal;
}

</style>