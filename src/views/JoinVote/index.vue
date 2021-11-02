<template>
  <div class="join-vote">
    <div class="main">
      <h1>调查</h1>
      <p>请在下面投票。 </p>
      <div class="flip-container">
        <div class="flipper" :class="isAnimation.value">
          <div class="front">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{voteData.title}}</span>
                  <span>——来自{{voteData.username}}的投票</span>
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
                  <span>——来自{{voteData.username}}的投票</span>
                </div>
              </template>
                <div v-for="select in voteData.select" :key="-select.num">
                  {{select.selectionText}}
                  <el-progress :percentage="compute(select.count)" :format="format" />
                </div>
                <div class="block_rotate">
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
import { computed, reactive } from '@vue/reactivity';
export default {
  setup() {
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
    const voteData = reactive({
      id: 2,
      username: 'xxx',
      title: '你喜欢吃什么？',
      describe: '',
      maxCount: 240,
      select: [
        {
          num: 1,
          count: 90,
          selectionText: '苹果'
        },
        {
          num: 2,
          count: 70,
          selectionText: '香蕉',
        },
        {
          num: 3,
          count: 20,
          selectionText: '梨',
        },
        {
          num: 4,
          count: 60,
          selectionText: 'yu',
        }
      ]
    })

    const submitForm = reactive({
      id: '',
      username:'',
      num: undefined
    })

    const compute = computed(() => num => Number((num / voteData.maxCount * 100).toFixed(1)));
    const vote = () => {
      submitForm.id = voteData.id;
      submitForm.username = voteData.username;
      console.log(submitForm);
      rotate()
    }

    //展示结果部分
    const format = (percentage) =>
      percentage === 100 ? 'Full' : `${percentage}%`
        
    //图片
    const image = {
      url: require('@/assets/images/JoinVote_photo.jpg'),
      fit : "fill",
    }

    return {
      isAnimation,
      vote,
      rotate,
      voteData,
      submitForm,
      format,
      compute,
      image
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