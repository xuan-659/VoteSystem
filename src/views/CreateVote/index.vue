<template>
  <div class="create-vote">
    <div class="main">
      <h1>创建您的投票!</h1>
      
      <div class="form">
        <el-form ref="submitForm"
         :label-position="form.labelPosition"
         v-model="form"
          label-width="200px">
          <p>您的投票主题是</p>
          <el-form-item label="">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <p>选项</p>
          <el-form-item
                v-for="option in form.options"
                :key="option.key"
                label=""
              >
              <el-input v-model="option.value"></el-input>
              <el-button id="delete" @click.prevent="removeOption(option)">删除</el-button>
            </el-form-item>
            <el-button id="add" @click="addOption()">添加选项</el-button>
            <el-button id="reset" @click="resetForm()">重置</el-button>
            <p>对主题进行描述</p>
            <el-form-item label="">
              <el-input
                v-model="form.textarea"
                :rows="2"
                type="textarea"
                placeholder="Description of your subject"
              />
          </el-form-item>
          <p>输入您的名字</p>
          <el-form-item label="">
            <el-input id="username_space" v-model="form.username"></el-input>
          </el-form-item>
          <el-button id="create" >创建</el-button>
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
    const title = store.getters.title || '';
    const max_length = 8;
    //投票表单
    let form = reactive({
      labelPosition:'top',
      title: title.value,
      username: '',
      options: [
        {key: 1, value: ''},
        {key: 2, value: ''}
      ],
      textarea:''
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
      form.textarea = '';
      form.username = '';
    }


    return {
      form,
      addOption,
      removeOption,
      resetForm
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
     h1{
       font-size: 50px;
       margin: 30px auto 0px auto ;

     }
    .form {
      background-color: rgb(151, 216, 241);
      width: 600px;
      margin: 50px;
      p{
        margin: 15px auto 10px 20px;
        width:200px;
      }
    }
    &:deep(.el-input){
      width: 80%;
      margin-left: 20px;
    }

    &:deep(.el-textarea){
      margin-left:20px;
      width:80%;
    }
  }
  #add{
        margin: auto auto 30px 20px;
      }
  #reset{
        margin: auto 100px auto 310px;
  }
  #create{
      margin-left:200px ;
      margin-top:20px;
      padding:12px 80px;
      background-color: rgb(245, 213, 155);
  }
  #delete{
    margin-left: 15px;
  }
</style>