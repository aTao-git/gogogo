//app.js
import Request from './utils/request.js'
App({
  onLaunch: function () {
    Request.defaults.baseURL = 'https://api.zbztb.cn/api/public/v1'
    Request.onError (res => {
      if (res.data.meta.status === 401) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})