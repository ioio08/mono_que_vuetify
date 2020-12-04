<template>
  <v-app >

    <!-- Action buttons of post function  fixed in the lower right coner   -->
    <!-- PC ver -->
    <!-- Open button -->
    <v-tooltip left >
      <template v-slot:activator="{ on }">
        <v-btn
        :color="btnColor"
        elevation="5"
        v-on="on"
        fixed
        bottom
        right
        fab
        large
        @click="btnAction=!btnAction"
        style="padding:25px;">
          <v-icon color="white" v-if="btnAction">mdi-close</v-icon>
          <v-icon color="white" v-else>mdi-apps</v-icon>
        </v-btn>
      </template>
        <span v-if="btnAction">閉じる</span>
        <span v-else>機能一覧</span>
    </v-tooltip>

    <!-- Home button -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          elevation="5"
          to="/"
          fixed
          v-on="on"
          bottom
          right
          fab
          large
          v-show="btnAction"
          @click="btnAction=!btnAction"
          style="padding:25px;  bottom:85px; ">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </template>
      <span>ホームへ</span>
    </v-tooltip>

    <!-- Column button -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn

          elevation="5"
          to="/users/post/column"
          fixed
          v-on="on"
          bottom
          right
          fab
          large
          v-show="btnAction"
          @click="btnAction=!btnAction"
          style="padding:25px; bottom:155px; ">
          <v-icon>mdi-note-text-outline</v-icon>
        </v-btn>
      </template>
      <span>コラムを投稿する</span>
    </v-tooltip>

    <!-- Question button  -->
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          elevation="5"
          to="/users/post/question"
          fixed
          v-on="on"
          bottom
          right
          fab
          large
          v-show="btnAction"
          @click="btnAction=!btnAction"
          style="padding:25px; bottom:225px;">
          <v-icon>mdi-comment-question-outline</v-icon>
        </v-btn>

      </template>
      <span>質問を投稿する</span>
    </v-tooltip>

    <!-- ここからメイン画面の設定： 1. Header, 2.Main, 3.Footer -->
    <!-- Header -->
    <Header
      :title="title"
      :fixed="fixed"
      :message="message"
      :adminPages="adminPages"/>

    <!-- default main -->
    <v-main :class="{mask:btnAction}" >
      <v-container >
        <nuxt />
      </v-container>
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
    // Post-btnのboolean値で投稿ボタンの出し入れ [true: 出力, false: 隠す(default)]
    btnAction: false,
    btnColor:'#757575',
    page: 1,
    title: 'M O N O D Y',
    message: '',

    // Header, Footerで利用
    adminPages: [
      {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
      {title: 'よくある質問', to: '/admins/adminsQA', icon:'mdi-account-question-outline',},
      {title: 'アプリ概要', to: '/admins/adminsAboutApp', icon:'mdi-apps',},
      {title: '作者ページ', to: '/admins/adminsProfile', icon:'mdi-account-tie',},
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

// btnActionについて
// btnActionでメイン画面を薄いマスクで覆い隠す
.mask {
  opacity: .1;
}

// btnAction search
.search {
  display: none;
  @include tab {
    display: inline-flex;
  }
}

.container {
  max-width: 1100px;
}
</style>