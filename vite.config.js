module.exports = {
  proxy: {
    "/api": {
      target: 'http://127.0.0.1:6000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}