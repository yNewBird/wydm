// pages/personaltest/personaltest.js
var timeintv;//全局变量定时器
var timer="倒计时开始"; //全局定时器剩余值变量
const app = getApp();
var dataItems = require("../../utils/items.js");
var score = 0;    //本局获得分数
var userscore;    //用户已有分数
var optioncolor = ['white', 'white', 'white', 'white', 'white', 'white', 'white']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second:0,
    allItems:dataItems.allItems().list1[0],
    page:1,
    options:[],           //用户选择答案
    allOptions:['A','B','C','D','E','F'],   //罗列所有选项序号，方便获取并判断
    initOptions: [false, false, false, false, false, false, false],
    optioncolor:['white','white','white','white','white','white','white']
  },
  /**
   * 生命周期函数--监听页面加载
   */  
  /**
  * 倒计时结束，自动跳转/刷新页面
 */
  secondOver: function () {
    var bakthis = this;
    clearInterval(timeintv);
    if (bakthis.data.page >= 3) {
      userscore = wx.getStorageSync('userScore')
      userscore = userscore+score
      console.log(userscore+'userscore')
      wx.setStorageSync('userScore', userscore)
      wx.showModal({
        title: '答题完毕',
        content: '恭喜本局获得积分：'+score,
        success:function(res){
          if(res.confirm){
            console.log('用户点击确认')
          }
        }
      })
      wx.navigateBack({
        url: '../onlinetest/onlinetest',
        success:function(e){
          var page = getCurrentPages().pop();
          if(page == undefined || page == null) return;
          page.onLoad();
        }
      })
    }
    else{
      bakthis.setData({
        page: bakthis.data.page + 1,
        allItems: dataItems.allItems().list1[bakthis.data.page],
        optioncolor:optioncolor,
        second: 15,
        options:[]
      })
      bakthis.countDown(1000, 15);
    }
  },
  /**
   * 倒计时
  */
  countDown: function (options,t) {
    //options：时间间隔，t：次数
    var bakthis = this;//缓存一下this
    timer=t;
    timeintv=setInterval(function () {
      bakthis.setData({
        second: timer-=1
      });
      if (timer <= 0) {
        bakthis.setData({
          second: '计时结束',
        });
        bakthis.secondOver();
      }
    }, options);
  },
  onLoad: function (options) {
    this.setData({
      second:timer,
    })
    this.countDown(1000,15);
  },
  /**
   *   用户点击确认按钮
  */
  submitFun:function(e){
    var bakthis = this;
    if (bakthis.data.allItems.answers.sort().toString().toLowerCase() == bakthis.data.options.sort().toString().toLowerCase() ) {
      score+=10;
      console.log('答案正确：', bakthis.data.allItems.answers, '得分：',score);
      bakthis.secondOver();

    }
    else{
     //正确答案提示
     var newoptioncolor = this.data.optioncolor;
      for (var i=0; i< this.data.allItems.answers.length;i++){
        var index = (this.data.allItems.answers[i].toLowerCase().charCodeAt(0) - 97);
        newoptioncolor[index] = 'yellow';
     }
     this.setData({        optioncolor:newoptioncolor    });
     setTimeout(function(){
       bakthis.secondOver();
     },2000) 
    }
  },
  checkboxchange:function(e){
    var bakthis = this;
    bakthis.setData({
      options:e.detail.value
    })
  },
  /**
   *点击收藏按钮
  */
  collectionFun: function(){
    var collectionID = wx.getStorageSync('collectionID') || [];
    console.log(collectionID);
    if( (collectionID.indexOf(this.data.page)) == -1){
      collectionID.unshift(this.data.page);
      wx.setStorageSync('collectionID', collectionID);
    }
    else{

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

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