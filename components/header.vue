<template>

    <div>


    <!-- ＝＝＝＝＝＝ここからタブメニュー内コンテンツ＝＝＝＝＝＝ -->
    <v-navigation-drawer
    app
    v-model="drawer"
    clipped
    >
    <v-list
    nav
    dense
    >
      <v-app-bar-nav-icon @click="drawer=!drawer" style="margin-bottom: 20px;">
      </v-app-bar-nav-icon>
      <!-- ユーザーリスト "Profile" "Colum" "Question" "Star" -->
      <v-list-item-title
      style="margin:0 0 20px 10px;"
      >ー　User Page　ー</v-list-item-title>
      <v-list-item
      v-for="(userPage, i) in userPages"
      :key="i"
      style="margin-top: 20px;"
      >
      <v-list-item-icon><v-icon>{{ userPage.icon }} </v-icon></v-list-item-icon>
      <v-btn
          :to="userPage.to"
          text
          class="font-weight-bold"
          style="width: 120px;"
        >
          {{ userPage.title }}
        </v-btn>
      </v-list-item>
      <!-- 管理者リスト "Contact" "Q & A" "About the app" "Admin's pdofile" -->
      <v-list-item-title
      style="margin:20px 0 20px 10px;"
      >ー　Admin Page　ー</v-list-item-title>
      <v-list-item
      v-for="adminPage in adminPages"
      :key="adminPage.title"
      style=" margin-top: 20px;"
      >
      <v-list-item-icon><v-icon>{{ adminPage.icon }} </v-icon></v-list-item-icon>
      <v-btn
          :to="adminPage.to"
          text
          class="font-weight-bold"
          style="width: 120px;"
        >
          {{ adminPage.title }}
        </v-btn>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <!-- ＝＝＝＝＝＝＝ヘッダー上部＝＝＝＝＝＝＝＝＝＝ -->
    <v-app-bar
    elevation="1"
    app
    clipped-left
    >
      <!-- header-left -->
      <!-- Menu-bar "Open User-Menu" -->
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link
          to="/contents/main"
          class="link-white font-weight-bold "
        >
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer class="tab" />

      <!-- header-right -->
      <!-- User-infomation "Sign-up" , "Log-in" -->
      <!-- tab, mb で削除 -->
      <v-toolbar-items
        v-for="(userSign, i) in userSigns"
        :key="i"
        style="margin-right: 15px"
        class="tab"
      >
        <v-btn
          :to="userSign.to"
          text
          class="font-weight-bold"
        >
          {{ userSign.title }}
        </v-btn>
      </v-toolbar-items>

      <!-- User-avatar -->
      <v-toolbar-items>
        <v-btn icon large to="/users/userProfile">
          <v-avatar style="margin: 3px 10px 0 0;">
              <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
          </v-avatar>
        </v-btn>
      </v-toolbar-items>

      <!-- ＝＝＝＝＝＝＝＝ヘッダー下部＝＝＝＝＝＝＝＝＝＝＝＝ -->
      <template  v-slot:extension>
        <v-tabs>
          <!-- header-left -->
          <!-- Pagenation-tab "Home", "Qestion", "Colum"-->
          <v-tab
          align-with-title
          v-for="(contentsPage, i) in contentsPages"
          :key="i"
          :to="contentsPage.to"
          >{{ contentsPage.title }}
          </v-tab>
          <v-spacer />

          <!-- header-right "Search-function" -->
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

        </v-tabs>
      </template>
    </v-app-bar>

    <!-- ======================================================== -->
  </div>
</template>


<script>

export default {
  //  default.vue ~ props
  props:['title','fixed','message', 'adminPages'],

  data() {
    return {
      clipped: false,
      // drawerのboolean値でメニューの出し入れ [true: 出力, false: 隠す(default)]
      drawer: false,

      contentsPages: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/contents/main'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Question',
          to: '/contents/question'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Colum',
          to: '/contents/colum'
        },
      ],
      userSigns: [
        { title: '新規会員', to: '/contents/signup' },
        { title: 'ログイン', to: '/contents/signup' },
      ],
      userPages: [
        {title: 'プロフィール', to: '/users/userProfile', icon:'mdi-card-account-details-outline',},
        {title: 'マイコラム', to: '/users/userColum', icon:'mdi-note-text-outline',},
        {title: 'マイクエスチョン', to: '/users/userQuestion', icon:'mdi-comment-question-outline',},
        {title: 'お気に入り', to: '/users/userStar', icon:'mdi-star-outline',},
      ],
    }
  },

}
</script>

<style lang="scss">

//===============  header  ======================

//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

header {

  // v-app-bar 全体のスタイル
  @include tab {
    height: 60px !important;
    transition: 0.6s;
  }


  //======  ツールバー上部  ======
  .v-toolbar__content {
    @include tab {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 0 30px;
    }
  }

  .v-avatar {
    @include tab {
      height: 40px !important;
      width: 40px !important;
      min-width: 40px !important;
    }
  }

  //  ヘッダータイトル
  .v-toolbar__title {
    font-size: 2rem;
    margin-right: 50px !important;

    @include tab {
      margin: 0 !important;
    }
  }

  //======  ツールバー下部  ======
  //  ヘッダータブ
  .v-toolbar__extension {
    @include tab {
      display: none !important;
      transition: 0.6s;
    }
  }

}
</style>