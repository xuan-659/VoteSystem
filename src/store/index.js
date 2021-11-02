import { createStore } from 'vuex'
import { addVoteApi, getVoteApi } from '@/api/vote'

const state = {
  title: '',
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title;
  }
}

const actions = {
  addVote({commit},data) {
    console.log(data);
    const {title, describe, options:select,username} = data;
    return new Promise((resolve, reject) => {
      addVoteApi({
        describe,
        select,
        title,
        username
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
    
  },

  getData({commit}, data) {
    const {username} = data;
    
    return new Promise((resolve, reject) => {
      getVoteApi({
        username
      }).then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const getters = {
  title: state => state
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
})

export default store;