<template>
  <v-card>
    <v-card-title><h2>New Post</h2> </v-card-title>
    <v-form>
      <v-card-actions style="width:400px; ">
        <v-text-field
        prepend-icon="mdi-account-circle-outline"
        label="Please write your name"
        ></v-text-field>
      </v-card-actions>
      <v-card-actions style="width:400px; ">
        <v-text-field
        prepend-icon="mdi-fountain-pen"
        label="Please write post title"
        ></v-text-field>
      </v-card-actions>
      <v-card-actions style="width:500px; ">
        <v-btn
        color="primary"
        depressed
        :loading="isSelecting"
        @click="onButtonClick"
        >
          <v-icon>mdi-image</v-icon>アップロード
        </v-btn>
        <v-card-text>
          <v-img v-if="selectedImage" :src="selectedImage" style="width:200px;"/>
        </v-card-text>
        <input
          ref="file"
          style="display:none;"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        >
      </v-card-actions>
      <v-card-actions style="width:800px;">
        <v-textarea
        label="Please write body contents"
        outlined
        auto-grow
        rows="8"
        row-height="20"
        ></v-textarea>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        selectedImage: null,
        isSelecting: false,
      }
    },
    methods: {
      onButtonClick() {
        this.isSelecting = true
        window.addEventListener('focus', () => {
          this.isSelecting = false
        }, { once: true })
        this.$refs.file.click()
      },
      onFileChanged(e) {
        const fileImg = e.target.files[0]
        if (fileImg.type.startsWith("image/")) {
          this.selectedImage = window.URL.createObjectURL(fileImg);
      }
      }
    },

  }
</script>

<style lang="scss" scoped>


</style>