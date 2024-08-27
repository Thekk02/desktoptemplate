const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   compress: true,
  //   open: true,
  //   host: '0.0.0.0',
  //   port: 80,
  //   https: false,
  //
  //   //以上的ip和端口是我们本机的;下面为需要跨域的
  //   proxy: { //配置跨域
  //     '/api': {
  //       pathRewrite: {
  //         '^/api': '' //请求的时候使用这个api就可以
  //       },
  //       target: 'http://192.168.1.36:8080', //填写请求的目标地址
  //       changOrigin: true //允许跨域
  //
  //     }
  //   }
  // },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: "src/preload.js",
      builderOptions: {
        publish: [
          {
            provider: "generic",
            url: "http://192.168.1.36/plmviewer"
          }
        ],
        appId: 'com.example.my-desktop-app',
        productName: 'desktoptemplate',
        copyright: 'Copyright © 2023 KK Application',
        mac: {
          icon: 'build/icons/icon.icns',
          target: [
            'dmg',
            'zip'
          ]
        },
        win: {
          icon: 'build/icons/icon.ico',
          target: [
            'nsis',
            'zip'
          ]
        },
        linux: {
          icon: 'build/icons',
          category: 'Utility',
          target: [
            'deb',
            'rpm',
            'zip'
          ]
        }
      }
    }
  }
})
