<template>
  <v-row justify="center" align="center" >
    <v-col cols="12">
      <v-card style="background-color: #C5CAE9">
        <v-card-title class="headline"
        style="color: yellow"
        >
        <slot />
        </v-card-title>
        <v-container
        style="background-color: #fff">
          <v-row align="center">
            <v-col
              v-for="existPost in existPosts"
              :key="existPost.text.docId"
              cols="12"
              xs="12"
              sm="4"
              md="4"
              xl="3"
            >
              <PostPreview
              :exist-post="existPost"
              :post-path="postPath"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="text-center">
            <v-pagination
            v-model="page"
            :length="4"
            ></v-pagination>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props:['existPosts', 'postPath'],
  data() {
    return {
      page: 1,
    }
  }

}
</script>


<style lang="scss">
.v-card__actions {
  justify-content: center;
}
</style>