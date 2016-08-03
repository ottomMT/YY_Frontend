/**
 * 用户摇奶瓶后发奖
 */
var maxNum = 2;
var blackList = ['7eNAg648qKxt4qk4T', 't8u2Hx8LTc2WoTrSY', 'QQfJaP5sv8iARwbSD', 'MyateQZSMpQzBFPLn'];
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
        // console.log('config', config);
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
        check(config.time, Number);
        if(!_.isNumber(config.time) || parseInt(config.time) !== config.time || config.time < 1500){
          throw new Meteor.Error(401, '参数错误');
        }
        // }); // 摇奶瓶时间
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
        var userPrizesCount = UserPrizesList.find({userId: Meteor.userId(), activeId: config.activity, isTopPrize: {$ne: true}}).count();
        // console.log('userPrizesCount', userPrizesCount);
        if( userPrizesCount >= max || // 已使用次数大于最大可用次数
            (!user.profile.share && userPrizesCount) ||  // 没有分享过，但已经摇过一次
            (user.profile.share && (user.profile.share + 1 <= userPrizesCount) ) // 分享次数 + 1 大于等于最大可用次数
          ){
            throw new Meteor.Error(403, '您已没有机会');
        }
        // console.log('Meteor.userId()', Meteor.userId());
        /**
         * 查询所有可用奖品 (非大奖)
         * 剩余数量大于 0 的奖品
         */
        var remainPrizes = PrizeList.find({isTopPrize: {$ne: true}, activeId: config.activity}).fetch();
        var prizeInfo = {};
        // console.log('remainPrizes', remainPrizes);


        /**
         * 奖品总数减1
         * 遍历所有的奖品,缓存奖品普通奖品,有「大」奖的奖品.
         * 如果包含有「大」奖的奖品,验证是否中奖.如果未中奖,发放普通奖品
         * 随机发放奖品
         */
        function send(prizes) {
            // console.log('in send');
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
                            for(var i = 0, len = item.total - (item.out || 0); i < len; i++){
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
            console.log('prizesBox.length', prizesBox.length);
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

        // console.log('result', result);
        PrizeList.update({_id:result}, {$inc:{out:1, remain: -1}}); // 奖品发放数 加1，剩余数 减1
        Activity.update({_id: config.activity}, {$inc: {out: 1}}); // 活动总发放数 加1
        insertUserPrize(result, config.activity);
        return prizeInfo[result];

    },

    /**
     * 本周排名
     * 获取开始时间和结束时间
     * @return {[type]} [description]
     */
    weekRank: function(query){
        check(query, Object);
        check(query._id, String);
          var time = new Date().getTime();
              time = getTime(time);
              // 活动结束后，取消返回本周排名
              // if(time.week > 4){
              //   return true;
              // }
          // 查询大于本周开始，小于本周结束，的奖品。
          // 只取需要展示的字段「time,prizeName,nickname, getTime」
          var PrizesList = UserPrizesList.find({getTime:{$gt: time.start, $lt: time.end},  activeId: query._id, isTopPrize:{$ne: true}}, {sort: {time:1}, limit: 12, fields: {prizeName: 1, getTime: 1, userId: 1, time: 1, nickname: 1}}).fetch();
            var result = quchong(PrizesList);
                result.splice(6, 10);
            return result;
    },
    /**
     * 上周排名
     * 获取开始时间和结束时间
     * @return {[type]} [description]
     */
    lastWeekRank: function(query){
        check(query, Object);
        check(query._id, String);
          var time = new Date().getTime(),
              days = 3600*1000*24;
              time = getTime(time);
              // console.log('lastWeekRank time', time);
              // 第一周上周排名为空
              if(time.week === 1){
                return [];
              // 第二周取上周排名
              }else if(time.week === 2){
                time = getTime(new Date('2016-07-22 00:00:00').getTime());
              }else{
                // 上周开始等于本周结束时间，上周结束时间等于本周
                time.end = time.start;
                time.start = time.start - (days * 7);
              }

          // 查询上周一开始，周本一技术的奖品
          // 只取需要展示的字段「time,prizeName,nickname, getTime」
          // return
          var PrizesList = UserPrizesList.find({getTime:{$gt: time.start, $lt: time.end}, activeId: query._id, isTopPrize:{$ne: true}}, {sort: {time:1}, limit: 6, fields: {prizeName: 1, userId: 1, getTime: 1, time: 1, nickname: 1}}).fetch();
          var result = quchong(PrizesList);
              result.splice(3, 10);
          return result;
    },

    /**
     * 我的排名
     * 取得个人奖品列表
     * 查询比自己快的摇奖记录的个数
     */
    myRank: function(activeId){
      check(activeId, String);
      var user = Meteor.user();
      if(!user){
        throw new Meteor.Error(401, '您未登录');
      }

      // 查询摇奖获奖记录
      var myPrize = UserPrizesList.find({isTopPrize:{$ne: true}, userId: user._id, activeId: activeId}, {fields:{time: 1, getTime: 1, userId: 1}, sort:{getTime: 1}}).fetch(),
          newPrize = [];

          // console.log('myPrize', myPrize);
      if(myPrize && _.isArray(myPrize)){

          _.forEach(myPrize, function(item){
            if(_.isNumber(item.time)){
              var time = getTime(item.getTime);
              item.top = UserPrizesList.find({ getTime:{$gte: time.start, $lt: time.end}, time: {$lte: item.time}, activeId: activeId, isTopPrize:{$ne: true}}).count();
              // 前12名特殊处理
              if(item.top < 13){
                item.top = getTopTure(time, item.time, activeId);
              }
              item.week = time.week;
              newPrize.push(item);
            }

          });
      }

      /**
       * 获取最佳排名
       * @return {[type]} [description]
       */
      function getTopTure(time, myTime, activeId){
        var top12 = UserPrizesList.find({ getTime:{$gte: time.start, $lt: time.end}, time: {$lte: myTime}, activeId: activeId, isTopPrize:{$ne: true}}).fetch();
            top = quchong(top12, 'userId');
            return top.length;
      }
      // console.log('newPrize', newPrize);
      newPrize = quchong(newPrize, 'week');
      // console.log('newPrize --007', newPrize);
      return newPrize;

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

/**
 * 通过奖品获取时间，计算该奖品所在那一周。返回该周的开始时间和结束时间
 * @param  {[type]} myTime [description]
 * @return {[type]}        [description]
 */
function getTime(myTime){

      var firstWeek = new Date('2016-08-01 00:00:00'),
          startWeek = 31;
      var now = new Date(myTime), // 当前时间
          days =  3600*1000*24, // 一天的毫秒数
          weekday = now.getDay() || 7, // 当前周几 0 - 6
          time = new Date(moment(now).format('YYYY-MM-DD 00:00:00')).getTime() , // 今天 00:00 时间戳
          weekStart = time - ((weekday - 1) * days), // 开始时间 本周一 00:00
          weekEnd = weekStart + (7 * days); // 结束时间 下周一 00:00

      // 如果当前时间小于 第一次结束时间，
      // 则开始时间为当前7-19 ，解释时间为 8-1
      if(now < firstWeek){
        weekStart = new Date('2016-07-1 00:00:00').getTime();
        weekEnd = firstWeek.getTime();
      }

      // 结束时间
      var endTime = new Date(weekEnd);
      // 返回结果
      return {
        start: weekStart,
        end: weekEnd,
        week: endTime > firstWeek ? Math.ceil((endTime.getTime() - firstWeek.getTime()) /days/7) + 1 : 1
      };
}


/**
 * 去除重复的 用户ID
 * @return {[type]} [description]
 */
function quchong(list, field, isSendPrize){

    field = _.isString(field) ? field : 'userId';
    if(!_.isArray(list)){
      return [];
    }

    // 取出排重后的ID 为 key 的对象
    var keys = {},
        newList = [];
    _.forEach(list, function(item){
      if(_.isNumber(item.time) && item.time && item[field]){

        // 如果有该用户
        /**
         * 如果有该用户
         * 验证当前时间你是否小于已记录时间
         * 如果大于当前时间 ，则重新设置当前记录值
         * @param  {[type]} keys[item._id] [description]
         * @return {[type]}                [description]
         */
        if(keys[item[field]]){

            if(keys[item[field]].time > item.time){
              keys[item[field]].time = item.time;
              keys[item[field]].id = item._id;
            }

        }else{
        // 不存在该用户,直接设置
          keys[item[field]] = {id: item._id, time: item.time};
        }

      }
    });

    _.forEach(list, function(item){

      if(item.userId && blackList.indexOf(item.userId) > -1){
        return;
      }

      if(keys[item[field]] && keys[item[field]].id === item._id){
        if(!isSendPrize){
          delete item.userId; //删除列表中的userId
          delete item.prizeName;// 删除列表中的奖品名称
          delete item.getTime; //删除列表的获取时间
        }
        newList.push(item);
      }

    });
    // console.log('keys', field, 'field', keys);
    // var result = newList.sort(function(a,b){return a.time > b.time;});
    return _.sortBy(newList, 'time');

}

SyncedCron.add({
  name: 'sendBigPrize',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.cron('1 0 1-31 7-8 *');
  },
  job: function() {
      var now = new Date();
      if(now.getDay() !== 1){
        return;
      }
    console.log('day', new Date().getDay());
    console.log('执行任务');


    // 查询所有活动
    var activity = Activity.find().fetch(),
        readyActivity = [];

    /**
     * 取得可以发奖的奖品
     * 验证活动开始时间结束时间
     * 取出已经开始，并且结束时间在一周之内的活动
     * @param  {[type]} activity      [description]
     * @param  {[type]} function(item [description]
     * @return {[type]}               [description]
     */
    _.forEach(activity, function(item){
      var startAt = item.startAt && new Date(item.startAt) || false,
          endAt =  item.endAt && new Date(item.endAt) || false;

          if(startAt && endAt){
            // 活动一开始
            if(now > startAt){

              // 活动结束一周之内
              if(now < endAt || now.getTime() - endAt.getTime() < (1000*3600*24*8)){
                readyActivity.push(item);
              }

            }

          }

    });

    console.log('readyActivity', readyActivity);
    // 遍历所有活动，
    _.forEach(readyActivity, function(item){
      // 取得活动上周排名
      var top3 = getLastWeekRank(item._id);
      console.log('top3', top3);

      // 取得剩余大奖
      var topPrizes = getTopPrizes(item._id);
      console.log('topPrizes', topPrizes);

      var send = sendPrizes(top3, topPrizes);
      console.log('sendPrizes', send);

    });

    function sendPrizes(top, prizes){
      var send = [];
      _.forEach(top, function(item, index){
        var myBigPrize,
            myPrize = prizes[index];
        // 存在该奖品
        if(myPrize){
          myBigPrizes = item;
          myBigPrizes.prizeName = myPrize.name || ''; //设置奖品名称
          myBigPrizes.prizeId = myPrize._id || ''; // 奖品ID
          myBigPrizes.isTopPrize = true; //奖品为大奖
          myBigPrizes.defaultId = item._id; //记录ID
          myBigPrizes.getTime = new Date().getTime(); // 获取奖品时间
          delete myBigPrizes._id; //删除

          PrizeList.update({_id: myPrize._id}, {$inc:{out: 1}}); //奖品发放量 +1
          Activity.update({_id: item.activeId}, {$inc:{out: 1}}); // 活动发放量 +1
          send.push(myBigPrizes);
          UserPrizesList.insert(myBigPrizes); // 写入奖品

        }

      });

      return send;
    }

    // 取得该活动上周排名
    function getLastWeekRank(activeId){
        var time = new Date().getTime(),
            days = 3600*1000*24;
            time = getTime(time);
            // 第一周上周排名为空
            if(time.week === 1){
              return [];
            // 第二周取上周排名
            }else if(time.week === 2){
              time = getTime(new Date('2016-07-22 00:00:00').getTime());
            }else{
              // 上周开始等于本周结束时间，上周结束时间等于本周
              time.end = time.start;
              time.start = time.start - (days * 7);
            }

        // 发放大奖需要用户 ID 
        var PrizesList = UserPrizesList.find({getTime:{$gt: time.start, $lt: time.end}, activeId: activeId, isTopPrize:{$ne: true}}, {sort: {time:1}, limit: 6, fields: {userId: 1, time: 1, activeId: 1, nickname: 1, user: 1}}).fetch();
        var result = quchong(PrizesList, false, true);
            result.splice(3, 10);
        return result;
    }


    // 取得剩余的大奖
    function getTopPrizes(activeId){

      var prizes = PrizeList.find({isTopPrize: true, activeId: activeId}).fetch(),
          remainPrizes = [];

      _.forEach(prizes, function(item){

        if(_.isNumber(item.total) && item.total){

          // 未发过奖品，或者总量大于已发放量
          if(!item.out || (_.isNumber(item.out) && item.out < item.total)){
            for(var i = 0, len =  item.total - (item.out || 0) ; i < len; i++){
              remainPrizes.push(item);
            }
          }

        }

      });

      // 随机排序所有大奖
      var allPrizes = remainPrizes.sort(function (a, b) {
          return Math.random()>0.5 ? -1 : 1;
      });
      allPrizes.splice(3, 1000);
      return allPrizes;
    }
    // var numbersCrunched = CrushSomeNumbers();
    // return numbersCrunched;
  }
});

SyncedCron.start();
