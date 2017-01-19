/**
 * 关闭奖券的二维码弹层
 */
Template.prizeQrCodeModal.events({
    'touchstart #close-button': function () {
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
