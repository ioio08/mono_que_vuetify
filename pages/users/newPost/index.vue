<template>
  <v-card>
    <v-card-title><h2>New Post</h2> </v-card-title>
    <v-form @submit.prevent="submit">
      <!-- 著者名 -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="postData.author"
        prepend-icon="mdi-account-circle-outline"
        label="Please write your name"
        ></v-text-field>
      </v-card-actions>

      <!-- タイトル -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="postData.title"
        prepend-icon="mdi-fountain-pen"
        label="Please write post title"
        ></v-text-field>
      </v-card-actions>

      <!-- イメージ画像 -->
      <v-card-actions style="width:500px; ">
        <v-btn
        color="primary"
        depressed
        :loading="isSelecting"
        @click="onButtonClick"
        >
          <v-icon>mdi-image</v-icon>アップロード
        </v-btn>

        <!-- イメージ画像の描画 -->
        <v-card-text>
          <v-img v-if="postData.image" :src="postData.image" style="width:200px;"/>
        </v-card-text>
        <!-- イメージ画像のアップロード用 input -->
        <input
          ref="file"
          style="display:none;"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        >
      </v-card-actions>

      <!-- Post 本文 -->
      <v-card-actions style="width:800px;">
        <v-textarea
        v-model="postData.content"
        label="Please write body contents"
        outlined
        auto-grow
        rows="8"
        row-height="20"
        ></v-textarea>
      </v-card-actions>

      <!-- submit button -->
      <v-card-actions>
        <v-btn  color="primary" type="submit">Post</v-btn>
      </v-card-actions>
    </v-form>
    <v-card>
      {{ postDatas.author }}
      {{ postDatas.title }}
      {{ postDatas.image }}
      {{ postDatas.content }}
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
   computed: {
  ...mapState('newpost', ['postDatas']),
  },
  data() {
    return {
      postData:{
        author:"",
        title:"",
        image: null,
        content:"",
      },
      isSelecting: false,
    }
  },
  methods: {
    // イメージ画像読み込み中のローディング
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.file.click()
    },

    // 選択されたイメージ画像をpostData.imageに代入
    onFileChanged(e) {
      const fileImg = e.target.files[0]
      this.postData.image = window.URL.createObjectURL(fileImg);
    },

    // formイベント：submit button で発火
    onSavePostData() {
      this.$store.commit('newpost/setPostData', {
        author: this.postData.author,
        title: this.postData.title,
        image: this.postData.image,
        content: this.postData.content
      })
    },

    submit () {
      const db = firebase.firestore()
      let dbUsers = db.collection('posts')
      dbUsers
        .add({
          author: this.postData.author,
          title: this.postData.title,
          image: this.postData.image,
          content: this.postData.content
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },
  },

}
</script>

<style lang="scss" scoped>


</style>