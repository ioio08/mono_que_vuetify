import colors from 'vuetify/es5/util/colors'

export default {

  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'MONO QUE',
    title: 'MONO QUE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap',},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap',},
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Sawarabi+Gothic',},
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firebase.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyAJdTWb3bd8NqohC19s5Xp6eFwBHPQJCIM",
      authDomain: "mono-que-data.firebaseapp.com",
      databaseURL: "https://mono-que-data.firebaseio.com",
      projectId: "mono-que-data",
      storageBucket: "mono-que-data.appspot.com",
      messagingSenderId: "359914177786",
      appId: "1:359914177786:web:13ba738f87f4a883c27543",
      measurementId: "G-5E3TJJE4BY"
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'auth/onUserStateChanged',
          subscribeManually: false
        },
        ssr: false
      },
      firestore: true,
      storage: true
    }
  },


  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   light: false,
    //   themes: {
    //     light: {
    //       primary: colors.lightGreen.darken1,
    //       accent: colors.lime.darken2,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // },
    treeShake: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  script:[
    {src: 'constants.js'}
  ]
}
