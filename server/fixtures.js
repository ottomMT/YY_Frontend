if (UserPrizesList.find().count() < 5) {
    console.log("sdfgsdgsd");
    console.log(UserPrizesList.find().count());
    var now = new Date().getTime();
    // 创建三个活动
    var author = "Melse",
        createAt = new Date().getTime(),
        authorId = "KoAJbtddzzyKpZNaS",
        userId = "KoAJbtddzzyKyuNaS"

    Activity.insert({
        author: author,
        authorId: authorId,
        createAt: createAt,
        name: "史蒂夫管理费格式化了",
        startAt: now,
        endAt: now,
        snsTitle: "分享标题哦",
        snsDesc: "分享简介哦哦哦哦哦哦哦",
        content: "三打两建发空格都上课了风格和上课更合适了过户",
        pageView: "2089"
    });
    for(var i =0; i < 5; i++){
        PrizeList.insert({
            name: "港版强生婴儿牛奶沐浴露300ml"+i,
            author: "chengcheng",
            authorId: "o2NRxwTXeGDWCTvTooBRoNbe5nuw",
            createAt: now,
            activeId: "sdfgsdgfdsg",
            isTopPrize: false,
            probability: 1,
            total: 20,
            expiryDate:now
        });
    }
    for(var i =0; i<5; i++){
        UserPrizesList.insert({
            prizeId: "uZT3LMqdR3hhqfkWx",
            prizeName: "港版强生婴儿牛奶沐浴露300ml" + i,
            userId: "o2NRxwTXeGDWCTvTooBRoNbe5nuw",
            activeId: "RKqYgBmhJiGJovozD",
            use: false,
            verifyUserId: "uZT3LMqdR3hhqfkWx",
            verifyUserName: "melse",
            verifyTime: now,
            getTime: now
        });

    }
};
// if (MamaPas.find().count() < 4 ) {
//   var now = new Date().getTime();
//
//   // create two users
//   var tomId = Meteor.users.insert({
//     profile: { name: '小如' }
//   });
//   var tom = Meteor.users.findOne(tomId);
//   var sachaId = Meteor.users.insert({
//     profile: { name: '小楠' }
//   });
//   var sacha = Meteor.users.findOne(sachaId);
//
//   MamaPas.insert({
//     title: '「母婴派&美吉姆」海洋球派对 萌宝嗨起来',
//     authorId: sacha._id,
//     author: sacha.profile.name,
//     createAt: new Date(now - 27 * 3600 * 1000),
//     startAt: new Date(now - 30 * 3600 * 1000),
//     finishAt: new Date(now - 31 * 3600 * 1000),
//     signupAt: new Date(now - 29 * 3600 * 1000),
//     detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
//                 【宝贝年龄】6-30个月\
//                 【人数限定】35组，每组2人\
//                 【活动时间】5月29日 12:45-13:45',
//     videoUrl: ' ',
//     address: '北国商城负一层 共享大厅',
//     numLimit: 35,
//     signupFields: {
//       mamaName: true,
//       mamaTel: true,
//       mamaAddress: false,
//       babyName: true,
//       babyBirthday: true,
//       weixinGroup: true,
//       gestAge: false
//     },
//     reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
//     '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
//     '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
//     '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
//     '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
//     '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
//     '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
//     '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
//   });
//
//
//   MamaPas.insert({
//     title: '「生日PA·港炯」萌宝生日pa，一起庆祝吧~',
//     authorId: tom._id,
//     author: tom.profile.name,
//     createAt: new Date(now - 17 * 3600 * 1000),
//     startAt: new Date(now - 20 * 3600 * 1000),
//     finishAt: new Date(now - 21 * 3600 * 1000),
//     signupAt: new Date(now - 19 * 3600 * 1000),
//     detailText: '【活动内容】亲子游戏；生日成长录制；品尝港式美食\
//                   【宝贝年龄】1-3岁\
//                   【人数限定】6-8组家庭，宝妈陪宝到场即可；为确保萌宝生日精准度，请各位宝妈报名成功将宝宝出生证明拍照发于母婴派小奶瓶\
//                    【活动时间】5月20日11:00-12:30',
//     videoUrl: ' ',
//     address: '港炯餐厅 长安区乐汇城四楼',
//     numLimit: 35,
//     signupFields: {
//       mamaName: true,
//       mamaTel: true,
//       mamaAddress: false,
//       babyName: true,
//       babyBirthday: true,
//       weixinGroup: true,
//       gestAge: false
//     },
//     reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
//     '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
//     '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
//     '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
//     '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
//     '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
//     '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
//     '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
//   });
//
//   MamaPas.insert({
//     title: '「母婴派&美吉姆」海洋球派对 萌宝嗨起来',
//     authorId: sacha._id,
//     author: sacha.profile.name,
//     createAt: new Date(now - 37 * 3600 * 1000),
//     startAt: new Date(now - 40 * 3600 * 1000),
//     finishAt: new Date(now - 41 * 3600 * 1000),
//     signupAt: new Date(now - 39 * 3600 * 1000),
//     detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
//                 【宝贝年龄】6-30个月\
//                 【人数限定】35组，每组2人\
//                 【活动时间】5月29日 12:45-13:45',
//     videoUrl: ' ',
//     address: '北国商城负一层 共享大厅',
//     numLimit: 35,
//     signupFields: {
//       mamaName: true,
//       mamaTel: true,
//       mamaAddress: false,
//       babyName: true,
//       babyBirthday: true,
//       weixinGroup: true,
//       gestAge: false
//     },
//     reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
//     '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
//     '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
//     '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
//     '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
//     '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
//     '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
//     '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
//   });
//
//   // for (var i = 0; i < 20; i++) {
//   //   MamaPas.insert({
//   //     title: '【美吉姆早教】亲子乐翻天 雪橇接力赛',
//   //     authorId: tom._id,
//   //     author: tom.profile.name,
//   //     createAt: new Date(now - i * 7 * 3600 * 1000),
//   //     startAt: new Date(now - i * 10 * 3600 * 1000),
//   //     finishAt: new Date(now - i * 11 * 3600 * 1000),
//   //     signupAt: new Date(now - i * 9 * 3600 * 1000),
//   //     detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
//   //               【宝贝年龄】6-30个月\
//   //               【人数限定】35组，每组2人\
//   //               【活动时间】5月29日 12:45-13:45',
//   //     videoUrl: ' ',
//   //     address: '北国商城负一层 共享大厅',
//   //     numLimit: 35,
//   //     signupFields: {
//   //       mamaName: true,
//   //       mamaTel: true,
//   //       mamaAddress: false,
//   //       babyName: true,
//   //       babyBirthday: true,
//   //       weixinGroup: true,
//   //       gestAge: false
//   //     },
//   //     reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
//   //     '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
//   //     '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
//   //     '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
//   //     '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
//   //     '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
//   //     '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
//   //     '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
//   //   });
//   // }
// }
//
// if (Signups.find().count() === 0) {
//   // var now = new Date().getTime();
//
//   var ruId = Meteor.users.insert({
//     profile: { name: '小如如' }
//   });
//   var ru = Meteor.users.findOne(ruId);
//   var nanId = Meteor.users.insert({
//     profile: { name: '小楠楠' }
//   });
//   var nan = Meteor.users.findOne(nanId);
//
//   for (var a = 0; a < 12; a++) {
//     Signups.insert({
//       signedAt: new Date(),
//       mamaName: ru.profile.name,
//       mamaTel: '13555555555',
//       mamaId: ru._id,
//       babyName: ru.profile.name + '的宝宝',
//       babyBirthday: new Date(now - 3 * 365 * 24 * 3600 * 1000),
//       weixinGroup: 2,
//       mamapaId: 'pymfNmrSdnBDRDkfb'
//     });
//   }
//
//   for (var b = 0; b < 11; b++) {
//     Signups.insert({
//       signedAt: new Date(),
//       mamaName: nan.profile.name,
//       mamaTel: '13666666666',
//       mamaId: nan._id,
//       babyName: nan.profile.name + '的宝宝',
//       babyBirthday: new Date(now - 3 * 365 * 24 * 3600 * 1000),
//       weixinGroup: 2,
//       mamapaId: '4wtsJLPsuYED9RLHL'
//     });
//   }
// }
