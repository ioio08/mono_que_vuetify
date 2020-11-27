<template>
  <Form @submit="signUp">
    <template v-slot:title>
      <h1>新規会員登録</h1>
    </template>
    <template v-slot:button>
      <v-btn type="submit">登録</v-btn>
    </template>
    <template v-if="error" v-slot:errorMessage>
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
    error:null,
  }),
  methods: {
    signUp(email, password) {
      this.$store.dispatch('auth/signUp', { email: email, password: password })

    },
    
  }
}
</script>