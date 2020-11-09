<template>
    <PostList :exist-posts="columsPosts">コラム</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  data() {
    return {
      columsPosts: [
        {
          id: '0',
          title: 'title1',
          src: '/images/product_2.jpeg'
        },
        {
          id: '1',
          title: 'title2',
          src: '/images/mable.jpg'
        },
        {
          id: '3',
          title: 'title3',
          src: '/images/product_2.jpeg'
        },
        {
          id: '4',
          title: 'title4',
          src: '/images/product_2.jpeg'
        },
        {
          id: '5',
          title: 'title5',
          src: '/images/product_2.jpeg'
        },
        {
          id: '6',
          title: 'title6',
          src: '/images/product_2.jpeg'
        },
      ]
    }
  }


}
</script>
