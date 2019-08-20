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
  handleAddGoods () {
    const goods = wx.getStorageSync('goods') || {}
    const {message} = this.data
    message.states = true
    message.number = 1
    goods[this.data.message.goods_id] = message
    wx.setStorageSync('goods', goods)
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000
    })
  }
})