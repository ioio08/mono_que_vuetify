<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">
      <div class="text-center">
        <question />
        <colum
        :button = false
        />
      </div>
      <v-card style="background-color: #C5CAE9">
        <v-card-actions>
          <v-btn
            color="primary"
            nuxt
            to="/contents/question"
          >
            Question
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/contents/colum"
          >
            Colum
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

// pages
import Question from '~/pages/contents/question'
import Colum from '~/pages/contents/colum'

export default {

  components: {
    'question': Question,
    'colum': Colum,
  }
}
</script>

<style lang="scss" scoped>
.tab {
  @include tab {
    display: none;
  }
}
</style>
