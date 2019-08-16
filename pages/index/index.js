import Request from '../../utils/request.js'
Page({
  data: {
    imgUrls: [],
    menuImg: [],
    contentImg: []
  },
  onLoad () {
    Request({
      url: '/home/swiperdata'
    }).then(res => {
      const { message }  = res.data
      this.setData({
        imgUrls: message
      })
    }).catch(err => {
      console.log(err)
    })
    Request({
      url: '/home/catitems'
    }).then(res => {
      const { message } = res.data
      this.setData({
        menuImg: message
      })
    }).catch(err => {
      console.log(err)
    })
    Request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata'
    }).then(res => {
      const { message } = res.data
      this.setData({
        contentImg: message
      })
    }).catch(err => {
      console.log(err)
    })
  }
})
