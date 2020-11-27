<template>
  <v-card>

    <!-- ページ上部 -->
    <v-card-title><h2>{{ loadedQuestionData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <h3>Author: {{ loadedQuestionData.text.author }}</h3>
          Date:  {{ loadedQuestionData.text.postDay }}
    </v-card-subtitle>

    <!-- QuestionsPost 一覧 button -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <!-- ページ下部 -->
    <v-img :src="loadedQuestionData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ loadedQuestionData.text.content }}</pre></h2> </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData({ params }){
    const loadedQuestionData = await db.collection("question")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { loadedQuestionData }
  },
  methods: {
    onBackPage() {
      this.$router.push('/contents/questions')
    },
  },
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