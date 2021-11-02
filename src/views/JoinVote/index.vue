<template>
  <div class="join-vote">
    <div class="main">
      <h1>调查</h1>
      <p>请在下面投票。 </p>
      <div class="flip-container">
        <div class="flipper" v-if="loading">
            <el-skeleton :rows="5" animated />
        </div>
        <div class="flipper" v-else :class="isAnimation.value">
          <div class="front">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{voteData.title}}</span>
                </div>
              </template>
              <el-radio-group v-model="submitForm.num">
                <el-radio v-for="select in voteData.select" :key="select.num" :label="select.num">{{select.selectionText}}</el-radio>
                </el-radio-group>
                <div>
                <el-button type="primary" @click="vote">投票</el-button>
                <span class="display_result" @click="rotate()">显示结果</span>
              </div>
            </el-card>
              
          </div>
          <div class="back">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{voteData.title}}</span>
                </div>
              </template>
                <div v-for="select in voteData.select" :key="-select.num">
                  {{select.selectionText}} {{select.count}}票
                  <el-progress :percentage="voteData.maxCount == 0 ? 0 : Number((select.count / voteData.maxCount * 100).toFixed(2))" :format="format" />
                </div>
                <div class="block_rotate">
                  总票数：{{voteData.maxCount}}
                <span class="rotate" @click="rotate()">返回</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="right-picture">
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
import { ref, reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    const route = useRoute();
    const store = useStore()
    //动画部分


    let isAnimation = reactive({
      value: ''
    });
    

    function rotate() {
      if(isAnimation.value === 'ani') {
        isAnimation.value = 'reAni'
      }
      else {
        isAnimation.value = 'ani'
      }
    }

    //投票部分
    const [username, id] = [route.params.username, route.params.id]
    let loading = ref(true);
    let voteData = reactive({
      id: undefined,
      username:'root',
      title: undefined,
      describe: undefined,
      maxCount: undefined,
      select: []
    })

    const submitForm = reactive({
      id: '',
      username:'',
      num: undefined
    })

    const getVoteData = async () => {
      const data = await store.dispatch('getVoteData',{username,id});
      voteData.id = data.id;
      voteData.maxCount = data.count;
      voteData.describe = data.describe;
      voteData.title = data.title
      voteData.select = data.select
      loading.value = false 
    }
    const vote = async () => {
      submitForm.id = voteData.id;
      submitForm.username = voteData.username;
      await store.dispatch('vote', submitForm);
      voteData.select[submitForm.num - 1].count++;
      voteData.maxCount++;
      console.log(voteData.select[submitForm.num - 1].count);
      rotate()
    }

    //展示结果部分
    const format = (percentage) => `${percentage}%`
        
    //图片
    const image = {
      url: require('@/assets/images/JoinVote_photo.jpg'),
      fit : "fill",
    }

    onMounted(() => {
      getVoteData();
    })

    return {
      isAnimation,
      vote,
      rotate,
      voteData,
      submitForm,
      format,
      image,
      loading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/vars';
  
  .main {
    width: $main_width;
    min-width: $min_width;
    min-height: $min_height;
    margin-left: $main_margin_left;
    h1{
      font:500 50px "微软雅黑";
      margin: 50px auto 30px auto;
      color:rgba(72, 72, 207, 0.897)
    }
    p{
      margin-bottom: 20px;
      font-size:20px;
    }
    .right-picture {
       position:absolute;
        top:250px;
        left:900px;
        width: 450px;
        height: 250px;
        background-size: 100% 100%;      
      }
  }
  //动画
  .flip-container {
	perspective: 1000;
  width: 400px;
  height: 300px;
    .ani {
      animation: rotate 1s;
      animation-fill-mode: forwards;
    }

    .reAni {
      animation: reRotate 1s;
      animation-fill-mode: forwards;
    }

    @keyframes rotate {
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(180deg);
      }
    }

    @keyframes reRotate {
      0% {
        transform: rotateX(180deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }
    .flipper {
      transition: 2s;
      transform-style: preserve-3d;
      position: relative;
      width: 400px;
      height: 300px;
      .front, .back {
        width: 400px;
        height: 300px;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
      }
      .front {
        background-color: yellow;
        transform: rotateX(0deg),

      }
      .back {
        background-color: skyblue;
        transform: rotateX(180deg),

      }
      .el-card {
        width: 400px;
        height: 300px;
        .display_result{
          margin-left: 195px;
          color: rgb(118, 164, 248);
          cursor:pointer;
          font-size:20px;
        }
        .block_rotate{
          margin-top:40px ;
          
        }
        .rotate{
          margin-left:150px;
          color: rgb(118, 164, 248);
          cursor:pointer;
          font-size:25px;
        }
      }
      .el-radio {
        display: block;
      }
    }

}
  
</style>