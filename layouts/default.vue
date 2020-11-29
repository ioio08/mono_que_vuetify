<template>
  <v-app dark >
    <!-- ポップアップウィンドウ Search -->
    <v-container class="mt-12" >
      <v-dialog v-model="dialog" width=500>
        <v-card>
          <v-card-title>Search</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
            v-model="message"
            label="Search"
            type="text"
            >
              <template
              v-slot:append-outer
              >
                <v-btn color="primary" style="margin-right: 10px;"><v-icon>mdi-magnify</v-icon> </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Action buttons of post function  fixed in the lower right coner   -->
    <!-- PC ver -->
    <!-- Open button -->
    <v-btn
    color="indigo"
    elevation="5"
    fixed
    bottom
    right
    fab
    large
    @click="btnAction=!btnAction"
    style="padding:25px;">
      <v-icon v-if="btnAction">mdi-close</v-icon>
      <v-icon v-else>mdi-apps</v-icon>
    </v-btn>

    <!-- Home button -->
    <v-btn
      color="orange"
      elevation="5"
      to="/main"
      fixed
      bottom
      right
      fab
      large
      v-if="btnAction"
      @click="btnAction=!btnAction"
      style="padding:25px;  bottom:85px; ">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <!-- Column button -->
    <v-btn
      color="green"
      elevation="5"
      to="/users/post/column"
      fixed
      bottom
      right
      fab
      large
      v-if="btnAction"
      @click="btnAction=!btnAction"
      style="padding:25px; bottom:155px; ">
      <v-icon>mdi-note-text-outline</v-icon>
    </v-btn>

    <!-- Question button  -->
    <v-btn
      color="orange"
      elevation="5"
      to="/users/post/question"
      fixed
      bottom
      right
      fab
      large
      v-if="btnAction"
      @click="btnAction=!btnAction"
      style="padding:25px; bottom:225px;">
      <v-icon>mdi-comment-question-outline</v-icon>
    </v-btn>

    <!-- Search button  -->
    <v-btn
      color="blue"
      elevation="5"
      fixed
      bottom
      right
      fab
      large
      v-if="btnAction"
      style="padding:25px; bottom:295px;"
      class="search"
      @click="onClickSearch"
      >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- ここからメイン画面の設定： 1. Header, 2.Main, 3.Footer -->
    <!-- Header -->
    <Header
      :title="title"
      :fixed="fixed"
      :message="message"
      :adminPages="adminPages"/>

    <!-- default main -->
    <v-main :class="{mask:btnAction}">
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
    dialog: false,
    // Post-btnのboolean値で投稿ボタンの出し入れ [true: 出力, false: 隠す(default)]
    btnAction: false,
    page: 1,
    title: 'MONO-QUE',
    message: '',

    // Header, Footerで利用
    adminPages: [
      {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
      {title: 'よくある質問', to: '/admins/adminsQA', icon:'mdi-account-question-outline',},
      {title: 'アプリ概要', to: '/admins/adminsAboutApp', icon:'mdi-apps',},
      {title: '作者ページ', to: '/admins/adminsProfile', icon:'mdi-account-tie',},
    ],
  }),
  methods: {
    // 検索機能をポップアップで表示（true:表示、 false:非表示）
    onClickSearch() {
      this.btnAction = !this.btnAction
      this.dialog = !this.dialog
    }
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
  @include tab {
    padding: 0 !important;
  }
}

// btnActionについて
// btnActionでメイン画面を薄いマスクで覆い隠す
.mask {
  opacity: 0.5;
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