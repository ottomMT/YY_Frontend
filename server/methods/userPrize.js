/**
 * 用户摇奶瓶后发奖
 */

Meteor.methods({
    
    shakeBbottle: function (config) {
        console.log('config', config);
        var user = Meteor.user();

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
        var userPrizesCount = UserPrizesList.find({userId: Meteor.userId(), activeId: config.activity}).count();
        console.log('userPrizesCount', userPrizesCount);
        if(userPrizesCount >= activity.max || (user.share && user.share + userPrizesCount <= activity.max )){
            throw new Meteor.Error(403, '您已没有机会');
        }
        console.log('Meteor.userId()', Meteor.userId());
        /**
         * 查询所有可用奖品
         * 剩余数量大于 0 的奖品
         */
        var remainPrizes = PrizeList.find({remain: {$gt: 0}, activeId: config.activity}).fetch();
        // console.log('remainPrizes', remainPrizes);


        /**
         * 奖品总数减1
         * 遍历所有的奖品,缓存奖品普通奖品,有「大」奖的奖品.
         * 如果包含有「大」奖的奖品,验证是否中奖.如果未中奖,发放普通奖品
         * 随机发放奖品
         */
        function send(prizes) {
            var prizesBox = [],
                probabilityPrizes = [];
            /**
             * 编辑奖品,
             * 分别放入 普通奖品数组,有「大」奖品数组
             */
            _.forEach(prizes, function (item) {

                if(_.isNumber(item.remain)){

                    if(item.probability){
                        probabilityPrizes.push(item);
                    }else{
                        for(var i = 0, len = item.remain; i < len; i++){
                            prizesBox.push(item._id);
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
             * 有几率奖品数组非空
             * 编辑所有的奖品,计算
             */
            function bigPrize(probabilityPrizes) {
                var num = Math.random(), myPrize = false;
                if(probabilityPrizes.length){

                    _.forEach(probabilityPrizes, function (item) {

                        if(!myPrize && _.isNumber((item.probability)) && item.probability/100 > num){
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
                    return Math.random()>.5 ? -1 : 1;
                });
                return allPrizes[Math.ceil(Math.random()*allPrizes.length) - 1];
            }

            return commonPrize(prizesBox)

        }
        // console.time('in');
        var result = send(remainPrizes);
            // result = result[Math.ceil(Math.random()*result.length) - 1];
            // console.timeEnd('in');


        function insertUserPrize(prizeId, activeId) {
            return UserPrizesList.insert({
                prizeId: prizeId,
                userId: Meteor.userId(),
                activeId: activeId,
                use: false,
                time: config.time,
                getTime: new Date().getTime()
            });
        }


        PrizeList.update({_id:result}, {$inc:{out:1, remain: -1}});
        return insertUserPrize(result, config.activity);
        // return result;


        /**
         * 返回结果
         */

        return Meteor.user();
    }
    
});