<template>
  <v-card >
    <v-card-title><h2>{{ userQuestionData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle><h3>Author:  {{ userQuestionData.text.author }}</h3> Date:  {{ userQuestionData.text.postDay }}</v-card-subtitle>

    <!-- toPostList-btn , Edit-btn , Delete-btn -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
      <v-btn v-if="loggedIn" @click="onEdit">編集</v-btn>
      <v-btn v-if="loggedIn" @click="dialog = !dialog">削除</v-btn>
    </v-card-actions>

    <v-divider></v-divider>
    <v-img :src="userQuestionData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ userQuestionData.text.content }}</pre></h2> </v-sheet>
    </v-card-text>

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
    const userQuestionData = await db.collection("question")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { userQuestionData }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      loggedIn: 'auth/authStatus'
    })
  },
  methods: {
    onBackPage() {
      this.$router.push('/users/userQuestions')
    },
    onEdit() {
      this.$router.push('/users/post/question/' + this.$route.params.id)
    },
    deletePost() {
      // ドキュメントの削除
      db.collection("question").doc(this.userQuestionData.text.docId).delete()
      .catch(err => {
        console.error("Error removing document: ", err);
      });

      // FireStorageのimage削除
      const deleteRef = storage.ref().child('images/' + this.userQuestionData.image.src)
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