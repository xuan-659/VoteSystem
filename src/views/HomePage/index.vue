<template>
  <div class="home-page">
    <div class="main">
      <div class="main-left">
        <h1>快速安排投票！</h1>
        <el-input v-model="title" placeholder="输入您的投票主题" />
        <el-button type="primary" @click="create">创建</el-button>
        <h3>Harmony是安排多人投票的最快方式。并且完全免费！</h3>
      </div>
      <div class="main-right"></div>
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
    background-color: #f3f3f3;
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
        width: 500px;
        height: 333px;
        h1{font:500 70px '黑体';
        color:black;
        margin: 0px auto auto 7px ;

        }
        h3{font:700 29px '宋体';
        margin: 57px auto auto 7px ;
        color:black;
        }


      }
      .main-right {
        width: 500px;
        height: 333px;
         background-size: 100% 100%;
         box-shadow: 0 0 10px #83837a;

     background-image: url("https://images.pexels.com/photos/4964766/pexels-photo-4964766.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");


      }
    }
    
  }
</style>
<style scoped>
.main-left>>>.el-input{
  width: 80%;
}
.main-left>>>.el-input__inner{
  height:55px;
   margin: 69px auto auto 5px ;
}
.main-left>>>.el-button{
  min-height: 55px;

}
</style>