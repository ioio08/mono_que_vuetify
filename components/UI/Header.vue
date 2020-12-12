<template>
  <v-app-bar elevation="10" app hide-on-scroll>

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
    <!-- Login状態で切り替え。 true(ログイン中)：logout, avatar, false(未ログイン)：sign in, login -->

    <!-- ログイン中の設定 -->
    <v-menu
      open-on-hover
      bottom
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
        v-bind="attrs"
          v-on="on"
        v-show="loggedIn"
        size="40"
        >
          <v-img :src="userImage ? userImage : '/images/cafe.jpeg'" />
        </v-avatar>
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
</template>


<script>
import { auth } from '~/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  //  default.vue ~ props
  props:{
    title: {
      type: String,
      required:true
    },
    userIcon: {
      type: String,
      // 未ログインであれば受け取れない
      required:false
    },
  },
  data:() => ({
    // sign in, loginの制御データ
    userSigns: [
      { title: '新規登録', to: '/auth/signup', text:'アカウントをお持ちでない方は、新規登録してください。' },
      { title: 'ログイン', to: '/auth/login' , text:'すでにアカウトをお持ちの方は、ログインしてください。'},
    ],
    userLogins: [
      { title: 'プロフィール', text:'あなたのプロフィールページです。', event:`onAccount(/users/profile)` },
      { title: 'ログアウト', text:'ログアウトできます。Myページ以外はそのままご覧になれます。',event:`logout`},
    ],
    userIcon: null,
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


// ==========  Header (ツールバー)  =============
header {
  opacity: .8 !important;
  background-color:$header-background-color !important;

  &:hover {
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
    font-size: 2.5rem;

    @include tab {
      margin: 0 !important;
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



// Header ユーザーアイコンで展開されるメニューの設定
// カード全体
.theme--light.v-card{
  background-color: $profile-background-color !important;
  color:$main-font-color !important;
}

// カード内のh4要素（タイトルなど）
h4 {
  cursor: pointer;
  background-color: $v-main-background-color;
  padding: 10px 15px;
  border-radius: 20px;

  &:hover {
    opacity: .2;
  }
}


</style>