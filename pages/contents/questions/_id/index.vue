<template>
  <div>
    <PostView
      :exist-post="loadedQuestion">
      <!-- QuestionsPost 一覧 button -->
      <template v-slot:commonPostActions>
        <v-divider></v-divider>
        <v-card-actions >
          <v-btn @click="onBackPage">一覧へ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </template>
    </PostView>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import PostView from '~/components/Posts/PostView'

export default {
  components: {
    PostView
  },

  async asyncData({ params }){
    const loadedQuestion = await db.collection("question")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { loadedQuestion }
  },
  methods: {
    onBackPage() {
      this.$router.push('/contents/questions')
    },
  },
}
</script>

<style lang="scss" scoped>
.v-card__actions {
  padding: 5%;
  .v-btn {
    margin-left: 10%;
  }
}

</style>