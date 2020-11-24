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
            v-model="users.mailaddress"
            prepend-icon="mdi-email"
            label="Please write your mailaddress">
            </v-text-field>
          </v-card-actions>
        </v-col>
        <v-col cols="12" sm="10" md="10">
          <v-card-actions>
            <v-text-field
            type="password"
            v-model="users.password"
            prepend-icon="mdi-lock-outline"
            label="Please write your password">
            </v-text-field>
          </v-card-actions>
        </v-col>
        <v-col cols="12" sm="3" md="3">
          <v-card-actions>
            <v-btn @click="onClick"><slot name="button"></slot></v-btn>
            <v-btn @click="reset">リセット</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  data:() => ({
    users: {
      mailaddress:'',
      password:'',
    },
  }),
  methods: {
    onClick() {
      this.$emit('click', this.users.mailaddress, this.users.password)
    },
    reset() {
      this.users.mailaddress = ''
      this.users.password = ''
    }
  }
}
</script>