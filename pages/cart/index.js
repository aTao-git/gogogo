// pages/cart/index.js
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
    isshow: true,
    goods: {},
    allCheck: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  handleaddress() {
    wx.chooseAddress({
      success: res => {
        this.setData({
          address: {
            userName: res.userName,
            telNumber: res.telNumber,
            detailInfo: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        console.log(res)
      }
    })
  },
  onShow() {
    const goods = wx.getStorageSync('goods')
    if (Object.keys(goods).length === 0) {
      this.setData({
        isshow: false
      })
    } else {
      this.setData({
        isshow: true
      })
    }
    let pass = true
    Object.values(goods).forEach(v => {
      if (!v.states) {
        pass = false
      }
    })
    this.setData({
      goods,
      allCheck: pass
    })
    this.handleAllPrice()
  },
  handleAllPrice() {
    let allPrice = 0
    Object.keys(this.data.goods).forEach(v => {
      if (this.data.goods[v].states) {
        allPrice += this.data.goods[v].goods_price * this.data.goods[v].number
      }
    })
    this.setData({
      allPrice
    })
    wx.setStorageSync('goods', this.data.goods)
  },
  changeGoodsState(e) {
    const {
      id
    } = e.currentTarget.dataset
    const {
      goods
    } = this.data
    goods[id].states = !goods[id].states
    let pass = true
    Object.values(goods).forEach(v => {
      if (!v.states) {
        pass = false
      }
    })
    this.setData({
      goods,
      allCheck: pass
    })
    this.handleAllPrice()
  },
  handleAdd(e) {
    const {
      id
    } = e.currentTarget.dataset
    const {
      goods
    } = this.data
    goods[id].number = goods[id].number + 1
    this.setData({
      goods
    })
    this.handleAllPrice()
  },
  handleReduce(e) {
    const {
      id
    } = e.currentTarget.dataset
    const {
      goods
    } = this.data
    if (goods[id].number === 1) {
      wx.showModal({
        title: '提示',
        content: '确定要删除商品吗？',
        success: res => {
          if (res.confirm) {
            delete goods[id]
            this.setData({
              goods
            })
            this.handleAllPrice()
          }
        }
      })
    } else {
      goods[id].number = goods[id].number - 1
      this.setData({
        goods
      })
      this.handleAllPrice()
    }
  },
  handleAllCheck () {
    const { goods } = this.data
    if (this.data.allCheck) {
      Object.values(goods).forEach(v => {
        v.states = false
      })
      this.setData({
        goods,
        allCheck: !this.data.allCheck
      })
      this.handleAllPrice()
    } else {
      Object.values(goods).forEach(v => {
        v.states = true
      })
      this.setData({
        goods,
        allCheck: !this.data.allCheck
      })
      this.handleAllPrice()
    }
  },
  handlepay () {
    let pass = true
    const { address } = this.data
    Object.values(address).forEach(v => {
      if (!v) pass = false
    })
    if (!pass) {
      wx.showToast({
        title: '请先填写收货地址！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const { goods } = this.data
    if (Object.values(goods).length === 0) {
      pass = false
    }
    if (!pass) {
      wx.showToast({
        title: '你还没有添加商品！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('address', this.data.address)
    let selectedGoods = []
    Object.values(goods).forEach(v => {
      if (v.states) {
        selectedGoods.push(v)
      }
    })
    wx.setStorageSync('selectedGoods', selectedGoods)
    wx.navigateTo({
      url: '/pages/order_enter/index',
    })
  }
})