<template>
  <div >

    <!-- userPostの場合はbtnをここに配置 -->
    <!-- 一覧 , 編集 , 削除 -->
    <slot name="userPostActions"></slot>

    <v-card-title><h2>{{ existPost.text.title }}</h2></v-card-title>
    <v-spacer></v-spacer>
    <v-card-subtitle>
      <h3>Author:  {{ existPost.text.author }}</h3>
    </v-card-subtitle>
    <v-card-subtitle>
      <h3>Date:  {{ existPost.text.postDay }}</h3>
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
      <v-sheet><h4><pre>{{ existPost.text.content }}</pre></h4> </v-sheet>
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
  letter-spacing: 3px;
  font-weight: normal;

  line-height: 4rem;

  @include pc {
    line-height: 3.6rem;
  }

  @include tab {
    line-height: 3rem;
  }

  @include mb {
    line-height: 2.6rem;
  }
}

.v-image {
  width: 400px !important;

  @include pc {
    width: 350px !important;
  }

  @include tab {
    width: 300px !important;
  }

  @include mb {
    width: 250px !important;
  }
}

h2 {
  margin-top: 3%;
  font-size: 3.5rem;
  line-height: 3.7rem;

  @include pc {
    font-size: 3.2rem;
    line-height: 3.4rem;

  }

  @include tab {
    font-size: 2.8rem;
    line-height: 3.2rem;
  }

  @include mb {
    font-size: 2.4rem;
    line-height: 2.8rem;
  }
}

h3 {
  font-size: 3rem;

  @include pc {
    font-size: 2.7rem;
  }

  @include tab {
    font-size: 2.3rem;
  }

  @include mb {
    font-size: 1.9rem;
  }
}

h4 {
  font-size: 3rem;

  @include pc {
    font-size: 2.7rem;
  }

  @include tab {
    font-size: 2rem;
  }

  @include mb {
    font-size: 1.4rem;
  }
}

</style>