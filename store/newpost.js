export const state = () => ({
  postDatas: {
    author:'iori',
    title:'Margiela',
    image:'/images/mable.jpg',
    content:'ここにテキスト',
  },
})

export const mutations = {
  setPostData(state, {author, title, image, content}) {
    state.postDatas.author = author
    state.postDatas.title = title
    state.postDatas.image = image
    state.postDatas.content = content
  }
}

export const actions = {
  setPostData(commit, postData) {
    commit('setPostData', postData)
  }

}

export const getters = {
  setPostData(state) {
    return state.postData
  }
};