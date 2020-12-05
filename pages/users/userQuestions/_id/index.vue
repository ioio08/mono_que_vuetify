<template>
  <div>
    <PostView
      :exist-post="userQuestion">

      <!-- 一覧 , 編集 , 削除 -->
      <template v-slot:userPostActions>
        <v-card-actions >
          <v-btn @click="onBackPage">一覧へ</v-btn>
          <v-btn v-if="loggedIn" @click="onEdit">編集</v-btn>
          <v-btn v-if="loggedIn" @click="dialog = !dialog">削除</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
      </template>
    </PostView>

    <!-- 本当に削除するの確認するdailog -->
    <v-dialog v-model="dialog" width=600>
      <v-card>
        <v-container>
          <v-row justify="center" align="center">
            <v-card-text><h2 style="text-align:center;">本当に削除してもよろしいでしょうか？</h2></v-card-text>
            <v-divider></v-divider>
            <v-col cols="2" >
              <v-card-actions>
                <v-btn @click="deletePost">削除</v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="2" >
              <v-card-actions>
                <v-btn @click="dialog = !dialog">戻る</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { db, auth, storage } from '~/plugins/firebase'
import { mapGetters } from 'vuex'
import PostView from '~/components/Posts/PostView'

export default {
  components: {
    PostView
  },

  // paramsのdocIdに応じてドキュメント指定して取得
  async asyncData({ params }){
    const userQuestion = await db.collection("question")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    return { userQuestion }
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
      db.collection("question").doc(this.userQuestion.text.docId).delete()
      .catch(err => {
        console.error("Error removing document: ", err);
      });

      // FireStorageのimage削除
      const deleteRef = storage.ref().child('images/' + this.userQuestion.image.src)
      deleteRef.delete().catch(err => {
        console.log('エラー:' + err)});

      this.onBackPage()
    },
  },
  data() {
    return {
      dialog: false,
      postPath:'/users/userQuestions'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-dialog {
  .v-sheet {
    width: 100%;
  }
}

.post-img {
  padding: 5% 0;
}

.v-card__actions {
  padding: 2%;

  .v-btn {
    margin-right: 5% !important;
  }
}

.theme--light.v-card {
  background-color: $profile-background-color;
  color:$main-font-color;
}


</style>