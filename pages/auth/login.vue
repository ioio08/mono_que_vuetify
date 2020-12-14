<template>
  <Form @submit="emailLogin">
    <template v-slot:title>
      ログイン
    </template>

    <!-- Email認証のslot -->
    <template v-slot:button>
      <v-btn type="submit" small>ログイン</v-btn>
    </template>

    <!-- sign in失敗時のエラー表示 -->
    <template v-if="error"  v-slot:errorMessage>
      <p>  {{ error }}  </p>
    </template>
  </Form>
</template>

<script>
import Form from "@/components/Users/UserForm";
import { auth } from '~/plugins/firebase'
import { mapGetters } from 'vuex'


export default {
  components: {
    Form,
  },
  computed: {
    ...mapGetters({error:'auth/getErrorMessage'})
  },
  methods: {
    // Emailでのlogin認証を発火させる関数
    // dispatchに２つ以上引数渡すときはオブジェクト形式にしないと送れないので下記のコード
    emailLogin(email, password) {
      this.$store.dispatch('auth/signInWithEmail',{email: email, password: password})
    },
  }
}
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  padding-top: 10px;
  color: red;
}
</style>