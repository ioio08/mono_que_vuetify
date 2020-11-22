<template>
  <v-card style="text-alighn: center">
    <v-card-title><h2>New [slot] Post</h2></v-card-title>
    <v-divider></v-divider>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="10" sm="8" >
          <v-form @submit.prevent="postContents">
            <!-- 著者名 -->
            <v-card-actions >
              <v-text-field
              v-model="newPosts.text.author"
              prepend-icon="mdi-account-circle-outline"
              label="Please write your name"
              ></v-text-field>
            </v-card-actions>

            <!-- タイトル -->
            <v-card-actions >
              <v-text-field
              v-model="newPosts.text.title"
              prepend-icon="mdi-fountain-pen"
              label="Please write post title"
              ></v-text-field>
            </v-card-actions>

            <!-- イメージ画像 -->
            <v-card-actions >
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
            <v-card-actions>
              <v-textarea
              v-model="newPosts.text.content"
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import PostForm from '@/components/Posts/PostForm'
import { db, storage } from '~/plugins/firebase'

export default {

  data() {
    return {
      newPosts:{
        text: {
          author:'',
          title:'',
          content:'',
        },
        images:{
          image:null,
          name:'',
        }
      },
      preview:'',
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
      this.newPosts.images.image = file
      const reader = new FileReader()
      reader.onload = e => {
        this.preview = e.target.result
        this.newPosts.images.name = file.name
      }
      reader.readAsDataURL(file)
    },

    // Form送信でFireStore(collection:newPosts)にデータ格納
    async postContents() {
      await this.$store.dispatch('newpost/postContents', this.newPosts)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>