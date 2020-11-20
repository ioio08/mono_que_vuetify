<template>
  <v-row  justify="center" align="center" >
    <v-col cols="12">
      <!-- Components  "Question" "Colum" -->
      <div class="text-center">
        <!-- Question component -->
        <Questions />
        <!-- Colum component -->
        <Colums />
      </div>
      <!-- Keywords Card -->
      <v-card style="background-color: #C5CAE9" class="keyword">
        <v-card-title>
          カテゴリー
        </v-card-title>
        <v-chip-group column >
          <v-chip
          v-for="keyword in keywords"
          :key="keyword.title"
          :to="keyword.to"
          link
          >{{ "#" + " " + keyword.title }}</v-chip>
        </v-chip-group>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

// pages
import Questions from '~/pages/contents/questions'
import Colums from '~/pages/contents/colums'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('keyword', ['keywords'])
  },
  components: {
    Questions,
    Colums
  },
  data() {
    return {
      page: 1,

    }
  }
}
</script>

<style lang="scss" >
// keyword

.keyword {
  padding-bottom: 20px;
}

.v-chip-group {
  background: rgb(187, 222, 251);
  padding: 10px 0;
}

.v-chip {
  margin: 4px 8px 4px 4px !important;
}


.tab {
  @include tab {
    display: none;
  }
}
</style>
