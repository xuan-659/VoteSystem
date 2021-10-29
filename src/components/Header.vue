<template>
  <!-- 头部区域 -->
  <div class="header">
    <div class="main">
      <router-link to="/">
      <!-- 左侧图标 -->
        <el-image
        class="harmony-logo"
        :src="logoUrl"
      ></el-image>
      </router-link>
      <!-- 右侧图标+按钮 -->
      <div class="main-right">
        <router-link to="/createVote">
          <span class="create">创建</span>
        </router-link>
        
        <svg class="icon expand" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test1"></use>
        </svg>
        
      </div>
    </div>
  </div>
</template>

<script>
import '@/icon/iconfont.js'
export default {
  name: 'Header',
  data: () => {
    return {
      logoUrl: require('@/assets/harmony_logo.png')
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../style/vars.scss';
  .header {
    min-height: 60px;
    height: $header_height;
    width: auto;
    background-color: #409EFF;
    .main {
      width: $main_width;
      margin-left: $main_margin_left;
      height: inherit;
      .harmony-logo {
        height: 40px;
        margin-top: 10px;
      }

      .main-right {
        margin-right: 10px;
        float: right;
        height:$header_height;
        line-height: 70px;
        .icon {
          width: 1.5em;
          height: 1.5em;
          font-weight: bold;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
        .expand {
          margin-right: 15px;
        }
        .create {
          position: relative;
          top: -5px;
          right: 15px;
          font-size: 15px;
          color: #181818;
          border :2px solid #181818;
          width: 20px;
          height: 20px;
          padding: 3px 10px;
          border-radius: 15px;
        }
      }
    }
  }
</style>