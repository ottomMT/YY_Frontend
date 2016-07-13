Template.rank.events({
    /**
     * 点击'我的排名'按钮显示排名信息
     */
    'click #my-rank-button': function () {
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
    'click #close-modal-button': function () {
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
    'click .modal': function () {
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
    'click .center-square': function () {
        return false;
    }
});

/**
 * 设置当前页面背景样式
 */
Template.rank.onRendered(function () {
    $("body").css({"backgroundImage": "url('/img/bg.jpg')","backgroundSize": "cover","backgroundRepeat": "no-repeat"});
});

/**
 * 页面创建设置该页面分享内容
 * 设置 session shareConfig 为该页面分享配置
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.rank.onCreated(function(){
  Session.set('shareConfig', WechatShare.rankConfig());
});
