<template>
  <div class="create-vote">
    <div class="main">
      <h1>创建您的投票!</h1>
      
      <div class="form">
        <el-form ref="submitForm"
         :label-position="form.labelPosition"
          v-model="form"
          :model="form"
          :rules="rules"
          label-width="200px">
          <el-form-item label="您的投票主题是" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item
                v-for="option in form.options"
                :key="option.num"
                :label="option.num == 1 ? '选项' : ''"
                
              >
              <el-input v-model="option.selectionText"></el-input>
              <el-button v-if="option.num!=1" id="delete" @click.prevent="removeOption(option)">删除</el-button>
            </el-form-item>
            <el-button id="add" @click="addOption()">添加选项</el-button>
            <el-button id="reset" @click="resetForm()">重置</el-button>
            <el-form-item label="对主题进行描述">
              <el-input
                v-model="form.describe"
                :rows="2"
                type="textarea"
                placeholder="Description of your subject"
              />
          </el-form-item>
          <el-form-item 
          label="输入您的名字"
          prop="username">
            <el-input id="username_space" v-model="form.username"></el-input>
          </el-form-item>
          <el-button type="primary" @click="createVote" id="create" >创建</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
export default {
 setup() {
    //data数据
    const store = useStore();
    const router = useRouter();
    //校验规则
    const rules = reactive({
      title: [{required: true, message:'请输入投票主题', trigger:'blur'}],
      username:[{required: true, message:'请输入用户名', trigger:'blur'}],
      options: [{required: true, message:'请输入用户名', trigger:'blur'}],
    })
    //投票标题
    const max_length = 8;
    //投票表单
    let form = reactive({
      labelPosition:'top',
      title: store.getters.title.title,
      username: '',
      options: [
        {num: 1, selectionText: '', count: 0},
        {num: 2, selectionText: '', count: 0}
      ],
      describe:''
    })
    //method方法
    const addOption = () => {
      if(form.options.length < max_length) {
        form.options.push({num: form.options.length + 1, selectionText:'', count: 0})
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
      form.title = store.getters.title.title;
      form.options = [
        {num: 1, selectionText: '', count: 0},
        {num: 2, selectionText: '', count: 0}
      ];
      form.describe = '';
      form.username = '';
    }

    const createVote = () => {
      store.dispatch('addVote',form).then(res => {
        console.log(res);
      }).catch(err => console.log(err))
    }
    return {
      form,
      addOption,
      removeOption,
      resetForm,
      createVote,
      rules,
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
      background-color: rgb(113, 212, 252);
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
  }
  #delete{
    margin-left: 15px;
  }
</style>