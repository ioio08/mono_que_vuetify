<template>

    <div>
    <!-- ＝＝＝＝＝＝ここからSideBar＝＝＝＝＝＝ -->
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-list nav dense>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on" @click="drawer=!drawer" style="margin-bottom: 20px;"></v-app-bar-nav-icon>
          </template>
          <span>メニューを閉じる</span>
        </v-tooltip>

        <!-- ここからSideBarコンテンツリスト: 1.Users, 2.Admins, 3. Contents(responsiveでtabサイズから表示) -->
        <!-- 1.Users : "Profile" "Column" "Question" "Star" : defaultでリストを表示させる(value = true)-->
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-icon>mdi-account-circle-outline</v-icon>
            <v-list-item-title>User's</v-list-item-title>
          </template>

          <!-- Usersのリストレンダリング -->
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

        <!-- 2. Admins :  "Contact" "Q & A" "About the app" "Admin's pdofile" -->
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

        <!-- 3. Contents :  "Home" "Question" "Column" (tabから表示) -->
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
    <v-app-bar elevation="1" app clipped-left hide-on-scroll >

      <!-- header-left -->
      <!-- SideBar "Open SideBar Contents" -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" @click="drawer=!drawer"></v-app-bar-nav-icon>
        </template>
        <span>メニューを開く</span>
      </v-tooltip>
      <v-spacer></v-spacer>

      <!-- Title : ClickでHomeにページ遷移 -->
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <nuxt-link
              to="/main"
              class="link-white font-weight-bold ">
              {{ title }}
            </nuxt-link>
          </v-toolbar-title>
        </template>
        <span>ホームへ戻る</span>
      </v-tooltip>
      <v-spacer></v-spacer>

      <!-- header-right -->
      <!-- User-infomation "Sign-up" , "Log-in" -->
      <!-- tab, mb で削除 -->
      <!-- Login状態で切り替え。 true(ログイン中)：logout, avatar, false(未ログイン)：sign in, login -->

      <!-- ログイン中の設定 -->
      <v-menu
        v-if="loggedIn"
        open-on-hover
        bottom
        offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
          <v-avatar size="40" style="margin: 3px 5% 0 0;">
            <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
          </v-avatar>
          </v-btn>
        </template>
        <v-card width="280px">
          <v-container>
            <v-card-title>
              <h4 @click="onAccount('/users/profile')" style="cursor:pointer">プロフィール</h4>
            </v-card-title>
            <v-card-text >
              <p>あなたの投稿や、後で見たい投稿を確認できます。</p>
            </v-card-text>
          </v-container>
        </v-card>
        <v-card width="280px">
          <v-container>
            <v-card-title>
              <h4 @click="logout" style="cursor:pointer">ログアウト</h4>
            </v-card-title>
            <v-card-text >
              <p>ログアウトできます。<br> ログアウトしても投稿を見ることができます。</p>
            </v-card-text>
          </v-container>
        </v-card>
      </v-menu>

      <!-- 未ログインの表示 -->
      <v-menu
      v-else
      open-on-hover
      bottom
      left
      offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
          | アカウント |
          </v-btn>
        </template>
        <v-card width="280px">
          <v-container>
            <v-card-title>
              <h4>新規登録・ログイン</h4>
            </v-card-title>
            <v-card-text>
              <p>新規登録、またはログインをすることで投稿が利用できます。<br> 登録されなくても、質問やコラムを見ることができます。</p>
            </v-card-text>
          </v-container>
          <v-container v-for="(item, i) in userSigns" :key="i" >
            <v-card-title>
              <h4  @click="onAccount(item.to)"  style="cursor:pointer;">{{ item.title }}</h4>
            </v-card-title>
            <v-card-text >
              <p>{{ item.text }}</p>
            </v-card-text>
          </v-container>
        </v-card>
      </v-menu>

    </v-app-bar>
  </div>
</template>


<script>
import { auth } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  //  default.vue ~ props
  props:['title','fixed','message', 'adminPages'],
  data:() => ({
    clipped: false,
    // drawerのboolean値でメニューの出し入れ [true: 出力, false: 隠す(default)]
    drawer: false,

    // Contentsのデータ(Headerタブ、SideBarメニューの２カ所で使用)
    contentsPages: [
      { icon: 'mdi-home', title: 'ホーム', to: '/main'},
      { icon: 'mdi-help-box', title: '質問', to: '/contents/questions'},
      { icon: 'mdi-note-text-outline', title: 'コラム', to: '/contents/columns'},
    ],
    // sign in, loginの制御データ
    userSigns: [
      { title: '新規登録', to: '/auth/signup', text:'アカウントをお持ちでない方は、新規登録してください。' },
      { title: 'ログイン', to: '/auth/login' , text:'すでにアカウトをお持ちの方は、ログインしてください。'},
    ],
    userLogins: [
      { title: 'プロフィール', text:'あなたのプロフィールページです。', event:`onAccount(/users/profile)` },
      { title: 'ログアウト', text:'ログアウトできます。Myページ以外はそのままご覧になれます。',event:`logout`},
    ],
    // Usersデータ
    userPages: [
      {title: 'プロフィール', to: '/users/profile', icon:'mdi-card-account-details-outline',},
      {title: 'あなたのコラム', to: '/users/userColumns', icon:'mdi-note-text-outline',},
      {title: 'あなたの質問', to: '/users/userQuestions', icon:'mdi-comment-question-outline',},
      // {title: '後で読む記事', to: '/users/userStar', icon:'mdi-star-outline',},
    ],
    isDownTab: true,
  }),
  methods: {
    logout() {
      auth.signOut()
      .then(() => {
        this.$router.push('/auth/login');
      })
      .catch(e => {
        console.log('logout is faild')
      })
    },
    onAccount(to) {
      this.$router.push(to)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      loggedIn: 'auth/authStatus'
    })
  },

}
</script>

<style lang="scss">

//===============  Header Components  ======================

//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

// SideBar
.v-list-group__header  {
  text-align: center;
  margin-top: 15px;
}
.v-list-item__title {
  font-size: 1.2rem !important;
}


// Headerのmoushover
.downTabs {
  top: 50%;
}

// Header
header {
  opacity: .8;

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
    margin-left: 6%;

    @include tab {
      margin: 0 !important;
    }
  }

  //======  ツールバー下部  ======
  //  ヘッダータブ
  .v-toolbar__extension {
    top: -50%;
    opacity: 0;
    height: 65px !important;
    @include tab {
      display: none !important;
      transition: 0.6s;
    }
  }
}

h4 {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.466);
  padding: 8px;
  border-radius: 25px 10px ;

  &:hover {
    opacity: .2;
  }
}

.v-list-item {

  &:hover {
    background-color: rgba(255, 255, 255, 0.459);
  }
}
</style>