/**
 * 微信分享配置文件
 * @type {Object}
 */
WechatShare = {
  /**
   * 注册分享事件
   * @param  {string} title  分享标题
   * @param  {string} desc   分享描述
   * @param  {string} link   分享链接
   * @param  {string} imgUrl 分享图片
   */
  regSNS: function(snsConfig){
        var title = snsConfig.title;
        var desc = snsConfig.desc;
        var link = snsConfig.link;
        var imgUrl = snsConfig.imgUrl;
        // 配置
        var config = {};
        // 标题
        if(title){
          config.title = title;
        }

        // 描述
        if(desc){
          config.desc = desc;
        }

        // 链接
        if(link){
          config.link = link;
        }

        if(imgUrl){
          config.imgUrl = imgUrl;
        }

        config.success = typeof(snsConfig.success) === 'function' ? snsConfig.success : function(){
    					console.log('分享成功');
        };

        config.cancel = typeof(snsConfig.cancel) === 'function' ? snsConfig.cancel : function(){
    					console.error('分享失败');
        };

        var defaultConfig = {
          imgUrl: config.imgUrl,
          link: config.link,
          desc: config.desc,
          title: config.title,
          cancel: config.cancel
        };

        // 注册分享接口
        if(window && window.wx){
      		// 显示分享
      		//分享到朋友圈
      		wx.onMenuShareTimeline(config);
      		// 分享给朋友
      		wx.onMenuShareAppMessage(defaultConfig);
      		// 分享到 QQ
      		wx.onMenuShareQQ(defaultConfig);
      		// 分享到 微博
      		wx.onMenuShareWeibo(defaultConfig);
      		// 分享到 QQ 空间
      		wx.onMenuShareQZone(defaultConfig);
        }
  },
  /**
   * 我的奖品列表分享配置
   * 设置 Session shareConfig 为预设好的配置
   * 执行预注册事件
   */
  myPrizeListConfig: function(){
    var config = {
      title: '喜月媛育 全民摇奖品',
      desc: '我获得媛育国际母婴健康管理中心提供的奖品啦！邀请你的小伙伴一起摇奖品吧！',
      link: window.location.href,
      imgUrl: 'http://ac-mmitenrx.clouddn.com/788e503c71d39982.jpg'
    };
    Session.set('shareConfig', config);
    this.registerSNS();
  },
  /**
   * 排名列表分享配置
   * 设置 Session shareConfig 为预设好的配置
   * 执行预注册事件
   */
  rankConfig: function(){
    var config = {
      title: '喜月媛育 全民摇奖品',
      desc: '奶瓶摇奖品，每周前三可获得千元婴儿车噢~考验亲臂力的时刻到啦！',
      link: window.location.href,
      imgUrl: 'http://ac-mmitenrx.clouddn.com/788e503c71d39982.jpg'
    };
    Session.set('shareConfig', config);
    this.registerSNS();
  },
  /**
   * 摇奖品分享配置
   * 设置 Session shareConfig 为预设好的配置
   * 执行预注册事件
   */
  shakeBottleConfig: function(){
    var config = {
        name: 'shakeBottleConfig',
        title: '喜月媛育 全民摇奖品',
        desc: '将奶瓶中100°的奶，摇至到适合宝宝喝的40°，就可获得奖品啦！100%中奖噢！',
        link: window.location.href,
        imgUrl: 'http://ac-mmitenrx.clouddn.com/788e503c71d39982.jpg'
    };

    Session.set('shareConfig', config);
    this.registerSNS();
  },
  /**
   * 预注册分享事件
   *  wx 微信配置加载成功 并且 微信分享配置成功后，注册微信分享
   *  如果页面为要奖品页面，则同时设置分享成功后回调函数
   * @return {[type]} [description]
   */
  registerSNS: function(){
    var shareConfig = Session.get('shareConfig');
    if(Session.get('wx') && Session.get('shareConfig')){
      if(shareConfig.name === 'shakeBottleConfig'){
        shareConfig.success = this.shareSuccess;
      }
      return this.regSNS(shareConfig);
    }
  },
  /**
   * 分享成功后回调
   * 调用分享次数 加 1 接口
   * @return {[type]} [description]
   */
  shareSuccess: function(){
        var params = {share:Share()};
            params.sign = Sign.create(params);
        // 分享成功后,
        Meteor.call('share', params, function(error, result){
          if(error){
            console.error('微信分享失败', error);
          }else{
              // 隐藏提示窗口
              $(".modal .center-square").addClass("zoom");
              setTimeout(function () {
                  $(".modal").css('display','none');
              },200);
            console.log('result', result);
          }
        });
  }
};
