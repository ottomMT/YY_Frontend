Template.shakeResultModal.helpers({
  /**
   * 是否显示分享分享
   * 如果已经摇过两次，则部分显示分享按钮，显示关闭按钮
   * @return {boolean} [description]
   */
  showShareButton: function(){
    if(Session.get('isNone') && Session.get('playCount') > 1){
      return false;
    }else{
      return true;
    }
  }
});
