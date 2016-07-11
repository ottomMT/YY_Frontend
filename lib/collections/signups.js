Signups = new Mongo.Collection('signups');
// console.log(this.params);
// console.log(this.getFieldValue(mamaName,"#afInsertSignups"));
// var xin = new simpleparser();
// Signups.signupVerify = new SimpleSchema({
//     signedAt: {
//         type: Date,
//         label: "报名时间"
//     },
//     mamaName: {
//         type: String,
//         label: "妈妈姓名",
//         optional: true,
//         // autoform: {
//         //   value: function() {
//         //     return Meteor.user().profile.nickname
//         //   }
//         // }
//     },
//     mamaId: {
//         type: String,
//         label: "妈妈Id",
//         // unique: true,
//         autoform: {
//             value: function() {
//                 return Meteor.user()._id
//             }
//         }
//     },
//     mamaTel: {
//         type: String,
//         label: "妈妈电话",
//         optional: true,
//         // unique: true,
//         min: 11,
//         max: 11
//     },
//     mamaAddress: {
//         type: String,
//         label: "家庭住址",
//         optional: true,
//         min: 2
//     },
//     babyName: {
//         type: String,
//         label: "宝宝姓名",
//         optional: true,
//         min: 2
//     },
//     babyBirthday: {
//         type: Date,
//         label: "宝宝生日",
//         optional: true,
//         autoform: {
//             afFieldInput: {
//                 type: "date"
//             }
//         }
//     },
//     pregnantWeek:{
//         type: String,
//         label: "怀孕几周",
//         optional: true,
//         autoform:{
//             afFieldInput: {
//                 type: "select",
//                 options: function () {
//                     var pregnantWeeks = [];
//                     for(i = 1; i < 45 ; i++){
//                         var weekValue = {label: i + "周", value: i};
//                         pregnantWeeks.push( weekValue );
//                     };
//                     return pregnantWeeks;
//                 }
//
//             }
//         }
//     },
//     weixinGroup: {
//         type: String,
//         label: "所在群",
//         optional: true,
//         autoform:{
//             afFieldInput: {
//                 type: "select",
//                 options: function () {
//                     var weixinGroups = [];
//                     for(i = 1; i <= 11 ; i++){
//                         var groupValue = {label: "孕" + i + "群", value: i};
//                         weixinGroups.push( groupValue );
//                     };
//                     return weixinGroups;
//                 }
//             }
//         }
//     },
//     mamapaId: {
//         type: String,
//         label: "参与活动Id"
//     }
// });

Signups.attachSchema(new SimpleSchema({
  signedAt: {
    type: Date,
    label: "报名时间"
  },
  mamaName: {
    type: String,
    label: "妈妈姓名",
    optional: true,
    // autoform: {
    //   value: function() {
    //     return Meteor.user().profile.nickname
    //   }
    // }
  },
  mamaId: {
    type: String,
    label: "妈妈Id",
    // unique: true,
    autoform: {
      value: function() {
        return Meteor.user()._id
      }
    }
  },
  mamaTel: {
    type: String,
    label: "妈妈电话",
    optional: true,
    // unique: true,
    min: 11,
    max: 11
  },
    mamaAddress: {
        type: String,
        label: "家庭住址",
        optional: true,
        min: 2
    },
  babyName: {
    type: String,
    label: "宝宝姓名",
    optional: true,
    min: 2
  },
  babyBirthday: {
    type: Date,
    label: "宝宝生日",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "date"
      }
    }
  },
  pregnantWeek:{
    type: String,
    label: "怀孕几周",
    optional: true,
    autoform:{
      afFieldInput: {
        type: "select",
        options: function () {
          var pregnantWeeks = [];
          for(i = 1; i < 45 ; i++){
            var weekValue = {label: i + "周", value: i};
            pregnantWeeks.push( weekValue );
          };
          return pregnantWeeks;
        }

      }
    }
  },
  weixinGroup: {
    type: String,
    label: "所在群",
    optional: true,
    autoform:{
      afFieldInput: {
        type: "select",
        options: function () {
          var weixinGroups = [];
          for(i = 1; i <= 11 ; i++){
            var groupValue = {label: "孕" + i + "群", value: i};
            weixinGroups.push( groupValue );
          };
          return weixinGroups;
        }
      }
    }
  },
  mamapaId: {
    type: String,
    label: "参与活动Id"
  }
}));


Meteor.methods({
  // postInsert: function (postAttributes) {
  //        var xin = new simpleparser();
  //           singups.attachsche(xin);
  // },
  cleanMamapaSignups: function (mamapaId) {
    check(this.userId, String);
    check(mamapaId, String);
    return Signups.remove({mamapaId: mamapaId});
  },
  deleteSignupItem: function(signupId) {
    check(this.userId, String);
    check(signupId, String);
    return Signups.remove(signupId);
  }
});
