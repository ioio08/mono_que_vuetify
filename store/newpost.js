import { firestoreAction } from 'vuexfire'
import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

const newPostRef = db.collection('newPost')

export const state = () => ({
  newPost: [],
})

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('newPost', newPostRef)
  }),

  // contentsを投稿
  async postContents(context, payload) {
    // firestore documentID取得
    const docId = db.collection("newPost").doc().id;
    const contents = payload
    const loadImage = await context.dispatch('uploadImage', {
      image: contents.images.image,
      name: contents.images.name,
    })
    // contents.images.image => contents.images.src
    // contents.images.name => contents.images.name
    contents.images = loadImage

    await newPostRef.doc(docId).set({
      text:{
        author: contents.text.author,
        title: contents.text.title,
        content: contents.text.content,
        docId: docId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        postDay: new Date().toLocaleString()
      },
      image: {
        name: contents.images.name,
        src: contents.images.src
      },
    })

    this.$router.push('/users/newPost/newPostPreview')
  },

  // ストレージに画像を追加
  uploadImage(context, payload) {
    if (!payload.image) {
      return {
        name: 'サンプル画像',
        src: 'https://placehold.jp/150x150.png',
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
  posts: state => state.newPost
};