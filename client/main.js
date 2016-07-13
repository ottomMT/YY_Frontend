Meteor.startup(function () {
    /**
     * 获取服务器时间,并把时间设置到 Session 中,每隔1秒更新一次
     */
    setInterval(function () {
        Meteor.call("getServerTime", function (error, result) {
            Session.set("time", result);
        });
    }, 1000);
});


