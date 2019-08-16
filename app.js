//app.js
import Request from './utils/request.js'
App({
  onLaunch: function () {
    Request.defaults.baseURL = 'https://api.zbztb.cn/api/public/v1'
    Request.onError (res => {
      console.log('请求被拦截了！')
    })
  },
  globalData: {
    userInfo: null
  }
})