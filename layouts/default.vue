<template>
  <v-app dark>
    <default-header
      :title="title"
      :fixed="fixed"
      :message="message"
      :adminPages="adminPages"
    />

    <v-main>
      <v-container >
        <nuxt />
      </v-container>
    </v-main>

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
