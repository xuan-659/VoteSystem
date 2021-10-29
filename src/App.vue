<template>
  <div id="app">
  <Header />
  <router-view/>
  </div>
</template>

<script>
import '@/style/reset.scss'
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style lang="scss" scoped>
  html {
    margin: 0;
    height: 1000px;
    background-color: rgb(90, 41, 41);
  }
</style>
