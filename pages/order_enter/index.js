// pages/order_enter/index.js
import Request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      userName: '',
      telNumber: '',
      detailInfo: '',
    },
    selectGoods: [],
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow () {
    const selectGoods = wx.getStorageSync('selectedGoods')
    const address = wx.getStorageSync('address')
    let allPrice = 0
    selectGoods.forEach(v => {
      allPrice += v.goods_price * v.number
    })
    this.setData({
      address,
      selectGoods,
      allPrice
    })
  },
  handlePay () {
    const {address} = this.data
    const {selectGoods} = this.data
    const goods = selectGoods.map(v => {
      return {
        goods_id: v.goods_id,
        goods_number: v.goods_number,
        goods_price: v.goods_price
      }
    })
    Request({
      url: '/my/orders/create',
      method: 'POST',
      header: {
        Authorization: wx.getStorageSync('token')
      },
      data: {
        order_price: this.data.allPrice,
        consignee_addr: `${address.userName}${address.telNumber}${address.detailInfo}`,
        goods
      }
    }).then(res => {
      Request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        header: {
          Authorization: wx.getStorageSync('token')
        },
        data: {
          order_number: res.data.message.order_number
        }
      }).then(res => {
        wx.requestPayment({
          ...res.data.message.pay,
          success(res) {
            console.log(res)
           },
          fail(err) { 
            console.log(err)
           }
        })
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }
})