<template>
  <v-card>
    <v-card-title style="padding:30px"><h1>{{ newPosts[0].text.title }}</h1></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle style="padding: 20px 30px"><h2 style="margin-bottom: 10px">Auther:  {{ newPosts[0].text.author }}</h2> Date: {{ newPosts[0].text.created_at }} </v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="newPosts[0].image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ newPosts[0].text.content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { db, storage, firebase } from '~/plugins/firebase'


export default {
  async asyncData({context}){
    const newPosts = []
    await db.collection('newPosts').get()
    .then(snap =>{
      snap.forEach(doc => {
        newPosts.push(doc.data())
      })
    })
    return {
      newPosts: newPosts
    }
  }

}
</script>

<style>

</style>