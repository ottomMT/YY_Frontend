WechatConfig = {
  appId: 'wxef5c9f14b3a06e15',
  secret: '9e12852e516831d96461165181691b7f',
  host: 'http://yuanyu.muyingpai.cn/',
  whiteList: ['/_weixin/callback'],
  url: function () {
    var loginUrl =  'https://open.weixin.qq.com/connect/oauth2/authorize' +
        '?appid=' + this.appId +
        '&response_type=code' +
        '&scope=snsapi_userinfo' +
        '&redirect_uri=' + this.host + '_weixin/callback' +
        '&state=' + Math.random();
    return loginUrl;

  }
};
