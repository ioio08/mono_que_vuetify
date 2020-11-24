<template>
  <Form @click="signUp">
    <template v-slot:title>
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
    signUp: function (mailaddress, password) {
      auth.signInWithEmailAndPassword(mailaddress, password)
      .then(
        alert('sucsses')
      )
      .catch(
        console.log('faild')
      )
    },
  }
}
</script>