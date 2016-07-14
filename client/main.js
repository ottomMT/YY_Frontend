Meteor.startup(function () {
    /**
     * 获取服务器时间,并把时间设置到 Session 中,每隔1秒更新一次
     */
    setInterval(function () {
        Meteor.call("getServerTime", function (error, result) {
            Session.set("time", result);
        });
    }, 1000);

    /**
     * 加载微信配置
     * @return {[type]} [description]
     */
    function getWechatConfig(){
      /**
       *  生成当前 URL 的配置文件
       *  取得配置文件成功后挂载配置文件
       *  等待 wx.ready
       *  ready 成功后，设置 Session wx 微信 jssdk 加载状态为 true
       *  如果 Session 中的 shareConfig 存在，则注册分享事件
       */
      var url = this.location.href;
      Meteor.call('WeJSConfig', url, function(error, result){

        if(result){
          wx.config(result);
          wx.ready(function(){
              Session.set('wx', true);
              WechatShare.registerSNS();
          });

        }

      });

    }

    getWechatConfig();


});
