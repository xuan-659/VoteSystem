<template>
  <div class="create-vote">
    <div class="main">
      <h1 @click="addOption">创建一个投票</h1>
      <div class="form">
        <el-form ref="submitForm"
         :label-position="form.labelPosition"
         v-model="form"
          label-width="200px">
          
          <el-form-item label="您的投票主题是？">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item
                v-for="option in form.options"
                :key="option.key"
                :label="option.lable"
              >
              <el-input v-model="option.value"></el-input>
              <el-button v-if="!option.lable" @click.prevent="removeOption(option)">删除</el-button>
            </el-form-item>
            <el-button @click="addOption()">添加一个选项</el-button>
            <el-button @click="resetForm()">重置</el-button>
            <el-form-item label="对主题进行描述">
              <el-input
                v-model="form.describe"
                :rows="2"
                type="textarea"
                placeholder="Please input"
              />
          </el-form-item>
          <el-button @click="createVote()">创建</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { reactive } from 'vue'
export default {
 setup() {
    //data数据
    const store = useStore();
    //投票标题
    const max_length = 8;
    //投票表单
    let form = reactive({
      labelPosition:'top',
      title: store.getters.title.title,
      options: [
        {key: 1, value: '',lable:'选项'},
        {key: 2, value: ''}
      ],
      describe:''
    })
    //method方法
    const addOption = () => {
      if(form.options.length < max_length) {
        form.options.push({key: Date.now(), value:''})
      }
      else {
        ElMessage.error('最多八个选项！')
      }
    }

    const removeOption = item => {
      console.log(item);
      const index = form.options.indexOf(item)
      if (index !== -1) {
        form.options.splice(index, 1)
      }
    }

    const resetForm = () => {
      form.labelPosition = 'top';
      form.title = title.value;
      form.options = [
        {key: 1, value: '',lable:'选项'},
        {key: 2, value: ''}
      ];
      form.describe = '';

    }

    const createVote = () => {
      store.dispatch('addVote',form);
    }


    return {
      form,
      addOption,
      removeOption,
      resetForm,
      createVote,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';
  .create-vote {
    background-color: #f3f3f3;
    min-height:91vh;
    padding-bottom: 150px;
  }
  .main {
    width: $main_width;
    min-width: $min_width;
    min-height: $min_height;
    margin-left: $main_margin_left;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: flex-end;
    justify-content: flex-start;
    align-items: center;
    .form {
      background-color: pink;
      width: 800px;
    }
    &:deep(.el-input){
      width: 80%;
    }
  }
</style>