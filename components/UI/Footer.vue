<template>
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="text-center">
        <v-card-text class="mb">

          <!-- Admins のリストレンダリング -->
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
  props:{
    title: {
      type: String,
      required:true,
      default: 'MONO-QUE'
    },
    adminPages: {
      type: Array,
      required:true,
    },

  },
}
</script>

<style lang="scss" scoped>
//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

//===============  footer  =======================

.theme--light.v-card {
  background-color: $footer-background-color !important;
}


</style>