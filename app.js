//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    //wx.removeStorageSync('collectionID')
    var collectionID = wx.getStorageSync('collectionID')||[]
    console.log(collectionID)
    logs.unshift(Date.now())

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        if(res.authSetting['scope.userLocation']){
          //已经授权，可以直接调用getLocation、chooseLocation获取用户地理位置信息
          wx.getLocation({
            success: res =>{
              this.globalData.userLatitude = res.latitude
              this.globalData.userLongitude = res.longitude
              this.globalData.werun = res.werun
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userLatitude:null,
    userLontitude:null,
    werun:null
  }
})