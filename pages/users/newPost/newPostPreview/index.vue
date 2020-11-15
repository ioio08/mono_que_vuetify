<template>
  <v-card>
    <v-card-title>{{ newPostsData[0].title }}</v-card-title>
    <v-card-subtitle>Date: {{ new Date().toLocaleDateString() }}</v-card-subtitle>
    <v-card-subtitle>Auther:  {{ newPostsData[0].author }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="newPostsData[0].image" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ newPostsData[0].content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import db from '@/plugins/firebase'


export default {
  async asyncData({context}){
    const newPostsData = []
    await db.collection('newPosts').where('author', '==', 'iori').get()
    .then(snap =>{
      snap.forEach(doc => {
        newPostsData.push(doc.data())
      })
    })
    return {
      newPostsData: newPostsData
    }
  }
  // async asyncData() {
  //   return db.collection('posts').where('author', '==', 'iori').get()
  //     .then(querySnapshot => {
  //       let postsData = []
  //       snapShot.forEach(doc => {
  //         postsData.push({
  //           title : doc.data().title,
  //           author : doc.data().author,
  //           image : doc.data().image,
  //           content : doc.data().content,
  //           id : doc.id,
  //         })
  //       })
  //       return postsData[0]
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       return
  //     })
  // },

}
</script>

<style>

</style>