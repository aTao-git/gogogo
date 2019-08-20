// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    inputvalue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const history = wx.getStorageSync('history') || []
    this.setData({
      history
    })
  },
  handlechangevalue(e) {
    const {
      value
    } = e.detail
    this.setData({
      inputvalue: value
    })
  },
  handleconfirm() {
    wx.navigateTo({
      url: '/pages/search_list/index?query=' + this.data.inputvalue,
    })
    let arr = []
    arr = [this.data.inputvalue, ...this.data.history]
    this.setData({
      history: [...new Set(arr)]
    })
    let array = this.data.history
    array.length > 20 ? array.length = 20 : array.length
    this.setData({
      history: array
    })
    wx.setStorageSync('history', this.data.history)
  },
  handlecancel() {
    this.setData({
      inputvalue: ''
    })
  },
  handleclear() {
    wx.removeStorageSync('history')
    this.setData({
      history: []
    })
  }
})