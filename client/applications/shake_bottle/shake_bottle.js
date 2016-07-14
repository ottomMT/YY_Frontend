/**
 *  配置 shake.js 基础信息
 *  watching: 是否开始监听
 *  shakesCount: 晃动次数记录
 *  sensitivity: 监听灵敏度,越低越灵敏
 */
Session.setDefault('watching', false);
Session.setDefault('shakesCount', 0);
Session.setDefault('sensitivity', 15);

/**
 * 监听手机晃动事件,并在每次晃动后执行特定方法
 * 执行温度计温度降低的动画
 * 执行温度计到特定温度后停止监听晃动事件并为用户发奖
 * @type {Function}
 */
onShake = function onShake() {
    /**
     * 如果晃动监听未关闭,每晃动一次,晃动次数加一.
     */
    if(Session.get('watching')){
        Session.set('shakesCount', Session.get('shakesCount') + 1);
    }

    if(Session.get('getPrize')) return;
    Session.set('start', new Date().getTime());

    /**
     * 每晃动一次,温度计的水柱下降一定的值
     * 通过 jquery 改变水柱的高度
     * @type {number}
     */
    var TH = Session.get('temperature') - 0.03;
    Session.set('temperature', TH);
    var THRem = TH + "rem";
    $('.temperature').css('height',THRem);

    /**
     * 如果温度低于一定值则停止晃动事件,并为用户发奖.
     */
    if(TH <= 3.5){
        Session.set('watching', false);
        Session.set('getPrize', true);
        var time = new Date() - Session.get('start'),
            post = {time: time, activity: 'NdqfruthLZeKcgLgu'},
            sign = Sign.create(post);
        console.log('post', post, 'sign: ', sign);
        post.sign = sign;
        Meteor.call('shakeBbottle', post, function (error, result) {

            if(error){
                console.error('shakeBbottle error', error);
                return ;
            }
            console.log('result', result);
            var user = Meteor.user(),
                nickname = user.profile.wechat.nickname, //昵称
                timeEnd = (time/1000).toFixed(2), // 摇晃时间
                prize = result.name; // 奖品名称

            $('#shake-result-modal .content').html('<p>恭喜您'+ nickname +'</p><p>本次摇奶瓶耗时为 '+ timeEnd +' 秒</p><p>得到'+ prize +'</p>');
            $("#shake-result-modal").css('display','block');
            setTimeout(function () {
                $("#shake-result-modal .center-square").removeClass("zoom");
            },10);

        });
        // $("#shake-result-modal").css('display','block');
        // setTimeout(function () {
        //     $("#shake-result-modal .center-square").removeClass("zoom");
        // },10);
    }
};
// onShake = _.debounce(function onShake() {
//     Session.set('shakesCount', Session.get('shakesCount') + 1);
// }, 50, true);  // fire the shake as soon as it occurs, but not again if less than 750ms have passed; 500 was too little

/**
 * 程序测试用代码,暂时请勿删除,后期用来调试晃动灵敏度
 */
// Template.shakeBottle.helpers({
//     shakes: function () {
//         return Session.get('shakesCount');
//     },
//     watching: function () {
//         return Session.get('watching').toString();
//     }
// });

Template.shakeBottle.events({
    /**
     * 用 click 事件模拟手机摇动时的奶瓶及温度计动画
     * 在温度到达40度时为用户发奖品
     */
    'click .animation-square': function () {
        if(Session.get('getPrize')) return;
        Session.set('shakesCount',Session.get('shakesCount')+1)
        Session.set('start', new Date().getTime());
        // $(".bottle").addClass("shake");

        var TH = Session.get('temperature') - 0.1;
        Session.set('temperature', TH);
        var THRem = TH + "rem";
        $('.temperature').css('height',THRem);
        if(TH <= 3.5){

            Session.set('getPrize', true);
            var time = new Date() - Session.get('start'),
                post = {time: time, activity: 'NdqfruthLZeKcgLgu'},
                sign = Sign.create(post);
            console.log('post', post, 'sign: ', sign);
            post.sign = sign;
            Meteor.call('shakeBbottle', post, function (error, result) {

                if(error){
                    console.error('shakeBbottle error', error);
                    return ;
                }
                console.log('result', result);
                var user = Meteor.user(),
                    nickname = user.profile.wechat.nickname, //昵称
                    timeEnd = (time/1000).toFixed(2), // 摇晃时间
                    prize = result.name; // 奖品名称


                $('#shake-result-modal .content').html('<p>恭喜您'+ nickname +'</p><p>本次摇奶瓶耗时为 '+ timeEnd +' 秒</p><p>得到'+ prize +'</p>');
                $("#shake-result-modal").css('display','block');
                setTimeout(function () {
                    $("#shake-result-modal .center-square").removeClass("zoom");
                },10);

            });
            // $("#shake-result-modal").css('display','block');
            // setTimeout(function () {
            //     $("#shake-result-modal .center-square").removeClass("zoom");
            // },10);
        }
        // var TH = temperature - 1;
        // console.log('this.tem', temperature);
        // console.log('this', this);
        // this.temperature--;
        // var THRem = TH + "rem";
        // $(".temperature").css("height", THRem);
    },
    /**
     * 点击'摇奖品'按钮后模拟摇奶瓶结果出现效果
     */
    'click #start': function () {

        if(Session.get('unStart')){
          return shareModal('<p>活动未开始</p>', true);
        }else if(Session.get('isEndding')){
          return shareModal('<p>活动已结束</p>', true);
        }else if(Session.get('isNone')){
          return shareModal('<p>您已玩过</p>', true);
        }

        Session.set('watching', true);
        $("#start").css('pointer-events','none');
        if (Session.get('watching')){
            console.log("开始摇动");
            shake.startWatch(onShake, {
                threshold: Session.get('sensitivity'),
                timeout: 0
            });
        } else {
            console.log("停止摇动");
            shake.stopWatch();
        }
    },
    /**
     * 点击弹层周边空白区域关闭弹层
     */
    'click .modal': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
    /**
     * 点击不满足继续摇后模拟分享界面弹出效果
     * 返回的 false 值目的是阻止事件冒泡
     * @returns {boolean}
     */
    'click #continue-shake': function () {
        // 隐藏摇奶瓶结果界面
        $("#shake-result-modal .center-square").addClass("zoom");
        setTimeout(function () {
            $("#shake-result-modal").css('display','none');
        },200);
        // 显示分享提示
        setTimeout(function () {
            $("#share-modal").css('display','block');
            setTimeout(function () {
                $("#share-modal .center-square").removeClass("zoom");
            },10);
        },100);
        return false;
    }
    // 'click .center-square': function () {
    //     return false;
    // },
    // 'click .center-square': function () {
    //     return false;
    // }
});


Template.shakeBottle.onCreated(function(){
  Session.set('activeId', this._id);
});

/**
 * 设置页面中温度计的初始温度
 */
Template.shakeBottle.helpers({
    temperature:function () {
        Session.set('temperature', '8.3');
    },
    is404: function(){
      return Session.set('is404', !this.activity);
    },
    id: function(){
      return {_id: this._id};
    },
    /**
     * 活动未开始
     * 当前时间 小于 开始时间
     * @return {boolean}
     */
    unStart: function(){
      var time = Session.get('time'),
          result = new Date(time) < new Date(this.activity && this.activity.startAt);
          Session.set('unStart', result);
      return result;
    },
    /**
     * 活动已结束
     * 当前时间大于 结束时间
     * @return {boolean}
     */
    isEndding: function(){
      var time = Session.get('time'),
          result = new Date(time) > new Date(this.activity && this.activity.endAt);
          Session.set('isEndding', result);
      return result;
    }
});

    /**
     * 提示框模块
     * @param {string} html 显示内容
     * @param {boolean} hideLine 是否隐藏提示线框
     * @return {[type]} [description]
     */
    function shareModal(html, hideLine){
        $("#share-modal").css('display','block').find('.content').html(html);
        if(hideLine){
          $("#share-modal .point-img").hide();
        }else{
          $("#share-modal .point-img").show();
        }
        setTimeout(function () {
            $("#share-modal .center-square").removeClass("zoom");
        },10);
    }
/**
 *
 * 设置当前页面背景样式
 */
Template.shakeBottle.onRendered(function () {

  /**
   * 验证活动状态，
   * 如果活动已结束，或活动未开始。
   * 显示提示框
   */
  function activityState(){
    if(Session.get('is404')){
      shareModal('<p>活动不存在</p>', true);
    }else if(Session.get('unStart')){
      shareModal('<p>活动未开始</p>', true);
    }else if(Session.get('isEndding')){
      shareModal('<p>活动已结束</p>', true);
    }
  }
  activityState();

    $("body").css({"backgroundImage": "url('/img/bg.jpg')","backgroundSize": "cover","backgroundRepeat": "no-repeat"});

    /**
     * 通过检测 shakesCount (摇动次数) 值是否增加来决定奶瓶是否需要晃动
     * 获取当前晃动次数和上一次晃动次数作比较
     * 如果当前晃动次数大于上一次晃动次数,给 .bottle 添加 shake 动画
     */
    Session.setDefault('lastConut', 0);
    setInterval(function () {
        var currentCount = Session.get("shakesCount");
        var lastCount = Session.get('lastConut');

        if ( currentCount > lastCount ){
            $(".bottle").addClass("shake");
            Session.set('lastConut', currentCount);
        } else {
            $(".bottle").removeClass("shake");
        }
    },1000);
});

/**
 * 页面创建设置该页面分享内容
 * 设置 session shareConfig 为该页面分享配置
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.shakeBottle.onCreated(function(){
  WechatShare.shakeBottleConfig();
});
