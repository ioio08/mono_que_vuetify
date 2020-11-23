<template>
  <v-card style="text-alighn: center">
    <v-card-title><h2><slot/> Post</h2></v-card-title>
    <v-divider></v-divider>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="10" sm="8" >
          <v-form @submit.prevent="onPost">
            <!-- Post: 著者名 -->
            <v-card-actions >
              <v-text-field
              v-model="newPost.text.author"
              prepend-icon="mdi-account-circle-outline"
              label="Please write your name"
              ></v-text-field>
            </v-card-actions>

            <!-- Post: タイトル -->
            <v-card-actions >
              <v-text-field
              v-model="newPost.text.title"
              prepend-icon="mdi-fountain-pen"
              label="Please write post title"
              ></v-text-field>
            </v-card-actions>

            <!-- Post画像: upload -->
            <v-card-actions >
              <v-btn
              color="primary"
              depressed
              :loading="isSelecting"
              @click="onButtonClick"
              >
                <v-icon>mdi-image</v-icon>アップロード
              </v-btn>

              <!-- Post画像: 描画 -->
              <v-card-text>
                <v-img v-if="preview" :src="preview" style="width:200px;"/>
              </v-card-text>
              <!-- Post画像:アップロード用 input -->
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
              v-model="newPost.text.content"
              label="Please write body contents"
              outlined
              auto-grow
              rows="8"
              row-height="20"
              ></v-textarea>
            </v-card-actions>

            <!-- submit button -->
            <!-- submit: onPost()メソッド -->
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
export default {
  props: {
    postData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      newPost: this.postData
      ?{ ...this.postData}
      :{
        text: {
          author:'',
          title:'',
          content:'',
        },
        image:{
          src:null,
          name:'',
        }
      },
      preview: this.postData
      ? this.postData.image.src
      : null,
      existName: this.postData
      ? this.postData.image.name
      : null,
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
      this.newPost.image.src = file
      const reader = new FileReader()
      reader.onload = e => {
        this.preview = e.target.result
        this.newPost.image.name = file.name
      }
      reader.readAsDataURL(file)
    },

    // Form送信で親コンポーネントのpostContentsメソッド発火
    onPost() {
      // Save the post
      this.newPost.image.existName = this.existName
      this.$emit('submit', this.newPost)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>