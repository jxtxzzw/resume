'use strict'

var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  NODE_ENV: '"production"',
  plugins: [
    new PrerenderSpaPlugin(
      // 编译后的html需要存放的路径
      path.join(__dirname, '../dist'),
      // 列出哪些路由需要预渲染
      [ '/' ]
    )
  ]
}
