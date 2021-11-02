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
  }
}
