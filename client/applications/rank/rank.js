Template.rank.events({
    /**
     * 点击'我的排名'按钮显示排名信息
     */
    'touchstart #my-rank-button': function () {
        $("#my-rank-modal").css('display','block');
        setTimeout(function () {
            $("#my-rank-modal .center-square").removeClass("zoom");
        },10);
    },
    /**
     * 弹层关闭时间
     * 返回 false 值是为阻止事件冒泡
     * @returns {boolean}
     */
    'touchstart #close-modal-button': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        return false;
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
    /**
     * 点击弹层空白区域关闭弹层
     */
    'touchstart .modal': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
    /**
     * 防止点击弹层内容区域时弹层关闭
     * 返回 false 值是为阻止事件冒泡
     * @returns {boolean}
     */
    'touchstart .center-square': function () {
        return false;
    }
});

Template.rank.helpers({
  /**
   * 是否显示分割线
   * @return {[type]} [description]
   */
  hasDivider: function(){
    var topList = Session.get('topList'),
        lastTopList = Session.get('lastTopList');
        var isHasDivider = topList && topList.length && lastTopList && lastTopList.length ? true : false;
    return isHasDivider;
  }
});

Template.rank.onRendered(function () {
    /**
     * 设置当前页面背景样式
     */
    $("body").css({"backgroundImage": "url('/img/bg.jpg')","backgroundSize": "cover","backgroundRepeat": "no-repeat"});

    /**
     * 如果排名页面只有一个栏目则让这个栏目中的标题内容长度增长
     */
    // var topList = Session.get('topList'),
    //     lastTopList = Session.get('lastTopList');
    // var isHasDivider = topList && topList.length && lastTopList && lastTopList.length ? true : false;
    //
    // console.log(!isHasDivider);
    // setTimeout(function(){
    //       if (!isHasDivider){
    //           $(".rank .week-rank .name").css("width", "10rem");
    //           $(".rank .last-week-rank .name").css("width", "10rem");
    //       }
    // },300);
});

/**
 * 页面创建设置该页面分享内容
 * 设置 session shareConfig 为该页面分享配置
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.rank.onCreated(function(){
  WechatShare.rankConfig();
});
