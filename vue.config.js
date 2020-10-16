const port = process.env.port || process.env.npm_config_port || 8082 // dev port
// const port1 =8080
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    port: port,
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "/turn": {
        target: `https://localhost:5001`,
        changeOrigin: true,
           
        pathRewrite: {
          '^/turn': ''
        }
      }
    } 
  }
};
