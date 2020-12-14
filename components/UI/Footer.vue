<template>
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="text-center">
        <v-card-actions class="mb">
          <v-spacer/>

          <!-- Admins のリストレンダリング -->
          <v-btn
            v-for="adminList in adminLists"
            :key="adminList.title"
            :to="adminList.to"
            class="link-white font-weight-bold"
            style="margin: 2% 3%;"
            sm
            >
              {{ adminList.title }}
          </v-btn>
          <v-spacer/>
        </v-card-actions>

        <v-divider></v-divider>

        <v-card-text class="white--text " >
          <span class="title">© </span> {{ title }}
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
    adminLists: {
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

.v-card__text {
  padding: 2% 0;
  margin-left: 1%;
  font-size: 3rem;
  @include pc {
    font-size: 2.6rem;
  }

  @include tab {
    font-size: 2.2rem;
  }

  @include mb {
    font-size: 1.8rem;
  }
}

</style>