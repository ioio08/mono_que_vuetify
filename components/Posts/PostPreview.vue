<template>
<!-- Postのプレビュー -->
  <v-card style="height:200px;">

    <!-- docIdを渡して遷移先を動的に変更 -->
    <nuxt-link :to="postPath + existPost.text.docId">
      <v-img :src="existPost.image.src" cover style="height: 100%">
        <v-card-title >
          <v-sheet style="text-align:center; padding:5px; width: 100%">
          {{ existPost.text.title }}
          </v-sheet>
        </v-card-title>
      </v-img>
    </nuxt-link>
  </v-card>
</template>

<script>
  export default {
    props:{
      existPost: {
        type:Object,
        required:true
      },
      postPath: {
        type:String,
        required:true
      },
    },
  }
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.v-sheet {
  background-color: $preview-title-background-color;
  color: $main-font-color;
}

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

}


</style>