const path = require('path')

const resolve = (filename) => {
  return path.join(__dirname, filename)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('cps', resolve('src/components'))
      .set('core', resolve('src/core'))
  }
}