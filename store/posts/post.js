export const state = () => ({
  loadedPosts: []
})

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts
  }
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        vuexContext.commit('setPosts', [
            {
              id: '1',
              title: 'First Post',
              previewText: 'This is out first post',
              thumbnail: '/images/product_2.jpeg'
            },
            {
              id: '2',
              title: 'Second Post',
              previewText: 'This is out Second post',
              thumbnail: '/images/product_2.jpeg'
            },
          ]
        )
      resolve()
      } ,1000)
    })
  },
  setPosts(vuexContent, posts) {
    vuexContent.commit('setPosts', posts)
  }
}