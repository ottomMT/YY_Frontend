Meteor.methods({
  deleteUser: function (userId) {
    return Meteor.users.remove(userId);
  },
  WeJSConfig: function (url) {
  var response = Async.runSync(function(done) {
    console.log('url', url);
    WeApi.getJsConfig({
      debug: false,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
      url: url || 'http://yuanyu.muyingpai.cn/'
    }, function (error, config) {
      // console.log('config', config);
      // console.log('error', error);
      done(error, config);
    });

  });

  return response.result;
    // WeApi.getJsConfig({
    //   debug: false,
    //   jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
    //   url: 'http://www.xxx.com'
    // }, function (error, config) {
    //   console.log('config', config);
    //   console.log('error', error);
    //   if(error){
    //     result = error;
    //   }else{
    //     result = config;
    //   }
    // });
    // return result;
  },
  /**
   * 生成服务器时间
   * 把时间返回
   * @returns {Date}
     */
  getServerTime: function () {
    var currentTime = new Date();
    return currentTime;
  }
});
