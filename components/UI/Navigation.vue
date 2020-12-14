<template>
  <!-- ＝＝＝＝＝＝ここからSideBar＝＝＝＝＝＝ -->
  <v-navigation-drawer app floating v-bind="permanent" mini-variant mini-variant-width="64"  expand-on-hover>
    <v-list nav dense>

      <!-- ここからSideBarコンテンツリスト: 1. Contents, 2.Users, 3.Admins,  -->

      <!-- 1. Contents :  "Home" "Question" "Column"  -->
      <v-list-group :value="false" >
        <template v-slot:activator>
            <v-icon>mdi-apps</v-icon>
          <v-list-item-title>コンテンツ</v-list-item-title>
        </template>
        <v-list-item
        v-for="contentList in contentLists"
        :key="contentList.title"
        style=" margin-top: 20px;"
        >
          <v-list-item-icon><v-icon>{{ contentList.icon }} </v-icon></v-list-item-icon>
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
          <v-list-item-icon><v-icon>{{ userList.icon }} </v-icon></v-list-item-icon>
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
        <v-list-item-icon><v-icon>{{ adminList.icon }} </v-icon></v-list-item-icon>
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
</template>

<script>
export default {
  props: {
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
  computed: {
    permanent () {
      const permanent = {md:'permanent', lg:'permanent', xl:'permanent'}[this.$vuetify.breakpoint.name];
      return permanent ? { [permanent]: true } : {}
    },
  }
}
</script>

<style lang="scss" scoped>
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

// ==================================
// ナビゲーション
// ==================================
nav {
  color: $header-font-color!important;
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