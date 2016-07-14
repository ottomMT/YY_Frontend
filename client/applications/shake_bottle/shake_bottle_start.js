Template.shakeBottleStart.helpers({
  /**
   * 设置摇奖是否可用
   * @return {boolean} [description]
   */
  none: function(){
    console.log('this', this);
    var user = Meteor.user(),
        share = user.profile && user.profile.share || 0,
        isNone = UserPrizesList.find({activeId: this._id}).count() >= (share + 1);
        Session.set('isNone', isNone);
    return isNone;
  }
});
