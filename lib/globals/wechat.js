WechatConfig = {
  appId: 'wxe6426b4eea2e32d8',
  secret: '0aae97b9d3fbc6e6215e71e7b7158f43',
  host: 'http://www.muyingpai.cn/',
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