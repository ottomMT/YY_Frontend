var CryptoJS = require("crypto-js");
/**
 * 签名生成和校验工具
 * @type {Object}
 */
Sign = {};
/**
 * 生成签名
 * @param  {any} signObj 代签名数据
 * @return {string}     返回 md5 加密后的签名
 */
Sign.create = function(signObj){
  return CryptoJS.MD5(JSON.stringify({sign:signObj}) + Meteor.userId()).toString();
};
/**
 * 验证签名
 * 取得签名，然后生成签名，验证签名是否相等
 * @param  {object} signObj 校验数据
 * @return {boolean}         验证是否成功
 */
Sign.verify = function(signObj){
  if(_.isObject(signObj)){
  var mySign = signObj.sign;
      delete signObj.sign;

    var result = mySign === CryptoJS.MD5(JSON.stringify({sign:signObj}) + Meteor.userId()).toString();
        signObj.sign = mySign;
    return result;

  }else{
    return false;
  }
};
