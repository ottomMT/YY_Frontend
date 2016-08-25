Template.shakeBottleStart.helpers({
  /**
   * 设置摇奖是否可用
   * @return {boolean} [description]
   */
  none: function(){
    return this.isNone;
  },
  watching: function(){
    return Session.get('watching');
  }
});
