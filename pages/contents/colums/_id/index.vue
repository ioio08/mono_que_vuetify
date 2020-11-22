<template>
  <v-card>
    <v-card-title><h2>{{ loadedColumData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle><h3>Author:  {{ loadedColumData.text.author }}</h3> Date:  {{ loadedColumData.text.postDay }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="loadedPost.thumbnail" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ loadedPost.content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { db } from '~/plugins/firebase'
export default {
  async asyncData({ params }){
    const loadedColumData = await db.collection("colum").doc(params.id).get().then(doc => doc.data());
    return { loadedColumData }
  },
}
</script>

<style>

</style>