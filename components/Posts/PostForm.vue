<template>
  <div style="text-align: center">
    <v-container>
    <!-- Column, Questionによってタイトル変更 -->
    <v-card-title style="display:flex; justify-content:center"><h2><slot/></h2></v-card-title>
    <v-divider></v-divider>
      <v-row justify="center"  align="center">
        <v-col cols="10">
          <v-form @submit.prevent="onPost">
            <v-row justify="center">

              <!-- Post: タイトル -->
              <v-col cols="12" sm="10">
                <v-card-actions >
                  <v-text-field
                  v-model="newPost.text.title"
                  prepend-icon="mdi-fountain-pen"
                  label="タイトル"
                  ></v-text-field>
                </v-card-actions>
              </v-col>

              <!-- Post: タグ -->
              <v-col cols="12" sm="10">
                <v-row justify="start" align="start">
                  <v-col cols="11" sm="8">
                    <v-text-field
                    v-model="tags"
                    prepend-icon="mdi-music-accidental-sharp"
                    label="タグ"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5" sm="4">
                    <v-btn style="margin: 5% 0 0 10%" small @click="pushTags">＋ タグを追加</v-btn>
                  </v-col>
                  <v-spacer/>
                </v-row>
              </v-col>

              <v-col cols="12" sm="10"  v-show="newPost.tags.length > 0" >
                <v-chip-group column>
                  <v-chip
                  v-for="(tag, i) in newPost.tags"
                  :key="i"
                  >{{ tag }}
                    <v-icon right @click="deleteTags(i)">
                      mdi-close-circle
                    </v-icon>
                  </v-chip>
                </v-chip-group>

              </v-col>

              <!-- Post画像: upload -->
              <v-col cols="12" sm="10">
                <v-card-actions >
                  <v-btn
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
              </v-col>


              <!-- Post 本文 -->
              <v-col cols="12" sm="10">
                <v-card-actions>
                  <v-textarea
                  v-model="newPost.text.content"
                  label="本文"
                  outlined
                  auto-grow
                  rows="20"
                  row-height="20"
                  ></v-textarea>
                </v-card-actions>
              </v-col>

              <v-col cols="12" sm="10">
                <v-card-actions>
                  <!-- submit: onPost()メソッド -->
                  <v-btn type="submit">投稿</v-btn>

                  <!-- click: onCancel()メソッド -->
                  <v-btn @click="onCancel">戻る</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>

          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  props: {
    // Column, Questionからデータ受け取り
    postData: {
      type: Object,
      required: false
    },
    // Column, Quesitonを分岐させるため
    postPath: {
      type: String,
      required: false
    },
    userDatas: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      // 新規投稿 / 編集によってnewPostの設定を調整する三項演算子
      // 新規投稿：this.postData = null なので、初期値の設定
      // 編集：this.postData がpropsで渡され、newPostとして設定
      newPost: this.postData
      ? { ...this.postData}
      : {
        text: {
          author:'',
          title:'',
          content:'',
        },
        image:{
          src:null,
          name:'',
        },
        tags: []
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
      // tagを一旦格納する変数
      tags: '',
    }
  },
  methods: {
    // 新規投稿・編集をやめる際のボタン
    onCancel() {
      this.$router.push(this.postPath + this.newPost.text.docId)
    },

    // newPost.tagsに記述したタグを挿入する
    pushTags() {
      this.newPost.tags.push(this.tags)
      this.tags = ''
    },
    // tagsを削除する
    deleteTags(i) {
      this.newPost.tags.splice(i, 1)
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
      this.newPost.text.uid = this.userDatas.uid
      this.newPost.text.author = this.userDatas.penName

      // 既存の画像を受け渡す
      this.newPost.image.existName = this.existName
      this.$emit('submit', this.newPost)
    },
  },

}
</script>

<style lang="scss" scoped>
h2 {
  padding: 2% 0;
  color:$main-font-color;
  font-size: 3rem;

  @include pc {
    font-size: 2.7rem;
  }

  @include tab {
    font-size: 2.3rem;
  }

  @include mb {
    font-size: 1.9rem;
  }
}

.v-btn {
  margin-right: 2%;
}

.theme--light.v-chip:not(.v-chip--active) {
  margin: 4px 8px 4px 8px !important;
  color:$v-chip-form-font-color  !important;
  background-color: $v-chip-form-background-color !important;

  .theme--light.v-icon {
    color:$v-chip-form-font-color  !important;
  }
}

</style>