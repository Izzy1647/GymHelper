Page({
  clearStorage: function () {

    var that = this;

    that.setData({

      loading: true,

      disabled: true

    });

   // that.update();

    wx.clearStorage({

      success: function () {

        that.setData({

          loading: false,

          disabled: false,

          toast1Hidden: false

        });

        
    }
  });
    // 页面
    


  }
})
