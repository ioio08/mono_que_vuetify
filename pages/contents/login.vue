<template>
  <Form @submit="emailLogin">
    <template v-slot:title>
      <h1>ログイン</h1>
    </template>
    <template v-slot:google>
      <v-avatar @click="googleLogin" size="40">
        <v-img src="/images/google-icon.svg"></v-img>
      </v-avatar>
    </template>
    <template v-slot:button>
      <v-btn type="submit">ログイン</v-btn>
    </template>
    <template v-if="error"  v-slot:errorMessage>
      <p>  {{ error }}  </p>
    </template>
  </Form>
</template>

<script>
import Form from "@/components/Users/UserForm";
import { auth } from '~/plugins/firebase'


export default {
  components: {
    Form,
  },
  data:() => ({
    error: '  ',
  }),
  methods: {
    emailLogin(email, password) {
      this.$store.dispatch('auth/signInWithEmail',{email: email, password: password})
    },
    googleLogin() {
      this.$store.dispatch('auth/signInWithGoogle')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-avatar {
  cursor: pointer;

  &:hover {
    border: .5px solid #fff;
  }

}
</style>