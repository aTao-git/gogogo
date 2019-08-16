const Request = function (config = {}) {
  if (!config.url) {
    throw new Error('没有检测到URL参数！')
    return
  }
  if (config.url.search(/^http/) === -1) {
    config.url = Request.defaults.baseURL + config.url
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject (err)
      },
      complete (res) {
        Request.errors.fnerr(res)
      }
    })
  })
}
Request.defaults = {
  baseURL: ''
}
Request.errors = {
  fnerr: null
}
Request.onError = function (callback) {
  Request.errors.fnerr = callback
}
export default Request