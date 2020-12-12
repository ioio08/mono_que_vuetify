<template>
  <v-app >

    <!-- ここからメイン画面の設定： 1. Header, 2.Main, 3.Footer -->
    <!-- Header -->
    <Header
      :title="title"
      :fixed="fixed"
      :message="message"
      :adminPages="adminPages"/>

    <!-- default main -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- default footer -->
    <Footer
    :fixed="fixed"
    :title="title"
    :adminPages="adminPages"/>
  </v-app>
</template>

<script>
import Header from '~/components/UI/Header'
import Footer from '~/components/UI/Footer'

export default {
  components: {
    Header,
    Footer,
  },
  data:() => ({
    fixed: false,
    page: 1,
    title: 'M O N O D Y',
    message: '',

    // Header, Footerで利用
    adminPages: [
      {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
      {title: 'アプリ概要', to: '/admins/about', icon:'mdi-account-tie',},
    ],
  }),
}
</script>

<style lang="scss">
//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

// pc で削除
.pc {
  @include pc {
    display: none !important;
  }

  @include tab {
    display: inline-flex !important;
  }
}

//  tab で削除
.tab {
  @include tab {
    display: none !important;
  }
}

//  mb で削除
.mb {
  @include mb {
    display: none !important;
  }
}

main {
  background: $v-main-background-color;
  @include tab {
    padding: 0 !important;
  }
}

.container {
  max-width: 1100px;
}

</style>