// Router.configure({
//   layoutTemplate: 'layout',
//   loadingTemplate: 'loading'//,
//   // notFoundTemplate: 'notFound',
//   // waitOn: function() {
//   //   return Meteor.subscribe('notifications');
//   // }
// });
Router.configure({
    layoutTemplate: 'basicLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [
                    Meteor.subscribe('activity'),
                    Meteor.subscribe('userPrizes'),
                    Meteor.subscribe('images'),
                    Meteor.subscribe('prize'),
                    // Meteor.subscribe('sellers'),
                ];
    }
});
//
// AccountsTemplates.configure({
//   defaultLayout: 'basicLayout'
// });

Router.route('/', function () {
    this.redirect('/shake_bottle');
});

// 摇奶瓶
Router.route('/shake_bottle', {
    name: 'shakeBottle'
});

// 我的奖品
Router.route('/my_prize_list', {
    name: 'myPrizeList',
    data: function () {
        return UserPrizesList.find().fetch();
    }
});

// 排名
Router.route('/rank', {
    name: 'rank',
});

// 规则
Router.route('/rule', {
    name: 'rule',
});
// 关注页面
Router.route('/focus', {
    name: 'focus',
});
// Router.route('/mamapa', {
//   name: 'mamapa',
//   data: function () {
//     return {
//       mamapas: MamaPas.find({}, {sort: {createAt: -1, _id: -1}}),
//       signups: Signups.find()
//     }
//   }
// });
// Router.route('/mamapa/:_id', {
//   name: 'mamapaDetail',
//   data: function () {
//     return {
//       mamapas: MamaPas.find({}, {sort: {createAt: -1, _id: -1}}),
//       signups: Signups.find({mamapaId: this.params._id}),
//       mamapa: MamaPas.findOne(this.params._id)
//     }
//   }
// });

// // Router.route('/create/mamapa', {
// //   name: 'mamapaCreate',
// //   data: function () {
// //     return {
// //       mamapas: MamaPas.find({}, {sort: {createAt: -1, _id: -1}})
// //     }
// //   }
// // });
//
// Router.route('/edit/:_id', {
//   name: 'mamapaEdit',
//   data: function () {
//     return {
//       docToEdit: MamaPas.findOne(this.params._id),
//       mamapas: MamaPas.find({}, {sort: {createAt: -1, _id: -1}})
//     }
//   }
// });

// Router.route('/users', {
//   name: 'usersManage',
//   waitOn: function () {
//     return Meteor.subscribe('usersData')
//   },
//   data: function(){
//     return {usersList: Meteor.users.find()};
//   }
// });

// Router.route('/surveys', {
//   name: 'surveys'
// });

// Router.route('/activities', {
//   name: 'activities'
// });

// Router.route('/user-logout', {
//   name: 'userLogout',
//   onBeforeAction: function () {
//     return AccountsTemplates.logout();
//   }
// });

// Router.plugin('ensureSignedIn');
Router.onBeforeAction('dataNotFound');
