Meteor.methods({
  deleteUser: function (userId) {
    return Meteor.users.remove(userId);
  },
  WeApi: function () {
    var result = null;
    WeApi.getJsConfig({
      debug: false,
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
      url: 'http://www.xxx.com'
    }, function (error, config) {
      console.log('config', config);
      console.log('error', error);
      if(error){
        result = error;
      }else{
        result = config;
      }
    });
    return result;
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
