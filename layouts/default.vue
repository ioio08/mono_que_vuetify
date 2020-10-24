<template>
  <v-app dark>
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
      x-large
      @click="btnAction=!btnAction"
      style="padding:25px;"
    >
      <v-icon v-if="btnAction">mdi-close</v-icon>
      <v-icon v-else>mdi-apps</v-icon>
    </v-btn>
    <!-- Home button -->
    <v-btn
      color="orange"
      elevation="5"
      to="/contents/main"
      fixed
      bottom
      right
      fab
      x-large
      v-if="btnAction"
      style="padding:25px;  bottom:95px; "
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <!-- Colum button -->
    <v-btn
      color="green"
      elevation="5"
      to="/users/userColum"
      fixed
      bottom
      right
      fab
      x-large
      v-if="btnAction"
      style="padding:25px; bottom:175px; "
    >
      <v-icon>mdi-note-text-outline</v-icon>
    </v-btn>
    <!-- Question button  -->
    <v-btn
      color="orange"
      elevation="5"
      to="/users/userQuestion"
      fixed
      bottom
      right
      fab
      x-large
      v-if="btnAction"
      style="padding:25px; bottom:255px;"
    >
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
      x-large
      v-if="btnAction"
      style="padding:25px; bottom:335px;"
      class="search"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- default header -->
    <default-header
      :title="title"
      :fixed="fixed"
      :message="message"
      :adminPages="adminPages"

    />

    <!-- default main -->
    <v-main>
      <v-container :class="{mask:btnAction}">
        <nuxt />
      </v-container>
    </v-main>

    <!-- default footer -->
    <default-footer
    :fixed="fixed"
    :title="title"
    :footerIcons="footerIcons"
    :adminPages="adminPages"
    />


  </v-app>
</template>

<script>
import DefaultHeader from '~/components/header'
import DefaultFooter from '~/components/footer'

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
  },
  data () {
    return {
      fixed: false,
      // Post-btnのboolean値で投稿ボタンの出し入れ [true: 出力, false: 隠す(default)]
      btnAction: false,
      page: 1,
      title: 'MONO-QUE',
      message: '',
      footerIcons: [
        {hoverTitle: 'Top', icon:'mdi-apple-keyboard-control', },
        {hoverTitle: 'Contents', icon:'mdi-apps', },
      ],
      adminPages: [
        {title:'お問い合わせ', to: '/admins/contact', icon:'mdi-email-outline',},
        {title: 'よくある質問', to: '/admins/adminsQA', icon:'mdi-account-question-outline',},
        {title: 'アプリ概要', to: '/admins/adminsAboutApp', icon:'mdi-apps',},
        {title: '作者ページ', to: '/admins/adminsProfile', icon:'mdi-account-tie',},
      ],
    }
  },

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


</style>