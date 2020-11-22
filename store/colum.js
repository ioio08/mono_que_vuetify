import { firestoreAction } from 'vuexfire'
import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

const columPostRef = db.collection('colum')


export const state = () => ({
  columsPosts: [
    {
      id: '0',
      title: 'title1',
      src: '/images/product_2.jpeg',
    },
    {
      id: '1',
      title: 'title2',
      src: '/images/mable.jpg'
    },
    {
      id: '2',
      title: 'title3',
      src: '/images/product_2.jpeg'
    },
    {
      id: '3',
      title: 'title4',
      src: '/images/product_2.jpeg'
    },
    {
      id: '4',
      title: 'title5',
      src: '/images/product_2.jpeg'
    },
    {
      id: '5',
      title: 'title6',
      src: '/images/product_2.jpeg'
    },
  ],
  newPost:[],
})

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('colum', columPostRef)
  }),

  // contentsを投稿
  async postContents(context, payload) {
    // firestore documentID取得
    const docId = db.collection("colum").doc().id;
    const contents = payload
    const loadImage = await context.dispatch('uploadImage', {
      image: contents.images.image,
      name: contents.images.name,
    })
    // contents.images.image => contents.images.src
    // contents.images.name => contents.images.name
    contents.images = loadImage

    await columPostRef.doc(docId).set({
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

    // pathにdocIDを渡して動的なページ遷移
    this.$router.push('/contents/colums/' + docId +'')
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