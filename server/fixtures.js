if (MamaPas.find().count() < 4 ) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: '小如' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: '小楠' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  MamaPas.insert({
    title: '「母婴派&美吉姆」海洋球派对 萌宝嗨起来',
    authorId: sacha._id,
    author: sacha.profile.name,
    createAt: new Date(now - 27 * 3600 * 1000),
    startAt: new Date(now + 30 * 3600 * 1000),
    finishAt: new Date(now + 31 * 3600 * 1000),
    signupAt: new Date(now - 29 * 3600 * 1000),
    detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
                【宝贝年龄】6-30个月\
                【人数限定】35组，每组2人\
                【活动时间】5月29日 12:45-13:45',
    videoUrl: ' ',
    address: '北国商城负一层 共享大厅',
    headerImg: 'http://ac-mmitenrx.clouddn.com/b18e22c78c5b3aab1e17.jpg',
    numLimit: 35,
    contentImg: 'http://ac-mMItENRX.clouddn.com/be9757155d753e3bf910.jpg',
    signupFields: {
      mamaName: true,
      mamaTel: true,
      mamaAddress: false,
      babyName: true,
      babyBirthday: true,
      weixinGroup: true,
      gestAge: false,
      pregnantWeek: true
    },
    reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
    '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
    '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
    '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
    '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
    '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
    '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
    '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
  });


  MamaPas.insert({
    title: '「生日PA·港炯」萌宝生日pa，一起庆祝吧~',
    authorId: tom._id,
    author: tom.profile.name,
    createAt: new Date(now - 17 * 3600 * 1000),
    startAt: new Date(now - 20 * 3600 * 1000),
    finishAt: new Date(now - 21 * 3600 * 1000),
    signupAt: new Date(now - 19 * 3600 * 1000),
    detailText: '【活动内容】亲子游戏；生日成长录制；品尝港式美食\
                  【宝贝年龄】1-3岁\
                  【人数限定】6-8组家庭，宝妈陪宝到场即可；为确保萌宝生日精准度，请各位宝妈报名成功将宝宝出生证明拍照发于母婴派小奶瓶\
                   【活动时间】5月20日11:00-12:30',
    videoUrl: ' ',
    address: '港炯餐厅 长安区乐汇城四楼',
    headerImg: 'http://ac-mmitenrx.clouddn.com/b18e22c78c5b3aab1e17.jpg',
    numLimit: 35,
    contentImg: 'http://ac-mMItENRX.clouddn.com/be9757155d753e3bf910.jpg',
    signupFields: {
      mamaName: true,
      mamaTel: true,
      mamaAddress: false,
      babyName: true,
      babyBirthday: true,
      weixinGroup: true,
      gestAge: false,
      pregnantWeek: true
    },
    reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
    '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
    '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
    '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
    '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
    '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
    '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
    '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
  });

  MamaPas.insert({
    title: '「母婴派&美吉姆」海洋球派对 萌宝嗨起来',
    authorId: sacha._id,
    author: sacha.profile.name,
    createAt: new Date(now - 37 * 3600 * 1000),
    startAt: new Date(now - 40 * 3600 * 1000),
    finishAt: new Date(now - 41 * 3600 * 1000),
    signupAt: new Date(now - 39 * 3600 * 1000),
    detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
                【宝贝年龄】6-30个月\
                【人数限定】35组，每组2人\
                【活动时间】5月29日 12:45-13:45',
    videoUrl: ' ',
    address: '北国商城负一层 共享大厅',
    headerImg: 'http://ac-mmitenrx.clouddn.com/b18e22c78c5b3aab1e17.jpg',
    numLimit: 35,
    contentImg: 'http://ac-mMItENRX.clouddn.com/be9757155d753e3bf910.jpg',
    signupFields: {
      mamaName: true,
      mamaTel: true,
      mamaAddress: false,
      babyName: true,
      babyBirthday: true,
      weixinGroup: true,
      gestAge: false,
      pregnantWeek: true
    },
    reportDetail: '為英價面聽使。是兒好出生去他們行臺媽王檢們，示由藝主族有界變具總你千在今。' +
    '說一算；日裝功務目優重夠，願德式國為人例，當走民活際選全文，然展實票成分傳電老。時取先投現業' +
    '馬該訴部全對對高新感回人：們開看定因少青沒少場、我什只表我、時服你比情直關件：高不演適！口' +
    '對時之能。作來給自經跟不美著？向天們員到所兒步東像整的時處：是自因輕境我道時的治做較的人足' +
    '，化洋才了的古要：定車邊卻把？不時難錯產他一張女了也汽益。他優長接養影說我象國，長更問於走' +
    '我以公一則當員手分路並面印於完大金跑車華謝最起兒想到回。花思呢，關代連的禮高立為的、的院小全' +
    '後把加次是離滿度兒件。陽否歷口沒拿相的中由素女工要到國減、制沒體小山不資教李同，案了生往然' +
    '究，日再夫驗全國覺的富狀活文請著速會庭了這片制他難樣下義步會羅裡五倒續愛立。'
  });

  // for (var i = 0; i < 20; i++) {
  //   MamaPas.insert({
  //     title: '【美吉姆早教】亲子乐翻天 雪橇接力赛',
  //     authorId: tom._id,
  //     author: tom.profile.name,
  //     createAt: new Date(now - i * 7 * 3600 * 1000),
  //     startAt: new Date(now - i * 10 * 3600 * 1000),
  //     finishAt: new Date(now - i * 11 * 3600 * 1000),
  //     signupAt: new Date(now - i * 9 * 3600 * 1000),
  //     detailText: '【活动内容】超级蹦蹦床；海洋球大战；花式自拍；球池寻宝\
  //               【宝贝年龄】6-30个月\
  //               【人数限定】35组，每组2人\
  //               【活动时间】5月29日 12:45-13:45',
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
  // }
}

if (Signups.find().count() < 3) {
  var now = new Date().getTime();

  var ruId = Meteor.users.insert({
    profile: { name: '小如如' }
  });
  var ru = Meteor.users.findOne(ruId);
  var nanId = Meteor.users.insert({
    profile: { name: '小楠楠' }
  });
  var nan = Meteor.users.findOne(nanId);

  for (var a = 0; a < 1; a++) {
    Signups.insert({
      signedAt: new Date(),
      mamaName: ru.profile.name,
      mamaTel: '13555555555',
      mamaId: ru._id,
      pregnantWeek: 1,
      babyName: ru.profile.name + '的宝宝',
      babyBirthday: new Date(now - 3 * 365 * 24 * 3600 * 1000),
      weixinGroup: 2,
      mamapaId: 'JfMqxqSe5zwQKJevG'
    });
  }

  for (var b = 0; b < 1; b++) {
    Signups.insert({
      signedAt: new Date(),
      mamaName: nan.profile.name,
      mamaTel: '13666666666',
      mamaId: nan._id,
      pregnantWeek: 1,
      babyName: nan.profile.name + '的宝宝',
      babyBirthday: new Date(now - 3 * 365 * 24 * 3600 * 1000),
      weixinGroup: 2,
      mamapaId: 'JfMqxqSe5zwQKJevG'
    });
  }
}

console.log('less - now', Gifts.find().count())

// 奖品插入
if(Gifts.find().count() < 1){

    console.log('less')

    Gifts.insert({
        name: "正窑艺塾专业陶艺拉胚", //名称
        shop: '正窑艺塾', // 店铺
        type: '总计签到', //类型
        day: 14, //签到天数
        provide: 967, //已发送个数
        business: 'skdfks231LKfa',
        use: 17, // 已使用个数
        start: new Date('2016-04-30T16:00:00.000Z'), // 开始时间
        end: new Date('2016-07-30T16:00:00.000Z'), // 结束时间
        deadline: new Date('2016-08-31T15:59:00.000Z'), // 过期时间
        img: 'http://ac-mMItENRX.clouddn.com/55b8636acb21698779e4.png', //图片
        description: "<p class=\"p1\"><span class=\"s1\"><strong>正窑艺塾专业陶艺拉胚30分钟体验1次。</strong></span></p><p class=\"p1\"><span class=\"s1\"><strong><br/></strong></span></p><h3><span class=\"s1\"><strong>使用规则：</strong></span></h3><p class=\"p2\"><span class=\"s1\">1.每个宝宝当月仅限体验一次</span></p><p class=\"p2\"><span class=\"s1\">2.请提前3天时间预约体验</span></p><p class=\"p2\"><span class=\"s1\"><br/></span></p><p class=\"p2\"><span class=\"s1\"></span></p><h3><span class=\"s1\">正窑艺塾简介：</span></h3><p class=\"p1\"><span class=\"s1\">中国陶艺教育与体验连锁品牌，专注于艺术的私塾教育，致力于中国优秀文化的传承。</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/80e4d100f175f7c59713.jpg\" title=\"正窑1.jpg\" alt=\"正窑1.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\"><span class=\"s1\">自</span><span class=\"s2\">2008</span><span class=\"s1\">年创始以来，精心打造儿童陶艺体验。把孩子快乐玩泥的天性与教育相结合，寓教于乐，培养孩子们认识美、发现美、表现美、创造美得艺术素养，使孩子们从小养成艺术化生活的高贵品质。</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/72c25bbd38c82f2da2f5.jpg\" title=\"正窑2.jpg\" alt=\"正窑2.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/ba40ab13e767c75250e5.jpg\" title=\"正窑3.jpg\" alt=\"正窑3.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><h3>店面地址：</h3><p><br/></p><p class=\"p1\"><strong><span class=\"s1\">东胜店</span></strong></p><p class=\"p1\"><span class=\"s1\">电话：13393215702</span></p><p class=\"p1\"><span class=\"s1\">地址：长安区东胜广场</span><span class=\"s2\">3</span><span class=\"s1\">楼</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\"><strong><span class=\"s1\">北国店</span></strong></p><p class=\"p1\"><span class=\"s1\">电话：13373114217</span></p><p class=\"p1\"><span class=\"s1\">地址：长安区北国商城西扩</span><span class=\"s2\">6</span><span class=\"s1\">楼</span></p><p class=\"p1\"><br/></p><p class=\"p1\"><strong><span class=\"s1\">万达店</span></strong></p><p class=\"p1\"><span class=\"s1\">电话：15373988939</span></p><p class=\"p1\"><span class=\"s1\">地址：裕华区万达广场</span><span class=\"s2\">3</span><span class=\"s1\">楼</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\"><strong><span class=\"s1\">勒泰店</span></strong></p><p class=\"p1\"><span class=\"s1\">电话：13315161935</span></p><p class=\"p1\"><span class=\"s1\">地址：长安区勒泰中心</span><span class=\"s2\">3</span><span class=\"s1\">楼</span></p>"
    });

    Gifts.insert({
        name: "运动类专业体验活动虚拟券", //名称
        business: 'skdfks231LKfa',
        shop: '小小运动馆', // 店铺
        type: '总计签到', //类型
        day: 21, //签到天数
        provide: 536, //已发送个数
        use: 5, // 已使用个数
        start: new Date('2016-04-30T16:00:00.000Z'), // 开始时间
        end: new Date('2016-07-30T16:00:00.000Z'), // 结束时间
        deadline: new Date('2016-08-31T15:59:00.000Z'), // 过期时间
        img: 'http://ac-mMItENRX.clouddn.com/06fa6f1b2185e3b7ebda.png', //图片
        description: "<p class=\"p1\"><span class=\"s1\">运动类专业体验活动虚拟券（美式运动课程1节+空手道/艺术体操辅修课程1节）、宝宝吸汗巾一条</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><h3><span class=\"s1\">使用规则：</span></h3><p class=\"p1\"><span class=\"s1\">1.每个宝宝当月仅限体验一次</span></p><p class=\"p1\"><span class=\"s1\">2.请提前3天时间预约体验， 预约时间电话：0311-66506611/66506991</span></p><p class=\"p1\"><span class=\"s1\">3.体验时间：以电话预约时间为准</span></p><p><br/></p><h3>品牌简介：<br/></h3><p class=\"p1\"><span class=\"s1\">&quot;想象这样一个地方，孩子在这里体验魔幻般的童年，每个星期孩子都渴望回到这里。想象这样一个地方，孩子所体验到的一切都专为他们的认知、身体、情感和社交的发展而精心设计。想象这样一个地方，自信在孩子幼小的心灵发芽、成长和飞跃，在这里每个孩子都觉得自己是最棒的！这个地方是真实存在的，这就是—小小运动馆。</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/92aebbe6c92e3975e59f.jpg\" title=\"小小运动馆1.jpg\" alt=\"小小运动馆1.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/3d9da3d741557d99dfb7.jpg\" title=\"小小运动馆2.jpg\" alt=\"小小运动馆2.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/290533105c29ddaad466.jpg\" title=\"小小运动馆3.jpg\" alt=\"小小运动馆3.jpg\"/></span></p><p><br/></p><h3>地址：</h3><p class=\"p1\"><span class=\"s1\">裕华区怀特商业广场2楼</span></p>"
    });

    Gifts.insert({
        name: "婴幼儿游泳体验券", //名称
        shop: '33度婴幼儿游泳拓展训练馆', // 店铺
        business: 'skdfks231LKfa',
        type: '总计签到', //类型
        day: 7, //签到天数
        provide: 1469, //已发送个数
        use: 39, // 已使用个数
        start: new Date('2016-04-30T16:00:00.000Z'), // 开始时间
        end: new Date('2016-07-30T16:00:00.000Z'), // 结束时间
        deadline: new Date('2016-08-31T15:59:00.000Z'), // 过期时间
        img: 'http://ac-mMItENRX.clouddn.com/e12243bcc0b831b23b81.jpg', //图片
        description:  "<p><span class=\"s1\">价值198元婴幼儿游泳拓展训练一次</span></p><p><span class=\"s1\"><br/></span></p><h3>使用规则：</h3><p><span class=\"s1\">1.每个宝宝仅限体验一次</span></p><p><span class=\"s1\">2.请至少提前3天预约体验，预约时间：周三至周日</span></p><p><span class=\"s1\">&nbsp; &nbsp;预约电话: 0311-88990816/88990817</span></p><p><span class=\"s1\">3.体验时间：周三至周五9:00-17:00</span></p><p><span class=\"s1\">4.适合年龄：0-5岁宝宝</span></p><p><br/></p><h3>品牌简介：<br/></h3><p class=\"p1\"><span class=\"s1\">33</span><span class=\"s2\">度婴幼儿游泳拓展训练馆，首次制定了婴幼儿游泳的行业标准，主要针对</span><span class=\"s1\">0-6</span><span class=\"s2\">岁的婴幼儿，以健康体能训练为目标，制定了国家标准，填补了国内的空白。</span></p><p class=\"p1\"><span class=\"s2\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s2\"><img src=\"http://ac-mMItENRX.clouddn.com/4bbe9886426aaf820821.jpg\" title=\"33度1.jpg\" alt=\"33度1.jpg\"/></span></p><p class=\"p1\"><span class=\"s2\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s2\"><img src=\"http://ac-mMItENRX.clouddn.com/4d3df559d77d0935ae0f.jpg\" title=\"33度2.jpg\" alt=\"33度2.jpg\"/></span></p><p class=\"p1\"><span class=\"s2\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s2\"><img src=\"http://ac-mMItENRX.clouddn.com/28e264d1830df952b149.jpg\" title=\"33度3.jpg\" alt=\"33度3.jpg\"/></span></p><p class=\"p1\"><br/></p><h3><span class=\"s2\">店面地址：</span></h3><p><span class=\"s1\">裕华区谈固大街与槐安路交口大人物儿童社会1楼</span></p>"
    });

    Gifts.insert({
        name: "花途妈妈500元拍摄卡", //名称
        shop: '花途妈妈儿童摄影潮品馆', // 店铺
        business: 'skdfks231LKfa',
        type: '总计签到', //类型
        day: 30, //签到天数
        provide: 5, //已发送个数
        use: 0, // 已使用个数
        start: new Date('2016-04-30T16:00:00.000Z'), // 开始时间
        end: new Date('2016-07-30T16:00:00.000Z'), // 结束时间
        deadline: new Date('2016-08-31T15:59:00.000Z'), // 过期时间
        img: 'http://ac-mMItENRX.clouddn.com/588e020281391d0ba047.png', //图片
        description: "<p><span class=\"s1\">花途妈妈儿童摄影提供的价值500元拍摄卡一张，3套衣服，7x7册（5P10张），10寸桌摆一个。 &nbsp;</span></p><p class=\"p1\"><br/></p><p class=\"p1\" style=\"text-align: center;\"><img src=\"http://ac-mMItENRX.clouddn.com/9a73fab1488b72b20871.jpg\" title=\"mahuahua.jpg\" alt=\"mahuahua.jpg\"/></p><p class=\"p1\"><br/></p><h3><span class=\"s1\"><strong>使用说明：</strong></span></h3><p class=\"p1\"><span class=\"s1\">1.每个宝宝限使用一次</span></p><p class=\"p1\"><span class=\"s1\">2.拍摄时间周一至周四下午14:00-18:00</span></p><p class=\"p1\"><span class=\"s1\">3.请提前一个月预约拍摄时间，预约时间周一至周五<br> &nbsp&nbsp&nbsp预约电话:0311-80669340</span></p><p class=\"p1\"><span class=\"s1\">4.只限花途妈妈梦想家主题拍摄</span></p><p class=\"p1\"><span class=\"s1\">5.限0-10岁宝宝使用</span></p><p><br/></p><h3>品牌简介：</h3><p class=\"p1\"><span class=\"s1\">花途妈妈儿童摄影潮品馆于2015年7月26日正式营业。公司以“为顾客提供个性和体贴的专业服务”为宗旨，区别于其他儿童摄影，全程无任何隐性消费，在花途妈妈有着韩国同步的最新实景，360度无死角空间拍摄，不让家长错过小朋友每个瞬间。</span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><span class=\"s1\"><img src=\"http://ac-mMItENRX.clouddn.com/799c20b6f3a9f19d027e.jpg\" title=\"前台ok1.jpg\" alt=\"前台ok1.jpg\"/></span></p><p class=\"p1\"><span class=\"s1\"><br/></span></p><p class=\"p1\" style=\"text-align: center;\"><img src=\"http://ac-mMItENRX.clouddn.com/c2afc2a5f67519d2c80a.jpg\" title=\"工作台ok2.jpg\" alt=\"工作台ok2.jpg\"/></p><p class=\"p1\"><br/></p><p class=\"p1\" style=\"text-align: center;\"><img src=\"http://ac-mMItENRX.clouddn.com/1bc1c6846c5a6149e12d.jpg\" title=\"化妆台ok1.jpg\" alt=\"化妆台ok1.jpg\"/></p><p class=\"p1\"><br/></p><p class=\"p1\" style=\"text-align: center;\"><img src=\"http://ac-mMItENRX.clouddn.com/bdc99d115784ddee8857.jpg\" title=\"影棚环境-2.jpg\" alt=\"影棚环境-2.jpg\"/></p><p class=\"p1\"><br/></p><p class=\"p1\" style=\"text-align: center;\"><img src=\"http://ac-mMItENRX.clouddn.com/a3eec8e663edf51bcf17.jpg\" title=\"影棚环境-(9).jpg\" alt=\"影棚环境-(9).jpg\"/></p><p class=\"p1\"><br/></p><h3><span class=\"s1\">地址：</span></h3><p><span class=\"s1\">石家庄市裕华区裕华东路中鸿大厦5楼</span></p><p><br/></p>"
    });
}
