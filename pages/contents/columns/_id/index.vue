<template>
  <v-card>

    <!-- ページ上部 -->
    <v-card-title><h2>{{ loadedColumnData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <h3>Author:  {{ loadedColumnData.text.author }}</h3>
          Date:  {{ loadedColumnData.text.postDay }}
    </v-card-subtitle>

    <v-chip-group column v-if="loadedColumnData.tags.length > 0">
      <v-chip
      v-for="tag in loadedColumnData.tags"
      :key="tag">
      {{ "#" + " " + tag }}

      </v-chip>
    </v-chip-group>



    <!-- ColumnsPost 一覧 button -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
    </v-card-actions>

    <v-divider></v-divider>

    <!-- ページ下部 -->
    <v-img :src="loadedColumnData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ loadedColumnData.text.content }}</pre></h2> </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData({ params }){
    const loadedColumnData = await db.collection("column")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { loadedColumnData }
  },
  methods: {
    onBackPage() {
      this.$router.push('/contents/columns')
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