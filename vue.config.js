const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    host: 'crm.frendy.com',
    port: 2022
  },
  transpileDependencies: [
    'vuetify'
  ]
})
