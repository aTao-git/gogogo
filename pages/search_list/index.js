// pages/search_list/index.js
import Request from '../../utils/request.js'
Page({
  data: {
    current: 0,
    keyword: '',
    goods: [],
    pagenum: 1,
    pagesize: 15,
    hasmore: true
  },
  showData () {
    const { keyword, pagenum, pagesize } = this.data
    Request({
      url: '/goods/search',
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
      const { goods } = res.data.message
      if (goods.length < this.data.pagesize) {
        this.setData({
          hasmore: false
        })
      }
      this.setData({
        goods: [...this.data.goods,...goods],
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword: options.query
    })
    this.showData()
  },
  handlechangetab (e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      current: index
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    if (!this.data.hasmore) {
      return
    }
    this.setData({
      pagenum: this.data.pagenum + 1
    })
    this.showData()
  }
})