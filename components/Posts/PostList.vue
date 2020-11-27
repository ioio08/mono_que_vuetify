<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card style="background-color: #C5CAE9">
        <v-card-title class="headline"
        style="color: yellow"
        >

        <!-- Postのタイトル挿入場所 -->
        <slot />
        </v-card-title>
        <v-container v-if="existPosts.length > 0"
        style="background-color: #fff">
          <v-row align="center">

            <!-- PostDataのリストレンダリング -->
            <v-col
              v-for="existPost in existPosts"
              :key="existPost.text.docId"
              cols="12"
              xs="12"
              sm="4"
              md="4"
              xl="3"
            >
            <!-- Question, Columによって値が可変の為、共通の変数名を設定 -->
              <PostPreview
              :exist-post="existPost"
              :post-path="postPath"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions v-if="existPosts.length > 0">
          <div class="text-center">

            <!-- ページネーション -->
            <v-pagination
            v-model="page"
            :length="4"
            ></v-pagination>
          </div>
        </v-card-actions>

        <!-- 何も投稿がない場合に表示 -->
        <v-row justify="center" align="center" v-else>
          <v-col cols="12" xs="10" sm="10" md="10">
            <v-card>
              <v-card-text>
              <h2>
                何も投稿がありません<br><br>
                どんどん投稿していきましょう！
              </h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
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
  data() {
    return {
      page: 1,
    }
  }
}
</script>


<style lang="scss">
.v-card__actions {
  justify-content: center;
}
</style>