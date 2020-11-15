<template>
  <v-card>
    <v-card-title>{{ postsData.title }}</v-card-title>
    <v-card-subtitle>Date: {{ new Date().toLocaleDateString() }}</v-card-subtitle>
    <v-card-subtitle>Auther:  {{ postsData.author }}</v-card-subtitle>
    <v-card-subtitle>Auther:  {{ postsData.id }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="postsData.image" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ postsData.content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import db from '@/plugins/firebase'

export default {
  async asyncData() {
    return db.collection('posts').where('author', '==', 'iori').get()
      .then(querySnapshot => {
        let postsData = []
        snapShot.forEach(doc => {
          postsData.push({
            title : doc.data().title,
            author : doc.data().author,
            image : doc.data().image,
            content : doc.data().content,
            id : doc.id,
          })
        })
        return postsData[0]
      })
      .catch(error => {
        console.log(error)
        return
      })
  },

}
</script>

<style>

</style>