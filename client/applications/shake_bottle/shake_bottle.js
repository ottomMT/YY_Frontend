Template.shakeBottle.events({
    'click .animation-square': function () {
        $(".bottle").addClass("shake");
        setTimeout(function () {
            $(".bottle").removeClass("shake");
        },1000);
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
    // 'click .center-square': function () {
    //     return false;
    // },
    // 'click .center-square': function () {
    //     return false;
    // }
});

// Template.shakeBottle.helpers({
//     temperature:function () {
//         return 8.3
//     }
// });