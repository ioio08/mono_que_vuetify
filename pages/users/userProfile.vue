<template>
  <v-card>
    <v-card v-if="authStatus">
      {{ user.email }}
      {{ user.uid }}
      こっちはログイン中だけ表示
    </v-card>
    <v-card v-else>
      {{ user.email }}
      {{ user.uid }}
      こっちは未ログイン中だけ
    </v-card>
  </v-card>
</template>

<script>
import { auth } from '~/plugins/firebase'
import { mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters({
      user: 'auth/user',
      authStatus: 'auth/authStatus'
    })
  }

}
</script>