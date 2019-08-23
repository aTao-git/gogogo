// pages/auth/index.js
import Request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGotUserInfo (e) {
    const { encryptedData, rawData, iv, signature} = e.detail
    wx.login({
      success (res) {
        if (res.code) {
          Request({
            url: '/users/wxlogin',
            method: 'POST',
            data: {
              encryptedData,
              rawData,
              iv,
              signature,
              code: res.code
            }
          }).then(res => {
            wx.setStorageSync('token', res.data.message.token)
            wx.navigateBack({
              delta: 1
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          wx.showToast({
            title: '登录失败！',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})