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

      <!-- ここからタブメニューリスト -->
      <!-- ユーザーリスト "Profile" "Colum" "Question" "Star" -->
      <v-list-group :value="true">
        <template v-slot:activator>
          <v-icon>mdi-account-circle-outline</v-icon>
          <v-list-item-title>User's</v-list-item-title>
        </template>
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
      </v-list-group>
      <!-- 管理者リスト "Contact" "Q & A" "About the app" "Admin's pdofile" -->
      <v-list-group>
        <template v-slot:activator>
            <v-icon>mdi-office-building</v-icon>
          <v-list-item-title>Admin 's</v-list-item-title>
        </template>
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
      </v-list-group>
      <!-- ページ遷移 "Home" "Question" "Colum" -->
      <v-list-group class="header-nav__pagination">
        <template v-slot:activator>
            <v-icon>mdi-apps</v-icon>
          <v-list-item-title>Contents</v-list-item-title>
        </template>
        <v-list-item
        v-for="contentsPage in contentsPages"
        :key="contentsPage.title"
        style=" margin-top: 20px;"
        >
          <v-list-item-icon><v-icon>{{ contentsPage.icon }} </v-icon></v-list-item-icon>
          <v-btn
            :to="contentsPage.to"
            text
            class="font-weight-bold"
            style="width: 120px;"
          >
            {{ contentsPage.title }}
          </v-btn>
        </v-list-item>
      </v-list-group>
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
          to="/main"
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
      style="margin-right: 15px"
      v-if="loggedIn">
        <v-btn
        text
        @click="logout">
        |  Logout |
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items
        v-else
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
        | {{ userSign.title }} |
        </v-btn>
      </v-toolbar-items>

      <!-- User-avatar -->
      <v-toolbar-items v-if="loggedIn">
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
import { auth } from '~/plugins/firebase'
import Cookies from "js-cookie"

export default {
  //  default.vue ~ props
  props:['title','fixed','message', 'adminPages'],
  mounted() {
    this.setupFirebase();
  },

  data:() => ({
      clipped: false,
      // drawerのboolean値でメニューの出し入れ [true: 出力, false: 隠す(default)]
      drawer: false,
      // login or ogout を色別する変数 (true: login中, false: logout中)
      loggedIn: false,
      contentsPages: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/main'
        },
        {
          icon: 'mdi-help-box',
          title: 'Question',
          to: '/contents/questions'
        },
        {
          icon: 'mdi-note-text-outline',
          title: 'Colum',
          to: '/contents/colums'
        },
      ],
      userSigns: [
        { title: 'Signup', to: '/contents/signup' },
        { title: 'Login', to: '/contents/login' },
      ],
      userPages: [
        {title: 'Profile', to: '/users/userProfile', icon:'mdi-card-account-details-outline',},
        {title: 'MyColum', to: '/users/userColum', icon:'mdi-note-text-outline',},
        {title: 'MyQuestion', to: '/users/userQuestion', icon:'mdi-comment-question-outline',},
        {title: 'favorite', to: '/users/userStar', icon:'mdi-star-outline',},
      ],
  }),
  methods: {
    logout() {
      auth.signOut()
      .then(() => {
        this.$router.push('/contents/login');
        // Cookie.remove("access_token")
      })
      .catch(e => {
        console.log('logout is faild')
      })
    },
    setupFirebase() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.loggedIn = true;

          auth.currentUser.getIdToken(true)
          .then(token => {
            Cookies.set('access_token', token)
          })

        } else {
          this.loggedIn = false;
          Cookies.remove('access_token')
          console.log('faild! loggedIn is' + this.loggedIn);
        }
      })
    }

  }

}
</script>

<style lang="scss">

//===============  header  ======================

//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

  // タブメニュー
  .v-list-group__header  {
    text-align: center;
    margin-top: 15px;
  }
  .v-list-item__title {
    font-size: 1.2rem !important;
  }
  .header-nav__pagination {
    display: none;
    @include tab {
      display: block;
    }
  }


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