// module.exports = {
//   // 避免Eslint报错
//   lintOnSave: false,
//   configureWebpack: {

//     plugins: [
//       new webpack.ProvidePlugin({
//         'window.Quill': 'quill/dist/quill.js',
//         'Quill': 'quill/dist/quill.js'
//       }),
//     ]
//   }

// }

/* 
   修改了这里面的东西一定要重新启动项目 不然没效 草！！！！！！！！！
*/
var webpack = require('webpack');
module.exports = {
  // 避免Eslint报错
  lintOnSave: false,
  configureWebpack: {
    // 把原本需要写在webpack.config.js中的配置代码 写在这里 会自动合并
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  }
}