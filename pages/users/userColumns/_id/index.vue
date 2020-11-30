<template>
  <v-card >
    <v-card-title><h2>{{ userColumnData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <h3>Author:  {{ userColumnData.text.author }}</h3>
      Date:  {{ userColumnData.text.postDay }}
    </v-card-subtitle>

    <v-chip-group column v-if="userColumnData.tags.length > 0">
      <v-chip
      v-for="tag in userColumnData.tags"
      :key="tag">
      {{ "#" + " " + tag }}

      </v-chip>
    </v-chip-group>


    <!-- toPostList-btn , Edit-btn , Delete-btn -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
      <v-btn v-if="loggedIn" @click="onEdit">編集</v-btn>
      <v-btn v-if="loggedIn" @click="dialog = !dialog">削除</v-btn>
    </v-card-actions>

    <v-divider></v-divider>
    <v-img :src="userColumnData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ userColumnData.text.content }}</pre></h2> </v-sheet>
    </v-card-text>

    <!-- 本当に削除するの確認するdailog -->
    <v-dialog v-model="dialog" width=600>
      <v-card>
        <v-container>
          <v-row justify="center" align="center">
            <v-card-text><h2 style="text-align:center;">本当に削除してもよろしいでしょうか？</h2></v-card-text>
            <v-divider></v-divider>
            <v-col cols="12" sm="3" md="3" lg="3">
              <v-card-actions>
                <v-btn @click="deletePost">削除</v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="12" sm="3" md="3" lg="3">
              <v-card-actions>
                <v-btn @click="dialog = !dialog">戻る</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { db, storage } from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  // paramsのdocIdに応じてドキュメント指定して取得
  async asyncData({ params }){
    const userColumnData = await db.collection("column")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { userColumnData }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      loggedIn: 'auth/authStatus'
    })
  },
  methods: {
    onBackPage() {
      this.$router.push('/users/userColumns')
    },
    onEdit() {
      this.$router.push('/users/post/column/' + this.$route.params.id)
    },
    deletePost() {
      // ドキュメントの削除
      db.collection("column").doc(this.userColumnData.text.docId).delete()
      .catch(err => {
        console.error("Error removing document: ", err);
      });

      // FireStorageのimage削除
      const deleteRef = storage.ref().child('images/' + this.userColumnData.image.src)
      deleteRef.delete().catch(err => {
        console.log('エラー:' + err)});

      this.onBackPage()
    },
  },
  data() {
    return {
      dialog: false,
    }
  }
}
</script>

<style>

.v-card__title {
  text-align: center !important;
}

.v-card__text {
  padding-bottom: 5%;
  max-width: 100%;
}

pre {
  white-space: pre-wrap ;
  line-height: 2rem;
  letter-spacing: 3px;
  font-weight: normal;
}

</style>