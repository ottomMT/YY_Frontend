Template.shakeBottleStart.helpers({
  /**
   * 设置摇奖是否可用
   * @return {boolean} [description]
   */
  none: function(){
    console.log('this', this);
    var user = Meteor.user(),
        share = user.profile && user.profile.share || 0,
        userPrizesCount = UserPrizesList.find({activeId: this._id}).count(),
        isNone = userPrizesCount >= (share + 1),
        hasChance = userPrizesCount < 2 && userPrizesCount > 0;
        Session.set('hasChance', hasChance);
        Session.set('isNone', isNone);
    return isNone;
  }
});
