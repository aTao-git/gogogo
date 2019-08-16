import Request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    menuitem: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    Request ({
      url: '/categories'
    }).then(res => {
      console.log(res)
      const { message } = res.data
      this.setData({
        menuitem: message
      })
    }).catch(err => {
      console.log(err)
    })
  },
  handlechangetab (e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      current: index
    })
  }
})