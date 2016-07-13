Template.shakeBottle.events({
    'click .animation-square': function () {
        if(Session.get('getPrize')) return;
        Session.set('start', new Date().getTime());
        $(".bottle").addClass("shake");
        setTimeout(function () {
            $(".bottle").removeClass("shake");
        },800);

        var TH = Session.get('temperature') - 0.1;
        Session.set('temperature', TH);
        var THRem = TH + "rem";
        $('.temperature').css('height',THRem);
        if(TH <= 3.5){

            Session.set('getPrize', true);
            var time = new Date() - Session.get('start');
            Meteor.call('shakeBbottle', {time: time, activity: 'PqPbzWD3gzkDnC2tp'}, function (error, result) {
                var user = Meteor.user(),
                    nickname = user.profile.wechat.nickname, //昵称
                    timeEnd = (time/1000).toFixed(2), // 摇晃时间
                    prize = result.prizeName; // 奖品名称

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
    'click #start': function () {
        $("#shake-result-modal").css('display','block');
        setTimeout(function () {
            $("#shake-result-modal .center-square").removeClass("zoom");
        },10);
    },
    'click .modal': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
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

Template.shakeBottle.helpers({
    temperature:function () {
        Session.set('temperature', '8.3');
    }
});