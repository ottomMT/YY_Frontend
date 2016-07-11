UserPrizesList = new Mongo.Collection('userPrizes');
// csv 列表导出
// Meteor.methods({
//     download: function(exportActive) {
//         var collection = UserPrizesList.find({activeId: exportActive}).fetch();
//         var heading = true; // Optional, defaults to true
//         var delimiter = ";" // Optional, defaults to ",";
//         return exportcsv.exportToCSV(collection, heading, delimiter);
//     }
// });
