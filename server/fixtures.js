// if (Activity.find().count() < 1) {
//     var now = new Date().getTime();
//     // 创建三个活动
//     var author = "Melse",
//         createAt = new Date().getTime(),
//         authorId = "KoAJbtddzzyKpZNaS",
//         userId = "KoAJbtddzzyKyuNaS"
//
//     Activity.insert({
//         author: author,
//         authorId: authorId,
//         createAt: createAt,
//         name: "史蒂夫管理费格式化了",
//         startAt: now,
//         endAt: now,
//         snsTitle: "微信分享标题",
//         snsDesc: "snsDescsnsDescsnsDesc",
//         content: "三打两建发空格都上课了风格和上课更合适了过户",
//         pageView: "2089"
//     });
//
// };
// console.log('PrizeList',PrizeList.find().count());
// if(UserPrizesList.find().count() < 1){
//     console.log('in');
//     UserPrizesList.insert({
//         prizeId: "uZT3LMqdR3hhqfkWx",
//         userId: "qrAXPSKo2MkqCq3YM",
//         activeId: "tzPyfCJm43aip8FJK",
//         getTime: new Date().getTime()
//     });
// }
//
// if(PrizeList.find().count() < 2){
//
//     var result = PrizeList.insert({
//         author: 'Smalin',
//         authorId: 'qrAXPSKo2MkqCq3YM',
//         createAt: new Date(),
//         activeId: 'tzPyfCJm43aip8FJK',
//         isTopPrize: false,
//         name: '测试奖品',
//         total: 400,
//         use: 0,
//         out: 0,
//         remain: 400,
//         probability: 100,
//         startAt: new Date('2016-3-1'),
//         endAt: new Date('2016-8-1')
//     });
//
//     console.log('result - ', result);
//
// }

// 创建一个活动，并添加活动所需的商品
if (Activity.find().count() < 1) {
    var startAt = new Date().getTime() - (1000 * 60 * 60 * 24);
    var endAt = new Date().getTime() + (1000 * 60 * 60 * 24);
    // 创建三个活动
    var author = "Melse",
        createAt = new Date().getTime(),
        authorId = "KoAJbtddzzyKpZNaS",
        userId = "KoAJbtddzzyKyuNaS"

    var activeId = Activity.insert({
        author: author,
        authorId: authorId,
        createAt: createAt,
        name: "史蒂夫管理费格式化了",
        startAt: startAt,
        endAt: endAt,
        snsTitle: "微信分享标题",
        snsDesc: "snsDescsnsDescsnsDesc",
        content: "三打两建发空格都上课了风格和上课更合适了过户",
        pageView: "2089"
    });

    for(var i = 0; i < 10; i ++){

        insert(i, activeId);
    }

    insert('几率20', activeId, 20);
    insert('几率10', activeId, 10);

    function insert(i, activeId, probability) {
        var data = {
            author: 'Smalin',
            authorId: 'qrAXPSKo2MkqCq3YM',
            createAt: new Date(),
            activeId: activeId,
            isTopPrize: false,
            name: '测试奖品' + i,
            total: 400,
            use: 0,
            out: 0,
            remain: 400,
            expiryDate: new Date('2016-8-1')
        };

        if(probability){
            data.probability = probability;
        }
        var result = PrizeList.insert(data);
    }

}