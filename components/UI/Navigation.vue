<template>
    <!-- ＝＝＝＝＝＝ここからSideBar＝＝＝＝＝＝ -->
    <v-navigation-drawer app v-model="drawer" floating permanent mini-variant expand-on-hover mini-variant-width="60">
      <v-list nav dense>

        <!-- ここからSideBarコンテンツリスト: 1. Contents, 2.Users, 3.Admins,  -->

        <!-- 1. Contents :  "Home" "Question" "Column"  -->
        <v-list-group :value="false" class="header-nav__pagination">
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
        <v-list-group :value="false">
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
            <v-list-item-title>アプリについて</v-list-item-title>
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

</template>

<script>
export default {
  props: {
    adminPages: {
      type:Array,
      required: true
    }
  },
  data:() => ({
    // Contentsのデータ(Headerタブ、SideBarメニューの２カ所で使用)
    contentsPages: [
      { icon: 'mdi-home', title: 'ホーム', to: '/'},
      { icon: 'mdi-help-box', title: '質問一覧', to: '/contents/questions'},
      { icon: 'mdi-note-text-outline', title: 'コラム一覧', to: '/contents/columns'},
    ],
    // Usersデータ
    userPages: [
      {title: 'プロフィール', to: '/users/profile', icon:'mdi-card-account-details-outline',},
      {title: 'あなたのコラム', to: '/users/userColumns', icon:'mdi-note-text-outline',},
      {title: 'あなたの質問', to: '/users/userQuestions', icon:'mdi-comment-question-outline',},
      // {title: '後で読む記事', to: '/users/userStar', icon:'mdi-star-outline',},
    ],

  }),

}
</script>

<style lang="scss" scoped>
.v-list-group  {
  margin-bottom: 5%;
}

.v-list-item__title,.v-application .primary--text {
  font-size: 1rem !important;
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

// ==================================
// ナビゲーション
// ==================================
nav {
  color: $header-font-color !important;
  background-color:$header-background-color !important;

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


</style>