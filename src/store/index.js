import { createStore} from 'vuex'
import vote from './modules/vote' 
export default createStore({
  modules: {
    vote
  }
})

