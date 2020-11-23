<template>
  <PostForm
  :post-data="loadeQuestionData"
  :post-path="postPath"
  @submit="postContents">Edit Question</PostForm>

</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db } from '~/plugins/firebase'

export default {
  components: {
    PostForm
  },
  async asyncData({ params }){
    const loadeQuestionData = await db.collection("question").doc(params.id).get().then(doc => doc.data());
    return { loadeQuestionData }
  },
  data() {
    return {
      // questionPostPreviewへのpath
      postPath: '/contents/questions/'
    }
  },
  methods: {
    // Form送信でFireStore(collection:question)にデータ格納
    async postContents(newPost) {
      await this.$store.dispatch('question/postContents', newPost)
    },
  },


}
</script>

<style lang="scss" scoped>


</style>