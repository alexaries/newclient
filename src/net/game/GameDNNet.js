/**
 * Created by Administrator on 14-5-14.
 */
var T_DN_COMMAND = 0x00050000;//斗牛指令类型

//斗牛
//进入房间
var C_DN_ENTERROOM = 0x00050003
var S_DN_ENTERROOM = 0x00050004
//退出房间
var C_DN_EXITROOM = 0x00050005;
var S_DN_EXITROOM = 0x00050006;
//进入桌子
var C_DN_ENTERTABLE = 0x00050007;
var S_DN_ENTERTABLE = 0x00050008;
//退出桌子
var C_DN_EXITTABLE = 0x00050009;
var S_DN_EXITTABLE = 0x0005000A;
//坐下
var C_DN_SITDOWN = 0x0005000B;
var S_DN_SITDOWN = 0x0005000C;
//站起
var C_DN_STANDUP = 0x0005000D;
var S_DN_STANDUP = 0x0005000E;

//继续游戏
var C_DN_CONTINUE = 0x00050010;
var S_DN_CONTINUE = 0x00050011;

//通知其他玩家，玩家数据发生变化
var S_DN_NOTICE_PLAYERDATA_CHANGE = 0x0005001E;
//发牌
var S_DN_SENDCARD = 0x00050020;

//下注
var C_DN_BET = 0x00050012;
var S_DN_BET = 0x00050013;
//通知进入下注状态
var S_DN_NOTICE_BET = 0x00050014;

//分牌
var C_DN_FENPAI = 0x0005001A;
var S_DN_FENPAI = 0x0005001B;

//抢庄
var C_DN_QIANGZHUANG = 0x00050015;
var S_DN_QIANGZHUANG = 0x00050016;
//通知抢庄
var S_DN_NOTICE_QIANGZHUANG = 0x00050017;

//游戏结束，发送得分
var S_DN_GAMEOVER = 0x00050022;

//踢出玩家离开游戏
var S_DN_KICKPLAYER = 0x00050023;

var C_DN_REFRESH_ROOM	= 0x50024;	//刷新房间数据
var S_DN_REFRESH_ROOM	= 0x50025;

var C_DN_PLAYER_INFO	= 0x50026; //玩家信息
var S_DN_PLAYER_INFO	= 0x50027;

var C_DN_RANDOM_ENTERTABLE	= 0x50028; //随机进入桌子
var S_DN_RANDOM_ENTERTABLE	= 0x50029;

var C_DN_USE_TOOLS_BOTS = 0x5002A;
var S_DN_USE_TOOLS_BOTS = 0x5002B;

var C_DN_CHAT = 0x5001C;  //聊天
var S_DN_CHAT = 0x5001D;

var S_DN_INGOT_AWARD_NOTIFY		= 0x5002C;

var S_DN_RE_RANDOM_ENTER_NOTIFY = 0x5002D;  //通知客户端重新配桌


//dn网络处理
var GameDNNet = cc.Class.extend({

    receDNCommand:function(command,packet){
        switch (command){
            case S_DN_ENTERROOM:
                this.receDNEnterRoomCommand(packet);
                break;
            case S_DN_EXITROOM:
                this.receDNExitRoomCommand(packet);
                break;
            case S_DN_REFRESH_ROOM:
                this.receDNRefreshRoomCommand(packet);
                break;
            case S_DN_ENTERTABLE:
                this.receDNEnterTableCommand(packet);
                break;
            case S_DN_RANDOM_ENTERTABLE:
                this.receDNRandomEnterTableCommand(packet);
                break;
            case S_DN_EXITTABLE:
                this.receDNExitTableCommand(packet);
                break;
            case S_DN_SITDOWN:
                this.receDNSitDownCommand(packet);
                break;
            case S_DN_STANDUP:
                this.receDNStandUpCommand(packet);
                break;
            case S_DN_CONTINUE:
                this.receDNContinueCommand(packet);
                break;
            case S_DN_NOTICE_PLAYERDATA_CHANGE:
                this.receDNNoticePlayerDataChangeCommand(packet);
                break;
            case S_DN_SENDCARD:
                this.receDNSendCardCommand(packet);
                break;
            case S_DN_NOTICE_BET:
                this.receDNNoticeBetCommand(packet);
                break;
            case S_DN_BET:
                this.receDNBetCommand(packet);
                break;
            case S_DN_FENPAI:
                this.receDNFenpaiCommand(packet);
                break;
            case S_DN_NOTICE_QIANGZHUANG:
                this.receDNNoticeQiangzhuangCommand(packet);
                break;
            case S_DN_QIANGZHUANG:
                this.receDNQiangzhuangCommand(packet);
                break;
            case S_DN_GAMEOVER:
                this.receDNGameOverCommand(packet);
                break;
            case S_DN_KICKPLAYER:
                this.receDNKickPlayerCommand(packet);
                break;
            case S_DN_CHAT:
                this.receDNChatCommand(packet);
                break;
            case S_DN_PLAYER_INFO:
                this.receDNPlayerInfoCommand(packet);
                break;
            case S_DN_USE_TOOLS_BOTS:
                this.receDNUseToolsBotsCommand(packet);
                break;
            case S_DN_INGOT_AWARD_NOTIFY:
                this.receDNIngotAwardNotifyCommand(packet);
                break;
            case S_DN_RE_RANDOM_ENTER_NOTIFY:
                this.receDNReRandomEnterNotifyCommand(packet);
                break;
            default:
                log("unknown command="+command);
                packet.clear();
                packet = null;
                break;
        }
    },
    //刷新房间数据
    receDNRefreshRoomCommand:function(packet){
        log("receDNRefreshRoomCommand==");
        var netdata = [];
        netdata[0] = S_DN_REFRESH_ROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn enter room suc");
            var tablecount = packet.readInt();
            var tables = [];
            for(var i=0;i<tablecount;i++){
                var table = {}
                table.id = packet.readInt();
                table.name = packet.readString();
                table.minBet = packet.readInt();
                //table.enterPoint = packet.readInt();
                table.tablePlayers = packet.readInt();
                table.chairCount = packet.readInt();
                table.chairdatas = [];
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
    receDNEnterRoomCommand:function(packet){
        log("receDNEnterRoomCommand==");
        var netdata = [];
        netdata[0] = S_DN_ENTERROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn enter room suc");
            var state = packet.readByte();
            netdata[2] = state;
            var tablecount = packet.readInt();
            var tables = [];
            for(var i=0;i<tablecount;i++){
                var table = {}
                table.id = packet.readInt();
                table.name = packet.readString();
                table.minBet = packet.readInt();
                //table.enterPoint = packet.readInt();
                table.tablePlayers = packet.readInt();
                table.chairCount = packet.readInt();
                table.chairdatas = [];
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
                log("table.name="+table.name+"|"+table.minBet)
                tables[i] = table;
            }
            netdata[3] = tables;
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
    receDNExitRoomCommand:function(packet){
        log("receDNExitRoomCommand==");
        var netdata = [];
        netdata[0] = S_DN_EXITROOM;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn exit room suc");
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
    receDNEnterTableCommand:function(packet){
        log("receDNEnterTableCommand==");
        var netdata = [];
        netdata[0] = S_DN_ENTERTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn enter table suc");
            var gameNo = packet.readString();
            var gameState = packet.readInt();
            var bankChairId = packet.readInt();
            netdata[2] = gameNo;
            netdata[3] = gameState;
            netdata[4] = bankChairId;
            log("gameState="+gameState)
            var plen = packet.readInt();
            var gameplayers = []
            for(var i=0;i<plen;i++){
                var gp = {}
                var player = {};
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.nickName = packet.readString();
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
                player.chairId = packet.readInt();
                gp.player = player
                log("player.id="+player.id)
                //log("player.userName="+player.userName)
                log("player.nickName="+player.nickName)
                log("player.chairId="+player.chairId)
                if(player.chairId!=-1){
                    gp.state = packet.readInt();
                    log("gp.state="+gp.state)
                    if(gameState == DN_HOLD_BANK_STATE){
                        gp.selectBank = packet.readInt();         //0:还没有进行抢庄操作，1:不抢，2:抢庄
                    }else if(gameState == DN_BET_STATE){
                        gp.bet = packet.readInt()
                    }else if(gameState == DN_SPLIT_CARD_STATE){
                        if(gp.state == P_GAME_STATE){
                            gp.bet = packet.readInt()
                            gp.cards = [];
                            var cardlen = packet.readInt();
                            for(var j = 0;j<cardlen;j++){
                                gp.cards[j] = packet.readByte();
                            }
                            log("gp.cards=="+gp.cards)
                            gp.fencards = [];
                            var fcardlen = packet.readInt();
                            for(var j = 0;j<fcardlen;j++){
                                gp.fencards[j] = packet.readByte();
                            }
                            log("gp.fencards=="+gp.fencards)
                        }
                    }
                }
                gameplayers[i] =  gp;
            }
            netdata[5] = gameplayers;
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
    receDNRandomEnterTableCommand:function(packet){
        log("receDNRandomEnterTableCommand==");
        var netdata = [];
        netdata[0] = S_DN_RANDOM_ENTERTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn random enter table suc");
            var tableId = packet.readInt();
            var gameNo = packet.readString();
            var gameState = packet.readInt();
            var bankChairId = packet.readInt();
            netdata[2] = gameNo;
            netdata[3] = gameState;
            netdata[4] = bankChairId;
            log("gameState="+gameState)
            var plen = packet.readInt();
            var gameplayers = []
            for(var i=0;i<plen;i++){
                var gp = {}
                var player = {};
                player.id = packet.readLong();
                player.userName = packet.readString();
                player.nickName = packet.readString();
                player.ipToAddress = packet.readString();
                player.sex = packet.readInt();
                player.avatar = packet.readString();
                player.xp = packet.readInt();
                player.softCash = packet.readLong();
                player.chairId = packet.readInt();
                gp.player = player
                log("player.id="+player.id)
                //log("player.userName="+player.userName)
                log("player.nickName="+player.nickName)
                log("player.chairId="+player.chairId)
                if(player.chairId!=-1){
                    gp.state = packet.readInt();
                    log("gp.state="+gp.state)
                    if(gameState == DN_HOLD_BANK_STATE){
                        gp.selectBank = packet.readInt();         //0:还没有进行抢庄操作，1:不抢，2:抢庄
                    }else if(gameState == DN_BET_STATE){
                        gp.bet = packet.readInt()
                    }else if(gameState == DN_SPLIT_CARD_STATE){
                        if(gp.state == P_GAME_STATE){
                            gp.bet = packet.readInt()
                            gp.cards = [];
                            var cardlen = packet.readInt();
                            for(var j = 0;j<cardlen;j++){
                                gp.cards[j] = packet.readByte();
                            }
                            log("gp.cards=="+gp.cards)
                            gp.fencards = [];
                            var fcardlen = packet.readInt();
                            for(var j = 0;j<fcardlen;j++){
                                gp.fencards[j] = packet.readByte();
                            }
                            log("gp.fencards=="+gp.fencards)
                        }
                    }
                }
                gameplayers[i] =  gp;
            }
            var mychiar = packet.readInt();
            netdata[5] = gameplayers;
            netdata[6] = mychiar;
            netdata[7] = tableId;
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
    receDNExitTableCommand:function(packet){
        log("receDNExitTableCommand==");
        var netdata = [];
        netdata[0] = S_DN_EXITTABLE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn exit table suc");
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
    receDNSitDownCommand:function(packet){
        log("receDNSitDownCommand==");
        var netdata = [];
        netdata[0] = S_DN_SITDOWN;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn sit down suc");
            var chairId = packet.readInt();
            netdata[2] = chairId;
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
    receDNStandUpCommand:function(packet){
        log("receDNStandUpCommand==");
        var netdata = [];
        netdata[0] = S_DN_STANDUP;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn standup suc");
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
    receDNContinueCommand:function(packet){
        log("receDNContinueCommand==");
        var netdata = [];
        netdata[0] = S_DN_CONTINUE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn continue suc");

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
    //玩家数据发生变化
    receDNNoticePlayerDataChangeCommand:function(packet){
        log("receDNNoticePlayerDataChangeCommand==");
        var netdata = [];
        netdata[0] = S_DN_NOTICE_PLAYERDATA_CHANGE;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn pdata change suc");
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
    },
    //发牌
    receDNSendCardCommand:function(packet){
        log("receDNSendCardCommand==");
        var netdata = [];
        netdata[0] = S_DN_SENDCARD;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn sendcard suc");
            var len = packet.readInt();
            var cards = [];
            for(var j = 0;j<len;j++){
                cards[j] = packet.readByte();
            }
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
    //通知开始投注
    receDNNoticeBetCommand:function(packet){
        log("receDNNoticeBetCommand==");
        var netdata = [];
        netdata[0] = S_DN_NOTICE_BET;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn notice need bet suc");
            var gameNo = packet.readString();
            var bankChairId = packet.readInt();
            var bankMultiple = packet.readInt();
            var ingame = packet.readInt();
            netdata[2] = gameNo;
            netdata[3] = bankChairId;
            netdata[4] = bankMultiple;
            netdata[5] = ingame;

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
    //投注
    receDNBetCommand:function(packet){
        log("receDNBetCommand==");
        var netdata = [];
        netdata[0] = S_DN_BET;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn bet suc");
            var chairId = packet.readInt();
            var bet = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = bet;
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
    //分牌
    receDNFenpaiCommand:function(packet){
        log("receDNFenpaiCommand==");
        var netdata = [];
        netdata[0] = S_DN_FENPAI;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn fenpai suc");
            var chairId = packet.readInt();
            var cards = [];
            for(var j = 0;j<5;j++){
                cards[j] = packet.readByte();
            }
            var cardType = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = cards;
            netdata[4] = cardType;

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
    //通知开始抢庄
    receDNNoticeQiangzhuangCommand:function(packet){
        log("receDNNoticeQiangzhuangCommand==");
        var netdata = [];
        netdata[0] = S_DN_NOTICE_QIANGZHUANG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn notice qiangz suc");

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
    //抢庄
    receDNQiangzhuangCommand:function(packet){
        log("receDNQiangzhuangCommand==");
        var netdata = [];
        netdata[0] = S_DN_QIANGZHUANG;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn qiangzhuang suc");
            var chairId = packet.readInt();
            var holdType = packet.readInt();
            netdata[2] = chairId;
            netdata[3] = holdType;
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
    receDNGameOverCommand:function(packet){
        log("receDNGameOverCommand==");
        var netdata = [];
        netdata[0] = S_DN_GAMEOVER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn gameover suc");
            var sdata = []
            var count = packet.readInt();
            for(var j = 0;j<count;j++){
                var scored = {}
                scored.chairId = packet.readInt();
                scored.currScore  = packet.readInt();
                sdata[j] = scored;
            }
            netdata[2] = sdata;
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
    receDNKickPlayerCommand:function(packet){
        log("receDNKickPlayerCommand==");
        var netdata = [];
        netdata[0] = S_DN_KICKPLAYER;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn kickplayer suc");
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
    receDNChatCommand:function(packet){
        log("receDNChatCommand==");
        var netdata = [];
        netdata[0] = S_DN_CHAT;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn chat suc");
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
        sGameData.mNetDataArray_Game_nowait.push(netdata);
        packet.clear();
        packet = null;
    },
    //玩家信息
    receDNPlayerInfoCommand:function(packet){
        log("receDNPlayerInfoCommand==");
        var netdata = [];
        netdata[0] = S_DN_PLAYER_INFO;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn player info suc");
            var player = {};
            player.id = packet.readLong();
            player.xp = packet.readInt();
            player.winCount = packet.readInt();
            player.loseCount = packet.readInt();
            player.maxScore = packet.readInt();
            player.maxCardType = packet.readInt();
            player.maxCard = packet.readString();
            player.bFriend = packet.readInt();
            log("player=="+player.id+"|"+player.winCount+"|"+player.loseCount+"|"+player.maxScore+"|"+player.maxCardType+"|"+player.maxCard+"|"+player.bFriend)
            var strData = player.maxCard;
            var maxCards = []
            for (var i = 0; i < strData.length; i++) {
                var card = strData.charCodeAt(i);
                maxCards.push(card);
            }
            log("maxCards=="+maxCards);
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
    receDNUseToolsBotsCommand:function(packet){
        log("receDNUseToolsBotsCommand==");
        var netdata = [];
        netdata[0] = S_DN_USE_TOOLS_BOTS;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn use tools");
            var count = packet.readInt();
            netdata[2] = count;
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
    receDNIngotAwardNotifyCommand:function(packet){
        log("receDNIngotAwardNotifyCommand==");
        var netdata = [];
        netdata[0] = S_DN_INGOT_AWARD_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn ingot award suc");
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
    receDNReRandomEnterNotifyCommand:function(packet){
        log("receDNReRandomEnterNotifyCommand==");
        var netdata = [];
        netdata[0] = S_DN_RE_RANDOM_ENTER_NOTIFY;
        var flag = packet.readByte();
        netdata[1] = flag;
        if(flag == NET_SUCCESS){
            log("dn re random enter notify suc");
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
    //发送进入房间
    sendDNEnterRoom:function(roomId,session){
        log("sendDNEnterRoom=="+roomId);
        var packet = Packet.create(true);
        packet.writeInt(C_DN_ENTERROOM);
        packet.writeInt(roomId);
        packet.writeString(session);
        this.sendData(packet);
    },
    //离开房间
    sendDNExitRoom:function(){
        log("sendDNExitRoom==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_EXITROOM);
        this.sendData(packet);
    },
    //进入桌子
    sendDNEnterTable:function(tableId){
        log("sendDNEnterTable=="+tableId);
        var packet = Packet.create(true);
        packet.writeInt(C_DN_ENTERTABLE);
        packet.writeInt(tableId);
        this.sendData(packet);
    },
    //随机进入桌子-1
    sendDNRandomEnterTable:function(prevtableId){
        log("sendDNRandomEnterTable=="+prevtableId);
        var packet = Packet.create(true);
        packet.writeInt(C_DN_RANDOM_ENTERTABLE);
        packet.writeInt(prevtableId);
        this.sendData(packet);
    },
    //退出桌子
    sendDNExitTable:function(){
        log("sendDNExitTable==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_EXITTABLE);
        this.sendData(packet);
    },
    //坐下
    sendDNSitDown:function(chairId){
        log("sendDNSitDown=="+chairId+"|");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_SITDOWN);
        packet.writeInt(chairId);
        this.sendData(packet);
    },
    //站起
    sendDNStandUp:function(){
        log("sendDNStandUp==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_STANDUP);
        this.sendData(packet);
    },
    //继续游戏
    sendDNContinue:function(){
        log("sendDNContinue==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_CONTINUE);
        this.sendData(packet);
    },
    //投注
    sendDNBet:function(num){
        log("sendDNBet=="+num);
        var packet = Packet.create(true);
        packet.writeInt(C_DN_BET);
        packet.writeInt(num);
        this.sendData(packet);
    },
    //分牌
    sendDNFenpai:function(cards){
        log("sendDNFenpai==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_FENPAI);
        for(var i= 0;i<5;i++){
            packet.writeByte(cards[i]);
        }
        this.sendData(packet);
    },
    //抢庄
    sendDNQiangZhuang:function(holdType){
        log("sendDNQiangZhuang==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_QIANGZHUANG);
        packet.writeInt(holdType);
        this.sendData(packet);
    },
    //刷新房间数据
    sendDNRefreshRoom:function(){
        log("sendDNRefreshRoom==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_REFRESH_ROOM);
        this.sendData(packet);
    },
    //聊天
    sendDNChat:function(type,chatId,msg,toChairId){
        log("sendZJHChat=="+chatId);
        var packet = Packet.create(true);
        packet.writeInt(C_DN_CHAT);
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
    sendDNPlayerInfo:function(userId){
        log("sendDNPlayerInfo==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_PLAYER_INFO);
        packet.writeLong(userId);
        this.sendData(packet);
    },
    sendDNUseToolsBots:function(){
        log("sendDNUseToolBots==");
        var packet = Packet.create(true);
        packet.writeInt(C_DN_USE_TOOLS_BOTS);
        this.sendData(packet);
    }


});