<template>
  <Form @click="signUp">
    <template v-slot:title>
      新規会員登録
    </template>
    <template v-slot:button>
      登録
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
      auth.createUserWithEmailAndPassword(mailaddress, password)
      .then(
        console.log('sucsses')
      )
      .catch(
        console.log('faild')
      )
    },
  }
}
</script>