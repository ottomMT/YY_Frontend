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
  // console.log('this.userId', this.userId);
  // return UserPrizesList.find({}, {fields: {userId: 0}});
  if(this.userId){
    return UserPrizesList.find();
    // console.log(this);
    // return UserPrizesList.find({userId: this.userId},  {fields: {userId: 0}});
  }else{
    this.ready();
  }
});
