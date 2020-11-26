<template>
  <Form @submit="login">
    <template v-slot:title>
      <h1>ログイン</h1>
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
    login(email, password) {
      this.$store.dispatch('auth/signInWithEmail',{email: email, password: password})
    }
    // login(email, password) {
    //   auth.signInWithEmailAndPassword(email, password)
    //   .then(data => {
    //     this.$router.push('/users/userProfile')
    //   })
    //   .catch(e => this.error = e )
    // },
  }
}
</script>