/**
 * 微信分享生成校验身份密钥
 * 密钥为 MD5 userId;
 * @return {string} 返回密码
 */
Share = function(){
  return CryptoJS.MD5(Meteor.userId()).toString();
};
