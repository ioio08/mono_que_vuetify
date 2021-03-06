<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="off-padding-top">
      <v-sheet>
        <v-card-text class="text-center">
          <!-- Postのタイトル挿入場所 -->
          <h1> <slot /> </h1>
        </v-card-text>
        <v-divider/>
        <v-row v-show="existPosts.length !== 0" align="center" justify="center">
          <v-col cols="10">
            <v-text-field
              style="padding-top:15px"
              v-model="contentKeyword"
              label="文章で検索"
              type="text">
            </v-text-field>
          </v-col>
          <v-col cols="10">
            <p>タグで検索</p>
            <v-chip-group  center-active show-arrows >
              <v-chip
              show-arrows
              v-for="tag in tags"
              @click="onChip(tag)"
              :key="tag">
              {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-container v-show="existPosts.length !== 0" >
          <v-row justify="center" justify-sm="space-around" justify-md="start" align="center">

            <!-- PostDataのリストレンダリング -->
            <v-col
              v-for="existPost in getSixPosts"
              :key="existPost.text.docId"
              cols="11"
              sm="6"
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
        <v-card-actions v-show="existPosts.length !== 0">
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
import { mapGetters } from "vuex";

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
    tags: {
      type:Array,
      required:false
    }
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
    onChip(tag) {
      if(this.tagKeyword === tag) {
        this.tagKeyword = ''
      } else {
        this.tagKeyword = tag
        this.page = 1
      }
    }
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
  margin: 5% 0 3%;
  font-size: 3.5rem;

  @include tab {
    font-size: 2.5rem;
  }

  @include mb {
    font-size: 2rem;
  }
}

p {
  font-size: 2rem;

  @include tab {
    font-size: 1.6rem;
  }

  @include mb {
    font-size: 1.6rem;
  }
}

.v-input {
  ::deep .v-input__slot {
    ::before.v-text-field__slot {
      font-size: 2rem !important;

      @include tab {
        font-size: 1.6rem !important;
      }

      @include mb {
        font-size: 1.6rem !important;
      }
    }

  }
}


.v-sheet {
  // background:$v-main-background-color;
  background:linear-gradient(180deg,$v-main-background-color ,#c4c4c4 , $v-main-background-color  );
  margin-bottom: 13%;
}

// ページネーションの配置設定
.v-card__actions {
  justify-content: center ;
}

.theme--light.v-chip:not(.v-chip--active) {
  color:$v-chip-form-font-color  !important;
  background-color: $v-chip-form-background-color !important;

  .theme--light.v-icon {
    color:$v-chip-form-font-color  !important;
  }
}

</style>