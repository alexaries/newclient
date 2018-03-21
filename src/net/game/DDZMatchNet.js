/**
 * Created by apple on 14-9-1.
 */
var T_DDZMATCH_COMMAND = 0x00080000;//斗地主指令类型 ---放到gamedef

//斗地主 比赛

//报名参加比赛（人满开赛使用） --定时开赛 也使用
var C_DDZMATCH_SIGNUP = 0x00080003;
var S_DDZMATCH_SIGNUP = 0x00080004;
//取消 报名 （人满开赛使用） --定时开赛 也使用
var C_DDZMATCH_CANCEL_SIGNUP = 0x00080005;
var S_DDZMATCH_CANCEL_SIGNUP = 0x00080006;

// 报名情况通知
var S_DDZMATCH_SIGNUP_NOTIFY = 0x00080007;

//申请退赛
var C_DDZMATCH_REQ_EXIT_MATCH = 0x00080008;
var S_DDZMATCH_REQ_EXIT_MATCH = 0x00080009;

//取消申请退赛
var C_DDZMATCH_CANCEL_REQ_EXIT_MATCH = 0x0008000A;
var S_DDZMATCH_CANCEL_REQ_EXIT_MATCH = 0x0008000B;

//进入游戏
var C_DDZMATCH_ENTER_MATCH = 0x0008000C;
var S_DDZMATCH_ENTER_MATCH = 0x0008000D;

//游戏开始
var S_DDZMATCH_GAMRSTART = 0x0008000E;

//发牌
var S_DDZMATCH_FACARD = 0x00080010;

//叫地主
var C_DDZMATCH_CALLCARD = 0x00080011;
var S_DDZMATCH_CALLCARD = 0x00080012;

//出牌
var C_DDZMATCH_OUTCARD = 0x00080013;
var S_DDZMATCH_OUTCARD = 0x00080014;

//游戏结束
var S_DDZMATCH_GAMEOVER = 0x00080015;

//退出游戏
var S_DDZMATCH_EXITGAME= 0x00080016;

//比赛结束
var S_DDZMATCH_MATCHEND= 0x00080017;

//掉线重连 场景
var S_DDZMATCH_SCENE= 0x00080018;

// 比赛通知
var S_DDZMATCH_NOTIFY= 0x00080019;

var C_DDZMATCH_TIME_BACKHALL= 0x0008001A; //定时开赛 返回大厅
var S_DDZMATCH_TIME_BACKHALL= 0x0008001B;

//排行
var C_DDZMATCH_RANK= 0x0008001C;
var S_DDZMATCH_RANK= 0x0008001D;

//补血
var C_DDZMATCH_ADDBLOOD= 0x0008001E;
var S_DDZMATCH_ADDBLOOD= 0x00080020;

//使用记牌器
var C_DDZMATCH_USE_TOOLS = 0x00080021;
var S_DDZMATCH_USE_TOOLS = 0x00080022;

//看牌
var C_DDZMATCH_SEE_CARD = 0x00080023;
var S_DDZMATCH_SEE_CARD = 0x00080024;

//倒或拉
var C_DDZMATCH_DAO_LA = 0x00080025;
var S_DDZMATCH_DAO_LA = 0x00080026;

//聊天
var C_DDZMATCH_CHAT = 0x00080027;
var S_DDZMATCH_CHAT = 0x00080028;


var C_DDZMATCH_TUOGUAN = 0x00080029;
var S_DDZMATCH_TUOGUAN = 0x0008002a;

var C_DDZMATCH_TUOGUAN_CANCEL = 0x0008002b;
var S_DDZMATCH_TUOGUAN_CANCEL = 0x0008002c;


var DDZMatchNet = cc.Class.extend({

    receDDZMatchCommand:function(command,packet,isvideo){
        if(isvideo == null){
            isvideo = 0;
        }
        switch (command){
            case S_DDZMATCH_SIGNUP:
                this.receDDZMatchSignupCommand(packet,isvideo);
                break;
            case S_DDZMATCH_CANCEL_SIGNUP:
                this.receDDZMatchCancelSignupCommand(packet,isvideo);
                break;
            case S_DDZMATCH_SIGNUP_NOTIFY:
                this.receDDZMatchSignupNotifyCommand(packet,isvideo);
                break;
            case S_DDZMATCH_REQ_EXIT_MATCH:
                this.receDDZMatchReqExitMatchCommand(packet,isvideo);
                break;
            case S_DDZMATCH_CANCEL_REQ_EXIT_MATCH:
                this.receDDZMatchCancelReqExitMatchCommand(packet,isvideo);
                break;
            case S_DDZMATCH_ENTER_MATCH:
                this.receDDZMatchEnterMatchCommand(packet,isvideo);
                break;
            case S_DDZMATCH_GAMRSTART:
                this.receDDZMatchGameStartCommand(packet,isvideo);
                break;
            case S_DDZMATCH_FACARD:
                this.receDDZMatchFaCardCommand(packet,isvideo);
                break;
            case S_DDZMATCH_SEE_CARD:
                this.receDDZMatchSeeCardCommand(packet,isvideo);
                break;
            case S_DDZMATCH_DAO_LA:
                this.receDDZMatchDaoLaCommand(packet,isvideo);
                break;
            case S_DDZMATCH_CALLCARD:
                this.receDDZMatchCallCardCommand(packet,isvideo);
                break;
            case S_DDZMATCH_OUTCARD:
                this.receDDZMatchOutCardCommand(packet),isvideo;
                break;
            case S_DDZMATCH_GAMEOVER:
                this.receDDZMatchGameOverCommand(packet,isvideo);
                break;
            case S_DDZMATCH_EXITGAME:
                this.receDDZMatchExitGameCommand(packet,isvideo);
                break;
            case S_DDZMATCH_MATCHEND:
                this.receDDZMatchMatchEndCommand(packet,isvideo);
                break;
            case S_DDZMATCH_SCENE:
                this.receDDZMatchSceneCommand(packet,isvideo);
                break;
            case S_DDZMATCH_NOTIFY:
                this.receDDZMatchNotifyCommand(packet,isvideo);
                break;
            case S_DDZMATCH_TIME_BACKHALL:
                this.receDDZMatchTimeBackHallCommand(packet,isvideo);
                break;
            case S_DDZMATCH_RANK:
                this.receDDZMatchRankCommand(packet,isvideo);
                break;
            case S_DDZMATCH_ADDBLOOD:
                this.receDDZMatchAddBloodCommand(packet,isvideo);
                break;
            case S_DDZMATCH_USE_TOOLS:
                this.receDDZMatchUseToolsCommand(packet);
                break;
            case S_DDZMATCH_CHAT:
                this.receDDZMatchChatCommand(packet);
                break;
            case S_DDZMATCH_TUOGUAN:
                this.receDDZMatchTuoguanCommand(packet);
                break;
            case S_DDZMATCH_TUOGUAN_CANCEL:
                this.receDDZMatchTuoguanCancelCommand(packet);
                break;
            default:
                log("unknown command="+command);
                if(isvideo == 0){
                    packet.clear();
                    packet = null;
                }
                break;
        }
    },
    //ddz 比赛 报名
    receDDZMatchSignupCommand:function(packet,isvideo){
        log("receDDZMatchSignupCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_SIGNUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match signup suc");
            var softcash = packet.readLong();
            var hardcash = packet.readLong();
            var matchId = packet.readLong();
            var matchRoomId = packet.readLong();
            var currPlayerCount = packet.readInt();
            netdata[2] = softcash;
            netdata[3] = hardcash;
            netdata[4] = matchId;
            netdata[5] = matchRoomId;
            netdata[6] = currPlayerCount;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 取消报名
    receDDZMatchCancelSignupCommand:function(packet,isvideo){
        log("receDDZMatchCancelSignupCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_CANCEL_SIGNUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match cancel signup suc");
            var softcash = packet.readLong();
            var hardcash = packet.readLong();
            var matchId = packet.readLong();
            var matchRoomId = packet.readLong();
            //var currPlayerCount = packet.readInt();
            netdata[2] = softcash;
            netdata[3] = hardcash;
            netdata[4] = matchId;
            netdata[5] = matchRoomId;
            //netdata[6] = currPlayerCount;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 报名 通知
    receDDZMatchSignupNotifyCommand:function(packet,isvideo){
        log("receDDZMatchSignupNotifyCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_SIGNUP_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match signup notify suc");
            var currPlayerCount = packet.readInt();
            log("currPlayerCount="+currPlayerCount);
            netdata[2] = currPlayerCount;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛请求退出比赛
    receDDZMatchReqExitMatchCommand:function(packet,isvideo){
        log("receDDZMatchReqExitMatchCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_REQ_EXIT_MATCH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match req exit match suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 取消请求退出
    receDDZMatchCancelReqExitMatchCommand:function(packet,isvideo){
        log("receDDZMatchCancelReqExitMatchCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_CANCEL_REQ_EXIT_MATCH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match cancel req exit match suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 进入比赛
    receDDZMatchEnterMatchCommand:function(packet,isvideo){
        log("receDDZMatchEnterMatchCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_ENTER_MATCH;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match enter match suc");
            var state = packet.readInt();
            var signupcount = packet.readInt();
            var startTime = packet.readLong();
            netdata[2] = state;
            netdata[3] = signupcount;
            netdata[4] = startTime;
            if(state == 2){
                var playcount = packet.readInt();
                var matchScore = packet.readInt();
                var rank = packet.readInt();
                var mark = packet.readInt();
                netdata[5] = playcount;
                netdata[6] = matchScore;
                netdata[7] = rank;
                netdata[8] = mark;
            }
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 游戏开始
    receDDZMatchGameStartCommand:function(packet,isvideo){
        log("receDDZMatchGameStartCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_GAMRSTART;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz game start");
            var len = packet.readInt();
            var players = [];
            for(var i=0;i<len;i++){
                var player = {};
                player.chairId = packet.readInt();
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.vip = packet.readInt();
                player.level  = packet.readInt();
                player.softCash  = packet.readLong();
                player.hardCash  = packet.readLong();
                player.score = packet.readInt();
                player.nickName = player.userName;
                //player.softCash = 0;
                players[i] = player;
            }
            netdata[2] = players;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 开始发牌
    receDDZMatchFaCardCommand:function(packet,isvideo){
        log("receDDZMatchFaCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_FACARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("fa card suc");
            var lordChairIdx = packet.readInt();
            var displayPos = packet.readInt();
            var displayerCard = packet.readByte();
            var cards = [];
            if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL){// 通用规则－发自己牌
                for(var i=0;i<17;i++){
                    cards[i] = packet.readByte();
                }
            }else{
                for(var i=0;i<17;i++){
                    cards[i] = 0;
                }
            }
            log("mycards="+cards);
            netdata[2] = lordChairIdx;
            netdata[3] = displayPos;
            netdata[4] = displayerCard;
            netdata[5] = cards;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    receDDZMatchSeeCardCommand:function(packet,isvideo){
        log("receDDZMatchSeeCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_SEE_CARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz see card suc");
            var chair = packet.readInt();
            var cardlen = packet.readInt();
            var cards = [];
            for(var i=0;i<cardlen;i++){
                cards[i] = packet.readByte();
            }
            netdata[2] = chair;
            netdata[3] = cards;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },

    receDDZMatchDaoLaCommand:function(packet,isvideo){
        log("receDDZMatchDaoLaCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_DAO_LA;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz daola suc");
            var chair = packet.readInt();
            var type = packet.readInt();
            var cardlen = packet.readInt();
            var cards = [];
            for(var i=0;i<cardlen;i++){
                cards[i] = packet.readByte();
            }
            var dizhucardslen = packet.readInt();
            var dizhucards = [];
            for(var i=0;i<dizhucardslen;i++){
                dizhucards[i] = packet.readByte();
            }
            var tempstate = packet.readInt();//下1个操作的临时状态
            var nextChairId = packet.readInt();
            netdata[2] = chair;
            netdata[3] = type;
            netdata[4] = cards;
            netdata[5] = dizhucards;
            netdata[6] = tempstate;
            netdata[7] = nextChairId;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 叫地主
    receDDZMatchCallCardCommand:function(packet,isvideo){
        log("receDDZMatchCallCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_CALLCARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz call card suc");
            var chair = packet.readInt();
            var num = packet.readInt(); //等于0表示不叫
            var cardlen = packet.readInt();
            var cards = [];
            for(var i=0;i<cardlen;i++){
                cards[i] = packet.readByte();
            }
            var dizhucardslen = packet.readInt();
            var dizhucards = [];
            for(var i=0;i<dizhucardslen;i++){
                dizhucards[i] = packet.readByte();
            }
            var tempstate = packet.readInt();//下1个操作的临时状态
            var nextChairId = packet.readInt();

            netdata[2] = chair;
            netdata[3] = num;
            netdata[4] = cards;
            netdata[5] = dizhucards;
            netdata[6] = tempstate;
            netdata[7] = nextChairId;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 出牌
    receDDZMatchOutCardCommand:function(packet,isvideo){
        log("receDDZMatchOutCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_OUTCARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz out card suc");
            var chairId = packet.readInt();
            var len = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = len;
            if(len > 0){
                var cards = [];
                var type = packet.readInt();
                for(var i=0;i<len;i++){
                    cards[i] = packet.readByte();
                }
                netdata[4] = type;
                netdata[5] = cards;
            }
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 游戏结束
    receDDZMatchGameOverCommand:function(packet,isvideo){
        log("receDDZMatchGameOverCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_GAMEOVER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("gameover suc");
            var datas = [];
            for(var i=0;i<3;i++){
                var data = {};
                data.chairId = packet.readInt();
                data.score = packet.readInt(); //欢乐豆
                data.playercount = packet.readInt();
                data.rank = packet.readInt();
                data.matchScore = data.score;
                var cardLen = packet.readInt();
                var cards = [];
                for(var j=0;j<cardLen;j++){
                    cards[j] = packet.readByte();
                }
                data.cards = cards;
                datas.push(data);
                log("data.chairId=="+data.chairId+"|"+data.score+"|"+data.cards)
            }
            var mybeishu = packet.readInt();
            var infolen = packet.readInt();
            var infos = [];
            for(var i=0;i<infolen;i++){
                var info1 = packet.readString();
                var info2 = packet.readString();
                infos.push([info1,info2]);
                log("info=="+info1+"|"+info2);
            }
            netdata[2] = datas
            netdata[3] = infos
            netdata[4] = mybeishu
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 场景数据
    receDDZMatchSceneCommand:function(packet,isvideo){
        log("receDDZMatchSceneCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_SCENE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match scene suc");
            var gamestate = packet.readInt(); //游戏状态,1:叫地主,2:出牌
            var lordChairIdx = packet.readInt();
            var currOperateChairIdx = packet.readInt();
            var currCallLordNum = packet.readInt();
            var bombCount = packet.readInt();
            log("gamestate=="+gamestate)
            netdata[2] = gamestate;
            netdata[3] = lordChairIdx;
            netdata[4] = currOperateChairIdx;
            netdata[5] = currCallLordNum;
            netdata[6] = bombCount;
            var len = packet.readInt();
            log("player len = "+len)
            var playerdatas = [];
            for(var i=0;i<len;i++){
                var pdata = []
                var player = {};
                player.chairId = packet.readInt();
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.vip = packet.readInt();
                player.level  = packet.readInt();
                player.softCash  = packet.readLong();
                player.hardCash  = packet.readLong();
                player.score = packet.readInt();
                player.nickName = player.userName;
                pdata[0] = player;

                if(gamestate == 1){//叫地主
                    var callLordNum = packet.readInt();  //叫地主的分数 -1:表示还未叫地主, 0:不叫
                    pdata[1] = callLordNum;
                    var handcardslen = packet.readInt();
                    var handcards = [];
                    for(var j=0;j<handcardslen;j++){
                        handcards[j] = packet.readByte();
                    }
                    pdata[2] = handcards;
                }else if(gamestate == 2){//出牌
                    var handcardslen1 = packet.readInt(); //确定长度
                    var handcardslen = packet.readInt();//取牌值 非自己为0
                    var handcards = [];
                    for(var j=0;j<handcardslen;j++){
                        handcards[j] = packet.readByte();
                    }
                    pdata[1] = handcardslen1;
                    pdata[2] = handcards;

                    var outcardslen = packet.readInt();
                    var outcards = [];
                    for(var j=0;j<outcardslen;j++){
                        outcards[j] = packet.readByte();
                    }
                    pdata[3] = outcards;
                }else if(gamestate == 3||gamestate == 4) {//3倒牌状态 4拉牌状态
                    var daolastate = packet.readInt();
                    var cardslen = packet.readInt();
                    var cards = [];
                    for(var j=0;j<cardslen;j++){
                        cards[j] = packet.readByte();
                    }
                    pdata[1] = daolastate;
                    pdata[2] = cards;
                }
                playerdatas[i] = pdata;
            }
            netdata[7] = playerdatas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 退出游戏
    receDDZMatchExitGameCommand:function(packet,isvideo){
        log("receDDZMatchExitGameCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_EXITGAME;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match exit game suc");

        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },

    //比赛 比赛结束
    receDDZMatchMatchEndCommand:function(packet,isvideo){
        log("receDDZMatchMatchEndCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_MATCHEND;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match match end suc");
            var data = {};
            data.state = packet.readInt();
            data.playerCount = packet.readInt();//开始时人数
            data.rank = packet.readInt();
            data.softCash = packet.readLong();
            data.hardCash = packet.readLong();
            data.matchScore = packet.readInt();
            data.prizestr = packet.readString();
            var len =  packet.readInt();
            var goodses = [];
            for(var i=0;i<len;i++){
                var goods = {};
                goods.gtype = packet.readInt();
                goods.gid = packet.readLong();
                goods.gvalue = packet.readInt();
                goodses.push(goods)
                log("goods.gtype=="+goods.gtype+"|"+goods.gid+"|"+goods.gvalue)
            }
            data.goodses = goodses
            netdata[2] = data;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 通知
    receDDZMatchNotifyCommand:function(packet,isvideo){
        log("receDDZMatchNotifyCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match notify suc");
            var notifydata = {}
            var mark = packet.readInt();
            notifydata.mark = mark;
            if(mark == MATCH_NOTIFY_WAIT_START||mark == MATCH_NOTIFY_WAIT_END) {
                notifydata.startPlayerCount = packet.readInt();
                notifydata.currGameTableCount = packet.readInt();
                notifydata.score = packet.readInt();
                notifydata.rank = packet.readInt();
            }else if(mark == MATCH_NOTIFY_MOVE_NEXT) {//通知比赛移动到下一场
                notifydata.roomId = packet.readLong();
                notifydata.startTime = packet.readLong();
            }else if(mark == MATCH_NOTIFY_RANK) {////通知比赛的排名
                notifydata.rank = packet.readInt();
            }else if(mark == MATCH_NOTIFY_GAMETABLECOUNT) {
                notifydata.currGameTableCount = packet.readInt();
                notifydata.rank = packet.readInt();
            }
            netdata[2] = notifydata;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 定时开始 返回大厅
    receDDZMatchTimeBackHallCommand:function(packet,isvideo){
        log("receDDZMatchTimeBackHallCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_TIME_BACKHALL;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match time back hall suc");
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 排名
    receDDZMatchRankCommand:function(packet,isvideo){
        log("receDDZMatchRankCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_RANK;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match rank suc");
            var count = packet.readInt();
            var datas = [];
            for(var i=0;i<count;i++){
                var data = {};
                data.uid = packet.readLong();
                data.nickName = packet.readString();
                data.playCount = packet.readInt();
                data.matchScore = packet.readInt();
                data.rank = packet.readInt();
                log("rank="+data.nickName+"|"+data.rank+"|"+data.playCount)
                datas.push(data)
            }
            netdata[2] = datas;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game_nowait.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 加血
    receDDZMatchAddBloodCommand:function(packet,isvideo){
        log("receDDZMatchAddBloodCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_ADDBLOOD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("match add blood suc");
            var chairId = packet.readInt();
            var usegold = packet.readInt();
            var addMatchScore = packet.readInt();
            var softCash = packet.readInt();
            var matchScore = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = usegold;
            netdata[4] = addMatchScore;
            netdata[5] = softCash;
            netdata[6] = matchScore;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        if(isvideo == 0){
            packet.clear();
            packet = null;
        }
    },
    //比赛 使用道具（计牌期）
    receDDZMatchUseToolsCommand:function(packet){
        log("receDDZMatchUseToolsCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_USE_TOOLS;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddzmatch use tools");
            var endtime = packet.readLong();
            netdata[2] = endtime;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game_nowait.push(netdata);
        packet.clear();
        packet = null;
    },
    //聊天
    receDDZMatchChatCommand:function(packet){
        log("receDDZMatchChatCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_CHAT;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("chat suc");
            var chair = packet.readInt();
            var type = packet.readInt();
            var chatId = -1;
            var msg = "";
            var tochair = -1
            if(type == 1||type ==2||type ==5){
                chatId = packet.readInt();
            }
            if(type == 3||type ==4) {
                msg = packet.readString();
            }
            if(type == 4||type ==2){
                tochair = packet.readInt();
            }
            netdata[2] = chair;
            netdata[3] = type;
            netdata[4] = chatId;
            netdata[5] = msg;
            netdata[6] = tochair;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receDDZMatchTuoguanCommand:function(packet){
        log("receDDZMatchTuoguanCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_TUOGUAN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddzmatch tuoguan suc");
            var chairId = packet.readInt();
            netdata[2] = chairId;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    receDDZMatchTuoguanCancelCommand:function(packet){
        log("receDDZMatchTuoguanCancelCommand==");
        var netdata = [];
        netdata[0] = S_DDZMATCH_TUOGUAN_CANCEL;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddzmatch tuoguan cancel suc");
            var chairId = packet.readInt();
            netdata[2] = chairId;
        }else{
            var code = packet.readInt();
            var msg = packet.readString();
            log("error code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
        }
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },
    //发送数据
    sendData:function(packet){
        if(checkNetConnServer(CONN_SERVER_MATCH)){
            sGameData.mGameNet.sendData(packet,CONN_SERVER_MATCH);
        }else{
            sGameData.mIsSendingData = false;
            handleNetConnServerError(CONN_SERVER_MATCH);
        }
    },
    //发送 比赛 报名
    sendDDZMatchSignup:function(matchId,matchRoomId,scoreType){
        log("sendDDZMatchSignup=="+matchId+"|"+matchRoomId+"|"+scoreType);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_SIGNUP);
        packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        packet.writeInt(scoreType);
        this.sendData(packet);
    },
    //发送 比赛 取消报名
    sendDDZMatchCancelSignup:function(matchId,matchRoomId){
        log("sendDDZMatchCancelSignup=="+matchId+"|"+matchRoomId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_CANCEL_SIGNUP);
        packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        this.sendData(packet);
    },
    //发送 比赛 请求退出比赛
    sendDDZMatchReqExitMatch:function(matchId,matchRoomId){
        log("sendDDZMatchReqExitMatch=="+matchId+"|"+matchRoomId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_REQ_EXIT_MATCH);
//        packet.writeLong(matchId);
//        packet.writeLong(matchRoomId);
        this.sendData(packet);
    },
    //发送 比赛 取消请求退出比赛
    sendDDZMatchCancelReqExitMatch:function(matchId,matchRoomId){
        log("sendDDZMatchCancelReqExitMatch==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_CANCEL_REQ_EXIT_MATCH);
        this.sendData(packet);
    },
    //发送 比赛 进入比赛
    sendDDZMatchEnterMatch:function(matchId,matchRoomId){
        log("sendDDZMatchEnterMatch=="+matchId+"|"+matchRoomId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_ENTER_MATCH);
        packet.writeLong(matchId);
        packet.writeLong(matchRoomId);
        this.sendData(packet);
    },
    //看牌
    sendDDZMatchSeeCard:function(){
        log("sendDDZMatchSeeCard==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_SEE_CARD);
        this.sendData(packet);
    },
    //倒拉
    sendDDZMatchDaoLa:function(type){
        log("sendDDZMatchDaoLa=="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_DAO_LA);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //发送 比赛 叫牌
    sendDDZMatchCallCard:function(num){
        log("sendDDZMatchCallCard=="+num);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_CALLCARD);
        packet.writeInt(num);
        this.sendData(packet);
    },
    //发送 比赛 出牌
    sendDDZMatchOutCard:function(type,cards){
        log("sendDDZMatchOutCard=="+type+"|"+cards);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_OUTCARD);
        var len = cards.length;
        packet.writeInt(len);
        packet.writeInt(type);
        for(var i= 0;i<len;i++){
            packet.writeByte(cards[i]);
        }
        this.sendData(packet);
    },
    //发送 比赛 定时赛 返回大厅
    sendDDZMatchTimeBackHall:function(){
        log("sendDDZMatchTimeBackHall==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_TIME_BACKHALL);
        this.sendData(packet);
    },
    //发送 比赛 排名
    sendDDZMatchRank:function(){
        log("sendDDZMatchRank==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_RANK);
        this.sendData(packet);
    },
    //发送 比赛 加血
    sendDDZMatchAddBlood:function(){
        log("sendDDZMatchAddBlood==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_ADDBLOOD);
        this.sendData(packet);
    },
    //发送 比赛 使用道具（计牌期）
    sendDDZMatchUseTools:function(userId){
        log("sendDDZMatchUseTools=="+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_USE_TOOLS);
        packet.writeLong(userId);
        this.sendData(packet);
    },
    //聊天
    sendDDZMatchChat:function(type,chatId,msg,toChairId){
        log("sendDDZMatchChat=="+chatId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_CHAT);
        packet.writeInt(type);
        if(type == 1||type == 2||type == 5){
            packet.writeInt(chatId);
        }else{
            packet.writeString(msg);
        }
        if(type == 4||type == 2) {
            packet.writeInt(toChairId);
        }
        this.sendData(packet);
    },
    //托管
    sendDDZMatchTuoguan:function(){
        log("sendDDZMatchTuoguan==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_TUOGUAN);
        this.sendData(packet);
    },
    //取消托管
    sendDDZMatchTuoguanCancel:function(){
        log("sendDDZMatchTuoguanCancel==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZMATCH_TUOGUAN_CANCEL);
        this.sendData(packet);
    }


});