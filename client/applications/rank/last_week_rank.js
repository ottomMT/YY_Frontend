/**
 * 页面创建后查询排名
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.lastWeekRank.onCreated(function(){

  Meteor.call('lastWeekRank', function(error, result){
    if(!error){
      Session.set('lastTopList', result);
    }
  });

});

/**
 * 上周排名 helpers
 */
Template.lastWeekRank.helpers({
  /**
   * 取得排名列表
   * @return {[type]} [description]
   */
  topList: function(){
    return Session.get('lastTopList');
  },
  /**
   * 格式化时间
   * @param {number} 所用时间
   * @return {[type]} [description]
   */
  formatTime: function(time){
    if(_.isNumber(time)){
      return (time/1000).toFixed(2);
    }else{
      return 'NAN';
    }
  },
  /**
   * 显示当前排名图标
   * @param  {number} No 记录在数组中的索引 Index
   * @return {string}    饭后排名对应的图标  
   */
  topImg: function(No){
    var top = ['/img/rank-one.png', '/img/rank-two.png', '/img/rank-three.png'];
    return top[No];
  }
});
