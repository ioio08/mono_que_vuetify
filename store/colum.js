import { firestoreAction } from 'vuexfire'
import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

const columPostRef = db.collection('colum')

export const state = () => ({
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
    const contents = payload
    contents.image  = await context.dispatch('uploadImage', {
      src: contents.image.src,
      name: contents.image.name,
    })

    if (contents.text.docId !== null && contents.text.docId !== undefined) {
      await columPostRef.doc(contents.text.docId).set({
        text:{
          author: contents.text.author,
          title: contents.text.title,
          content: contents.text.content,
          docId: contents.text.docId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          postDay: new Date().toLocaleString()
        },
        image: {
          name: contents.image.name,
          src: contents.image.src
        },
      })
      // pathにdocIDを渡して動的なページ遷移
      this.$router.push('/contents/colums/' + contents.text.docId )
    } else {
      const docId = db.collection("colum").doc().id;
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
          name: contents.image.name,
          src: contents.image.src
        },
      })
      // pathにdocIDを渡して動的なページ遷移
      this.$router.push('/contents/colums/' + docId )
    }


  },

  // ストレージに画像を追加
  uploadImage(context, payload) {

    if (!payload.src) {
      return {
        name: 'サンプル画像',
        src: 'https://placehold.jp/150x150.png',
      }
    }
    const storageRef = storage.ref()
    return new Promise((resolve, reject) => {
      storageRef
        .child(`images/${payload.name}`)
        .put(payload.src)
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