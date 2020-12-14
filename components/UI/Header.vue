<template >
  <div>
    <!-- モバイルサイズから表示するナビゲーション -->
    <v-navigation-drawer app v-model="drawer" bottom temporary>
      <v-list nav dense>

        <!-- ここからSideBarコンテンツリスト: 1. Contents, 2.Users, 3.Admins,  -->

        <!-- 1. Contents : "Home" "Question" "Column"  -->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-icon>mdi-apps</v-icon>
            <v-list-item-title>コンテンツ</v-list-item-title>
          </template>
          <v-list-item
          v-for="contentList in contentLists"
          :key="contentList.title"
          style=" margin-top: 20px;"
          >
            <v-list-item-icon>
              <v-icon>{{ contentList.icon }} </v-icon>
            </v-list-item-icon>
            <v-btn
              :to="contentList.to"
              text
              class="font-weight-bold"
              style="width: 120px;"
            >
              {{ contentList.title }}
            </v-btn>
          </v-list-item>
        </v-list-group>

        <!-- 2.Users : "Profile" "Column" "Question" "Star" : defaultでリストを表示させる(value = true)-->
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-icon>mdi-account-circle-outline</v-icon>
            <v-list-item-title>ユーザー</v-list-item-title>
          </template>

          <!-- Usersのリストレンダリング -->
          <v-list-item
            v-for="(userList, i) in userLists"
            :key="i"
            style="margin-top: 20px;"
            >
            <v-list-item-icon>
              <v-icon>{{ userList.icon }} </v-icon>
            </v-list-item-icon>
            <v-btn
              :to="userList.to"
              text
              class="font-weight-bold"
              style="width: 120px;"
            >
              {{ userList.title }}
            </v-btn>
          </v-list-item>
        </v-list-group>

        <!-- 3. Admins :  "Contact" "Q & A" "About the app" "Admin's pdofile" -->
        <v-list-group>
          <template v-slot:activator>
            <v-icon>mdi-office-building</v-icon>
            <v-list-item-title>アプリについて</v-list-item-title>
          </template>
          <v-list-item
          v-for="adminList in adminLists"
          :key="adminList.title"
          style=" margin-top: 20px;"
          >
          <v-list-item-icon>
            <v-icon>{{ adminList.icon }} </v-icon>
          </v-list-item-icon>
          <v-btn
              :to="adminList.to"
              text
              class="font-weight-bold"
              style="width: 120px;"
            >
              {{ adminList.title }}
            </v-btn>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- ここからHeader -->
    <v-app-bar elevation="10" app hide-on-scroll>

      <!-- モバイルサイズ用ナビゲーションの開閉アイコン -->
      <v-app-bar-nav-icon  app @click="drawer = !drawer" class="tab-navigation" />

      <v-spacer/>

      <!-- Title : ClickでHomeにページ遷移 -->
      <v-tooltip bottom >
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <nuxt-link to="/">
              {{ title }}
            </nuxt-link>
          </v-toolbar-title>
        </template>
        <span>ホームへ</span>
      </v-tooltip>

      <v-spacer/>

      <!-- header-right -->
      <!-- User-infomation "Sign-up" , "Log-in" -->
      <!-- Login状態で切り替え。 true(ログイン中)：logout, avatar, false(未ログイン)：sign in, login -->

      <!-- ログイン中のメニューリスト -->
      <v-menu
        open-on-hover
        offset-y
        bottom
        min-width="200px">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-bind="attrs"
            v-on="on"
            v-show="loggedIn"
            size="40"
          >
            <v-img :src="userImage" />
          </v-avatar>
        </template>
        <v-card>
          <v-container>
            <v-row>

              <!-- プロフィールメニュー -->
              <v-col cols="12" style="padding: 0 12px">
                <v-card-title>
                  <h4 @click="onAccount('/users/profile')" style="cursor:pointer">プロフィール</h4>
                </v-card-title>
                <v-card-text >
                  <p>あなたのプロフィールや投稿を確認することができます。</p>
                </v-card-text>
              </v-col>

              <!-- ログアウトメニュー -->
              <v-col cols="12" style="padding: 0 12px">
                <v-card-title>
                  <h4 @click="logout" style="cursor:pointer">ログアウト</h4>
                </v-card-title>
                <v-card-text >
                  <p>ログアウトしても、一般の投稿は継続して見られます。</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-menu>

      <!-- 未ログインのメニューリスト -->
      <v-menu
      open-on-hover
      offset-y
      bottom
      min-width="200px"
      >
        <template v-slot:activator="{ on, attrs }">

          <!-- 未ログイン時の メニューリストの開閉タイトル -->
          <div v-show="!loggedIn" class="account-menu" v-bind="attrs"
            v-on="on">|  アカウント  |</div>
        </template>
        <v-card>
          <v-container style="padding: 0 12px">
            <v-row>

            <!-- 未ログイン時の メニューリストタイトル -->
              <v-col cols="12" style="padding: 0 12px">
                <v-card-title>
                  <h3>新規登録・ログイン</h3>
                </v-card-title>
                <v-card-text>
                  <p>新規登録・ログインをすることで投稿が出来るようになります。<br> 登録しなくても、質問やコラムの閲覧は可能です。</p>
                </v-card-text>
              </v-col>

            <!-- 未ログイン時の メニューリスト 1.新規登録, 2.ログイン -->
              <v-col cols="12" style="padding: 0 12px" v-for="(item, i) in userSigns" :key="i">
                <v-card-title>
                  <h4  @click="onAccount(item.to)"  style="cursor:pointer;">{{ item.title }}</h4>
                </v-card-title>
                <v-card-text >
                  <p>{{ item.text }}</p>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>


<script>
import { auth, db } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  //  default.vue ~ props
  props:{
    title: {
      type: String,
      required:true
    },
    // navigationのリストコンテンツ(コンテンツ、管理者、ユーザー)
    adminLists: {
      type:Array,
      required: true
    },
    contentLists: {
      type:Array,
      required: true
    },
    userLists: {
      type:Array,
      required: true
    },
  },
  data:() => ({
    userSigns: [
      { title: '新規登録', to: '/auth/signup', text:'アカウントをお持ちでない方は、新規登録してください。' },
      { title: 'ログイン', to: '/auth/login' , text:'すでにアカウトをお持ちの方は、ログインしてください。'},
    ],
    userLogins: [
      { title: 'プロフィール', text:'あなたのプロフィールページです。'},
      { title: 'ログアウト', text:'ログアウトできます。Myページ以外はそのままご覧になれます。'},
    ],
    drawer: false,
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
    // 新規登録、ログインページへのページ遷移
    onAccount(to) {
      this.$router.push(to)
    },
  },
  computed: {
    ...mapGetters({
      userImage: 'auth/getUserImage',
      loggedIn: 'auth/getAuthStatus'
    }),
  },
}
</script>

<style lang="scss" scoped>

//===============  Header Components  ======================

//  ブレイクポイント  max-width で設定
// @include  $mb:587px;   モバイル
// @include $tab:948px;  タブレット
// @include  $pc:1023px;  パソコン


// ==========  Header (ツールバー)  =============
header {
  opacity: .8 !important;
  background-color:$header-background-color !important;

  &:hover {
    opacity: 1 !important;
  }

  @include pc {
    opacity: 1 !important;
  }

  // ======  ツールバー上部  ======
  .v-toolbar__content {
    @include tab {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      padding: 0 30px;
    }
  }

  //  ヘッダータイトル
  .v-toolbar__title {
    font-size: 4rem;
    margin-left: 4% !important;


    @include tab {
      margin-left: 4% !important;
      font-size: 2.2rem;
    }

    @include mb {
      font-size: 2rem;
    }
  }

  // ユーザーアイコン
  .v-avatar {
    @include tab {
      height: 40px !important;
      width: 40px !important;
      min-width: 40px !important;
    }
  }

}


// Header Titleのカラー設定
.v-application a,  .account-menu{
  color: $header-font-color !important;
}

// ナビゲーション内のリストコンテンツのタイトル
.account-menu {
  font-size: 1.6rem;

  @include tab {
      font-size: 1.2rem;
    }

  @include mb {
    font-size: .8rem;
  }
}


// Header ユーザーアイコンで展開されるメニューの設定
// カード全体
.theme--light.v-card{
  background-color: $profile-background-color !important;
  color:$main-font-color !important;
}

// v-menuのh3要素（タイトル）
h3 {
  font-size: 2.4rem;

  @include tab {
    font-size: 2rem;
  }

  @include mb {
    font-size: 1.5rem;
  }
}

// v-menuのh4要素（ボタンなど）
h4 {
  cursor: pointer;
  background-color: $v-main-background-color;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: normal;

  &:hover {
    opacity: .2;
  }

  @include tab {
    font-size: 1.6rem;
  }

  @include mb {
    font-size: 1.4rem;
  }
}

// v-menuのp要素（説明文）
p {
  font-size: 1.45rem;
  line-height: 2rem;

  @include tab {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }

  @include mb {
    font-size: 1rem;
    line-height: 1.4rem;
  }
}

// v-menuのレイアウト
.v-card__text {
  padding-bottom: 0;
}

.v-menu__content {
  width: 40%;
}

// モバイルサイズ用ナビゲーション開閉ボタンの表示/非表示
.tab-navigation {
  display: none;
  @include tab {
    display: inline-flex;
  }
}


// ===================
// Navigation
// ===================

nav {
  color: $header-font-color!important;
  background-color:$header-background-color !important;

  .v-btn {
    font-size: 1.3rem !important;
  }

  // ナビゲーション内（各コンテンツリストないのアイテム）のボタンのホバー設定
  .v-btn:not(.v-btn--round){
    &:hover {
      background-color: $v-menu-background-color !important;
    }
  }

  // ナビゲーション内のコンテンツタイトルのホバー設定
  ::v-deep .v-list-item--link {
    &:hover {
      background-color: $v-menu-background-color ;
    }
  }
  // ナビゲーション内のコンテンツタイトルの矢印アイコンのカラー設定
  ::v-deep ::before, ::after  {
    color: $header-font-color !important;
  }
}

// ナビゲーションタイトルのスタイル
.v-list-group  {
  margin-bottom: 5%;
}

.v-list-item__title,.v-application .primary--text {
  font-size: 1.6rem !important;
  line-height: 1.6rem !important;
  margin-left: 6%;
  color: $header-font-color !important;
}

//アイコンのカラー設定
.theme--light.v-icon {
  color: $header-font-color !important;
}

// リストコンテンツのタイトル文字色設定
.v-application a,  .account-menu{
  color: $header-font-color !important;
}

</style>