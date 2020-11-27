<template>
  <v-card>

    <!-- ページ上部 -->
    <v-card-title><h2>{{ loadedColumData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <h3>Author:  {{ loadedColumData.text.author }}</h3>
          Date:  {{ loadedColumData.text.postDay }}
    </v-card-subtitle>

    <!-- ColumsPost 一覧 button -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <!-- ページ下部 -->
    <v-img :src="loadedColumData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ loadedColumData.text.content }}</pre></h2> </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData({ params }){
    const loadedColumData = await db.collection("colum")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { loadedColumData }
  },
  methods: {
    onBackPage() {
      this.$router.push('/contents/colums')
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