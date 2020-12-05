import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

// column, Questionコレクションのインタスタンス作成
const columnRef = db.collection('column')
const questionRef = db.collection('question')

export const state = () => ({
  tags:[],
})

export const mutations = {
  setTags(state, payload) {
    state.tags = payload
  }
}

export const actions = {
  async initTags({ commit }) {
    let tags = []

    // column, questionコレクション内のドキュメント全てのタグを取得
    // => tags[]に分割代入後、filterで重複を解消
    const columnQuerySnapshot = await columnRef.get()
    const questionQuerySnapshot = await questionRef.get()
    try {
      columnQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          tags.push(tag)
        });
      });

      questionQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          tags.push(tag)
        });
      });

      // 重複するタグを削除
      const filteredTags =  tags.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });
      commit('setTags', filteredTags)

    } catch (error) {
      console.log('タグの取得に失敗');
    }

  }

}

export const getters = {
  getTags: state => {
    return state.tags
  },
};