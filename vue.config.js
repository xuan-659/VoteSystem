module.exports = {
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        ws: true,
        target: 'http://47.113.227.55:8080/',
        changeOrigin: true
      }
    }
  },

  // publicPath: './',
  //   outputDir: "dist", // 输出文件目录
  //   lintOnSave: false, // eslint 是否在保存时检查
  //   assetsDir: 'static', // 配置js、css静态资源二级目录的位置  


}
