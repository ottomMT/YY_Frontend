Template.myPrizeList.helpers({
    Prizes: function () {
        return this;
    },
    // 判断奖券是否已使用
    unUsed: function () {
        return !this.use;
    },
    // 判断奖券是否已过期
    Expiryed: function () {
        var now = Session.get('time');
        var currentPrize = PrizeList.findOne({_id: this.prizeId});
        if(currentPrize.expiryDate > now) {
            return true;
        } else{
            return false;
        };
    },
    // 获取奖券有效期
    expiryDate: function () {
        var currentPrize = PrizeList.findOne({_id: this.prizeId});
        return moment(currentPrize.expiryDate).format('YYYY-MM-DD');
    },
    // 判断是否有可用奖券
    noUserPrize: function () {
        var now = new Date();
        var currentActive = Activity.findOne({_id: "RNXTbBwetwgPXXams"});
        return !this.length && (now > currentActive.startAt);
    },
    // 获取过期的奖券
    expiryUserPrizeList: function () {
        var now = Session.get('time');
        var expiryUserPrizeList = [];
        _.each(this, function (item) {
            var tPrize = PrizeList.findOne({_id: item.prizeId});
            if ( now > tPrize.expiryDate )expiryUserPrizeList.push(item);
        });
        return expiryUserPrizeList;
    }
});

Template.myPrizeList.events({
    'click .prize': function () {
        $(".qrcode-square").qrcode({
            size: 160,
            background: '#fff',
            text: this.userId + ',' + this._id,
        });
        $("#prizeQrCodeModal .prize-name").text(this.prizeName);
        $("#prizeQrCodeModal").css('display','block').animate({
            opacity: 1
        },300);
    },
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
