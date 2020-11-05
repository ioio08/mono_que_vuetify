<template>
    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
      >
        <v-card-text class="mb">
          <v-btn
            v-for="adminPage in adminPages"
            :key="adminPage.title"
            :to="adminPage.to"
            class="link-white font-weight-bold"
            style="margin-left: 20px;"
            >
              {{ adminPage.title }}
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text display-1" >
          <span class="title">© </span> {{ title }} .inc
        </v-card-text>
      </v-card>
    </v-footer>
</template>


<script>
export default {
  props:['fixed', 'title','categorys', 'footerIcons', 'adminPages'],

  data() {
    return {


    }
  },

}
</script>

<style lang="scss">
//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン



//===============  footer  =======================

footer {

}


</style>