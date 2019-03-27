const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        // { from: 'src/css', to: 'css', force: true },
        { from: 'src/assets', to: 'img', force: true }
      ])
    ]
  }
}
