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

        <!-- ここからSideBarコンテンツリスト: 1. Contents, 2.Users, 3.Admins,  -->

        <!-- 1. Contents :  "Home" "Question" "Column"  -->
        <v-list-group :value="true" class="header-nav__pagination">
          <template v-slot:activator>
              <v-icon>mdi-apps</v-icon>
            <v-list-item-title>コンテンツ</v-list-item-title>
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

        <!-- 2.Users : "Profile" "Column" "Question" "Star" : defaultでリストを表示させる(value = true)-->
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-icon>mdi-account-circle-outline</v-icon>
            <v-list-item-title>ユーザー</v-list-item-title>
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

        <!-- 3. Admins :  "Contact" "Q & A" "About the app" "Admin's pdofile" -->
        <v-list-group>
          <template v-slot:activator>
              <v-icon>mdi-office-building</v-icon>
            <v-list-item-title>管理者</v-list-item-title>
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


      </v-list>
    </v-navigation-drawer>

    <!-- ＝＝＝＝＝＝＝ヘッダー上部＝＝＝＝＝＝＝＝＝＝ -->
    <v-app-bar elevation="1" app clipped-left flat>

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
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <nuxt-link to="/">
              {{ title }}
            </nuxt-link>
          </v-toolbar-title>
        </template>
        <span>ホームへ</span>
      </v-tooltip>
      <v-spacer></v-spacer>

      <!-- header-right -->
      <!-- User-infomation "Sign-up" , "Log-in" -->
      <!-- tab, mb で削除 -->
      <!-- Login状態で切り替え。 true(ログイン中)：logout, avatar, false(未ログイン)：sign in, login -->

      <!-- ログイン中の設定 -->
      <v-menu

        open-on-hover
        bottom
        offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
          <v-avatar v-show="loggedIn" size="40" style="margin: 3px 5% 0 0;">
            <v-img :src="userImage ? userImage : '/images/cafe.jpeg'" />
          </v-avatar>
          </v-btn>
        </template>
        <v-card width="280px" >
          <v-container>
            <v-card-title>
              <h4 @click="onAccount('/users/profile')" style="cursor:pointer">プロフィール</h4>
            </v-card-title>
            <v-card-text >
              <p>あなたのプロフィールや投稿を確認することができます。</p>
            </v-card-text>
          </v-container>
        </v-card>
        <v-card width="280px" >
          <v-container>
            <v-card-title>
              <h4 @click="logout" style="cursor:pointer">ログアウト</h4>
            </v-card-title>
            <v-card-text >
              <p>ログアウトしても、一般の投稿は継続して見られます。</p>
            </v-card-text>
          </v-container>
        </v-card>
      </v-menu>

      <!-- 未ログインの表示 -->
      <v-menu
      open-on-hover
      bottom
      left
      offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <div v-show="!loggedIn" class="account-menu" v-bind="attrs"
            v-on="on">|  アカウント  |</div>
        </template>
        <v-card width="280px">
          <v-container>
            <v-card-title>
              <h3>新規登録・ログイン</h3>
            </v-card-title>
            <v-card-text>
              <p>新規登録・ログインをすることで投稿が出来るようになります。<br> 登録しなくても、質問やコラムの閲覧は可能です。</p>
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
      { icon: 'mdi-home', title: 'ホーム', to: '/'},
      { icon: 'mdi-help-box', title: '質問一覧', to: '/contents/questions'},
      { icon: 'mdi-note-text-outline', title: 'コラム一覧', to: '/contents/columns'},
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
      userImage: 'auth/userImage',
      loggedIn: 'auth/authStatus'
    })
  },
}
</script>

<style lang="scss" scoped>

//===============  Header Components  ======================

//  ブレイクポイント  max-width で設定
// @include  $mb:559px;   モバイル
// @include $tab:959px;  タブレット
// @include  $pc:1023px;  パソコン

// SideBar
.v-list-group  {
  // text-align: center;
  margin-bottom: 5%;
}

.v-list-item__title,.v-application .primary--text {
  font-size: 1rem !important;
  margin-left: 6%;
  color: $header-font-color !important;
}


// Header
header {
  opacity: .8 !important;
  background-color:$header-background-color !important;

  &:hover {
    opacity: 1 !important;
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
    margin-left: 3.5%;

    @include tab {
      margin: 0 !important;
    }

  }
}
nav {
  background-color:$header-background-color !important;
  color: $header-font-color !important;

}

.v-application a, .theme--light.v-icon, .account-menu{
  color: $header-font-color !important;
}

.theme--light.v-card{
  background-color: $profile-background-color !important;
  color:$main-font-color !important;
}

h4 {
  cursor: pointer;
  background-color: $v-main-background-color;
  padding: 10px 15px;
  border-radius: 20px;

  &:hover {
    opacity: .2;
  }
}

.v-list-item {

  &:hover {
    background-color: $hover-menu-background-color;
  }
}
</style>