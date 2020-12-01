<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-form @submit.prevent="editPenName">
            <v-row align="center">
              <v-col cols="5">

                <!-- Post画像:アップロード用 input -->
                <input
                  ref="file"
                  style="display:none;"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                >

                <v-card-actions>
                  <v-avatar size="200">
                    <v-img :src="userDatas.image ?userDatas.image : '/images/smile.png'" ></v-img>
                  </v-avatar>
                </v-card-actions>
                <v-btn
                  style="margin:5px 30%"
                  color="primary"
                  depressed
                  :loading="isSelecting"
                  @click="onButtonClick"
                  >
                  <v-icon>mdi-image</v-icon>アップロード
                </v-btn>
              </v-col>
              <v-col cols="5">
                <p>あなたの名前です。</p>
                <v-card-actions>
                  <v-text-field
                  v-model="userDatas.name"
                  label="名前"
                  ></v-text-field>
                </v-card-actions>
                <p>ペンネームは投稿する際に公開される名前です。</p>
                <v-card-actions>
                  <v-text-field
                  v-model="userDatas.penName"
                  label="ペンネーム"
                  ></v-text-field>
                </v-card-actions>
              </v-col>
              <v-col cols="2">
                <v-btn type="submit" style="margin-top: 100%;" >変更</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  middleware : 'authenticated',

  async asyncData({ store }){
    const user = store.getters['auth/user']
    let userDatas;
    await db.collection('users').doc(user.uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    return { userDatas }
  },
  data:() => ({
    // アップロードの有無
      isSelecting: false,
  }),

  methods: {
    editPenName() {
      const usersPostRef = db.collection('users').doc(this.userDatas.uid)
      usersPostRef.set({
        image :  this.userDatas.image,
        name: this.userDatas.name,
        penName: this.userDatas.penName,
      }, { merge: true })
      .then( () => { this.$router.push('/users/profile') })
    },
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.file.click()
    },
    onFileChanged(e) {
      // fileに選択した画像ファイル格納
      const file = e.target.files[0]

      // オブジェクトのファイルを加工する
      const reader = new FileReader()
      reader.onload = e => {
        this.userDatas.image = e.target.result
      }
      // previewで描画するためにURLを取得
      reader.readAsDataURL(file)
    },
  }

}
</script>

<style lang="scss" scoped>

.v-card__text,
.v-card__actions {
  padding-left:0;
}

</style>