<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" >
          <v-card-title style="text-align: center">
            <h2>ログイン成功</h2>
          </v-card-title>
          <v-divider></v-divider>
        </v-col>
        <v-col>
          <v-card-actions>
            <v-btn @click="logout">ログアウト</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { auth } from '@/plugins/firebase'
import Cookie from "js-cookie"

export default {
  methods: {
    async logout() {
      await auth.signOut()
      .then(() => {
        this.$router.push('/contents/login'),
        Cookie.remove("access_token")
        console.log("sucsses logout");
      })
      .catch(e => {
        console.log('logout is faild')
        return
      })
    }
  }


}
</script>

<style lang="scss" scoped>

</style>