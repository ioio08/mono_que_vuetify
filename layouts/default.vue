<template>
  <v-app >

    <!-- ここからメイン画面の設定： 1. Header, 2.Main, 3.Footer -->
    <!-- Header -->
    <Header
      :title="title"
      :usrIcon="usrIcon"
      :message="message"
      />

    <Navigation :adminPages="adminPages"/>

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
import Navigation from '~/components/UI/Navigation'
import Footer from '~/components/UI/Footer'
import { auth, db } from '~/plugins/firebase.js'

export default {
  components: {
    Header,
    Navigation,
    Footer,
  },
  data:() => ({
    page: 1,
    title: 'M O N O D Y',
    usrIcon: null,

    // Header, Footerで利用
    adminPages: [
      {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
      {title: 'アプリ概要', to: '/admins/about', icon:'mdi-account-tie',},
    ],
  }),
  async fetch({ store }) {
    let user = store.getters['auth/user']
    let userData = await db.collection('users').doc(user.uid).get()
  }
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