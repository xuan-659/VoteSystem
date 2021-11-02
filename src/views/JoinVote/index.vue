<template>
  <div class="join-vote">
    <div class="main">
      <h1>调查</h1>
      <p>请在下面投票 </p>
      <div class="flip-container">
        <div class="flipper" :class="isAnimation.value">
          <div class="front">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{voteData.title}}</span>
                  <span>{{voteData.username}}</span>
                </div>
              </template>
              <el-radio-group v-model="submitForm.num">
                <el-radio v-for="select in voteData.select" :key="select.num" :label="select.num">{{select.selectionText}}</el-radio>
                </el-radio-group>
                <div>
                <el-button type="primary" @click="vote">投票</el-button>
                <span @click="rotate()">显示结果</span>
              </div>
            </el-card>
              
          </div>
          <div class="back">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>{{voteData.title}}</span>
                  <span>{{voteData.username}}</span>
                </div>
              </template>
                <div v-for="select in voteData.select" :key="-select.num">
                  {{select.selectionText}}
                  <el-progress :percentage="compute(select.count)" :format="format" />
                </div>
                <div>
                <span @click="rotate()">返回</span>
              </div>
            </el-card>
          </div>
        </div>
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
      username: '李俊鹏',
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
          selectionText: '梨',
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
        

    return {
      isAnimation,
      vote,
      rotate,
      voteData,
      submitForm,
      format,
      compute
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
      }
      .el-radio {
        display: block;
      }
    }

}
  
</style>