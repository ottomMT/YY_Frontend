// var signupInsertHook = {
//   before:{
//     insert: function (doc) {
//       doc.signedAt = new Date();
//     }
//   },
//   after:{
//     insert: function (error, result) {
//       if(error){
//         console.log(error);
//       }else{
//         console.log(result);
//         // Router.go('mmp-details',{_id: result});
//       }
//     }
//   }
// }
//
// AutoForm.hooks({
//   "#afInsertSignups": signupInsertHook
// });

// var beforeInsertHook = {
//   before: {
//     insert: function (doc) {
//       doc.author = Meteor.user().profile.name;
//       doc.authorId = Meteor.user()._id;
//       doc.createAt = new Date();
//       Session.set('headerImg', doc.headerImg);
//       Session.set('contentImg', doc.contentImg);
//       return doc;
//     }
//   },
//   after: {
//     insert: function (error, result) {
//       if (error) {
//         console.log(error);
//       }else{
//         console.log(result);
//         var headerImgId = Session.get('headerImg');
//         var contentImgId = Session.get('contentImg');
//         Images.findOne(headerImgId).update({$set:{mamapaId: result}});
//         Images.findOne(contentImgId).update({$set:{mamapaId: result}});
//         Router.go('mamapaDetail', {_id: result});
//       }
//     },
//     update: function (error, result) {
//       if (error) {
//         console.log(error);
//       }else{
//         Router.go('mamapaDetail', {_id: this.docId});
//       }
//     }
//   }
// };
// AutoForm.addHooks('afInsertSignups', beforeInsertHook);
