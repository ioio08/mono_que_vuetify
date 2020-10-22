<template>
  <v-row justify="center" align="center" >
    <v-col cols="12" sm="10" md="8">
      <div class="text-center">
        <question />
        <colum />
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
