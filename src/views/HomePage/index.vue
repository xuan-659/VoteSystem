<template>
  <div class="home-page">
    <div class="main">
      <div class="main-left">
        <h1>快速安排投票！</h1>
        <h3>Xoyondo是安排会议和活动的最快方式。免费！无需注册。</h3>
        <el-input v-model="title" placeholder="Please input" />
        <el-button type="primary" @click="create">创建</el-button>
      </div>
      <div class="main-right">img</div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'
import { computed, watch } from "vue";

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    const title = ref('');
    function create() {
      store.commit('SET_TITLE',title);
      console.log(store.getters);
    }

    return {
      title,
      create
    };
  },

  
};
</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';
  .home-page {
    background-color: #f8f9fa;
    height:92vh;
    .main {
      width: $main_width;
      height: inherit;
      margin-left: $main_margin_left;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      .main-left {
        width: 30vw;
        height: 50vh;
        background-color: skyblue;
      }
      .main-right {
        width: 30vw;
        height: 50vh;
        background-color: pink;

      }
    }
    
  }
</style>