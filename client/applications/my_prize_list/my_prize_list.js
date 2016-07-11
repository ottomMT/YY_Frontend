Template.myPrizeList.events({
    'click .prize': function () {
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
    }
});