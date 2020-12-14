<template>
  <Form @submit="signUp">
    <template v-slot:title>
    新規会員登
    </template>
    
    <template v-slot:button>
      <v-btn type="submit" small style="font-size: 1.6rem;">登録</v-btn>
    </template>

    <!-- login失敗時のエラー表示 -->
    <template v-if="error" v-slot:errorMessage>
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
    ...mapGetters({error:'auth/errorMessage'})
  },
  methods: {
    // Email sign inのActionsを発火させる関数
    // dispatchに２つ以上引数渡すときはオブジェクト形式にしないと送れないので下記のコード
    signUp(email, password) {
      this.$store.dispatch('auth/signUp', { email: email, password: password })
    },
  }
}
</script>