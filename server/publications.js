Meteor.publish('images', function() {
  return Images.find();
});

Meteor.publish('activity', function() {
  return Activity.find();
});

Meteor.publish('prize', function() {
  return PrizeList.find();
});

// 只取该用户自己的奖品
Meteor.publish('userPrizes', function() {
  if(this.userId){
    return UserPrizesList.find({userId: this.userId});
  }else{
    this.ready();
  }
});
