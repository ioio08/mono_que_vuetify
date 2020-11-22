<template>
  <v-card>
    <v-card-title>{{ loadedPost.title }}</v-card-title>
    <v-card-subtitle>Date:  {{ loadedPost.updatedDate }}</v-card-subtitle>
    <v-card-subtitle>Auther:  {{ loadedPost.author }}</v-card-subtitle>
    <v-divider></v-divider>
    <v-img :src="loadedPost.thumbnail" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet>{{ loadedPost.content }}</v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    asyncData (context, callcack) {
    setTimeout(() => {
      callcack(null, {
        loadedPost: {
            id: '1',
            title: "MARGIELA THE HERMES YEARS",
            author: 'Iori',
            updatedDate: new Date(),
            content: '私はこれから「マルジェラ・エルメス期」の素晴らしさについて語ろうと思う、、、',
            thumbnail: '/images/product_2.jpeg'
          },
        })
      }, 1000)
    },

  }
</script>

<style>

</style>