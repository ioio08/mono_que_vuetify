<template>
  <v-card>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card-title style="padding:30px"><h1>{{ newPost[0].text.title }}</h1></v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle style="padding: 20px 30px"><h2 style="margin-bottom: 10px">Auther:  {{ newPost[0].text.author }}</h2> Date: {{ newPost[0].text.postDay }} </v-card-subtitle>
          <v-divider></v-divider>
          <v-img :src="newPost[0].image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
          <v-card-text>
            <v-sheet><h2><pre>{{ newPost[0].text.content }}</pre></h2></v-sheet>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { db, storage } from '~/plugins/firebase'

export default {
  async asyncData({context}){
    const newPost = []
    await db.collection('newPost').get()
    .then(snap =>{
      snap.forEach(doc => {
        newPost.push(doc.data())
      })
    })
    return {
      newPost: newPost
    }
  }

}
</script>

<style lang="scss" scoped>
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