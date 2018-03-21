/**
 * Created by Administrator on 14-5-14.
 */
var T_ZJH_COMMAND = 0x00060000;//扎金花指令类型
//扎金花
//进入房间
var C_ZJH_ENTERROOM = 0x00060003
var S_ZJH_ENTERROOM = 0x00060004
//退出房间
var C_ZJH_EXITROOM = 0x00060005;
var S_ZJH_EXITROOM = 0x00060006;
//进入桌子
var C_ZJH_ENTERTABLE = 0x00060007;
var S_ZJH_ENTERTABLE = 0x00060008;
//退出桌子
var C_ZJH_EXITTABLE = 0x00060009;
var S_ZJH_EXITTABLE = 0x0006000A;
//坐下
var C_ZJH_SITDOWN = 0x0006000B;
var S_ZJH_SITDOWN = 0x0006000C;
//站起
var C_ZJH_STANDUP = 0x0006000D;
var S_ZJH_STANDUP = 0x0006000E;

//继续游戏
var C_ZJH_CONTINUE = 0x00060010;
var S_ZJH_CONTINUE = 0x00060011;

//通知其他玩家，玩家数据发生变化
var S_ZJH_NOTICE_PLAYERDATA_CHANGE = 0x00060022;
//发牌
var S_ZJH_GAMESTART = 0x00060024;

//下注
var C_ZJH_BET = 0x00060012;
var S_ZJH_BET = 0x00060013;

//弃牌
var C_ZJH_GIVEUP = 0x00060016;
var S_ZJH_GIVEUP = 0x00060017;

//看牌
var C_ZJH_SEECARD = 0x0006001C;
var S_ZJH_SEECARD = 0x0006001D;
//通知其他玩家，有玩家看牌
var S_ZJH_NOTICE_SEECARD = 0x0006001E;

//比牌
var C_ZJH_COMPARE = 0x00060014;
var S_ZJH_COMPARE = 0x00060015;

//聊天
var C_ZJH_CHAT = 0x00060020;
var S_ZJH_CHAT = 0x00060021;

//游戏结束，发送得分
var S_ZJH_GAMEOVER = 0x00060025;

//踢出玩家离开游戏
var S_ZJH_KICKPLAYER = 0x00060026;

var C_ZJH_REFRESH_ROOM	= 0x60027;	//刷新房间数据
var S_ZJH_REFRESH_ROOM	= 0x60028;

var C_ZJH_PLAYER_INFO = 0x60029;
var S_ZJH_PLAYER_INFO = 0x6002A;

var C_ZJH_RANDOM_ENTERTABLE	= 0x6002B;
var S_ZJH_RANDOM_ENTERTABLE	= 0x6002C;

var S_ZJH_INGOT_AWARD_NOTIFY		= 0x6002E;

var S_ZJH_JICARD = 0x60030;//开始时，通知鸡牌
var S_ZJH_JICARD_WIN = 0x60031;//鸡牌获胜

var S_ZJH_RE_RANDOM_ENTER_NOTIFY    = 0x60032;  //通知客户端重新配桌

var C_ZJH_OPEN_CARD	= 0x60033;
var S_ZJH_OPEN_CARD	= 0x60034;

//zjh网络处理
var GameZJHNet = cc.Class.extend({

    receZJHCommand:function(command,packet){
        switch (command){
            case S_ZJH_ENTERROOM:
                this.receZJHEnterRoomCommand(packet);
                break;
            case S_ZJH_EXITROOM:
                this.receZJHExitRoomCommand(packet);
                break;
            case S_ZJH_REFRESH_ROOM:
                this.receZJHRefreshRoomCommand(packet);
                break;
            case S_ZJH_ENTERTABLE:
                this.receZJHEnterTableCommand(packet);
                break;
            case S_ZJH_RANDOM_ENTERTABLE:
                this.receZJHRandomEnterTableCommand(packet);
                break;
            case S_ZJH_EXITTABLE:
                this.receZJHExitTableCommand(packet);
                break;
            case S_ZJH_SITDOWN:
                this.receZJHSitDownCommand(packet);
                break;
            case S_ZJH_STANDUP:
                this.receZJHStandUpCommand(packet);
                break;
            case S_ZJH_CONTINUE:
                this.receZJHContinueCommand(packet);
                break;
            case S_ZJH_NOTICE_PLAYERDATA_CHANGE:
                this.receZJHNoticePlayerDataChangeCommand(packet);
                break;
            case S_ZJH_GAMESTART:
                this.receZJHGameStartCommand(packet);
                break;
            case S_ZJH_BET:
                this.receZJHBetCommand(packet);
                break;
            case S_ZJH_GIVEUP:
                this.receZJHGiveUpCommand(packet);
                break;
            case S_ZJH_SEECARD:
                this.receZJHSeeCardCommand(packet);
                break;
            case S_ZJH_NOTICE_SEECARD:
                this.receZJHNoticeSeeCardCommand(packet);
                break;
            case S_ZJH_COMPARE:
                this.receZJHCompareCommand(packet);
                break;
            case S_ZJH_OPEN_CARD:
                this.receZJHOpenCardCommand(packet);
                break;
            case S_ZJH_GAMEOVER:
                this.receZJHGameOverCommand(packet);
                break;
            case S_ZJH_KICKPLAYER:
                this.receZJHKickPlayerCommand(packet);
                break;
            case S_ZJH_CHAT:
                this.receZJHChatCommand(packet);
                break;
            case S_ZJH_PLAYER_INFO:
                this.receZJHPlayerInfoCommand(packet);
                break;
            case S_ZJH_INGOT_AWARD_NOTIFY:
                this.receZJHIngotAwardNotifyCommand(packet);
                break;
            case S_ZJH_JICARD:
                this.receZJHJiCardCommand(packet);
                break;
            case S_ZJH_JICARD_WIN:
                this.receZJHJiCardWinCommand(packet);
                break;
            case S_ZJH_RE_RANDOM_ENTER_NOTIFY:
                this.receZJHReRandomEnterNotifyCommand(packet);
                break;
            default:
                log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    //刷新房间
    receZJHRefreshRoomCommand:function(packet){
        log("receZJHRefreshRoomCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_REFRESH_ROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh refreshroom suc");
            var tablecount = packet.readInt();
            var tables = [];
            for(var i=0;i<tablecount;i++){
                var table = {}
                table.id = packet.readInt();
                table.name = packet.readString();
                table.minBet = packet.readInt();
                table.enterPoint = packet.readInt();
                table.seeRound = packet.readInt();//	第几轮之后可以看牌
                table.compareRound = packet.readInt();//	第几轮之后可以比牌
                table.endRound = packet.readInt();//	第几轮之后必须比牌结束游戏
                table.tablePlayers = packet.readInt();
                table.chairCount = packet.readInt();
                table.chairdatas = [];
                //log("table.name="+table.name);
                for(var j=0;j<table.chairCount;j++){
                    var cdata = {};
                    cdata.chairId = packet.readInt();
                    cdata.playerFlag = packet.readInt(); //该椅子上是否有玩家，有玩家1，无玩家0, 有玩家下面字段有效
                    if(cdata.playerFlag == 1){
                        cdata.playerId = packet.readLong();
                        cdata.playerNickName = packet.readString();
                        cdata.playerAvatar = packet.readString();
                    }
                    table.chairdatas[j] = cdata;
                }
                tables[i] = table;
            }
            netdata[2] = tables;
            sGameData.mLastGetRoomDataTime = (new Date()).getTime();
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
    //进入房间
    receZJHEnterRoomCommand:function(packet){
        log("receZJHEnterRoomCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_ENTERROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh enterroom suc");
            var state = packet.readByte();
            netdata[2] = state;
            var roomType = packet.readInt();
            netdata[3] = roomType;
            log("zjh roomType=="+roomType);
            if(roomType == ROOM_ZI_JIAN_TYPE) {
                var tablecount = packet.readInt();
                var tables = [];
                for (var i = 0; i < tablecount; i++) {
                    var table = {}
                    table.id = packet.readInt();
                    table.name = packet.readString();
                    table.minBet = packet.readInt();
                    table.enterPoint = packet.readInt();
                    table.seeRound = packet.readInt();//	第几轮之后可以看牌
                    table.compareRound = packet.readInt();//	第几轮之后可以比牌
                    table.endRound = packet.readInt();//	第几轮之后必须比牌结束游戏
                    table.tablePlayers = packet.readInt();
                    table.chairCount = packet.readInt();
                    table.chairdatas = [];
                    //log("table.name="+table.name);
                    for (var j = 0; j < table.chairCount; j++) {
                        var cdata = {};
                        cdata.chairId = packet.readInt();
                        cdata.playerFlag = packet.readInt(); //该椅子上是否有玩家，有玩家1，无玩家0, 有玩家下面字段有效
                        if (cdata.playerFlag == 1) {
                            cdata.playerId = packet.readLong();
                            cdata.playerNickName = packet.readString();
                            cdata.playerAvatar = packet.readString();
                        }
                        table.chairdatas[j] = cdata;
                    }
                    tables[i] = table;
                }
                netdata[4] = tables;
            }else{
                var table = {}
                table.minBet = packet.readInt();
                table.seeRound = packet.readInt();//	第几轮之后可以看牌
                table.compareRound = packet.readInt();//	第几轮之后可以比牌
                table.endRound = packet.readInt();//	第几轮之后必须比牌结束游戏
                netdata[4] = table;
                log("basetable=="+table.minBet+"|"+table.seeRound+"|"+table.compareRound+"|"+table.endRound);
            }
            sGameData.mLastGetRoomDataTime = (new Date()).getTime();
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
    //退出房间
    receZJHExitRoomCommand:function(packet){
        log("receZJHExitRoomCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_EXITROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh exitroom suc");
            sGameData.mMeStandUp = true;
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

    //进入桌子
    receZJHEnterTableCommand:function(packet){
        log("receZJHEnterTableCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_ENTERTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh entertable suc");
            var gameNo = packet.readString();
            var gameState = packet.readInt();
            netdata[2] = gameNo;
            netdata[3] = gameState;
            if(gameState != ZJH_NONE_STATE){
                var bankChairId = packet.readInt();
                var nextChairId = packet.readInt();
                var currAnBet = packet.readInt();
                var countBet = packet.readInt();
                netdata[4] = bankChairId;
                netdata[5] = nextChairId;
                netdata[6] = currAnBet;
                netdata[7] = countBet;
            }
            var plen = packet.readInt();
            var players = []
            for(var i=0;i<plen;i++){
                var player = {};
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.nickName = packet.readString();
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
                log("player.id="+player.id)
                log("player.userName="+player.userName)
                log("player.nickName="+player.nickName)
                players[i] =  player;
            }

            var glen = packet.readInt();
            var gameplayers = []
            for(var i=0;i<glen;i++){
                var gp = {};
                gp.chairId = packet.readInt();
                gp.hasplayer = packet.readInt();
                if(gp.hasplayer ==1){
                    gp.playerId = packet.readLong();
                    gp.state = packet.readInt();
                    if(gp.state == P_GAME_STATE){
                        gp.bSee =   packet.readBool(); //是否看牌牌
                        gp.bDiu =   packet.readBool();//是否丢牌
                        gp.betNum = packet.readInt();//玩家下注额
                        gp.betCount = packet.readInt();//投注次数
                    }
                }
                gameplayers[i] = gp;
            }

            var cardlen = packet.readInt();
            var cards = [];
            for(var j = 0;j<cardlen;j++){
                cards[j] = packet.readByte();
            }
            netdata[8] = players;
            netdata[9] = gameplayers;
            netdata[10] = cards;
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
    //随机进入桌子
    receZJHRandomEnterTableCommand:function(packet){
        log("receZJHRandomEnterTableCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_RANDOM_ENTERTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh random entertable suc");
            var tableId = packet.readInt();
            var gameNo = packet.readString();
            var gameState = packet.readInt();
            netdata[2] = gameNo;
            netdata[3] = gameState;
            if(gameState != ZJH_NONE_STATE){
                var bankChairId = packet.readInt();
                var nextChairId = packet.readInt();
                var currAnBet = packet.readInt();
                var countBet = packet.readInt();
                netdata[4] = bankChairId;
                netdata[5] = nextChairId;
                netdata[6] = currAnBet;
                netdata[7] = countBet;
            }
            var plen = packet.readInt();
            var players = []
            for(var i=0;i<plen;i++){
                var player = {};
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.nickName = packet.readString();
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
                log("player.id="+player.id)
                log("player.userName="+player.userName)
                log("player.nickName="+player.nickName)
                players[i] =  player;
            }

            var glen = packet.readInt();
            var gameplayers = []
            for(var i=0;i<glen;i++){
                var gp = {};
                gp.chairId = packet.readInt();
                gp.hasplayer = packet.readInt();
                if(gp.hasplayer ==1){
                    gp.playerId = packet.readLong();
                    gp.state = packet.readInt();
                    if(gp.state == P_GAME_STATE){
                        gp.bSee =   packet.readBool(); //是否看牌牌
                        gp.bDiu =   packet.readBool();//是否丢牌
                        gp.betNum = packet.readInt();//玩家下注额
                        gp.betCount = packet.readInt();//投注次数
                    }
                }
                gameplayers[i] = gp;
            }

            var cardlen = packet.readInt();
            var cards = [];
            for(var j = 0;j<cardlen;j++){
                cards[j] = packet.readByte();
            }
            netdata[8] = players;
            netdata[9] = gameplayers;
            netdata[10] = cards;
            var mychairId = packet.readInt();
            log("mychairId=="+mychairId);
            netdata[11] = mychairId;
            netdata[12] = tableId;
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
    //退出桌子
    receZJHExitTableCommand:function(packet){
        log("receZJHExitTableCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_EXITTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh exit suc");
            sGameData.mMeStandUp = true;
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
    //坐下
    receZJHSitDownCommand:function(packet){
        log("receZJHSitDownCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_SITDOWN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh sitdown suc");
            var chairid = packet.readInt();
            netdata[2] = chairid;
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
    //站起
    receZJHStandUpCommand:function(packet){
        log("receZJHStandUpCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_STANDUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh standup suc");
            sGameData.mMeStandUp = true;
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
    //继续游戏
    receZJHContinueCommand:function(packet){
        log("receZJHContinueCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_CONTINUE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh continue suc");

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
    //玩家数据变化
    receZJHNoticePlayerDataChangeCommand:function(packet){
        log("receZJHNoticePlayerDataChangeCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_NOTICE_PLAYERDATA_CHANGE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh player data change suc");
            var type = packet.readInt();
            var playerId = packet.readLong();
            var player = {};
            player.id = playerId;
            if(type == SCORE_INFO_CHANGE){
                player.level = packet.readInt();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
            }else if(type==ENTER_ROOM_CHANGE||type==BASIC_INFO_CHANGE||type==ENTER_TABLE_CHANGE){
                player.userName = packet.readString();
                player.nickName = packet.readString();
                player.ipToAddress = packet.readString();
                player.avatar = packet.readString();
                player.sex = packet.readInt();
                player.level = packet.readInt();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
            }else if(type==SITDOWN_CHANGE){
                player.chairId = packet.readInt();
            }else if(type==EXIT_TABLE_CHANGE){
                if(playerId == sGameData.mUser.id){
                    sGameData.mMeStandUp = true;
                }
            }else if(type==STANDUP_CHANGE){
                if(playerId == sGameData.mUser.id){
                    sGameData.mMeStandUp = true;
                }
            }else if(type==EXIT_ROOM_CHANGE){
                if(playerId == sGameData.mUser.id){
                    sGameData.mMeStandUp = true;
                }
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
        log("receZJHNoticePlayerDataChangeCommand==1");
    },
    //游戏开始
    receZJHGameStartCommand:function(packet){
        log("receZJHGameStartCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_GAMESTART;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh gamestart suc");
            var gameNo = packet.readString();
            var bankChairId = packet.readInt();
            var nextChairId = packet.readInt();
            netdata[2] = bankChairId;
            netdata[3] = nextChairId;
            netdata[4] = gameNo;
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
    //投注 －－跟注加注
    receZJHBetCommand:function(packet){
        log("receZJHBetCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_BET;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh bet suc");
            var bet = packet.readInt();
            var chairId = packet.readInt();
            var nextChairId = packet.readInt();
            netdata[2] = bet;
            netdata[3] = chairId;
            netdata[4] = nextChairId;

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
    //弃牌
    receZJHGiveUpCommand:function(packet){
        log("receZJHGiveUpCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_GIVEUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh giveup suc");
            var chairId = packet.readInt();
            var nextChairId = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = nextChairId;
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
    //看牌
    receZJHSeeCardCommand:function(packet){
        log("receZJHSeeCardCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_SEECARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh seecard suc");
            var cards = []
            cards[0] =  packet.readByte();
            cards[1] =  packet.readByte();
            cards[2] =  packet.readByte();
            netdata[2] = cards;
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
    //通知某玩家看牌
    receZJHNoticeSeeCardCommand:function(packet){
        log("receZJHNoticeSeeCardCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_NOTICE_SEECARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh notice seecard suc");
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
    //比牌
    receZJHCompareCommand:function(packet){
        log("receZJHCompareCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_COMPARE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh compare suc");
            var chairId = packet.readInt();
            var bet = packet.readInt();
            var otherChairId = packet.readInt();
            var winChairId = packet.readInt();
            var nextChairId = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = bet;
            netdata[4] = otherChairId;
            netdata[5] = winChairId;
            netdata[6] = nextChairId;

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
    receZJHOpenCardCommand:function(packet){
        log("receZJHOpenCardCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_OPEN_CARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh opencard suc");
            var chairId = packet.readInt();
            var betnum = packet.readInt();
            var msg = packet.readString();
            netdata[2] = chairId;
            netdata[3] = betnum;
            netdata[4] = msg;
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
    receZJHGameOverCommand:function(packet){
        log("receZJHGameOverCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_GAMEOVER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh gameover suc");
            var winChairId = packet.readInt();
            netdata[2] = winChairId;
            var count = packet.readInt();
            var wdatas = [];
            for(var i=0;i<count;i++){
                var data = {};
                data.chairId = packet.readInt();
                data.currScore = packet.readInt();
                data.cardType = packet.readInt();
                data.cards = []
                data.cards[0] = packet.readByte();
                data.cards[1] = packet.readByte();
                data.cards[2] = packet.readByte();
                wdatas[i] = data;
            }
            log("zjh gameover suc1");
            netdata[3] = wdatas;
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
    //踢出玩家
    receZJHKickPlayerCommand:function(packet){
        log("receZJHKickPlayerCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_KICKPLAYER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh kickplayer suc");
            sGameData.mMeStandUp = true;
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
    receZJHChatCommand:function(packet){
        log("receZJHChatCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_CHAT;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh chat suc");
            var chair = packet.readInt();
            var type = packet.readInt();
            var chatId = -1;
            var msg = "";
            var tochair = -1
            log("type=="+type);
            ////type 1 常用聊天 2交互 3聊天 4私聊 5表情
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
        sGameData.mNetDataArray_Game_nowait.push(netdata);
        packet.clear();
        packet = null;
    },
    //玩家信息
    receZJHPlayerInfoCommand:function(packet){
        log("receZJHPlayerInfoCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_PLAYER_INFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh player info suc");
            var player = {};
            player.id = packet.readLong();
            player.xp = packet.readInt();
            player.winCount = packet.readInt();
            player.loseCount = packet.readInt();
            player.maxScore = packet.readInt();
            player.maxCardType = packet.readInt();
            player.maxCard = packet.readString();
            player.bFriend = packet.readInt();
            log("player=="+player.id+"|"+player.winCount+"|"+player.loseCount+"|"+player.maxScore+"|"+player.maxCardType+"|"+player.maxCard)
            var strData = player.maxCard;
            var maxCards = []
            for (var i = 0; i < strData.length; i++) {
                var card = strData.charCodeAt(i);
                maxCards.push(card);
            }
            player.maxCards = maxCards;

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
    receZJHIngotAwardNotifyCommand:function(packet){
        log("receZJHIngotAwardNotifyCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_INGOT_AWARD_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh ingot award suc");
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
    receZJHJiCardCommand:function(packet){
        log("receZJHJiCardCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_JICARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh jicard suc");

            var cards = [];
            for(var i=0;i<3;i++){
                var card = packet.readByte();
                cards.push(card);
            }
            var ptype = packet.readInt();
            var pnum = packet.readInt();

            var aJiCardData = {};
            aJiCardData.cards = cards;
            aJiCardData.ptype = ptype;
            aJiCardData.pnum = pnum;

            netdata[2] = aJiCardData;

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
    receZJHJiCardWinCommand:function(packet){
        log("receZJHJiCardWinCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_JICARD_WIN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh jicard win suc");
            var userId = packet.readLong();
            var ptype = packet.readInt();
            var pnum = packet.readInt();
            netdata[2] = userId;
            netdata[3] = ptype;
            netdata[4] = pnum;
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
    receZJHReRandomEnterNotifyCommand:function(packet){
        log("receZJHReRandomEnterNotifyCommand==");
        var netdata = [];
        netdata[0] = S_ZJH_RE_RANDOM_ENTER_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("zjh re random enter notify suc");
            var code = packet.readInt();
            var msg = packet.readString();
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
    sendZJHEnterRoom:function(roomId,session){
        log("sendZJHEnterRoom=="+roomId+"|"+session);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_ENTERROOM);
        packet.writeInt(roomId);
        packet.writeString(session);
        this.sendData(packet);
    },
    //退出房间
    sendZJHExitRoom:function(){
        log("sendZJHExitRoom==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_EXITROOM);
        this.sendData(packet);
    },
    //进入桌子
    sendZJHEnterTable:function(tableId){
        log("sendZJHEnterTable=="+tableId);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_ENTERTABLE);
        packet.writeInt(tableId);
        this.sendData(packet);
    },
    //随机进入桌子-1
    sendZJHRandomEnterTable:function(prevtableId){
        log("sendZJHRandomEnterTable=="+prevtableId);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_RANDOM_ENTERTABLE);
        packet.writeInt(prevtableId);
        this.sendData(packet);
    },
    //退出桌子
    sendZJHExitTable:function(){
        log("sendZJHExitTable==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_EXITTABLE);
        this.sendData(packet);
    },
    //坐下
    sendZJHSitDown:function(chairId){
        log("sendZJHSitDown=="+chairId);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_SITDOWN);
        packet.writeInt(chairId);
        this.sendData(packet);
    },
    //站起
    sendZJHStandUp:function(){
        log("sendZJHStandUp==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_STANDUP);
        this.sendData(packet);
    },
    //继续游戏
    sendZJHContinue:function(){
        log("sendZJHContinue==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_CONTINUE);
        this.sendData(packet);
    },
    //投注
    sendZJHBet:function(num){
        log("sendZJHBet==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_BET);
        packet.writeInt(num);
        this.sendData(packet);
    },
    //弃牌
    sendZJHGiveUp:function(){
        log("sendZJHGiveUp==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_GIVEUP);
        this.sendData(packet);
    },
    //看牌
    sendZJHSeeCard:function(){
        log("sendZJHSeeCard==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_SEECARD);
        this.sendData(packet);
    },
    //比牌
    sendZJHCompare:function(chairId){
        log("sendZJHCompare=="+chairId);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_COMPARE);
        packet.writeInt(chairId);
        this.sendData(packet);
    },
    //开牌
    sendZJHOpencard:function(){
        log("sendZJHOpencard==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_OPEN_CARD);
        this.sendData(packet);
    },
    //聊天 //type 1 常用聊天 2交互 3聊天 4私聊 5表情
    sendZJHChat:function(type,chatId,msg,toChairId){
        log("sendZJHChat=="+type+"|"+chatId);
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_CHAT);
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
    //刷新房间
    sendZJHRefreshRoom:function(){
        log("sendZJHRefreshRoom==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_REFRESH_ROOM);
        this.sendData(packet);
    },
    //玩家信息
    sendZJHPlayerInfo:function(userId){
        log("sendZJHPlayerInfo==");
        var packet = Packet.create(true);
        packet.writeInt(C_ZJH_PLAYER_INFO);
        packet.writeLong(userId);
        this.sendData(packet);
    }



});