WechatConfig = {
  appId: 'wx7eeb6d1e5e7f3d98',
  secret: '3e6405c736e3dffde2419fb61b389049',
  host: 'http://shakewx.stillflaw.com/',
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
