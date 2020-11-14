<template>
  <v-card>
    <v-card-title>{{ postData.title }}</v-card-title>
    <v-card-subtitle>Date: {{ new Date().toLocaleDateString() }}</v-card-subtitle>
    <v-card-subtitle>Auther:  {{ postData.author }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="postData.image" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ postData.content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  async asyncdata() {
    let postData = [];
    console.log(postData);

    await firebase.firestore()
    .collection("posts")
    .where('author', '==', 'iori')
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot)
      snapShot.forEach(doc => {
        console.log(doc.data)
        postsData.push({
          title: doc.data().title,
          author: doc.data().author,
          image: doc.data().image,
          content: doc.data().content,
        })
        console.log(postsData)

      })
    })

    return postData
  },
  // data() {
  //   return {
  //     postsData: [],
  //   }
  // },
  methods: {

  },

}
</script>

<style>

</style>