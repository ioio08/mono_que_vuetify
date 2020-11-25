<template>
  <div>
    user's profile
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'

export default {
  beforeCreate() {
    let user = auth.currentUser;
    if (!user) {
      this.$router.push('/contents/login')
    } else {

    }
  },
  data:() => ({

  }),
}
</script>