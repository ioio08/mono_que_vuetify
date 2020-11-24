<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            <h2><slot name="title"></slot></h2>
          </v-card-title>
        </v-col>
        <v-col cols="12" sm="10" md="10">
          <v-card-actions>
            <v-text-field
            type="email"
            v-model="mailaddress"
            prepend-icon="mdi-email"
            label="Please write your mailaddress">
            </v-text-field>
          </v-card-actions>
        </v-col>
        <v-col cols="12" sm="10" md="10">
          <v-card-actions>
            <v-text-field
            type="password"
            v-model="password"
            prepend-icon="mdi-lock-outline"
            label="Please write your password">
            </v-text-field>
          </v-card-actions>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-card-actions>
            <v-btn @click="onClick">登録</v-btn>
            <v-btn @click="reset">リセット</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      mailaddress:'',
      password:'',
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.mailaddress, this.password)
    },
    reset() {
      this.mailaddress = ''
      this.password = ''
    }
  }
}
</script>