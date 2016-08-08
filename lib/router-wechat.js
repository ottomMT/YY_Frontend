var clientBeforeHook = function(pause){
      console.log('in beforeHook', pause);
  if(!Meteor.userId()){
    Cookie.set('jump', pause.url);
    var loginUrl = WechatConfig.url();
    window.location.replace(loginUrl);
  }else{
    this.next();
  }
};

var serverHook = function(){
  var req = this.request,
      res = this.response,
      url = req.originalUrl;
  if(!this.userId){
    var loginUrl = WechatConfig.url(url);
    if(url.indexOf('/activity') === 0 || url.indexOf('/my_prize_list') === 0){
      res.writeHead(302, {'Location': loginUrl});
      res.end();
    }else{
      this.next();
    }
  }else{
    this.next();
  }
};

Router.onBeforeAction(clientBeforeHook, {
  only:['shakeBottle', 'myPrizeList', 'rank' , 'rule'],
});




/**
 * 登录授权
 * @param  {[type]} '/login'      [description]
 * @param  {[type]} function(req, res           [description]
 * @return {[type]}               [description]
 */
// Router.route('/:_id', serverHook, {where: 'server'});
// Router.route('/activity/:_id', serverHook, {where: 'server'});
// Router.route('/activity/:_id/:action', serverHook, {where: 'server'});


//授权登录完成后回调
Router.route('/_weixin/callback', function () {
    var query = this.params.query;
    // 如果已登录
    if(Meteor.userId()){
        Router.go(query.state || '/');
        return;
    }

    Meteor.call('wechatLoginWithAccessToken', query, function (error, result) {
      if(error){
        console.error('error', error);
        if(error.error === 401){
          Router.go('/focus');
        }else{
          return Router.go(Cookie.get('jump'));
        }
        // return;
      }

        if(result){
            Meteor.loginWithToken(result.token, function (error, result) {
                if(!error){
                    var jump = Cookie.get('jump') || '/';
                    console.log('jump', jump);
                    // if(query.state && query.state.indexOf(WechatConfig.host) === 0){
                    //   jump = query.state.replace(WechatConfig.host, '');
                    // }
                    return Router.go(jump);
                }
            });
        }
    });
});
