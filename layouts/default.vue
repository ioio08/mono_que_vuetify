<template>
  <v-app >

    <!-- ここからメイン画面の設定： 1. Header, 2.Main, 3.Footer -->
    <!-- Header -->
    <Header
      :title="title"
      :admin-lists="adminLists"
      :content-lists="contentLists"
      :user-lists="userLists"
      />

    <Navigation
      :admin-lists="adminLists"
      :content-lists="contentLists"
      :user-lists="userLists"
      />

    <!-- default main -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- default footer -->
    <Footer
    :title="title"
    :admin-lists="adminLists"/>
  </v-app>
</template>

<script>
import Header from '~/components/UI/Header'
import Navigation from '~/components/UI/Navigation'
import Footer from '~/components/UI/Footer'
import { auth } from '~/plugins/firebase.js'

export default {
  components: {
    Header,
    Navigation,
    Footer,
  },
  data:() => ({
    page: 1,
    title: 'M O N O D Y',

    // Header, Footerで利用
    adminLists: [
      {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
      {title: 'アプリ概要', to: '/admins/about', icon:'mdi-account-tie',},
    ],

    // Contentのデータ(Headerタブ、SideBarメニューの２カ所で使用)
    contentLists: [
      { icon: 'mdi-home', title: 'ホーム', to: '/'},
      { icon: 'mdi-help-box', title: '質問一覧', to: '/contents/questions'},
      { icon: 'mdi-note-text-outline', title: 'コラム一覧', to: '/contents/columns'},
    ],

    // Usersデータ
    userLists: [
      {title: 'プロフィール', to: '/users/profile', icon:'mdi-card-account-details-outline',},
      {title: 'あなたのコラム', to: '/users/userColumns', icon:'mdi-note-text-outline',},
      {title: 'あなたの質問', to: '/users/userQuestions', icon:'mdi-comment-question-outline',},
      // {title: '後で読む記事', to: '/users/userStar', icon:'mdi-star-outline',},
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
}

.container {
  max-width: 1100px;
}

</style>