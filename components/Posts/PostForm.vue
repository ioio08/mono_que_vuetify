<template>
  <v-card style="text-alighn: center">
    <!-- Colum, Questionによってタイトル変更 -->
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

            <v-card-actions>
              <!-- submit: onPost()メソッド -->
              <v-btn color="primary" type="submit">投稿</v-btn>

              <!-- click: onCancel()メソッド -->
              <v-btn @click="onCancel">戻る</v-btn>
            </v-card-actions>

          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  props: {
    // Colum, Questionからデータ受け取り
    postData: {
      type: Object,
      required: false
    },
    // Colum, Quesitonを分岐させるため
    postPath: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      // 新規投稿・編集によってnewPostの設定を調整する三項演算子
      // 新規登録：this.postData = null なので、初期値の設定
      // 編集：this.postData がpropsで渡され、newPostとして設定
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
        },
        tag: {}
      },
      // 画像のアップロードを一旦描画する為の変数設定：三項演算子
      // 新規登録：this.postData = null なので、初期値nullの設定
      // 編集：this.postData がpropsで渡され、設定済みの写真を画面に描画
      preview: this.postData
      ? this.postData.image.src
      : null,

      // 写真の変更の有無を後の関数で確認する為の変数：三項演算子
      // 新規登録：this.postData = null なので、初期値nullの設定
      // 編集：保存済の写真データを保存しておく変数を設置
      existName: this.postData
      ? this.postData.image.name
      : null,
      // アップロードの有無
      isSelecting: false,
      // ログインの有無
      loggedIn: false,
    }
  },
  methods: {
    // 新規投稿・編集をやめる際のボタン
    onCancel() {
      this.$router.push(this.postPath + this.newPost.text.docId)
    },

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
      // fileデータをオブジェクトで保存
      this.newPost.image.src = file

      // オブジェクトのファイルを加工する
      const reader = new FileReader()
      reader.onload = e => {
        this.preview = e.target.result
        this.newPost.image.name = file.name
      }
      // previewで描画するためにURLを取得
      reader.readAsDataURL(file)
    },

    // Form送信で親コンポーネントのpostContentsメソッド発火
    onPost() {
      // Save the post
      // uid取得
      let user = this.$store.getters['auth/user']
      this.newPost.text.uid = user.uid

      // 既存の画像を受け渡す
      this.newPost.image.existName = this.existName
      this.$emit('submit', this.newPost)
    },
  },

}
</script>

<style lang="scss" scoped>


</style>