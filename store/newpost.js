import { firestoreAction } from 'vuexfire'
import { db, storage, firebase } from '~/plugins/firebase'

const newPostsRef = db.collection('newPosts')

export const state = () => ({
  newPosts: {},
})

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('newPosts', newPostsRef)
  }),

  // contentsを投稿
  async postContents(context, payload) {
    const contents = payload
    const loadImage = await context.dispatch('uploadImage', {
      image: contents.image.image,
      name: contents.image.name,
    })
    contents.image = loadImage

    await newPostsRef.add(contents)
  },

  // ストレージに画像を追加
  uploadImage(context, payload) {
    if (!payload.image) {
      return {
        name: 'サンプル画像',
        src: 'https://placehold.jp/150x150.png'
      }
    }

    const storageRef = storage.ref()

    return new Promise((resolve, reject) => {
      storageRef
        .child(`images/${payload.name}`)
        .put(payload.image)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            resolve({ name: payload.name, src: url })
          })
        })
        .catch(err => {
          console.log('画像投稿エラー', err)
        })
    })
  }
}

export const getters = {

};