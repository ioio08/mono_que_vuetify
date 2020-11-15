import { firestoreAction } from 'vuexfire'
import db from '~/plugins/firebase'

const newPostsDataRef = db.collection('newPostsData')

export const state = () => ({
  newPostsData: {
    author:'name',
    title:'title',
    image:null,
    content:'contents',
  },
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('posts', newPostsDataRef)
  })
}

export const getters = {

};