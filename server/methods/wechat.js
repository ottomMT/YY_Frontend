/**
 * 媛育微信授权登录配置
 * @type {Object}
 */
var config = WechatConfig;
Meteor.methods({
  /**
   * Login to Meteor with a Facebook access token
   * @param id Your Facebook user Id
   * @param email Your Email, or null if a user email was not provided
   * @param name Your Facebook name
   * @param accessToken Your Facebook access token
   * @returns {*}
   */
  wechatLoginWithAccessToken: function(query) {
    check(query, Object);
    // console.log('req.query', query);
    var response = getTokenResponse(query);
    // console.log('response', response);
    // 是否获取用户 openid，access_token 成功
    if(!response.openid || !response.access_token){
      throw new Meteor.Error(403, '获取用户 access_token 失败 !');
    }
    var info = getUserInfo(response.openid, response.openid);
    // console.log('info', info);

    // 用户信息
    if(info.error || !info.result){
      throw new Meteor.Error(403, '获取用户信息失败 !');
    }

    info = info.result;
    // 是否已关注该公众号
    if(info.subscribe == 0){
      throw new Meteor.Error(401, '未关注公众号 !');
    }
    // console.log('info', info);

    var openid = response.openid;
    var accessToken = response.access_token;

    // email = email || "-" + id + "@facebook.com";
    var options, serviceData;
    serviceData = {
      id: openid,
      accessToken: accessToken
    };
    options = {
      profile: {
        wechat: info
      }
    };

    // 创建或更新用户
    var loginResult = Accounts.updateOrCreateUserFromExternalService('wechat', serviceData, options);
    Meteor.users.update({
      _id: loginResult.userId
    }, {
      $set: {
        'profile.wechat': info
      }
    });

    // 生成登录用户token
    var stampedLoginToken = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(loginResult.userId, stampedLoginToken);
    return stampedLoginToken;
  }
});

/**
 * 加载用户 openid access_token
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
function getTokenResponse(query) {
  var response;
  try {
    response = HTTP.get(
      "https://api.weixin.qq.com/sns/oauth2/access_token", {
        params: {
          code: query.code,
          appid: config.appId,
          secret: config.secret,
          grant_type: 'authorization_code'
        }
      });

    if (response.error) // if the http response was an error
      throw response.error;
    if (typeof response.content === "string")
      response.content = JSON.parse(response.content);
    if (response.content.error)
      throw response.content;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Wechat. " + err.message), {
      response: err.response
    });
  }

  return response.content;
}

/**
 * 通过网页授权接口获取用户信息
 * @param  {[type]} access_token [description]
 * @param  {[type]} openid       [description]
 * @return {[type]}              [description]
 */
function getIdentity(access_token, openid) {
  // console.log('getIdentity', 'accessToken:', access_token, 'openid', openid);
  try {
    var response = HTTP.get(
      "https://api.weixin.qq.com/sns/userinfo", {
        params: {
          access_token: access_token,
          openid: openid,
          lang: 'zh_CN'
        }
      });

    if (response.error) // if the http response was an error
      throw response.error;
    if (typeof response.content === "string")
      response.content = JSON.parse(response.content);
    if (response.content.error)
      throw response.content;
  } catch (err) {
    console.log('catch', 'response.data', err);
    throw _.extend(new Error("Failed to fetch identity from Wechat. " + err.message), {
      response: err.response
    });
  }

  return response.content;
}

/**
 * 通过获取用户基本信息接口获取用户基本信息
 * 使用 async 模块等待数据
 * @param  {[type]} openid [description]
 * @return {[type]}        [description]
 */
function getUserInfo(openid) {
  var response = Async.runSync(function(done) {

    WeApi.getUser(openid, function(error, result) {
      done(error, result);
    });

  });

  return response;
}
