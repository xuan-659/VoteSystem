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
                  <span>{{item.describe}}</span>
                </div>
              </template>
                <div v-for="select in item.select" :key="-select.num">
                  {{select.selectionText}} {{select.count}}票
                  <el-progress :percentage="item.count == 0 ? 0 : select.count / item.count * 100" :format="format" />
                </div>
                <div class="block_rotate">
                总票数：{{item.count}}
              </div> 
            </el-card>
              </el-collapse-item>
              
            </el-collapse>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { ref, reactive, onMounted } from 'vue'
  import { useStore } from 'vuex'
    export default {
      setup() {
        const store = useStore();
        const activeName = ref('1');
        let form = ref([])
        const getData = async () => {
          console.log(form.value)
          form.value = await store.dispatch('getData', {username: 'root'})
          console.log(form)
        }
        
        onMounted(() => {
            getData();
        })
        
        return {
          activeName,
          form
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
      font-size:26px!important;
    }
    .card-header{
      font-size:25px;
    }
    &:deep(.el-card__body){
      font-size:20px;
    }
  }
  </style>