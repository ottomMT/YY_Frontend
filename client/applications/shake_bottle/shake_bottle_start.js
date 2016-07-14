Template.shakeBottleStart.helpers({
  none: function(){
    var user = Meteor.user(),
        share = user.profile && user.profile.share || 0;
    return UserPrizesList.find().count() >= (share + 1);
  }
});
