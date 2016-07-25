/**
 * 页面创建后查询排名
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.weekRank.onCreated(function(){

  Meteor.call('weekRank', {_id: this.data._id}, function(error, result){
    console.log('onCreated', result);
    if(!error){
      Session.set('topList', result);
    }
  });

});

/**
 * 本周排名 helpers
 */
Template.weekRank.helpers({
  /**
   * 取得排名列表
   * @return {[type]} [description]
   */
  topList: function(){
    return Session.get('topList');
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
   * 显示当前排名
   * @param  {number} No 记录在数组中的索引 Index
   * @return {string}    文字描述的名次
   */
  topNo: function(No){
    var top = ['一', '二', '三', '四', '五', '六'];
    return top[No];
  },
  /**
   * 是否含有排名
   * @return {[type]} [description]
   */
  hasList: function(){
    var topList = Session.get('topList');
    console.log('topList', topList);
    return topList && topList.length ? true : false;
  }
});
