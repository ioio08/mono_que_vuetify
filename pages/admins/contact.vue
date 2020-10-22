<template>
  <div>
    <form style="border: 3px solid #fff; border-radius: 5px; padding: 5px 50px 20px;">
    <v-text-field
      v-model="name"
      :counter="10"
      label="Name"
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="E-mail"
    ></v-text-field>
    <v-select  
      v-model="select"
      :items="subjects"
      label="Subject"
    ></v-select>

    <v-textarea outlined rows="10" name="input-7-4" v-model="message" label="Message"></v-textarea>
    <v-checkbox
      v-model="checkbox"
      label="Do you agree?"
    ></v-checkbox>
    <v-btn
      class="mr-4"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
  </div>
</template>

<script>
  // import { validationMixin } from 'vuelidate'
  // import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    // mixins: [validationMixin],

    // validations: {
    //   name: { required, maxLength: maxLength(10) },
    //   email: { required, email },
    //   select: { required },
    //   checkbox: {
    //     checked (val) {
    //       return val
    //     },
    //   },
    // },

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

    // computed: {
    //   checkboxErrors () {
    //     const errors = []
    //     if (!this.$v.checkbox.$dirty) return errors
    //     !this.$v.checkbox.checked && errors.push('You must agree to continue!')
    //     return errors
    //   },
    //   selectErrors () {
    //     const errors = []
    //     if (!this.$v.select.$dirty) return errors
    //     !this.$v.select.required && errors.push('Item is required')
    //     return errors
    //   },
    //   nameErrors () {
    //     const errors = []
    //     if (!this.$v.name.$dirty) return errors
    //     !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    //     !this.$v.name.required && errors.push('Name is required.')
    //     return errors
    //   },
    //   emailErrors () {
    //     const errors = []
    //     if (!this.$v.email.$dirty) return errors
    //     !this.$v.email.email && errors.push('Must be valid e-mail')
    //     !this.$v.email.required && errors.push('E-mail is required')
    //     return errors
    //   },
    // },

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
