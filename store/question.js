import { firestoreAction } from 'vuexfire'
import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

const questionPostRef = db.collection('question')

export const state = () => ({
  newPost:[],
})

export const actions = {
  // 初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('question', questionPostRef)
  }),

  // contentsを投稿
  async postContents(context, payload) {
    // newPost => payload => contents
    const contents = payload
    // FireStorageへimageを格納 + imageURLを同時に FireStoreへ格納するアクションメソッド
    contents.image  = await context.dispatch('uploadImage', {
      src: contents.image.src,
      name: contents.image.name,
      existName: contents.image.existName
    })

    // Editの場合の条件分岐
    if (contents.text.docId !== null && contents.text.docId !== undefined) {
      await questionPostRef.doc(contents.text.docId).set({
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
      // path/docIDは維持したまま
      this.$router.push('/contents/questions/' + contents.text.docId )

    // 新規投稿の場合の条件分岐
    } else {
      // 新しくdocIdを取得する
      const docId = db.collection("question").doc().id;
      await questionPostRef.doc(docId).set({
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
      this.$router.push('/contents/questions/' + docId )
    }
  },

  // FireStorageにimageをuploadするメソッド
  uploadImage(context, payload) {
    const storageRef = storage.ref()
    // imageがuploadされなかった場合のダミー条件
    if (!payload.src) {
      return {
        name: 'サンプル画像',
        src: 'https://placehold.jp/150x150.png',
      }

    // Post : 新規登録
    } else if (payload.existName === null) {
      return new Promise((resolve, reject) => {
        storageRef
        // Fire Storage に'images'ディレクトリを作成
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

      // Edit : image.srcを変えない場合
    } else if (payload.name === payload.existName) {
      return {
        src: payload.src,
        name: payload.name,
      }

      // Edit : image.srcが変更された場合
      // 書き換えるデータの追加 + upload済写真の削除
    } else {
      return new Promise((resolve, reject) => {
        // 書き換えるimage(src, name)の追加
        storageRef
        // FireStorage に'images'ディレクトリを作成
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

        // upload済みimageのdelete
        let deleteRef = storageRef.child('images/' + payload.existName)
        deleteRef.delete().catch(err =>  {
          console.log('エラー:' + err);
        });
      })
    }
  }
}

export const getters = {
  posts: state => state.newPost
};