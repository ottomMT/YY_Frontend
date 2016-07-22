Template.myPrizeItem.helpers({
    /**
     * 我的奖品详细
     * @returns {string}
     */
    myPrize: function(){
      return PrizeList.findOne({_id: this.prizeId});
    },
    /**
     * 奖品过期时间
     * @param  {[type]} myPrize [description]
     * @return {string}         格式化的过期时间 格式为 ****年**月**日
     */
    deadline: function(myPrize){
      return moment(myPrize.expiryDate).format('YYYY-MM-DD');
    },
    /**
     * 奖品可用状态
     * 	奖品未使用 可用，点击弹出该奖品二维码
     *  奖品已过期,已兑换 不可用
     * @param [object] myPrize 当前奖品
     * @param [string] 返回 prize 是否可用 class
     */
    useClass: function(myPrize){
       if(this.use){
        //  使用后关闭弹窗
         if($("#prizeQrCodeModal").css('display') !== 'none'){
            $("#prizeQrCodeModal").animate({
                opacity: 0
            },300,function () {
                $(this).css('display','none')
            });
            setTimeout(function () {
                $(".qrcode-square canvas").remove();
            },300);
         }
         return 'used';
       }
      var now = new Date(),
          expiryDate = new Date(myPrize.expiryDate);
      if(now > expiryDate){
        return 'used';
      }
      return '';
    },
    /**
     * 底部描述
     * 已过期
     * 未兑换
     * 已兑换
     * @param [object] myPrize 当前奖品
     * @param [string] 返回奖品状态
     */
    footText: function(myPrize){
      if(this.use){
        return '已兑换';
      }
      var now = new Date(),
          expiryDate = new Date(myPrize.expiryDate);
      if(now > expiryDate){
        return '已过期';
      }
      return '未兑换';
    }
});

/**
 * 奖品点击事件
 * 点击弹出该奖品二维码
 * @param  {[type]} {                 'click .prize': function ( [description]
 * @return {[type]}   [description]
 */
Template.myPrizeItem.events({
    'click .prize': function () {
        // console.log('in this', this);
        // 处理奖品名称
        if (this.prizeName.length > 25) {
          var shortPrizeName = this.prizeName.substr(0,25);
          $("#prizeQrCodeModal .prize-name").text(shortPrizeName + "...");
        } else {
          $("#prizeQrCodeModal .prize-name").text(this.prizeName);
        }
        $(".qrcode-square").qrcode({
            size: 160,
            background: '#fff',
            text: this._id + ',' + Meteor.userId(),
        });

        $("#prizeQrCodeModal").css('display','block').animate({
            opacity: 1
        },200);
    }
});
