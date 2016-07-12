Template.myPrizeList.helpers({
    unUsed: function () {
        return !this.use;
    },
    expiryDate: function () {
        var currentPrize = PrizeList.findOne({_id: this.prizeId});
        return moment(currentPrize.expiryDate).format('YYYY-MM-DD');
        // return tPrize.expiryDate;
    },
    noPrize: function () {
        var now = new Date();
        var currentActive = Activity.findOne({_id: "8ZMopGZyyDXb33ZbR"});
        return !this.length && (now > currentActive.startAt);
    }
});
Template.myPrizeList.events({
    'click .prize': function () {
        // console.log(this);
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
        $(".qrcode-square canvas").remove();
    }
});
