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
      <!-- Categorys Card -->
      <v-card style="background-color: #C5CAE9" class="category">
        <v-card-title>
          カテゴリー
        </v-card-title>
        <v-chip-group column >
          <v-chip
          v-for="category in categorys"
          :key="category.title"
          :to="category.to"
          link
          >{{ "#" + " " + category.title }}</v-chip>
        </v-chip-group>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

// pages
import Questions from '~/pages/contents/questions'
import Colums from '~/pages/contents/colums'

export default {
  components: {
    Questions,
    Colums
  },
  data() {
    return {
      page: 1,
      categorys: [
        {title: "家電", to: "/colum"},
        {title: "アウトドア", to: "/colum"},
        {title: "PC", to: "/colum"},
        {title: "携帯電話", to: "/colum"},
        {title: "ファッション", to: "/colum"},
        {title: "メンズ", to: "/colum"},
        {title: "レディース", to: "/colum"},
        {title: "車", to: "/colum"},
        {title: "サイクリング", to: "/colum"},
        {title: "旅行", to: "/colum"},
        {title: "小説", to: "/colum"},
      ],

    }
  }
}
</script>

<style lang="scss" >
// category

.category {
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
