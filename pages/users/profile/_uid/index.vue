<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-form @submit.prevent="editProfile">
            <v-row justify="center" justify-md="space-around" align="center">
              <v-col cols="10" md="6">

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
                    <v-img :src="userDatas.image ? userDatas.image : '/images/smile.png'" ></v-img>
                  </v-avatar>
                </v-card-actions>
                <v-card-actions style="justify-content:center;">
                  <v-btn
                    depressed
                    :loading="isSelecting"
                    @click="onFileUpload"
                    >
                    <v-icon>mdi-image</v-icon>画像を変更する
                  </v-btn>
                </v-card-actions>
              </v-col>

              <v-col cols="10" md="6">
                <v-row justify="center">
                  <v-col cols="10">
                    <p>あなたの名前です。</p>
                    <v-card-actions>
                      <v-text-field
                      v-model="userDatas.name"
                      label="名前"
                      ></v-text-field>
                    </v-card-actions>
                  </v-col>
                  <v-col cols="10">
                    <p>ペンネームは投稿する際に公開される名前です。</p>
                    <v-card-actions>
                      <v-text-field
                      v-model="userDatas.penName"
                      label="ペンネーム"
                      ></v-text-field>
                    </v-card-actions>
                  </v-col>
                  <v-col cols="10">
                    <v-btn type="submit" style="margin-right:10%" >変更</v-btn>
                    <v-btn @click="backPage" type="button">戻る</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, storage } from '~/plugins/firebase'

export default {
  middleware : 'authenticated',
  async asyncData({ store }){
    const uid = store.getters['auth/getUid']
    let userDatas;
    await db.collection('users').doc(uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    return { userDatas }
  },
  data:() => ({
    // アップロードの有無
    isSelecting: false,
    fileObject: null,
    imageName: null,
  }),
  methods: {
    backPage() {
      this.$router.push('/users/profile')
    },

    // 画像アップロードボタンの発火メソッド
    onFileUpload() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })
      this.$refs.file.click()
    },

    // 画像を指定して、編集内容のセット
    onFileChanged(e) {
      // fileに選択した画像ファイル格納
      const file = e.target.files[0]
      this.fileObject = file

      // オブジェクトのファイルを加工する
      const reader = new FileReader()
      reader.onload = e => {
        this.userDatas.image = e.target.result
        this.imageName = file.name
      }
      // previewで描画するためにURLを取得
      reader.readAsDataURL(file)
    },

    // プロフィールの編集を行う関数
    async editProfile() {

      // ユーザーコレクションからログイン中のユーザーデータへの参照
      const usersPostRef = await db.collection('users').doc(this.userDatas.uid)

      // 画像の変更の有無を識別する条件分岐(  変更あり )
      // 変更があればFireStorageのデータ更新、他ユーザー情報もコレクションに更新
      if(this.fileObject !== null) {
        let uploadImage = await this.uploadStorage(this.fileObject, this.imageName)
        await usersPostRef.set({
          image : {
            src: uploadImage.src,
            name:uploadImage.name
          },
          name: this.userDatas.name,
          penName: this.userDatas.penName,
          email: this.userDatas.email,
          uid: this.userDatas.uid
        }, { merge: true })
        .then( () => {
          this.$store.commit('auth/setUserImage', uploadImage.src)
          this.$router.push('/users/profile')
        })

        // 画像の変更なしの場合の条件分岐( 変更なし )
      } else {
        await usersPostRef.set({
          name: this.userDatas.name,
          penName: this.userDatas.penName,
          email: this.userDatas.email,
          uid: this.userDatas.uid
        }, { merge: true })
        .then( () => { this.$router.push('/users/profile') })
      }
    },

    // 画像変更をStorageに反映させる関数
    uploadStorage(file, name) {
      const storageRef = storage.ref()
      return new Promise((resolve, reject) => {
        storageRef
        // FireStorage に'images'ディレクトリを作成
        .child(`images/${name}`)
        .put(file)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            resolve({ name: name, src: url })
          })
        })
        .catch(err => {
          console.log('画像投稿エラー', err)
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 5%;
}

.theme--light.v-card {
  background-color: $profile-background-color !important;
  color:$main-font-color;
}

.v-avatar {
  margin: 0 auto;
  display: block;
}

.v-card__text,
.v-card__actions {
  padding-left:0;
}

</style>