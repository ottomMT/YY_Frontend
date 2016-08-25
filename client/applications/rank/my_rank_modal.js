/**
 * 我的排名
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.myRankModal.onCreated(function(){

  Meteor.call('myRank', this.data._id, function(error, result){
    console.log('我的排名', result);
    if(!error){
      Session.set('myRank', result);
    }
  });

});

/**
 * 我的排名 helpers
 */
Template.myRankModal.helpers({
  /**
   * 取得排名列表
   * @return {[type]} [description]
   */
  myRank: function(){
    return Session.get('myRank');
  },
  name: function(){
    var user = Meteor.user().wechat;
    return user && user.nickname || '';
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
  topNo: function(No){
    var top = ['一', '二', '三', '四', '五', '六'];
    return top[No];
  }
});
