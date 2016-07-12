PrizeList = new Mongo.Collection('prize');
PrizeList.attachSchema(new SimpleSchema({
    author: {
        type: String
    },
    authorId: {
        type: String
    },
    createAt: {
        type: Date
    },
    activeId: {
        type: String
    },
    isTopPrize: {
        type: Boolean,
        label: "是否为大奖"
    },
    name: {
        type: String,
        label: "奖品名称",
        max: 100
    },
    startAt: {
        optional: true,
        type: Date,
        label: "开始时间",
        autoform: {
            afFieldInput: {
                type: "datetimepicker"
                // hidden: true
            }
        }
    },
    endAt: {
        optional: true,
        type: Date,
        label: "结束时间",
        autoform: {
            afFieldInput: {
                type: "datetimepicker"
                // hidden: true
            }
        }
    },
    probability: {
        type: Number,
        label: "中奖几率",
        min: 0,
        max: 100,
        optional: true,
        decimal: true
    },
    total: {
        type: Number,
        label: "奖品总量",
        min:0,
        optional: true
    },
    use:{
        type: Number,
        label: "已兑换",
        optional: true
    },
    out:{
        type: Number,
        label: "已发放",
        optional: true
    },
    remain:{
        type: Number,
        label: "剩余量",
        optional: true
    },
    expiryDate:{
        type: Date,
        label: "过期时间",
        autoform: {
            afFieldInput: {
                type: "datetimepicker"
                // hidden: true
            }
        }
    }
}));

// ,
// use: {
//     type: Number,
//         label: "已兑换量"
// },
// out: {
//     type: Number,
//         label: "已发放量"
// },
// remain: {
//     type: Number,
//         label: "剩余量"
// }
Meteor.methods({
    delPrize: function (prizeId) {
        check(this.userId, String);
        check(prizeId, String);
        return PrizeList.remove({_id: prizeId});
    }
});
