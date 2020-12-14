<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-row align="center">
            <v-col cols="12" sm="6" md="4">
              <v-avatar :size="size" >
                <v-img :src="userDatas.image ? userDatas.image : '/images/smile.png'" ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-row justify="center" align="center">
                <v-col cols="8" sm="12" md="6" >
                  <v-card-text>
                    <h3>名前：{{ userDatas.name ? userDatas.name : 'ナナシさん' }} </h3>
                  </v-card-text>
                  <v-card-text>
                    <h3>ペンネーム：{{ userDatas.penName ? userDatas.penName : 'ナナシさん' }}</h3>
                    <p style="margin-bottom: 0; margin-top:2%;">※ ペンネームは投稿時に掲載される名前です。</p>
                  </v-card-text>
                  <v-card-text >
                    <h3>Email： {{ userDatas.email ? userDatas.email : 'no Email' }}</h3>
                  </v-card-text>
                </v-col>
                <v-col cols="8" sm="8" md="5" >
                  <v-card-text>
                    <h3>投稿件数</h3>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    <h3>コラム：{{ userColumnDatas.length }} 件</h3>
                  </v-card-text>
                  <v-card-text>
                    <h3>質問： {{ userQuestionDatas.length }} 件</h3>
                  </v-card-text>
                </v-col>
                <v-spacer class="mb"/>
              </v-row>
              <v-btn style="margin-left: 3%;" @click="goEdit">編集する</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" >
        <v-card style="height:200px;">
          <nuxt-link to="/users/post/column" >
            <v-img src="/images/margiela.jpg" cover style="height: 100%">
              <v-card-title >
                <v-sheet style="text-align:center; padding:5px; width: 100%">
                  <h3>新しくコラムを書く</h3>
                </v-sheet>
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6">
        <v-card style="height:200px;">
          <nuxt-link to="/users/post/question" >
            <v-img src="/images/Phone.jpeg" cover style="height: 100%">
              <v-card-title >
                <v-sheet style="text-align:center; padding:5px; width: 100%">
                  <h3>新しく質問する</h3>
                </v-sheet>
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6">
        <v-card style="height:200px;">
          <nuxt-link to="/users/userColumns" >
            <v-img src="/images/cafe.jpeg" cover style="height: 100%">
              <v-card-title >
                <v-sheet style="text-align:center; padding:5px; width: 100%">
                  <h3>投稿したコラムを見返す</h3>
                </v-sheet>
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6">
        <v-card style="height:200px;">
          <nuxt-link to="/users/userQuestions" >
            <v-img src="/images/card.jpeg" cover style="height: 100%">
              <v-card-title >
                <v-sheet style="text-align:center; padding:5px; width: 100%">
                  <h3>投稿した質問を見返す</h3>
                </v-sheet>
              </v-card-title>
            </v-img>
          </nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  middleware : 'authenticated',

  // uidが一致するドキュメントのみを取得する
  async asyncData({ store }){
    let userDatas;
    let userColumnDatas = []
    let userQuestionDatas = []
    const uid = await store.getters['auth/getUid']

    // ユーザー情報
    await db.collection('users').doc(uid)
    .get()
    .then(doc => {
      userDatas = doc.data()
    });

    // Column.lengthのために取得
    await db.collection('column')
    .where('text.uid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userColumnDatas.push(doc.data())
      })
    });

    // Question.lengthのために取得
    await db.collection('question')
    .where('text.uid', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        userQuestionDatas.push(doc.data())
      })
    });

    return { userDatas, userQuestionDatas, userColumnDatas }
  },
  methods: {
    goEdit() {
      this.$router.push('/users/profile/' + this.userDatas.uid)
    }
  },
  computed: {
    // vuetifyのブレイクポイント基準
    size () {
      const size = {xs:"180", sm: "220", md: "200" , lg: "200" , xl: "200" } [this.$vuetify.breakpoint.name];
      return size
    }
  }

}
</script>

<style lang="scss" scoped>
// プレビューのタイトル
.theme--light.v-card {
  background-color: $profile-background-color ;
  color:$main-font-color;
}

.v-avatar {
  margin: 0 auto;
  display: block;
}

// プレビューのホバースタイル
.v-image {

  &:hover {
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .7);
    transform: scale(1.01) ;
    transition: .2s;
      ::v-deep .v-image__image  {
        transition: 2s;
        transform: scale(1.02) ;
      }

      .v-sheet {
        transition: .3s;
        transform: scale(1.2) ;
      }
  }

  .v-sheet {
    background-color: $preview-title-background-color;
    color: $main-font-color;
  }
}

// プロフィールのリストタイトル
h3 {
  font-size: 2rem;
  line-height: 2.2rem;
  font-weight: lighter;

  @include tab {
    font-size: 1.8rem;
    line-height: 2rem;
  }

  @include mb {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
}

// 編集ボタンのスタイル
.v-btn {
  @include mb {
    margin-left: 18% !important;
  }
}
</style>