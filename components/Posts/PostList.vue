<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-sheet>
        <v-card-text class="text-center">
        <!-- Postのタイトル挿入場所 -->
        <h1> <slot /> </h1>
        </v-card-text>
        <v-divider></v-divider>
        <v-row v-show="existPosts.length > 0">
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-text-field
              style="padding-top:15px"
              v-model="contentKeyword"
              label="文章で検索"
              type="text">
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-text-field
              style="padding-top:15px"
              v-model="tagKeyword"
              label="タグで検索"
              type="text">
            </v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-container v-show="existPosts.length > 0" >
          <v-row align="center">

            <!-- PostDataのリストレンダリング -->
            <v-col
              v-for="existPost in getSixPosts"
              :key="existPost.text.docId"
              cols="12"
              xs="12"
              sm="4"
              md="4"
              xl="3">

            <!-- Question, Columによって値が可変の為、共通の変数名を設定 -->
              <PostPreview
              :exist-post="existPost"
              :post-path="postPath"/>
            </v-col>
          </v-row>
        </v-container>

        <!-- ページネーション -->
        <v-card-actions v-show="existPosts.length > 0">
          <v-pagination color="grey darken-2" v-model="page" :length="pageLength" :total-visible="4"></v-pagination>
        </v-card-actions>

        <!-- 何も投稿がない場合に表示 -->
        <v-row justify="center" align="center" v-show="existPosts.length === 0">
          <v-col cols="10" >
            <div>
              <v-card-text style="display: flex; justify-content:center">
              <h2 >
                今はまだ、何も投稿がありません。<br><br>
                あなたの身近な「モノ」について投稿してみませんか？
              </h2>
              </v-card-text>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props:{
    // Colum, Questionによってデータが可変の為、抽象的な命名
    // loadedDataがそれぞれから渡される
    existPosts: {
      type:Array,
      required:true
    },
    postPath: {
      type:String,
      required:true
    },
  },
  computed: {
    // Post表示を6までに整形して返す関数
    // リストレンダリングの'ソースデータ'
    getSixPosts() {
      return this.pageChange(this.page)
    },

    // Postの総数に対してページ数を決める関数
    pageLength() {
      if (this.filteredPosts.length % 6 === 0) {
        return Math.floor(this.filteredPosts.length / 6)
      } else {
        return Math.floor(this.filteredPosts.length / 6) + 1
      }
    },

    // 検索でPostの表示を変える関数(タグ検索・文章検索・初期値設定)
    filteredPosts() {
      let filteredPosts = []

      // 『タグ検索』 に１文字でも入力されたら発火する条件
      if (this.tagKeyword.length !== 0 ) {

        // existPostsからオブジェクトを一旦全て抜き出す
        this.existPosts.forEach(post => {

          // 抜き出したオブジェクト1つ1つのtags配列内を検証
          // this.tagsKeywordと一致するtagを持つオブジェクトを検索
          // 該当のオブジェクトのみをfilteredPosts配列にpushする
          if (post.tags.find(tag => tag === this.tagKeyword)) {
            filteredPosts.push(post)
          }

          this.page = 1
        });

        // 『文章検索』 が１文字でも入力されたら発火する条件
      } else if (this.contentKeyword.length !== 0 ) {

        // existPostsからオブジェクトを一旦全て抜き出す
        this.existPosts.forEach(post => {

          // 抜き出したオブジェクト1つ1つのcontent文章内を検証
          // this.contentKeywordと同じ文字を含むオブジェクトを検索
          // 該当のオブジェクトのみをfilteredPosts配列にpushする
          if (post.text.content.match(this.contentKeyword)) {
            filteredPosts.push(post)
          }
          this.page = 1
        });

        // 検索フォームが0文字のときは初期値を再代入する
      } else {
        filteredPosts = this.existPosts
      }
      // 検索結果を返り値として返す
      // 3パターン：1.タグ検索, 2. 文章検索, 3.初期値
      return filteredPosts
    }
  },
  methods: {
    pageChange(page) {
      // filteredPostsをsliceすることで、
      // Postの初期値と検索値をリアルタイムで入れ替える
      return this.filteredPosts.slice(this.pageSize*(page -1), this.pageSize*(page));
    },
  },
  data:() =>({
    page:1,
    pageSize: 6,
    tagKeyword:'',
    contentKeyword:'',
  })
}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 3%;
}

.v-sheet {
  background:$v-main-background-color;
  margin-bottom: 13%;
}

// ページネーションの配置設定
.v-card__actions {
  justify-content: center ;
}
</style>