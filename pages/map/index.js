var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk
// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'IZSBZ-KUA6W-M5PRT-OFRWJ-WMQFS-XHFFH'
    });
  },
  onShow() {
    qqmapsdk.search({
      keyword: '酒店',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },
  nearby_search: function() {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: 'kfc', //搜索关键词
      location: '23.099994,113.324520', //设置周边搜索中心点
      success: function(res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/icon_show_active@3x.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  }
})