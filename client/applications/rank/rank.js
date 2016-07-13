Template.rank.events({
    'click #my-rank-button': function () {
        $("#my-rank-modal").css('display','block');
        setTimeout(function () {
            $("#my-rank-modal .center-square").removeClass("zoom");
        },10);
    },
    'click #close-modal-button': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        return false;
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
    'click .modal': function () {
        $(".modal .center-square").addClass("zoom");
        setTimeout(function () {
            $(".modal").css('display','none');
        },200);
        // $(".modal").css('display','none').find(".center-square").addClass("zoom");
    },
    'click .center-square': function () {
        return false;
    }
});

Template.rank.onRendered(function () {
    $("body").css({"backgroundImage": "url('/img/bg.jpg')","backgroundSize": "cover","backgroundRepeat": "no-repeat"});
});
