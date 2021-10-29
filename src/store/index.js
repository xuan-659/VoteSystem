import { createStore} from 'vuex'

const state = {
  title: '',
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title;
  }
}

const actions = {
  
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

