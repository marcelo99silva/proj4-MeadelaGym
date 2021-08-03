module.exports = {
  devServer: {
    proxy: "http://localhost:3030"
  },
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/projeto4dev/site/'
}