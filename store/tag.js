import firebase from "firebase/app"
import { db, storage } from '~/plugins/firebase'

// column, Questionコレクションのインタスタンス作成
const columnRef = db.collection('column')
const questionRef = db.collection('question')

export const state = () => ({
  columnTags:[],
  questionTags:[],
})

export const mutations = {
  setColumnTags(state, payload) {
    state.columnTags = payload
  },
  setQuestionTags(state, payload) {
    state.questionTags = payload
  }
}

export const actions = {
  async initAllTags({ commit }) {
    let columnTags = []
    let questionTags = []

    // column, questionコレクション内のドキュメント全てのタグを取得
    // => tags[]に分割代入後、filterで重複を解消
    const columnQuerySnapshot = await columnRef.get()
    const questionQuerySnapshot = await questionRef.get()
    try {
      columnQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          columnTags.push(tag)
        });
      });

      questionQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          questionTags.push(tag)
        });
      });

      // 重複するタグを削除
      const filteredColumnTags =  columnTags.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

      const filteredQuestionTags =  questionTags.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

      commit('setColumnTags', filteredColumnTags)
      commit('setQuestionTags', filteredQuestionTags)

    } catch (error) {
      console.log('タグの取得に失敗');
    }
  },

  async initUserTags({ commit }, uid) {
    let columnTags = []
    let questionTags = []

    // column, questionコレクション内のドキュメント全てのタグを取得
    // => tags[]に分割代入後、filterで重複を解消
    const columnQuerySnapshot = await columnRef.where('text.uid', '==', uid).get()
    const questionQuerySnapshot = await questionRef.where('text.uid', '==', uid).get()
    try {
      columnQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          columnTags.push(tag)
        });
      });

      questionQuerySnapshot.forEach(doc => {
        doc.data().tags.forEach(tag => {
          questionTags.push(tag)
        });
      });

      // 重複するタグを削除
      const filteredColumnTags =  columnTags.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

      const filteredQuestionTags =  questionTags.filter(function (x, i, self) {
        return self.indexOf(x) === i;
      });

      commit('setColumnTags', filteredColumnTags)
      commit('setQuestionTags', filteredQuestionTags)

    } catch (error) {
      console.log('タグの取得に失敗');
    }
  }

}

export const getters = {
  getColumnTags: state => {
    return state.columnTags
  },
  getQuestionTags: state => {
    return state.questionTags
  },
};