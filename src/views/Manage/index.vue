<template>
    <div>
      <div class="manage">
        <div class="main">
          <el-collapse v-model="activeName" accordion>
              <el-collapse-item
                v-for="(item,index) in form"
                :title="item.title"
                :name="index"
                :key="item.id"
              >
                <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span>描述：{{item.describe}}</span> <br>
                  <span class="link">链接：{{link}}{{item.id}}</span>
                </div>
              </template>
                <div v-for="select in item.select" :key="-select.num">
                  {{select.selectionText}} <span class="ticket">{{select.count}}票</span>
                  <el-progress :percentage="item.count == 0 ? 0 : Number((select.count / item.count * 100).toFixed(2))" :format="format" />
                </div>
                <div class="block_rotate">
                <span>总票数：{{item.count}}</span>
                <span class="money">￥{{computeMoney(item.count)}}</span>
              </div> 
            </el-card>
              </el-collapse-item>
              
            </el-collapse>

          <div class="money-rules">计费规则：票数-价格[0-2000)-￥5 [2000,5000]-￥13 超过部分￥0.25/每百票</div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
    export default {
      setup() {
        const store = useStore();
        const activeName = ref('1');
        const link = ref('http://47.113.227.55/joinVote/root/')
        const format = (percentage) => `${percentage}%`
        let form = ref([])
        const getData = async () => {
          console.log(form.value)
          form.value = await store.dispatch('getData', {username: 'root'})
          console.log(form)
        }

        const computeMoney = ticket  => {
          if(ticket < 2000)
            return 5;
          else if(ticket <= 5000)
              return 13;
            else
              return 13 + Math.floor((ticket-5000) / 100) * 0.25;
        }

        
        onMounted(() => {
            getData();
        })
        
        return {
          activeName,
          form,
          format,
          computeMoney,
          link
        }
      }
    }
  </script>

  <style lang="scss" scoped>
    @import '@/style/vars.scss';
    .main {
    width: $main_width;
    min-width: $min_width;
    min-height: $min_height;
    margin-left: $main_margin_left;
    &:deep(.el-collapse-item__header){
      font-size:20px!important;
    }
    .money {
      float: right;
      padding-right: 60px;
    }
    .link {
      font-size: 14px;
    }
    .money-rules {
      margin-top: 30px;
      display: flex;
      font-size: 10px;
      color:#b3afaf;
      justify-content: center;
    }
    .ticket {
      float: right;
      padding-right: 60px;
      font-weight: 300;
    }
    .card-header{
      font-size:18px;
    }
    &:deep(.el-card__body){
      font-size:15px;
    }
  }
  </style>