/**
 * Created by Administrator on 14-5-14.
 */
var T_DDZ_COMMAND = 0x00040000;//斗地主指令类型

//斗地主
//进入房间
var C_DDZ_ENTERROOM = 0x00040003;
var S_DDZ_ENTERROOM = 0x00040004;

var C_ENTER_QUEUE = 0x00040027;
var S_ENTER_QUEUE = 0x00040028;
//退出房间
var C_DDZ_EXITROOM = 0x00040005;
var S_DDZ_EXITROOM = 0x00040006;
//继续游戏
var C_DDZ_CONTINUE = 0x00040007;
var S_DDZ_CONTINUE = 0x00040008;
//叫地主
var C_DDZ_CALLCARD = 0x00040009;
var S_DDZ_CALLCARD = 0x0004000A;
//出牌
var C_DDZ_OUTCARD = 0x0004000B;
var S_DDZ_OUTCARD = 0x0004000C;
//游戏开始
var S_DDZ_GAMRSTART = 0x0004000D;
//发牌
var S_DDZ_FACARD = 0x0004000E;
//游戏场景
var S_DDZ_SCENE = 0x00040010;
//游戏结束
var S_DDZ_GAMEOVER = 0x00040011;
//踢出玩家
var S_DDZ_KICKPLAYER = 0x00040012;
//聊天
var C_DDZ_CHAT = 0x00040013;
var S_DDZ_CHAT = 0x00040014;
//游戏玩家信息
var C_DDZ_PLAYER_INFO = 0x00040015;
var S_DDZ_PLAYER_INFO = 0x00040016;

var S_DDZ_NOTICE_PLAYERDATA_CHANGE = 0x00040017;

//使用记牌器
var C_DDZ_USE_TOOLS = 0x00040018;
var S_DDZ_USE_TOOLS = 0x00040019;

//看牌
var C_DDZ_SEE_CARD = 0x0004001A;
var S_DDZ_SEE_CARD = 0x0004001B;

//倒或拉
var C_DDZ_DAO_LA = 0x0004001C;
var S_DDZ_DAO_LA = 0x0004001D;

var S_DDZ_INGOT_AWARD_NOTIFY		= 0x4001E;	  //元宝奖励通知

var C_DDZ_TUOGUAN = 0x00040020; // //游戏托管
var S_DDZ_TUOGUAN = 0x00040021;

var C_DDZ_TUOGUAN_CANCEL = 0x00040022; //   //取消托管
var S_DDZ_TUOGUAN_CANCEL = 0x00040023;

//多乐新加农民加倍或不加倍
var C_DDZ_JIABEI					= 0x40024;    //加倍
var S_DDZ_JIABEI					= 0x40025;


var S_DDZ_KICK_DISABLE_USER		= 0x40026;    //剔除被封号的玩家

//ddz网络处理
var GameDDZNet = cc.Class.extend({
    //接收ddz指令
    receDDZCommand:function(command,packet){
        switch (command){
            case S_DDZ_ENTERROOM:
                this.receDDZEnterRoomCommand(packet);
                break;
            case S_DDZ_EXITROOM:
                this.receDDZExitRoomCommand(packet);
                break;
            case S_DDZ_CONTINUE:
                this.receDDZContinueCommand(packet);
                break;
            case S_ENTER_QUEUE:
                this.receDDZEnterQueue(packet);
                break;
            case S_DDZ_CALLCARD:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL){
                    this.receDDZCallCardCommand_normal(packet);
                }else{
                    this.receDDZCallCardCommand(packet);
                }
                break;
            case S_DDZ_OUTCARD:
                this.receDDZOutCardCommand(packet);
                break;
            case S_DDZ_GAMRSTART:
                this.receDDZGameStartCommand(packet);
                break;
            case S_DDZ_FACARD:
                this.receDDZFaCardCommand(packet);
                break;
            case S_DDZ_SEE_CARD:
                this.receDDZSeeCardCommand(packet);
                break;
            case S_DDZ_DAO_LA:
                this.receDDZDaoLaCommand(packet);
                break;
            case S_DDZ_JIABEI:
                this.receDDZJiabeiCommand_normal(packet);
                break;
            case S_DDZ_SCENE:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL){
                    this.receDDZSceneCommand_normal(packet);
                }else{
                    this.receDDZSceneCommand(packet);
                }
                break;
            case S_DDZ_GAMEOVER:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL){
                    this.receDDZGameOverCommand_normal(packet);
                }else{
                    this.receDDZGameOverCommand(packet);
                }
                break;
            case S_DDZ_KICKPLAYER:
                this.receDDZKickPlayerCommand(packet);
                break;
            case S_DDZ_KICK_DISABLE_USER:
                this.receDDZKickDisableUserCommand(packet);
                break;
            case S_DDZ_CHAT:
                this.receDDZChatCommand(packet);
                break;
            case S_DDZ_PLAYER_INFO:
                this.receDDZPlayerInfoCommand(packet);
                break;
            case S_DDZ_NOTICE_PLAYERDATA_CHANGE:
                this.receDDZNoticePlayerDataChangeCommand(packet);
                break;
            case S_DDZ_USE_TOOLS:
                this.receDDZUseToolsCommand(packet);
                break;
            case S_DDZ_INGOT_AWARD_NOTIFY:
                this.receDDZIngotAwardNotifyCommand(packet);
                break;
            case S_DDZ_TUOGUAN:
                this.receDDZTuoguanCommand(packet);
                break;
            case S_DDZ_TUOGUAN_CANCEL:
                this.receDDZTuoguanCancelCommand(packet);
                break;
            default:
                log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    //ddz 进入房间
    receDDZEnterRoomCommand:function(packet){
        log("receDDZEnterRoomCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_ENTERROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("enterroom suc");
            var roomstate = packet.readByte();// 进入后的状态标志,0:正在排队中，1：掉线从连将发送游戏场景数据
            log("roomstate=="+roomstate);
            netdata[2] = roomstate;
            if(roomstate == 2){
                var msgInfo = packet.readString();// 进入后的状态标志,0:正在排队中，1：掉线从连将发送游戏场景数据
                log("msgInfo=="+roomstate);
                netdata[3] = msgInfo;
            }
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

    receDDZEnterQueue:function(packet){
        log("receDDZEnterQueue==");
        var netdata = [];
        netdata[0] = S_ENTER_QUEUE;
        var flag = packet.readByte();
        netdata[1] = flag;
        sGameData.mNetDataArray_Game.push(netdata);
        packet.clear();
        packet = null;
    },

    //ddz 退出房间
    receDDZExitRoomCommand:function(packet){
        log("receDDZExitCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_EXITROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("exitroom suc");

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
    //ddz继续游戏
    receDDZContinueCommand:function(packet){
        log("receDDZContinueCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_CONTINUE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz continue suc");
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
    },//发牌
    receDDZFaCardCommand:function(packet){
        log("receDDZFaCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_FACARD;
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
        packet.clear();
        packet = null;
    },

    receDDZSeeCardCommand:function(packet){
        log("receDDZSeeCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_SEE_CARD;
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
        packet.clear();
        packet = null;
    },

    receDDZDaoLaCommand:function(packet){
        log("receDDZDaoLaCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_DAO_LA;
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
        packet.clear();
        packet = null;
    },

    //叫牌
    receDDZCallCardCommand:function(packet){
        log("receDDZCallCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_CALLCARD;
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
        packet.clear();
        packet = null;
    },
    //出牌
    receDDZOutCardCommand:function(packet){
        log("receDDZOutCardCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_OUTCARD;
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
        packet.clear();
        packet = null;
    },
    //游戏开始
    receDDZGameStartCommand:function(packet){
        log("receDDZGameStartCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_GAMRSTART;
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
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.vip = packet.readInt();
                player.level  = packet.readInt();
                player.softCash  = packet.readLong();
                player.hardCash  = packet.readLong();
                player.nickName = player.userName;
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
        packet.clear();
        packet = null;
    },

    //重连场景数据
    receDDZSceneCommand:function(packet){
        log("receDDZSceneCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_SCENE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz scene suc");
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
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.vip = packet.readInt();
                player.level  = packet.readInt();
                player.softCash  = packet.readLong();
                player.hardCash  = packet.readLong();
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
        packet.clear();
        packet = null;
    },
    //游戏结束
    receDDZGameOverCommand:function(packet){
        log("receDDZGameOverCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_GAMEOVER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("gameover suc");
            var datas = [];
            for(var i=0;i<3;i++){
                var data = {};
                data.chairId = packet.readInt();
                data.score = packet.readInt(); //欢乐豆
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
        packet.clear();
        packet = null;
    },
    //用户数据发生变化
    receDDZNoticePlayerDataChangeCommand:function(packet){
        log("receDDZNoticePlayerDataChangeCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_NOTICE_PLAYERDATA_CHANGE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz pdata change suc");
            var type = packet.readInt();
            var playerId = packet.readLong();
            var player = {};
            player.id = playerId;
            if(type == SCORE_INFO_CHANGE){
                player.level = packet.readInt();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
                player.hardCash = packet.readLong();
            }
            netdata[2] = type;
            netdata[3] = player;

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
    //ddz 使用道具
    receDDZUseToolsCommand:function(packet){
        log("receDDZUseToolsCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_USE_TOOLS;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz use tools");
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
    //踢出玩家
    receDDZKickPlayerCommand:function(packet){
        log("receDDZKickPlayerCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_KICKPLAYER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("kick suc");
            var code = packet.readInt();
            var msg = packet.readString();
            log("kick code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
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
    receDDZKickDisableUserCommand:function(packet){
        log("receDDZKickDisableUserCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_KICK_DISABLE_USER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("kick disable user suc");
            var code = packet.readInt();
            var msg = packet.readString();
            log("kick code="+code+"|"+msg);
            netdata[2] = code;
            netdata[3] = msg;
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
    //聊天
    receDDZChatCommand:function(packet){
        log("receDDZChatCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_CHAT;
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
    //玩家信息
    receDDZPlayerInfoCommand:function(packet){
        log("receDDZPlayerInfoCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_PLAYER_INFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz player info suc");
            var player = {};
            player.id = packet.readLong();
            player.xp = packet.readInt();
            player.winCount = packet.readInt();
            player.loseCount = packet.readInt();
            player.bFriend = packet.readInt();
            log("player=="+player.id+"|"+player.winCount+"|"+player.loseCount)
            netdata[2] = player;
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
    receDDZIngotAwardNotifyCommand:function(packet){
        log("receDDZIngotAwardNotifyCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_INGOT_AWARD_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz ingot award suc");
            var awardhardcash = packet.readInt();
            var msg = packet.readString();
            netdata[2] = awardhardcash;
            netdata[3] = msg;
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
    receDDZTuoguanCommand:function(packet){
        log("receDDZTuoguanCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_TUOGUAN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz tuoguan suc");
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
    receDDZTuoguanCancelCommand:function(packet){
        log("receDDZTuoguanCancelCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_TUOGUAN_CANCEL;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz tuoguan cancel suc");
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

    receDDZJiabeiCommand_normal:function(packet){
        log("receDDZJiabeiCommand==");
        var netdata = [];
        netdata[0] = S_DDZ_JIABEI;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz jiabei suc");
            var chairId = packet.readInt();
            var jiabei = packet.readInt();
            var gameState = packet.readInt();
            var currOperateChairIdx = packet.readInt();

            netdata[2] = chairId;
            netdata[3] = jiabei;
            netdata[4] = gameState;
            netdata[5] = currOperateChairIdx;

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
    //
    //叫牌
    receDDZCallCardCommand_normal:function(packet){
        log("receDDZCallCardCommand_normal==");
        var netdata = [];
        netdata[0] = S_DDZ_CALLCARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz call card suc");
            var chair = packet.readInt();
            var num = packet.readInt(); //等于0表示不叫
            var state = packet.readByte(); // 0：重新发牌， 1：下一个玩家叫地主, 2:开始出牌  当状态为2时一下内容有效
            netdata[2] = chair;
            netdata[3] = num;
            netdata[4] = state;
            log("chair="+chair+"|"+num+"|"+state);
            if(state==2){
                var lordChairIdx = packet.readInt(); //地主椅子号
                var currCallLordNum = packet.readInt(); //当前所叫的分数
                var dizhucards = [];
                dizhucards[0] = packet.readByte();
                dizhucards[1] = packet.readByte();
                dizhucards[2] = packet.readByte();
                netdata[5] = lordChairIdx;
                netdata[6] = currCallLordNum;
                netdata[7] = dizhucards;
                log("lordChairIdx="+lordChairIdx+"|"+currCallLordNum+"|"+dizhucards);
            }
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

    //重连场景数据
    receDDZSceneCommand_normal:function(packet){
        log("receDDZSceneCommand_normal==");
        var netdata = [];
        netdata[0] = S_DDZ_SCENE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("ddz scene suc");
            var gamestate = packet.readInt(); //游戏状态,1:叫地主,2:出牌
            var lordChairIdx = packet.readInt();
            var currOperateChairIdx = packet.readInt();
            var currCallLordNum = packet.readInt();
            var bombCount = packet.readInt();
            netdata[2] = gamestate;
            netdata[3] = lordChairIdx;
            netdata[4] = currOperateChairIdx;
            netdata[5] = currCallLordNum;
            netdata[6] = bombCount;
            var len = packet.readInt();
            var playerdatas = [];
            for(var i=0;i<len;i++){
                var pdata = []
                var player = {};
                player.chairId = packet.readInt();
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.vip = packet.readInt();
                player.level  = packet.readInt();
                player.softCash  = packet.readLong();
                player.hardCash  = packet.readLong();
                player.nickName = player.userName;
                pdata[0] = player;

                if(gamestate == 1){
                    var callLordNum = packet.readInt();  //叫地主的分数 -1:表示还未叫地主, 0:不叫
                    pdata[1] = callLordNum;
                    var handcardslen = packet.readInt();
                    var handcards = [];
                    for(var j=0;j<handcardslen;j++){
                        handcards[j] = packet.readByte();
                    }
                    pdata[2] = handcards;
                }else if(gamestate == 5) {
                    player.jiabei = packet.readInt();
                    var handcardslen1 = packet.readInt(); //确定长度
                    var handcardslen = packet.readInt();//取牌值 非自己为0
                    var handcards = [];
                    for(var j=0;j<handcardslen;j++){
                        handcards[j] = packet.readByte();
                    }
                    pdata[1] = handcardslen1;
                    pdata[2] = handcards;

                }else{



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
        packet.clear();
        packet = null;
    },
    //游戏结束
    receDDZGameOverCommand_normal:function(packet){
        log("receDDZGameOverCommand_normal==");
        var netdata = [];
        netdata[0] = S_DDZ_GAMEOVER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("gameover suc");
            var rocketCount = packet.readInt();
            var springCount = packet.readInt();
            var bombCount = packet.readInt();
            netdata[2] = rocketCount;
            netdata[3] = springCount;
            netdata[4] = bombCount;
            var len = packet.readInt();
            netdata[5] = len;
            for(var i=0;i<len;i++){
                var data = {};
                data.chairId = packet.readInt();
                data.score = packet.readInt(); //欢乐豆
                var cardLen = packet.readInt();
                var cards = [];
                for(var j=0;j<cardLen;j++){
                    cards[j] = packet.readByte();
                }
                data.cards = cards;
                netdata[6+i] = data;
            }
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
        if(checkNetConnServer(CONN_SERVER_GAME)){
            sGameData.mGameNet.sendData(packet,CONN_SERVER_GAME);
        }else{
            sGameData.mIsSendingData = false;
            handleNetConnServerError(CONN_SERVER_GAME);
        }
    },
    //进入房间
    sendDDZEnterRoom:function(roomId,session){
        log("sendDDZEnterRoom=="+roomId+"|"+session);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_ENTERROOM);
        packet.writeInt(roomId);
        packet.writeString(session);
        this.sendData(packet);
    },

    //进入排队
    sendDDZEnterQueue:function(){
        log("sendDDZEnterQueue==");
        var packet = Packet.create(true);
        packet.writeInt(C_ENTER_QUEUE);
        //packet.writeInt(roomId);
        //packet.writeString(session);
        this.sendData(packet);
    },

    //退出房间
    sendDDZExitRoom:function(){
        log("sendDDZExitRoom==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_EXITROOM);
        this.sendData(packet);
    },
    //继续游戏
    sendDDZContinue:function(){
        log("sendDDZContinue==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_CONTINUE);
        this.sendData(packet);
    },
    //叫牌
    sendDDZCallCard:function(num){
        log("sendDDZCallCard=="+num);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_CALLCARD);
        packet.writeInt(num);
        this.sendData(packet);
    },
    //出牌
    sendDDZOutCard:function(type,cards){
        log("sendDDZOutCard==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_OUTCARD);
        var len = cards.length;
        packet.writeInt(len);
        packet.writeInt(type);
        for(var i= 0;i<len;i++){
            packet.writeByte(cards[i]);
        }
        this.sendData(packet);
    },
    //看牌
    sendDDZSeeCard:function(){
        log("sendDDZSeeCard==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_SEE_CARD);
        this.sendData(packet);
    },
    //倒拉
    sendDDZDaoLa:function(type){
        log("sendDDZDaoLa=="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_DAO_LA);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //加倍（）
    sendDDZJiabei:function(type){
        log("sendDDZJiabei=="+type);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_JIABEI);
        packet.writeInt(type);
        this.sendData(packet);
    },
    //聊天
    sendDDZChat:function(type,chatId,msg,toChairId){
        log("sendDDZChat=="+chatId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_CHAT);
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
    //获取玩家信息
    sendDDZPlayerInfo:function(userId){
        log("sendDDZPlayerInfo=="+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_PLAYER_INFO);
        packet.writeLong(userId);
        this.sendData(packet);
    },
    //使用道具（计牌其）
    sendDDZUseTools:function(userId){
        log("sendDDZUseTools=="+userId);
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_USE_TOOLS);
        packet.writeLong(userId);
        this.sendData(packet);
    },
    //托管
    sendDDZTuoguan:function(){
        log("sendDDZTuoguan==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_TUOGUAN);
        this.sendData(packet);
    },
    //取消托管
    sendDDZTuoguanCancel:function(){
        log("sendDDZTuoguanCancel==");
        var packet = Packet.create(true);
        packet.writeInt(C_DDZ_TUOGUAN_CANCEL);
        this.sendData(packet);
    }

});