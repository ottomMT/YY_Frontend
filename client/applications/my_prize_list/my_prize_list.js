Template.myPrizeList.helpers({
    /**
     * 我的奖品
     */
    Prizes: function () {
        return UserPrizesList.find({userId: Meteor.userId()});
    },
    /**
     * 查询用户是否含有奖品
     * @return {number} 奖品数量
     */
    hasPrizes: function(){
        return UserPrizesList.find({userId: Meteor.userId()}).count();
    },
    share: function(){
      console.log('Session', Session.get('me'));
      return Session.get('me');
    },
    /**
     * 验证活动是否未开始
     * 查询活动，
     * 验证活动开始时间是否小于当前时间
     * 如果小于当前时间，活动已开始
     * 如果不小于当前时间，活动未开始
     * [function description]
     * @return {boolean} 活动是否未开始
     */
    unStart: function(){
        if(Session.get('time') && new Date(Session.get('time')) < new Date('2016-07-22 00:00:00')){
          return true;
        }else{
          return false;
        }
    }
});

/**
 * 设置当前页面背景样式
 */
Template.myPrizeList.onRendered(function () {
    $("body").css("background-color","#FFA8AD");
});

/**
 * 页面创建设置该页面分享内容
 * 设置 session shareConfig 为该页面分享配置
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.myPrizeList.onCreated(function(){
  WechatShare.myPrizeListConfig();
});
