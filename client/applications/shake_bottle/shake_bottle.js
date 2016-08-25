/**
 *  配置 shake.js 基础信息
 */

/**
 * 监听摇晃成功后回调
 * without debounce, every actual user shake will fire the callback twice right away
 * @type {Function}
 */
onShake = function onShake() {
    /**
     * 如果晃动监听未关闭,每晃动一次,晃动次数加一.
     * 如果监听已关闭，直接返回.
     */
    if(Session.get('watching')){
        Session.set('shakesCount', Session.get('shakesCount') + 1);
    }else {
      return false;
    }
    // 如果正在发奖，直接返回
    if(Session.get('getPrize')) return;

    /**
     * 设置温度计高度
     * 获取当前高度 - 3，然后重新设置高度。
     * @param  {[type]} 'temperature' [description]
     * @return {number}               当前温度
     */
    function temperature(){
        var TH = Session.get('temperature') - 0.3;
            Session.set('temperature', TH);
        var THRem = TH + "rem";
        $('.temperature').css('height',THRem);
        console.log('TH', TH);
        return TH;
    }
    // 如果到达40度，发开始发奖
    if(temperature() <= 3.5){
      getPrize(Session.get('watching'));
      // shake.stopWatch();//停止监听摇晃
    }
    /**
     * 获取奖品
     * 设置获取奖品加载中状态
     * 拼接发送参数
     * 调用 shakeBbottle 接口
     * @return {[type]} [description]
     */
    function getPrize(start){
        Session.set('getPrize', true);
        var time = new Date().getTime() - start,
            post = {time: time, activity: Session.get('activeId')},
            sign = Sign.create(post);

        post.sign = sign;
        Meteor.call('shakeBbottle', post, function (error, result) {
            // 如果发生错误,显示错误信息
            if(error){
                console.error('shakeBbottle error', error);
                shareModal('<p>'+ error.reason +'</p>', true);
                return ;
            }
            console.log('result', result);
            // 显示奖品结果
            var user = Meteor.user(),
                nickname = user.profile.wechat.nickname, //昵称
                timeEnd = (time/1000).toFixed(2), // 摇晃时间
                prize = result.name; // 奖品名称
            // 显示奖品窗口
            $('#shake-result-modal .content').html('<p>恭喜您'+ nickname +'</p><p>本次摇奶瓶耗时为 '+ timeEnd +' 秒</p><p>得到'+ prize +'</p>');
            $("#shake-result-modal").css('display','block');
            setTimeout(function () {
                $("#shake-result-modal .center-square").removeClass("zoom");
            },10);

            // 重置所有状态，马上开始下一次摇奖
            initStates();

        });
    }

};
// onShake = _.debounce(function onShake() {
//     Session.set('shakesCount', Session.get('shakesCount') + 1);
// }, 750, true);  // fire the shake as soon as it occurs, but not again if less than 750ms have passed; 500 was too little

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
      onShake();
    },
    // 'click .animation-square': function () {
    //     if(Session.get('getPrize')) return;
    //     Session.set('shakesCount',Session.get('shakesCount')+1)
    //     Session.set('start', new Date().getTime());
    //     // $(".bottle").addClass("shake");
    //
    //     var TH = Session.get('temperature') - 0.1;
    //     Session.set('temperature', TH);
    //     var THRem = TH + "rem";
    //     $('.temperature').css('height',THRem);
    //     if(TH <= 3.5){
    //
    //         Session.set('getPrize', true);
    //         var time = new Date() - Session.get('start');
    //         Meteor.call('shakeBbottle', {time: time, activity: 'PqPbzWD3gzkDnC2tp'}, function (error, result) {
    //             var user = Meteor.user(),
    //                 nickname = user.profile.wechat.nickname, //昵称
    //                 timeEnd = (time/1000).toFixed(2), // 摇晃时间
    //                 prize = result.prizeName; // 奖品名称
    //
    //             $('#shake-result-modal .content').html('<p>恭喜您'+ nickname +'</p><p>本次摇奶瓶耗时为 '+ timeEnd +' 秒</p><p>得到'+ prize +'</p>');
    //             $("#shake-result-modal").css('display','block');
    //             setTimeout(function () {
    //                 $("#shake-result-modal .center-square").removeClass("zoom");
    //             },10);
    //
    //         });
    //         // $("#shake-result-modal").css('display','block');
    //         // setTimeout(function () {
    //         //     $("#shake-result-modal .center-square").removeClass("zoom");
    //         // },10);
    //     }
    //     // var TH = temperature - 1;
    //     // console.log('this.tem', temperature);
    //     // console.log('this', this);
    //     // this.temperature--;
    //     // var THRem = TH + "rem";
    //     // $(".temperature").css("height", THRem);
    // },
    /**
     * 点击'摇奖品'按钮后模拟摇奶瓶结果出现效果
     */
    'click #start': function () {
        console.log('tap #start');
        if(Session.get('unStart')){
          return shareModal('<p>活动未开始</p>', true);
        }else if(Session.get('isEndding')){
          return shareModal('<p>活动已结束</p>', true);
        }else if(Session.get('isNone') && Session.get('playCount') === 1){
          return shareModal('<p>您已参与过一次啦!</p><p>分享到朋友圈</p><p>可增加一次机会呦</p>');
        }else if(Session.get('isNone')){
          return shareModal('<p>您已玩过</p>', true);
        }

        // 正在摇奖中,或者发奖中
        if(Session.get('watching') || Session.get('getPrize')){
          return;
        }
        Session.set('watching', new Date().getTime());
        $("#start").css('pointer-events','none');
        if (Session.get('watching')){
            console.log("开始摇动");
            shake.startWatch(onShake, Session.get('sensitivity'));
        } else {
            console.log("停止摇动");
            shake.stopWatch();
        }
    },
    /**
     * 点击弹层周边空白区域关闭弹层
     */
    'click #close-share-modal-button': function () {
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
        shareModal('<p>您已参与过一次啦!</p><p>分享到朋友圈</p><p>可增加一次机会呦</p>');
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

/**
 * View 创建之后初始化 state 码
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
Template.shakeBottle.onCreated(function(){
  Session.set('activeId', this.data._id);
  Meteor.call('readActivity', this.data._id); // 统计阅读量
  Session.set('isNone', false); //设置没有玩过
  Session.set('playCount', 0); //玩过的次数为 0
  initStates(); //初始化摇奖状态
});

/**
 * 初始化摇奖状态
 * [resetStates description]
 */
function initStates(){
  console.log('initStates');
  Session.set('watching', false);
  Session.set('shakesCount', 0);
  Session.set('sensitivity', 10);
  Session.set('getPrize', false);
  Session.set('temperature', '8.3');
  // var THRem = TH + "rem";
  $('.temperature').css('height','8.3rem');
  $("#start").css('pointer-events','auto');
}

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
     * 是否已玩过
     * @return {[type]} [description]
     */
    isNone: function(){
          var user = Meteor.user(),
              share = user.profile && user.profile.share || 0,
              count = UserPrizesList.find({activeId: this._id}).count(),
              isNone = count >= (share + 1);
              Session.set('isNone', isNone);
              Session.set('playCount', count);
          return isNone;
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
    }else if(Session.get('isNone') && Session.get('playCount') === 1){
      // 已经玩过一次，还可以分享继续玩
      shareModal('<p>您已参与过一次啦!</p><p>分享到朋友圈</p><p>可增加一次机会呦</p>');
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
