/**
 * Created by Administrator on 14-5-8.
 * 测试数据 在测试模式使用
 */
var mTestPlayerlist = [];

//
var initTestdataForManager = function(){
    initTestPlayer1();
    initTestRooms();
    initTestMsg();
    initTestFriend();
    initTestUserChat();
    initTestPay();
    initTestPrize();
    initTestPrizeChangeList();
    initTestProps();
    initTestUProps();
    initTestUprizes();
    initTestGGLRank();
    initTestMatch();
    initTestMatchRank();
    initTestOLPlayers();
    initTestUTask();
    initTestUTaskScoreWall();
    initTestMatchHisRank();

    initTestRank();

    initTestChatMsg();
    sGameData.mCanShowSignin = false;

    sGameData.mSysNoticemsg = getGameSysConfig("billboard")
}



var getTestPlayerById = function(idx){
    for(var i=0;i<mTestPlayerlist.length;i++){
        var player = mTestPlayerlist[i];
        if(player.id == idx){
            return player;
        }
    }
    return null;
}
var initTestPlayer1 = function(){
    log("initTestPlayer---"+sGameData.mIsTestNoNet);
    if(sGameData.mIsTestNoNet){
        //测试数据
        var player = {}
        player.id = 18556;
        player.userName = "abc";
        player.nickName = "阿斯顿发送到发送地方this is a test!";
        player.softCash = 888888;
        player.hardCash = 55555;
        player.ebankCash = 33555;
        player.moneyCash = 888;
        player.sex = 0;
        player.level = 9;
        player.xp = 58;
        player.gamecash = 400;
        player.chairId = -1;
        player.avatar = "f_1.png"
        player.signday = 1;
        player.score = 50;
        player.type = 0;
        player.alipay = "abced@163.com";
        //player.phone = "13899998888";
        sGameData.mUser = player;
        mTestPlayerlist.push(player);
    }
    for(var i=0;i<15;i++){
        var player = {}
        player.id = 1+i;
        var name="this t!p"+i+randomInt(10000);
        player.userName = name;
        player.nickName = name;
        player.softCash = 10000 + randomInt(10000);
        player.hardCash = 5000 + randomInt(10000);
        player.moneyCash = 15;
        player.sex = i%2;
        player.level = 10+i;
        player.gamecash = 100+ randomInt(10)*10;
        player.avatar = "f_"+(randomInt(4)+1)+".png"
        mTestPlayerlist.push(player);
    }
}

var initTestRooms=function(){



    for(var k =0;k<3;k++)
    {
        var room = {}
        room.roomId = 1+k
        room.roomName = "ddzroom"+k;
        room.gameId = GAME_TYPE_DDZ;
        room.ipAddress = "192.168.0.66";
        room.port = "8089";
        room.websocketPort = "8089";
        room.state = 1;
        room.onlineCount = 0;
        room.basicPoint = 10*(k+1);
        room.enterPoint = 1000*(k+1);

        sGameData.mRoomlist.push(room);

    }


    for(var k =0;k<6;k++)
    {
        var room = {}
        room.roomId = 31+k
        room.roomName = "zjhroom"+k;
        room.gameId = GAME_TYPE_ZJH;
        room.ipAddress = "192.168.0.66";
        room.port = "8089";
        room.websocketPort = "8089";
        room.state = 1;
        room.onlineCount = 0;
        room.basicPoint = 30;
        room.enterPoint = 1000;
        var tables = []
        for(var i=0;i<10;i++){
            var t = {}
            t.id = i+1+k*10;
            t.name = "zjh"+i;
            t.minBet = 5+i;
            t.enterPoint = 2000;
            t.endRound = 20
            t.chairCount = 5;
            t.tablePlayers = 0+i;
            if(i==0){
                sGameData.mCurrTable = t
            }
            t.chairdatas = [];
            for(var j=0;j<t.chairCount;j++){
                var cdata = {};
                cdata.chairId = j;
                cdata.playerFlag = j%2; //该椅子上是否有玩家，有玩家1，无玩家0, 有玩家下面字段有效
                if(cdata.playerFlag == 1){
                    cdata.playerId = j+1;
                    cdata.playerNickName = "aa"+i+j;
                    cdata.playerAvatar = "f_"+(randomInt(4)+1)+".png";
                }
                t.chairdatas[j] = cdata;
            }
            tables.push(t);
        }
        room.tables = tables
        sGameData.mRoomlist.push(room);
    }

    for(var k =0;k<5;k++)
    {
        var room = {}
        room.roomId = 41+k
        room.roomName = "dnroom"+k;
        room.gameId = GAME_TYPE_DN;
        room.ipAddress = "192.168.0.66";
        room.port = "8089";
        room.websocketPort = "8089";
        room.state = 1;
        room.onlineCount = 0;
        room.basicPoint = 30+k*10;
        room.enterPoint = 20000000;
        var tables = []
        for(var i=0;i<10+k;i++){
            var t = {}
            t.id = i+1+k*10;
            t.name = "dn"+k+i;
            t.minBet = 5+i+k*10;
            t.enterPoint = 2000000;
            t.chairCount = 5;
            t.tablePlayers = 0+i;
            if(i==0){
                sGameData.mCurrTable = t
            }
            t.chairdatas = [];
            for(var j=0;j<t.chairCount;j++){
                var cdata = {};
                cdata.chairId = j;
                cdata.playerFlag = randomInt(2); //该椅子上是否有玩家，有玩家1，无玩家0, 有玩家下面字段有效
                if(cdata.playerFlag == 1){
                    cdata.playerId = j+1;
                    cdata.playerNickName = "aa"+i+j;
                    cdata.playerAvatar = "f_"+(randomInt(4)+1)+".png";
                }
                t.chairdatas[j] = cdata;
            }
            tables.push(t);
        }
        room.tables = tables
        sGameData.mRoomlist.push(room);
    }




}

var initTestChatMsg = function(){
    var msgs = [];
    var t =""
    for(var i = 0;i< 10;i++){
        var cmsg = {}
        cmsg.chairId = randomInt(3);
        cmsg.fromId = i;
        cmsg.name = "player"+i;
        t = i+"it is a msg test ! "+t;
        cmsg.content = t
        cmsg.createTime = (new Date()).getTime();
        msgs.push(cmsg);
    }
    sGameData.mChatMsgList = msgs;
}

var initTestMsg = function(){
    var msgs = [];
    var t =""
    for(var i = 0;i< 10;i++){
        var cmsg = {}
        cmsg.id = i+1;
        cmsg.fromId = 0;//randomInt(5)
        cmsg.type = 0;
        t = i+"it is a msg testit is a msg testit is a msg test ! "+t;
        cmsg.content = t
        if(i%3==1){
            cmsg.kitdata = "1:1000"
        }else if(i%3==2){
            cmsg.kitdata = "1:1000;2:500"
        }
        cmsg.createTime = 1401040979425+100000*i
        msgs.push(cmsg);
    }
    sGameData.mMsgList = msgs;
}

var initTestUserChat = function(){
    var chats = [];
    var t =""
    for(var i = 0;i< 20;i++){
        var chat = {}  //msgId:sendUserId:receiveId:createTime:msg
        chat.id = i+1;
        chat.fromId = randomInt(5)
        t += "it is a chat test ! "+i;
        chat.toId = 1;
        chat.content = t
        chat.createTime =  1401040979425+100000*i
        chats.push(chat);
    }
    sGameData.mChatList = chats;
}

var initTestFriend = function(){
    var friends = []
    for(var i=0;i<10;i++){
        var friend = {};
        friend.id = i+1;
        friend.nickName = "faa"+i
        if(randomInt(2) ==0){
            friend.avatar = "f_"+(1+randomInt(4))+".png";
        }else{
            friend.avatar = "m_"+(1+randomInt(4))+".png";
        }
        friend.softCash = 1000*(i+1);
        friend.level = 5+i;
        friends.push(friend);
    }
    sGameData.mFriendList = friends
}
var initTestRank = function(){
    var ranks = []
    for(var i=0;i<15;i++){
        var rank = {};
        rank.rank = i+1;
        rank.nickName = "a"+i
        rank.score = 1000*i+10
        rank.level = i+10
        ranks.push(rank)
    }
    sGameData.mRankList = ranks;
}
var initTestPay = function(){
    var pays = []
    for(var i=0;i<6;i++){
        var pay = {};
        pay.id = i+1;
        pay.cash = 1000*(i+1);
        pay.agent = "apple";
        pay.price = 100*(i+1);
        pay.productId = "pay"+i;
        pay.displayName = pay.cash+sResWord.w_hardcash;
        pay.description = "";
        pay.priceUnit = "￥";
        pay.giftCash  = 100*(i+1);
        pays.push(pay)
    }
    for(var i=0;i<6;i++){
        var pay = {};
        pay.id = i+1;
        pay.cash = 1000*(i+1);
        pay.agent = "alipay";
        pay.price = 200*(i+1);
        pay.productId = "pay"+i;
        pay.displayName = pay.cash+sResWord.w_hardcash;
        pay.description = "";
        pay.priceUnit = "元";
        pay.giftCash  = 100*(i+1);
        pays.push(pay)
    }
    for(var i=0;i<6;i++){
        var pay = {};
        pay.id = i+1;
        pay.cash = 1000*(i+1);
        pay.agent = "wxpay";
        pay.price = 300*(i+1);
        pay.productId = "pay"+i;
        pay.displayName = pay.cash+sResWord.w_hardcash;
        pay.description = "";
        pay.priceUnit = "元";
        pay.giftCash  = 100*(i+1);
        pays.push(pay)
    }
    sGameData.mPayList = pays;
    //sGameData.mPayTypes=["apple","alipay","cmcc"];
    checkPayAllows();
}

var initTestPrize = function(){
    sGameData.mPrizeList = sGameData.mSys_Prizes;
    sGameData.mPrizeCanChangeList = getCanChangePrizes()

}

var initTestPrizeChangeList = function(){
    var logs = []
    for(var i=0;i<16;i++){
        var log = {};
        log.id = 1+i;
        log.goodsName = "移动"+10*(i+1)+"元充值卡";
        log.prizeId = 1+i;
        log.state = i%3;
        log.createTime = 1405010353289+i*10000;
        log.acceptInfo = "阿斯顿看见发生的";
        logs.push(log);
    }
    sGameData.mChangePrizeLogList = logs
}



var initTestProps = function(){
    sGameData.mPropsList = sGameData.mSys_Propses;
    sGameData.mSellPropsList = getSellProps();
}
var initTestUProps = function(){
    var uprops = []
    for(var i=0;i<16;i++){
        var aUProps = {}
        aUProps.id = 1+i;
        aUProps.propsId = 1+i%10;
        aUProps.remaincount = 1;
        aUProps.count = 1;
        aUProps.expireTime = 1;
        aUProps.validityEndTime  = 1;
        uprops.push(aUProps);
    }
    sGameData.mUserPropsList =uprops;
}
var initTestUprizes = function(){
    var uprize = []
    for(var i=0;i<16;i++){
        var aPrize = {}
        aPrize.id = 1+i;
        aPrize.prizeId = 1+i%5;
        aPrize.count = 1;
        aPrize.expireTime = 1;
        uprize.push(aPrize);
    }
    sGameData.mUserPrizeList =uprize;
}

var initTestGGLRank = function(){
    var ranks = []
    for(var i=0;i<16;i++){
        var aRank = {}
        aRank.rank = i+1;
        aRank.name = "abc"+i;
        aRank.count = (1+randomInt(5))*(1+randomInt(30))
        ranks.push(aRank)
    }
    sGameData.mGGLRankList = ranks
}

var initTestOLPlayers = function(){
    var olps = [];
    for(var i=0;i<10;i++){
        var p = getTestPlayerById(i+1);
        olps.push(p);
    }
    sGameData.mOLPlayers = olps;
}
var initTestMatchRank = function(){
    var datas = [];
    for(var i=0;i<20;i++){
        var data = {};
        data.uid = i+1;
        data.nickName = "abc"+i;
        data.playCount = 5;
        data.matchScore = 1000-i*10;
        data.rank = i+1;
        datas.push(data)
    }
    sGameData.mMatchRankList = datas
}

var initTestMatch = function(){


}


var initTestUTask = function(){
    var utasks = [];
    for(var i=0;i<11;i++){
        var utask = {}
        utask.img = "i_task_"+(i+1)+".png";
        utask.id =  1+i;
        utask.taskId = 1+i;
        utask.taskValue = 1;
        utask.state = 1

        utasks.push(utask)
    }
    var utasks1 = analyseUTasks(utasks)
    sGameData.mUserTasks = utasks1;
}

var initTestUTaskScoreWall = function(){
    var utasks = [];
    var ads = ["domob","youmi"]

    for(var i=0;i<11;i++){
        var utask = {}
        utask.name = "walltask"+i;
        utask.gold = 100+i*10;
        utask.adertype = ads[i%2];
        utask.state = i%2;
        utask.createTime = (new Date()).getTime()-5*60*60*1000 +i*60*60*1000;
        utask.getPrizeTime = (new Date()).getTime()+5*60*60*1000+i*60*60*1000;

        utasks.push(utask)
    }
    sGameData.mUserTasksForScoreWall = utasks;
}

var initTestMatchHisRank = function(){
    var rankds = [];
    for(var i=0;i<20;i++){
        var rankd = {}
        rankd.name = "每日赚元宝"+i;
        rankd.rank = randomInt(30)+1;
        rankd.score = 100*randomInt(100)+100
        rankd.createTime = (new Date()).getTime()-5*60*60*1000 +i*60*60*1000;
        rankds.push(rankd)
    }
    sGameData.mMatchHisRankList = rankds;

    var winners = [];
    for(var i=0;i<20;i++){
        var winner = {}
        winner.name = "每日赚元宝"+i;
        winner.rank = 1;
        winner.winnername = "abc"+i;
        winner.score = 100*randomInt(100)+100
        winner.createTime = (new Date()).getTime()-5*60*60*1000 +i*60*60*1000;
        winners.push(winner)
    }
    sGameData.mMatchHisWinnerList = winners;
}