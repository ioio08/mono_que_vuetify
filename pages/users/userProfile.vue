<template>
  <v-card>
    {{ user.email }}
  </v-card>
</template>

<script>
import { auth } from '~/plugins/firebase'
import { getUserFromCookie } from '~/store/cookies.js'
import { mapGetters } from 'vuex'


export default {
  asyncData({ req, redirect }) {
    if (process.server) {
      const user =  getUserFromCookie(req)
      if (!user) {
        redirect('/contents/login')
      }
    } else {
      let user = auth.currentUser;
      // console.log(user);

      if (!user) {
        redirect('/contents/login')
      }
    }
  },
  data:() => ({

  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }

}
</script>