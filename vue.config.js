const { defineConfig } = require('@vue/cli-service')
//gzip
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      '/api':{
         //请求的服务器地址
        // target: 'http://192.168.43.77:8082',//此处暂时使用局域网进行链接
        // target: 'http://192.168.1.101:80',//此处暂时使用局域网进行链接
        // target: 'http://192.168.1.105:80',//此处暂时使用局域网进行链接
        // target: 'http://47.96.95.225:80',

        target: 'http://47.96.95.225:8081',
        // target: 'http://localhost:80',

        changeOrigin: true,
        pathRewrite:{'^/api':''}, //可以让发过去的请求不带/api打头
      }
    }
  },
  //gzip
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugin('compressionPlugin')
  //         .use(new CompressionPlugin({
  //           filename: '[path].gz[query]',
  //           algorithm: 'gzip',
  //           test: productionGzipExtensions,
  //           threshold: 10240,
  //           minRatio: 0.8,
  //           deleteOriginalAssets: true
  //         }));
  //   }
  // },
})
