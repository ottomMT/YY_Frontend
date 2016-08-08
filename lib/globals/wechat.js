WechatConfig = {
  appId: 'wxef5c9f14b3a06e15',
  secret: '9e12852e516831d96461165181691b7f',
  host: 'http://yuanyu.muyingpai.cn/',
  whiteList: ['/_weixin/callback'],
  url: function (jump) {
    var loginUrl =  'https://open.weixin.qq.com/connect/oauth2/authorize' +
        '?appid=' + this.appId +
        '&redirect_uri=' + this.host + '_weixin/callback' +
        '&response_type=code' +
        '&scope=snsapi_base' +
        '&state=' + Math.ceil(Math.random() * 1000000) + '#wechat_redirect';
    return loginUrl;

  }
};
