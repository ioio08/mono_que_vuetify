<template>
  <v-row justify="center" align="center" >
    <v-col cols="12" >
      <v-card style="background-color: #C5CAE9">
        <v-card-title class="headline"
        style="color: yellow"
        >
          コラム
        </v-card-title>
        <v-container
        style="background-color: #BBDEFB">
          <v-row>
            <v-col
              v-for="n in 6"
              :key="n"
              cols="6"
              md="4"
              dence
            >
              <v-card
                class="pa-2"
                style="height:200px"
                outlined
                tile
                color="indigo"
              >
                <v-sheet color="light-blue"  tile class="pa-2">コラム内容</v-sheet>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="text-center">
            <v-pagination
            v-model="page"
            :length="6"
            ></v-pagination>
          </div>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/main"
          >
            Home
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/question"
          >
            Question
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
props:['page']

}
</script>