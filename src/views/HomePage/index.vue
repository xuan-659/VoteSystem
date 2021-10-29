<template>
  <div class="home-page">
    <div class="main">
      11111
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  created() {
    this.test()
  },

  methods: {
     test : function() {
      console.log(this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';
  .home-page {
    background-color: #f8f9fa;
    height:92vh;
    .main {
      margin-left: $main_margin_left;
    }
  }
</style>