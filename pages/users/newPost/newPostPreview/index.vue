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
import { mapState } from 'vuex'

export default {
  computed: {
  ...mapState('newpost/newpost', ['postData']),
  },
  methods: {

  },

}
</script>

<style>

</style>