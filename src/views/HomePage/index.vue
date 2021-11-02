<template>
  <div class="home-page">
    <div class="main">
      <div class="main-left">
        <h1>快速安排投票！</h1>
        <el-input v-model="title" placeholder="输入您的投票主题" />
        <el-button type="primary" @click="create">创建</el-button>
        <h3>Harmony是安排多人投票的最快方式。并且完全免费！</h3>
      </div>
      <div class="main-right">
         <el-image
         class="image"
        :src="image.url"
        :fit="image.fit"
      ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {ref} from 'vue'

export default {
  name: "HomePage",
  setup() {
    const store = useStore();
    const router = useRouter();
    const title = ref('');          //输入的标题
    const image = {
      url: require('@/assets/images/homepage_photo.jpeg'),
      fit : "fill",
    }
    function create() {
      store.commit('SET_TITLE',title);
      router.push('./createVote');
    }


    return {
      title,
      create,
      image
    };
  },

  
};
</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';
  .home-page {
    background-color: #f3f3f3;
    min-height:91vh;
  
    .main {
      width: $main_width;
      min-width: $min_width;
      min-height: $min_height;
      height: inherit;
      margin-left: $main_margin_left;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      .main-left {
        width: 500px;
        height: 333px;
        h1 {
          font:500 70px '黑体';
          color:black;
          margin: 0px auto auto 7px ;

        }
        h3 {
          font:700 29px '宋体';
          margin: 57px auto auto 7px ;
          color:black;
        }


      }
      .main-right {
        width: 500px;
        height: 333px;
        background-size: 100% 100%;
        box-shadow: 0 0 10px #83837a;
      }
    }
    
  }
</style>
<style scoped>
.main-left:deep(.el-input){
  width: 80%;
}
.main-left:deep(.el-input__inner){
  height:55px;
   margin: 69px auto auto 5px ;
}
.main-left:deep(.el-button){
  min-height: 55px;

}
</style>