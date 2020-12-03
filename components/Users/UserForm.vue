<template>

  <!-- ユーザーの新規登録、ログインに使うコンポーネント -->
  <div>
    <v-container >
      <v-row justify="start" align="center">
        <v-col cols="12">

          <!-- Title: 1.新規登録, 2.ログイン -->
          <v-card-text style="text-align: center">
            <h1><slot name="title"/></h1>
          </v-card-text>
          <v-divider></v-divider>

          <!-- Form submitは親コンポーネントのsubmitによって変わる -->
          <!-- $emitで呼び出して実行 -->
          <v-form @submit.prevent="onClick"  lazy-validation>
            <v-row justify="start" justify-xs="center" align="center" >

              <!-- Email input -->
              <v-col cols="12">
                <v-text-field
                  type="email"
                  v-model="users.email"
                  prepend-icon="mdi-email"
                  required
                  :rules="emailRules"
                  label="Email">
                </v-text-field>
                </v-col>

                <!-- Password input -->
                <v-col cols="12">
                  <v-text-field
                    type="password"
                    v-model="users.password"
                    prepend-icon="mdi-lock-outline"
                    label="Password">
                  </v-text-field>
                </v-col>

                <!-- slotは新規登録とログインで変更されるbuttonを挿入する -->
                <!-- 新規登録（登録ボタン）：ログイン（ログインボタン）＋googleログインも表示する -->
                <v-col cols="12">
                  <v-card-actions>
                    <slot name="google" />
                    <slot name="button"/>
                    <v-btn @click="reset">リセット</v-btn>

                  </v-card-actions>
                </v-col>
              </v-row>
            </v-form>
            <!-- エラーがあれば表示される -->
          <slot name="errorMessage" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  data:() => ({
    users: {
      email:'',
      password:'',
    },
    // validation設定
    valid: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail を確認してください。例）@の入れ忘れや.(ドット)位置など。'
    ],
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
h1 {
  padding: 3% 0;
}
.v-card {
  width: 80%;
  margin: 3% auto ;

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