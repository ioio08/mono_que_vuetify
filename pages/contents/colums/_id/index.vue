<template>
  <v-card>
    <v-card-title><h2>{{ loadedColumData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle><h3>Author:  {{ loadedColumData.text.author }}</h3> Date:  {{ loadedColumData.text.postDay }}</v-card-subtitle>
    
    <!-- Edit-btn , Delete-btn -->
    <v-card-actions>
      <v-btn @click="onEdit">Edit</v-btn>
      <v-btn>Delete</v-btn>
    </v-card-actions>
    <v-divider></v-divider>
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
    const loadedColumData = await db.collection("colum").doc(params.id).get().then(doc => doc.data());
    return { loadedColumData }
  },
  methods: {
    onEdit() {
      this.$router.push('/users/post/colum/' + this.$route.params.id)
    }
  }
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