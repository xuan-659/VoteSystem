module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost8082',
        changeOrigin: true
      }
    }
  }
}
