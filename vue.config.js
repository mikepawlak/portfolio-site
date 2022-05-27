const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: (process.env.VUE_APP_ENV === 'production') ? '/github.io/' : '/'
})
