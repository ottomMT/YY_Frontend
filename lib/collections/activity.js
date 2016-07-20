Activity = new Mongo.Collection('activity');
Activity.attachSchema(new SimpleSchema({
    author: {
        type: String
    },
    authorId: {
        type: String
    },
    createAt: {
        type: Date
    },
    name: {
        type: String,
        label: "活动名称",
        max: 100
    },
    startAt: {
        type: Date,
        label: "活动开始时间",
        autoform: {
            afFieldInput: {
                type: "datetimepicker"
                // hidden: true
            }
        }
    },
    endAt: {
        type: Date,
        label: "活动结束时间",
        autoform: {
            afFieldInput: {
                type: "datetimepicker"
                // hidden: true
            }
        }
    },
    snsTitle: {
        type: String,
        label: "微信分享标题",
        min: 1
    },
    snsDesc: {
        type: String,
        label: "微信分享描述",
        min: 2
    },
    content:{
        type: String,
        label: "活动内容",
        // autoform: {
        //     type: "medium",
        //     mediumOptions: {
        //
        //     }
        // }
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor' // optional
                // settings: // summernote options goes here
            }
        }
    },
    use:{
        type: Number,
        label: "已兑换",
        optional: true
    },
    read:{
        type: Number,
        label: "阅读量",
        optional: true
    },
    out:{
        type: Number,
        label: "已发放",
        optional: true
    }
}));
