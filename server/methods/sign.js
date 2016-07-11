/**
 * 签到
 */
Meteor.methods({
    sign: function () {

        var profile = Meteor.user().profile,
            now = moment(),
            result = {gifts: []},
            signList = profile.signList, // 已签到天数
            signMonth = profile.signMonth, // 签到月份
            preLength = signList && parseInt(signList.length) || 0; // 已签到天数

        /**
         * 上一次签到是否为本月签到
         * 如果是本月签到,则更新签到数据
         * 如果非本月签到,或者签到记录非数组类型,则重置签到
         */
        if(now.format('YYYY-MM') !== signMonth || !_.isArray(signList)){
            setSign();
        }else{
            updateSign();
        }

        /**
         * 更新本月签到记录
         * 本月已签到过,继续签到.
         */
        function updateSign() {
            //写入当天的签到记录,当月签到记录
            result.sign =  Meteor.users.update(Meteor.userId(), {
                $addToSet: {
                    'profile.signList': moment().format('YYYY-MM-DD')
                }
            }, {
                $set: {
                    'profile.signMonth': moment().format('YYYY-MM')
                }
            });
        }

        /**
         * 设置第一次签到
         * 如果用户为该月份第一次签到,或者用户从来没有签到
         */
        function setSign() {
            //写入当天的签到记录,当月签到记录
            result.sign = Meteor.users.update(Meteor.userId(), {
                $set: {
                    'profile.signList':[moment().format('YYYY-MM-DD')],
                    'profile.signMonth': moment().format('YYYY-MM')
                }
            });
        }

        /**
         * 更新用户总计签到次数
         * @type {*|number}
         */
        var signLength = Meteor.user().profile.signList && Meteor.user().profile.signList.length || 0;
        // 记录总签到天数
        Meteor.users.update(Meteor.userId(), {$set: {'profile.signLength':signLength}});

        /**
         * 该用户签到成功
         * 验证是否为新添加的签到记录
         * 如果是新添加的签到记录,查询是否有可用于发放的奖品
         * 如果有,则给用户发放该奖品
         */
        if(signLength > preLength){

            var gifts = Gifts.find({end: {$gt: new Date()}, day: signLength}).fetch();

            _.forEach(gifts, function (item) {
                result.gifts.push(Coupons.insert({
                    user: Meteor.userId(),
                    gift: item._id,
                    business: item.business,
                    createAt: new Date()
                }));

            });

            // 没有发放奖品，增加积分
            if(!result.gifts.length){
              Meteor.users.update(Meteor.userId(), {$inc: {'profile.credit':10}});
            }


        }

        return result;

    },
    /**
     * 清空用户上月数据
     * @return {[type]} [description]
     */
    clearSign: function(){

      var profile = Meteor.user().profile,
          now = moment(),
          signMonth = profile.signMonth; // 签到月份

          if(signMonth !== moment().format('YYYY-MM')){
            return Meteor.users.update(Meteor.userId(), {$set: {'profile.signList':[]}});
          }else{
            return true;
          }
    }
});
