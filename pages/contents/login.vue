<template>
  <Form @click="login">
    <template v-slot:title>
      ログイン
    </template>
    <template v-slot:button>
      ログイン
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
  methods: {
    login(mailaddress, password) {
      auth.signInWithEmailAndPassword(mailaddress, password)
      .then(() => {
        console.log('sucsses login');
        this.$router.push('/contents/logout')
        })
      .catch(e => {
        console.log('Error:' + e)
        return
      })
    },
  }
}
</script>