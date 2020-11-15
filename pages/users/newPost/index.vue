<template>
  <v-card>
    <v-card-title><h2>New Colum Post</h2> </v-card-title>
    <v-form @submit.prevent="submit">
      <!-- 著者名 -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="postsData.author"
        prepend-icon="mdi-account-circle-outline"
        label="Please write your name"
        ></v-text-field>
      </v-card-actions>

      <!-- タイトル -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="postsData.title"
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
          <v-img v-if="postsData.image" :src="postsData.image" style="width:200px;"/>
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
        v-model="postsData.content"
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

    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import db from "~/plugins/firebase";

export default {
   computed: {
  ...mapState('newpost', ['newPostsData']),
  },
  data() {
    return {
      postsData:
      // this.newPostData
      // ? {
      //   author:this.newPostData.author,
      //   title:this.newPostData.title,
      //   image:this.newPostData.image,
      //   content:this.newPostData.content,
      //   }
      // :
      {
        author:'',
        title:'',
        image:null,
        content:'',
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

    // 選択されたイメージ画像をnewPostsData.imageに代入
    onFileChanged(e) {
      const fileImg = e.target.files[0]
      this.postsData.image = window.URL.createObjectURL(fileImg);
    },

  // Form送信でFireStore(collection:newPosts)にデータ格納
    submit () {
      db.collection('newPosts')
        .add({
          author: this.postsData.author,
          title: this.postsData.title,
          image: this.postsData.image,
          content: this.postsData.content
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