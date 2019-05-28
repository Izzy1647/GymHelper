// mine.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidePopup: true,
    phoneNumber: '请输入',
    userInfo: {},
    items: [
      {
        icon: '/pages/images/Fingerprint.png',
        text: '每日打卡',
        path: '/pages/signin/sign-in'
      },
      {
        icon: '/pages/images/ok.png',
        text: '清理缓存',
        path: '/pages/delete/delete'
      },
      {
        icon: '/pages/images/addr-edit.png',
        text: '健身知识',
        path: '/pages/knowledge/knowledge'
      },
      {
        icon: '/pages/images/phone.png',
        text: '我的电话',
        path: ''
      },
      {
        icon: '/pages/images/support.png',
        text: '联系客服',
        path: '13817876245',
      },
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'phoneNumber',
      success: function (res) {
        that.setData({
          phoneNumber: res.data
        })
      },
    });
    this.getUserInfo();
    console.log(this.data.userinfo);

    wx.getWeRunData({
      success(res) {
        console.log(res);
      }
    })
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

  
  //获取用户信息
  getUserInfo: function () {
    var userInfo = App.globalData.userInfo
    var that = this;

    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
      return
    }

    userInfo = App.getUserInfo();
    console.log(userInfo);
    that.setData({
      userInfo: userInfo
    })
  },

  bindtap(e) {
  },
  navigateTo: function (e) {
    const index = e.currentTarget.dataset.index;
    const path = e.currentTarget.dataset.path;
    switch (index) {
      case 3:
        this.showPopupTap();
        break;
      case 4:
        wx.makePhoneCall({
          phoneNumber: path
        })
        break;
      default:
        console.log(path);
        // console.log(typeof path);
        wx.navigateTo({
          url: path
        });
    };
  },

  closePopupTap: function () {
    this.setData({
      hidePopup: true
    })
  },
  showPopupTap: function () {
    this.setData({
      hidePopup: false
    })
  },
  formSubmit: function (e) {
    console.log(e);
    const phoneNumber = e.detail.value.phoneNumber;
    if (phoneNumber.length != 11 && phoneNumber.length != 8) {
      wx.showModal({
        title: '提示',
        content: '电话号码不正确，请确认后重新输入。',
      });
      return;
    }
    this.setData({
      phoneNumber: e.detail.value.phoneNumber
    });
    wx.setStorageSync({
      key: "phoneNumber",
      data: phoneNumber
    });
    this.closePopupTap();
  },
})
