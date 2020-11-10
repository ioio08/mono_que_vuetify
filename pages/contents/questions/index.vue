<template>
    <PostList :exist-posts="questionPosts" :post-path="questionsPath">質問</PostList>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
    data() {
    return {
      questionPosts: [
        {
          id: '0',
          title: 'title1',
          src: '/images/mable.jpg'
        },
        {
          id: '1',
          title: 'title2',
          src: '/images/product_2.jpeg'
        },
        {
          id: '2',
          title: 'title3',
          src: '/images/mable.jpg'
        },
        {
          id: '3',
          title: 'title4',
          src: '/images/product_2.jpeg'
        },
        {
          id: '4',
          title: 'title5',
          src: '/images/mable.jpg'
        },
        {
          id: '5',
          title: 'title6',
          src: '/images/product_2.jpeg'
        },
      ],
      questionsPath: '/contents/questions/'
    }
  }
}
</script>