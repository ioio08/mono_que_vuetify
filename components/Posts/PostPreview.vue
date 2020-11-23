<template>
  <v-card style="height:200px;">
    <nuxt-link :to="postPath + postDocId">
      <v-img :src="postSrc" cover style="height: 100%">
        <v-card-title >
          <v-sheet style="text-align:center;background-color: rgba(75, 100, 161, 0.8); padding:5px; width: 100%">
          {{ postTitle }}
          </v-sheet>
        </v-card-title>
      </v-img>
    </nuxt-link>
  </v-card>
</template>

<script>
  export default {
    props:{
      postTitle: {
        type:String,
        required:true
      },
      postDocId: {
        type:String,
        required:true
      },
      postSrc: {
        type:String,
        required:true
      },
      postPath: {
        type:String,
        required:true
      },
    }

  }
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
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