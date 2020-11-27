<template>
  <v-card>
    <v-card >
      ログイン中だけ表示
    </v-card>
  </v-card>
</template>

<script>

export default {
  middleware : 'authenticated',

}
</script>