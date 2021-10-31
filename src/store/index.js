import { createStore } from 'vuex'
import { addVoteApi } from '@/api/vote'

const state = {
  title: '',
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title;
  }
}

const actions = {
  addVote({commit} ,data) {
    const {title, describe, options:select} = data;
    console.log(title,describe,select);
    return addVoteApi({
      describe,
      select,
      title,
      username
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