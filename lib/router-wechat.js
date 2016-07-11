var beforeHook = function(pause){
    if (! Meteor.userId()) {
        if(WechatConfig.whiteList.indexOf(pause.url) < 0){
            var loginUrl = WechatConfig.url();
            Cookie.set('jump', pause.url);
            window.location = loginUrl;

        }else{
            this.next();
        }
        // Router.stop();
    }else{
        this.next();
    }
};

Router.onBeforeAction(beforeHook, {
  only:['shakeBottle', 'myPrizeList', 'rank' , 'rule']
});




//授权登录完成后回调
Router.route('/_weixin/callback', function () {
    var query = this.params.query;
    // 如果已登录
    if(Meteor.userId()){
        Router.go(Cookie.get('jump') || '/');
        return;
    }

    Meteor.call('wechatLoginWithAccessToken', query, function (error, result) {
      if(error){
        console.error('error', error);
        if(error.error === 401){
          Router.go('/focus');
        }
        return;
      }

        if(result){
            Meteor.loginWithToken(result.token, function (error, result) {
                if(!error){
                    var jump = Cookie.get('jump') || '/';
                    return Router.go(jump);
                }
            });
        }
    });
});
