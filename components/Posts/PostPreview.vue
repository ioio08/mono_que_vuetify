<template>
  <v-card style="height:200px;">
    <nuxt-link to="/contents/colums/1">
      <v-img src="/images/product_2.jpeg" cover style="height: 100%" class="hover">
        <v-card-title >
          <v-sheet style="text-align:center;background-color: rgba(75, 100, 161, 0.8); padding:5px; width: 100%">
          タイトル
          </v-sheet>
        </v-card-title>
      </v-img>
    </nuxt-link>
  </v-card>
</template>

<script>
  export default {

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