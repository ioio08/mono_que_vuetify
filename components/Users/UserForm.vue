<template>
  <v-card>
    <v-container >
      <v-row justify="start" align="center">
        <v-col cols="12">
          <v-card-text style="text-align: center">
            <slot name="title"/>
          </v-card-text>
          <v-divider></v-divider>
          <v-form @submit.prevent="onClick">
            <v-row justify="start" justify-xs="center" align="center" >
              <v-col cols="12">
                <v-text-field
                  type="email"
                  v-model="users.email"
                  prepend-icon="mdi-email"
                  label="Email">
                </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    v-model="users.password"
                    prepend-icon="mdi-lock-outline"
                    label="Password">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-card-actions>
                    <slot name="button"/>
                    <v-btn @click="reset">リセット</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
          <slot name="errorMessage" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  data:() => ({
    users: {
      email:'',
      password:'',
    }
  }),
  methods: {
    onClick() {
      this.$emit('submit', this.users.email, this.users.password)
    },
    reset() {
      this.users.email = ''
      this.users.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  width: 80%;
  margin: 0 auto 5%;
  @include mb {
    width: 95%;
  }
}

.v-card__actions {
  justify-content: space-around;
}

.row {
  width: 80%;
  margin: 0 auto;
  @include mb {
    width: 95%;
  }
}

form {
  margin-top: 5%;
}
</style>