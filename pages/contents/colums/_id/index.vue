<template>
  <v-card>
    <v-card-title>{{ loadedColumData.text.title }}</v-card-title>
    <v-card-subtitle>Date:  {{ loadedColumData.text.postDay }}</v-card-subtitle>
    <v-card-subtitle>Author:  {{ loadedColumData.text.author }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="loadedColumData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ loadedColumData.text.content }}</v-sheet>
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