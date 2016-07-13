Template.myPrizeList.helpers({
    /**
     * 我的奖品
     */
    Prizes: function () {
        return UserPrizesList.find();
    },
    /**
     * 查询用户是否含有奖品
     * @return {number} 奖品数量
     */
    hasPrizes: function(){
        return UserPrizesList.find().count();
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
      var activity = Activity.findOne();
      if(activity && activity.startAt){
        if(new Date() > new Date(activity.startAt)){
          return false;
        }else{
          return true;
        }
      }else{
         return true;
      }
    }
});

Template.myPrizeList.events({
    'click #close-button': function () {
        $("#prizeQrCodeModal").animate({
            opacity: 0
        },300,function () {
            $(this).css('display','none')
        });
        setTimeout(function () {
            $(".qrcode-square canvas").remove();
        },300);
    }
});


Template.myPrizeList.onRendered(function () {
    $("body").css("background-color","#FFA8AD");
});
