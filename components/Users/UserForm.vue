<template>

  <!-- ユーザーの新規登録、ログインに使うコンポーネント -->
  <div>
    <v-container >
      <v-row justify="start" align="center">
        <v-col cols="12">

          <!-- Title: 1.新規登録, 2.ログイン -->
          <v-card-text style="text-align: center">
            <h1><slot name="title"/></h1>
            <v-btn @click="onGestClick">ゲストログイン</v-btn>
          </v-card-text>
          <v-divider></v-divider>

          <!-- Form submitは親コンポーネントのsubmitによって変わる -->
          <!-- $emitで呼び出して実行 -->
          <v-form @submit.prevent="onClick"  lazy-validation>
            <v-row justify="space-around" align="center" >

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

              <v-col cols="2" class="mb">
                <!-- google認証 モバイルサイズ  -->
                <v-avatar @click="googleLogin" size="35" >
                  <v-img src="/images/google-icon.svg"></v-img>
                </v-avatar>
              </v-col>

              <!-- slotは新規登録とログインで変更されるbuttonを挿入する -->
              <!-- 新規登録（登録ボタン）：ログイン（ログインボタン）＋googleログインも表示する -->
              <v-col cols="1" class="mb-google">
              <!-- google認証 モバイルサイズ -->
                <v-avatar @click="googleLogin" size="20">
                  <v-img src="/images/google-icon.svg"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="4" sm="4">
                <slot name="button"/>
              </v-col>
              <v-col cols="4" sm="4">
                <v-btn @click="reset" small >リセット</v-btn>
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
    gestUser: {
      email: 'test8@gmail.com',
      password: 'test8test8'
    },
    // validation設定
    valid: true,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail を確認してください。例）@の入れ忘れや.(ドット)位置など。'
    ],
  }),
  methods: {
    // google認証を発火させる関数
    googleLogin() {
      this.$store.dispatch('auth/signInWithGoogle')
    },
    onClick() {
      this.$emit('submit', this.users.email, this.users.password)
    },
    onGestClick() {
      this.$emit('submit', this.gestUser.email, this.gestUser.password)
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

.v-avatar {
  cursor: pointer;

  &:hover {
    border: .5px solid #fff;
  }
}

.mb-google {
  display: none;
  @include mb {
    display: inline-flex !important;
  }
}
</style>