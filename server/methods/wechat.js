var config = {
  appId: 'wxe6426b4eea2e32d8',
  secret: '0aae97b9d3fbc6e6215e71e7b7158f43',
  host: 'http://www.muyingpai.cn/'
};
Meteor.methods({
  /**
   * Login to Meteor with a Facebook access token
   * @param id Your Facebook user Id
   * @param email Your Email, or null if a user email was not provided
   * @param name Your Facebook name
   * @param accessToken Your Facebook access token
   * @returns {*}
   */
  wechatLoginWithAccessToken: function (query) {
    // check(accessToken, String);
    // // check(email, Match.OneOf(String, null));
    // check(openid, String);
    // check(info, Object);
    console.log('req.query', query);
    var response = getTokenResponse(query);
    console.log('response', response);
    var info = getIdentity(response.access_token, response.openid);
    console.log('info', info);

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
        wechat :info
      }
    };

    // // Confirm that your accessToken is you
    // try {
    //   var tokenInfo = $FB('debug_token', {
    //     input_token: accessToken,
    //     access_token: Meteor.settings.facebook.appId + '|' + Meteor.settings.facebook.secret
    //   });
    // } catch (e) {
    //   throw new Meteor.Error(500, 'Facebook login failed. An API error occurred.');
    // }
    //
    // if (!tokenInfo.data.is_valid) {
    //   throw new Meteor.Error(503, 'This access token is not valid.');
    // }
    //
    // if (tokenInfo.data.app_id !== Meteor.settings.facebook.appId) {
    //   throw new Meteor.Error(503, 'This token is not for this app.');
    // }
    //
    // // Force the user id to be the access token's user id
    // id = tokenInfo.data.user_id;

    // Returns a token you can use to login
    var loginResult = Accounts.updateOrCreateUserFromExternalService('wechat', serviceData, options);
    Meteor.users.update({_id: loginResult.userId}, {$set: {'profile.wechat': info}});

    // Login the user
    // Meteor.connection.setUserId(loginResult.userId);
    var stampedLoginToken = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(loginResult.userId, stampedLoginToken);
    return stampedLoginToken;
    
    // Return the token and the user id
    return loginResult;
  }
});

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
    throw _.extend(new Error("Failed to complete OAuth handshake with Wechat. " + err.message),
        {response: err.response});
  }

  return response.content;
}

function getIdentity(access_token, openid) {
  console.log('getIdentity', 'accessToken:', access_token, 'openid', openid);
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
