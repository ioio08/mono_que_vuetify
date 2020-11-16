<template>
  <v-card>
    <v-card-title><h2>New Colum Post</h2> </v-card-title>
    <v-form @submit.prevent="postContents">
      <!-- 著者名 -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="author"
        prepend-icon="mdi-account-circle-outline"
        label="Please write your name"
        ></v-text-field>
      </v-card-actions>

      <!-- タイトル -->
      <v-card-actions style="width:400px; ">
        <v-text-field
        v-model="title"
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
          <v-img v-if="preview" :src="preview" style="width:200px;"/>
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
        v-model="content"
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
import firebase from "firebase/app"
import db from "~/plugins/firebase";

export default {

  data() {
    return {
      author:'',
      title:'',
      image:null,
      preview:'',
      imageName:'',
      content:'',
      isSelecting: false,
    }
  },
  methods: {
    // イメージ画像読み込み中のローディング切り替え
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.file.click()
    },

    // 選択された画像ファイルの設定(1.描画 2.アップロードの準備)
    onFileChanged(e) {
      // fileに選択した画像ファイル格納
      const file = e.target.files[0]
      this.image = file
      const reader = new FileReader()
        reader.onload = e => {
          this.preview = e.target.result
          this.imageName = file.name
        }
        reader.readAsDataURL(file)
    },

    // Form送信でFireStore(collection:newPosts)にデータ格納
    async postContents() {
      const d = new Date()
      const today = d.toLocaleDateString()

      const contents = {
        text: {
          created_at: today,
          author: this.author,
          title: this.title,
          content: this.content
        },
        image: {
          image: this.image,
          name: this.imageName
        }
      }

      await this.$store.dispatch('newpost/postContents', contents)

      this.$router.push('/users/newPost/newPostPreview')

      // データの初期化
      this.author = '',
      this.title = '',
      this.image = null,
      this.preview = '',
      this.imageName = '',
      this.content = ''
    },
  },

}
</script>

<style lang="scss" scoped>


</style>