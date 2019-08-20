// pages/goods_detail/index.js
import Request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    Height: '',
    message: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    Request({
      url: `/goods/detail?goods_id=${goods_id}`
    }).then(res => {
      const { message } = res.data
      this.setData({
        imgUrls: message.pics,
        message
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  imgHeight:function (e) {
    // if (this.data.imgUrls.length === 0) {
    //   return
    // }
    if (this.data.Height) {
      return
    }
    console.log(e)
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      Height: swiperH//设置高度
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})