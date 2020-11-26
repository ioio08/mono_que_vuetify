<template>
  <v-card>
    <v-card-title><h2>{{ loadedColumData.text.title }}</h2></v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle><h3>Author:  {{ loadedColumData.text.author }}</h3> Date:  {{ loadedColumData.text.postDay }}</v-card-subtitle>

    <!-- toPostList-btn , Edit-btn , Delete-btn -->
    <v-card-actions >
      <v-btn @click="onBackPage">一覧へ</v-btn>
      <v-btn v-if="loggedIn" @click="onEdit">編集</v-btn>
      <v-btn v-if="loggedIn" @click="dialog = !dialog">削除</v-btn>
    </v-card-actions>

    <v-divider></v-divider>
    <v-img :src="loadedColumData.image.src" cover style="width: 500px; margin: 0 auto;"></v-img>
    <v-card-text>
      <v-sheet><h2><pre>{{ loadedColumData.text.content }}</pre></h2> </v-sheet>
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

export default {
  async asyncData({ params }){
    const loadedColumData = await db.collection("colum")
    .doc(params.id)
    .get()
    .then(doc => doc.data());

    let user = auth.currentUser
    let loggedIn
    if (user) {
      loggedIn = true
    } else {
      loggedIn = false
    }

    return { loadedColumData, loggedIn }
  },
  methods: {
    onBackPage() {
      this.$router.push('/contents/colums')
    },
    onEdit() {
      this.$router.push('/users/post/colum/' + this.$route.params.id)
    },
    deletePost() {
      // ドキュメントの削除
      db.collection("colum").doc(this.loadedColumData.text.docId).delete()
      .catch(err => {
        console.error("Error removing document: ", err);
      });

      // FireStorageのimage削除
      const deleteRef = storage.ref().child('images/' + this.loadedColumData.image.src)
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