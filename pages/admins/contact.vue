<template>
  <div>
    <v-row justify="center">
      <v-col cols="8">
        <form >
          <v-text-field
            v-model="name"
            :counter="10"
            label="お名前を入力してください。"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="ご返信先のメールアドレスを記入してください。"
          ></v-text-field>

          <v-select
            v-model="select"
            :items="subjects"
            label="お問い合わせ内容を選択してください。"
          ></v-select>

          <v-textarea outlined rows="10" name="input-7-4" v-model="message" label="お問い合わせ内容を記載してください。"></v-textarea>

          <v-checkbox
            v-model="checkbox"
            label="Do you agree?"
          ></v-checkbox>
          <v-btn class="mr-4"> submit </v-btn>
          <v-btn @click="clear"> clear</v-btn>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    email: '',
    select: null,
    message: '',
    subjects: [
      '制作依頼',
      '採用',
      'その他',
    ],
    checkbox: false,
  }),
  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      // this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
      this.message = ''
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  padding-bottom: 8%;
}
</style>
