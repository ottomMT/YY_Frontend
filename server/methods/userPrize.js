/**
 * 用户摇奶瓶后发奖
 */
var maxNum = 2;
Meteor.methods({
    /**
     * 统计活动阅读量
     * @param  {string} activeId 活动ID
     * @return {number}          阅读数
     */
    readActivity: function(activeId){
      check(activeId, String);
      return Activity.update({_id: activeId}, {$inc: {read: 1}});
    },
    shakeBbottle: function (config) {
        console.log('config', config);
        if(!Sign.verify(config)){
            throw new Meteor.Error(406, '签名错误');
        }

        var user = Meteor.user();
        // console.log('user', user);

        /**
         * 验证用户权限,用户是否已登录
         */
        if(!user){
            throw new Meteor.Error(401, '您未登录,请登录后重试');
        }


        /**
         * 验证参数
         * 参数为 Object ,
         * time typeof Number
         * activity  typeof String
         */
        check(config, Object);
        check(config.time, Number); // 摇奶瓶时间
        check(config.activity, String); // 活动 ID

        /**
         * 验证活动是否进行中
         */
        var activity = Activity.findOne(config.activity);
        // console.log('activity', activity);
        if(!activity){
            throw new Meteor.Error(404, '该活动不存在');
        }

        checkTime(activity);
        /**
         * 验证活动是否为正在进行中
         * 如果当前时间大于开始时间,小于结束时间,则活动为进行中
         * 如果当前时间小于开始时间,则活动未开始
         * 如果当前时间大于结束弑师案,则活动已结束
         * @param activity
         * @returns {boolean}
         */
        function checkTime(activity){

                var start = activity.startAt ? new Date(activity.startAt) : false,
                    now = new Date(),
                    end = activity.endAt ? new Date(activity.endAt) : false;
                if(start && end){

                    if(now > start && now < end){
                        return true;
                    }else if(now < start){
                        throw new Meteor.Error(403, '活动未开始');
                    }else if(now > end){
                        throw new Meteor.Error(403, '活动已结束');
                    }else{
                        throw new Meteor.Error(403, '活动未开始或已结束');
                    }

                }else{
                    throw new Meteor.Error(403, '活动开始或结束时间未确定');
                }

        }

        /**
         * 验证用户是否还有摇奖机会
         * 取得用户该活动已获奖品的数量
         */
        var max = activity.max || maxNum;
        var userPrizesCount = UserPrizesList.find({userId: Meteor.userId(), activeId: config.activity}).count();
        console.log('userPrizesCount', userPrizesCount);
        if( userPrizesCount >= max || // 已使用次数大于最大可用次数
            (!user.profile.share && userPrizesCount) ||  // 没有分享过，但已经摇过一次
            (user.profile.share && (user.profile.share + 1 <= userPrizesCount) ) // 分享次数 + 1 大于等于最大可用次数
          ){
            throw new Meteor.Error(403, '您已没有机会');
        }
        console.log('Meteor.userId()', Meteor.userId());
        /**
         * 查询所有可用奖品
         * 剩余数量大于 0 的奖品
         */
        var remainPrizes = PrizeList.find({remain: {$gt: 0}, activeId: config.activity}).fetch();
        var prizeInfo = {};
        // console.log('remainPrizes', remainPrizes);


        /**
         * 奖品总数减1
         * 遍历所有的奖品,缓存奖品普通奖品,有「大」奖的奖品.
         * 如果包含有「大」奖的奖品,验证是否中奖.如果未中奖,发放普通奖品
         * 随机发放奖品
         */
        function send(prizes) {
            console.log('in send');
            var prizesBox = [],
                probabilityPrizes = [];
            /**
             * 编辑奖品,
             * 分别放入 普通奖品数组,有「大」奖品数组
             * 验证
             */
            _.forEach(prizes, function (item) {

                prizeInfo[item._id] = item;
                // 验证总量
                if(_.isNumber(item.total) && item.total > 0){
                    // 总量大于已发放量（还有剩余）或没有发放
                    if((_.isNumber(item.out) && item.out < item.total) ||
                        !item.out){
                        if(item.probability){
                            probabilityPrizes.push(item);
                        }else{
                            for(var i = 0, len = item.remain; i < len; i++){
                                prizesBox.push(item._id);
                            }
                        }
                    }

                }

            });

            /**
             * 计算是否中了「大」奖,如果中了,直接返回该奖品,如果未中,则继续发放普通奖品
             */
            var myPrice = bigPrize(probabilityPrizes); // 几率中奖结果
            if(myPrice) {
                return myPrice;
            }
            /**
             * 有「大」奖奖品数组非空
             * 编辑所有的奖品,计算
             */
            function bigPrize(probabilityPrizes){
                var num = Math.random(), myPrize = false;
                if(probabilityPrizes.length){

                    _.forEach(probabilityPrizes, function (item) {

                        if(!myPrize && _.isNumber(item.probability) && item.probability/100 > num){
                            myPrize = item._id;
                        }

                    });

                }
                return myPrize;
            }

            /**
             * 发放普通奖品
             * @param prizesBox
             * @returns {*}
             */
            function commonPrize(prizesBox) {
                var allPrizes = prizesBox.sort(function (a, b) {
                    return Math.random()>0.5 ? -1 : 1;
                });
                // console.log('allPrizes', allPrizes.length);
                return allPrizes[Math.ceil(Math.random()*allPrizes.length) - 1];
            }

            return commonPrize(prizesBox);

        }
        // console.time('in');
        var result = send(remainPrizes);
            // result = result[Math.ceil(Math.random()*result.length) - 1];
            // console.timeEnd('in');



        function insertUserPrize(prizeId, activeId) {
            var info = user.profile && user.profile.wechat || {};
            // 写入奖品发放总数
            return UserPrizesList.insert({
                prizeId: prizeId,
                userId: Meteor.userId(),
                activeId: activeId,
                prizeName: prizeInfo[prizeId].name,
                isTopPrize: false, // 非大奖
                use: false,
                time: config.time,
                user: info,
                nickname: info.nickname || '',
                sex: info.sex || 0,
                city: info.city || '',
                province: info.province || '',
                country: info.country || '',
                getTime: new Date().getTime()
            });
        }

        console.log('result', result);
        PrizeList.update({_id:result}, {$inc:{out:1, remain: -1}}); // 奖品发放数 加1，剩余数 减1
        Activity.update({_id: config.activity}, {$inc: {out: 1}}); // 活动总发放数 加1
        insertUserPrize(result, config.activity);
        return prizeInfo[result];

    },

    /**
     * 本周排名
     * @return {[type]} [description]
     */
    weekRank: function(query){
      var now = new Date(), // 当前时间
          days =  3600*1000*24, // 一天的毫秒数
          weekday = now.getDay(), // 当前周数
          time = new Date(moment(now).format('YYYY-MM-DD 00:00:00')).getTime() , // 今天 00:00 时间戳
          weekStart = time - ((weekday - 1) * days), // 开始时间 本周一 00:00
          weekEnd = time + ((7 - weekday) * days); // 结束时间 下周一 00:00
          // 查询大于本周开始，小于本周结束，的奖品。
          // 只取需要展示的字段「time,prizeName,nickname, getTime」
          return UserPrizesList.find({getTime:{$gt: weekStart, $lt: weekEnd},  activeId: query._id, isTopPrize:{$ne: true}}, {sort: {time:1}, limit: 6, fields: {prizeName: 1, getTime: 1, time: 1, nickname: 1}}).fetch();
    },
    /**
     * 上周排名
     * @return {[type]} [description]
     */
    lastWeekRank: function(query){
      var now = new Date(), // 当前时间
          days =  3600*1000*24, // 一天的毫秒数
          weekday = now.getDay(), // 当前周数
          time = new Date(moment(now).format('YYYY-MM-DD 00:00:00')).getTime() , // 今天 00:00 时间戳
          weekEnd = time - ((weekday - 1) * days), // 结束时间 本周一 00:00
          weekStart = weekEnd  -  (7 * days); // 开始时间 上周一 00:00
          // 查询上周一开始，周本一技术的奖品
          // 只取需要展示的字段「time,prizeName,nickname, getTime」
          return UserPrizesList.find({getTime:{$gt: weekStart, $lt: weekEnd}, activeId: query._id, isTopPrize:{$ne: true}}, {sort: {time:1}, limit: 3, fields: {prizeName: 1, getTime: 1, time: 1, nickname: 1}}).fetch();
    },

    /**
     * 分享次数加 1
     * @return {[type]} [description]
     */
    share: function(config){
      // 验证签名
      if(!Sign.verify(config)){
        throw new Meteor.Error(406, '签名错误');
      }

      var user = Meteor.user();

      // 验证是否登录
      if(!user){
        throw new Meteor.Error(401, '您未登录,请登录后重试');
      }

      // 验证校验密钥
      if(Share() !== config.share){
        throw new Meteor.Error(405, '密钥校验失败');
      }

      /**
       * 取得用户分享次数
       * 分享次数加1.
       * 如果加1后的数据大于最大分享限制，则设置分享次数为最大限制
       * @type {[type]}
       */
      var share = user.profile.share || 0;
          share++;
          share = share >= maxNum - 1 ? maxNum - 1 : share;
      return Meteor.users.update({_id: Meteor.userId()}, {$set:{'profile.share': share}});
    }
});
