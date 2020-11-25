<template>
  <div>
    user's profile
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
import { getUserFromCookie } from '~/store/users.js'
import Cookies from "js-cookie"

export default {
  asyncData({ req, redirect }) {
    if (process.server) {
      const user =  getUserFromCookie(req)
      console.log(user);
      if (!user) {
        redirect('/contents/login')
      }
    } else {
      let user = auth.currentUser;
      if (!user) {
        redirect('/contents/login')
      }
    }
  },
  data:() => ({

  }),
}
</script>