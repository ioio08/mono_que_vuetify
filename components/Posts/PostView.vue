<template>
  <div >

    <!-- userPostの場合はbtnをここに配置 -->
    <!-- 一覧 , 編集 , 削除 -->
    <slot name="userPostActions"></slot>

    <v-card-title><h2>{{ existPost.text.title }}</h2></v-card-title>
    <v-spacer></v-spacer>
    <v-card-subtitle>
      <h3>Author:  {{ existPost.text.author }}</h3>
          Date:  {{ existPost.text.postDay }}
    </v-card-subtitle>

    <v-chip-group column v-if="existPost.tags.length > 0">
      <v-chip disabled
      v-for="tag in existPost.tags"
      :key="tag">
      {{ tag }}
      </v-chip>
    </v-chip-group>

    <v-card-text class="post-img">
      <v-img :src="existPost.image.src" cover style="width: 600px; margin: 0 auto;"></v-img>
    </v-card-text>
    <v-card-text>
      <v-sheet><h2><pre>{{ existPost.text.content }}</pre></h2> </v-sheet>
    </v-card-text>

    <!-- commonPostの場合はbtnをここに配置 -->
    <!-- 一覧ボタン  -->
    <slot name="commonPostActions"></slot>

  </div>
</template>

<script>

export default {
  props:{
    existPost: {
      type:Object,
      required:true
    },
  },
}
</script>

<style lang="scss" scoped>

pre {
  background-color: $v-main-background-color;
  color:$main-font-color;
}

.v-sheet {
  width: 75%;
  margin: 0 auto;
}

.v-card__text {
  padding-bottom: 5%;
  max-width: 100%;
}

pre {
  white-space: pre-wrap ;
  line-height: 2rem;
  letter-spacing: 3px;
  font-weight: normal;
}


</style>