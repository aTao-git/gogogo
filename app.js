//app.js
import Request from './utils/request.js'
App({
  onLaunch: function () {
    Request.defaults.baseURL = 'https://api.zbztb.cn/api/public/v1'
    Request.onError (res => {
      if (res.data.meta.status === 401) {
        console.log('无效token')
      }
    })
  },
  globalData: {
    userInfo: null
  }
})