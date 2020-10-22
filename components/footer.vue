<template>
    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="text-center"
      >
        <v-card-text>
          <v-btn
            v-for="(footerIcon, i) in footerIcons"
            :key="i"
            :to="footerIcon.to"
            class="mx-4"
            :title="footerIcon.hoverTitle"
          >
            <v-icon size="24px">
              {{ footerIcon.icon }}
            </v-icon>
          </v-btn>
          <v-btn
            v-for="(adminPage,i) in adminPages"
            :key="i"
            :to="adminPage.to"
            class="link-black font-weight-bold"
            style="margin-left: 20px;"
            >
              {{ adminPage.title }}
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text display-1" >
          <span class="title">© </span> {{ title }} .inc
        </v-card-text>
      </v-card>
    </v-footer>
</template>


<script>
export default {
  props:['fixed', 'title','categorys', 'footerIcons', 'adminPages'],

  data() {
    return {


    }
  },

}
</script>