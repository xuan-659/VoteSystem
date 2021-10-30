<template>
  <div class="create-vote">
    <div class="main">
      {{title}}
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore();
    const title = store.getters.title;
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-vote {
    background-color: #f3f3f3;
    height:92vh;
  }
  .main {
    
  }
</style>