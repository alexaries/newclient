/**
 * Created by Administrator on 14-4-10.
 */
//游戏 定义
//网络返回状态 0成功 1失败
var NET_SUCCESS = 0 ;
var NET_FAIL = 1 ;

//代理商
var AGENT_APPLE         =  "apple";
//android
var AGENT_DUOLE          =  "duole"; //有微信
var AGENT_DUOJIN          =  "duojin"; //有微信

var AGENT_DUOLE_DDZ          =  "duoleddz";


var AGENT_DUOLEPAY          =  "duolepay";//审核版


//积分墙
var SCOREWALL_DOMOB     = "domob" //多盟
var SCOREWALL_YOUMI     = "youmi" //有米

//充值渠道号
var PAY_CHANNEL_ALIPAY      = 1;
var PAY_CHANNEL_WXPAY       = 2;
var PAY_CHANNEL_CMCCMM      = 3;
var PAY_CHANNEL_APPSTOTE    = 4;
var PAY_CHANNEL_HEEPAY      = 5; //汇付宝
var PAY_CHANNEL_QQ          = 6;
var PAY_CHANNEL_UPMP        = 10;
var PAY_CHANNEL_GOOGLEPLAY  = 11;
var PAY_CHANNEL_JD          = 12;//lladd
var PAY_CHANNEL_UPMP1        = 13;//lladd
//充值方式
var PAY_APPLE       = "duole"  //appstore
var PAY_GOOGLE      = "googleplay"  //googleplay
var PAY_ALIPAY      = "alipay"  //支付宝
var PAY_WXPAY       = "wxpay"  // 微信
var PAY_UPMP        = "upmp"  //银联
var PAY_HEEPAY      = "heepay"  //汇付宝
var PAY_SMS         = "sms"  // 短信
var PAY_JD			= "jdh5" //京东H5 //lladd
var PAY_YL 			= "ylh5" //银联H5 //lladd




var PAY_DUOLE       = "duole"  //appstore
var PAY_DUOLE_DDZ       = "duoleddz"  //appstore

//
var GAMERES_MAIN_VERSION = 2; //请求游戏资源，区分新旧

//版本 －－（未使用 ）
var VERSION_APP         = "app"


//版本
var APPVERSION_ZC = "zc" //标准版

//游戏类型

var GAME_TYPE_DDZ               = 4000;
var GAME_TYPE_DN                = 5000;
var GAME_TYPE_ZJH               = 6000;


var GAME_TYPE_DDZMATCH          = 8000;




//游戏指令类型

var T_DDZ_COMMAND           = 0x00040000;//斗地主指令类型
var T_DN_COMMAND            = 0x00050000;//斗牛指令类型
var T_ZJH_COMMAND           = 0x00060000;//扎金花指令类型


var T_MOBAN_COMMAND         = 0x99990000;//模版test
//－－－－－－


var CONN_SERVER_ANY = 0; //通用指令 连哪个服务器都可以
var CONN_SERVER_HALL = 1; //配置里的 ip ，sGameConfig.serverIp
var CONN_SERVER_GAME = 2; //room
var CONN_SERVER_MATCH = 3; //match


//场景对应的id
var TargetSceneMain         = 0;
var TargetSceneLogin        = 1;
var TargetSceneMatch        = 2;
//var TargetSceneScoreWall  = 5;//界面已删除
var TargetSceneHall         = 11;//(已弃用，qp和main统一，单机用djhall)
var TargetSceneDJHall       = 12;//单机游戏大厅
var TargetSceneDDZ          = 21;
var TargetSceneDZPK         = 22;
var TargetSceneZJH          = 23;
var TargetSceneDN           = 24;


var TargetSceneReConnNet    = 50;
var TargetSceneMoban        = 99999;


//游戏进入类型
var GAME_ENTERTYPE_QPHALL       = 1; //先进棋牌大厅（棋牌）
var GAME_ENTERTYPE_DJHALL       = 2; //先进单机大厅（动物快跑）
var GAME_ENTERTYPE_ENTERGAME    = 3; //直接进游戏（套牛）
var GAME_ENTERTYPE_MATCH        = 4; // 进比赛大厅
//－－－－－－

//［gameId,场景对应id,进入类型，
// open方法,load方法，
// goToMainFromGame方法，continueActionAfterReconnectNet方法］
// 类型 1先进棋牌大厅 2先进单机大厅 3直接进游戏 4
var GameData_ID_GAMEID              = 0;//游戏id
var GameData_ID_SCENEID             = 1;//游戏场景对应id
var GameData_ID_ENTERTYPE           = 2;//游戏进入类型
var GameData_ID_ENTERGAME_FUNC      = 3;//进入游戏方法
var GameData_ID_LOADGAME_FUNC       = 4;//加载游戏（先加载资源，后进入游戏）方法
var GameData_ID_QUITGAME_FUNC       = 5;//从游戏退出方法
var GameData_ID_RECONNECTNET_FUNC   = 6;//进入房间时 网络重连后发指令 方法
var GameData_ID_CMD_TYPE            = 7;//指令类型
var GameData_ID_INITNET_METHOD      = 8;//初始化网络方法
var GameData_ID_RECECMD_METHOD      = 9;//接受指令方法
var GameData_ID_DEALCMD_METHOD      = 10;//处理指令方法

//接收到数据结果
var RESULT_NONE =  0 //通知接收数据结果
var RESULT_SUCC =  1 //
var RESULT_FAIL =  2 //

//用户消息类型
var USER_MSG_SYS            = 0 //
var USER_MSG_INVITE_FRIEND  = 1 //邀请好友消息

//奖励(附件)  类型
var GOODS_SOFTCASH      = 1;    //金币(欢乐豆)
var GOODS_HARDCASH      = 2;    //元宝(奖券)
var GOODS_MONEY_TYPE    = 3;  //充值货币类型
var GOODS_RPOPS_TYPE    = 4;  //道具
var GOODS_PRIZES_TYPE   = 5; //奖品

//游戏模式
var GAMEMODE_NORMAL         = 0;//普通模式
var GAMEMODE_MATCH          = 1;//比赛模式
var GAMEMODE_MATCH_VIDEO    = 9;//播放录像模式

var DDZ_RULE_NORMAL = 0;//ddz规则（叫123分）
var DDZ_RULE_SC = 1;//ddz 四川规则（叫 倒 拉）

//比赛模式
var MATCHSTART_TIME     = 1;//定时开赛
var MATCHSTART_COUNT    = 2;//人满开赛

//道具id
var PROPS_SOFTCASH              = 1
var PROPS_HARDCASH              = 2
var BOTS_PROPS 			        = 6;		//算牌器
var NOTE_CARD_MONTH_PROPS 		= 5;		//记牌器月卡


//语言
var LANGUAGE_ZH_CN = "zh-cn"; //简体
var LANGUAGE_ZH_TW = "zh-tw"; //繁体
var LANGUAGE_ZH_ZY = "zh-zy"; //藏语

//货币类型
var MONEYTYPE_SOFTCASH = 0; //金币
var MONEYTYPE_HARDCASH = 1; //元宝

//比赛状态
var MATCHSTATE_SIGNUP       = 1;//报名
var MATCHSTATE_GAMEING      = 2;//游戏
var MATCHSTATE_END          = 3;//结束
var MATCHSTATE_STOP         = 4;//比赛中止

//比赛通知 类型
var MATCH_NOTIFY_WAIT_START     = 0//等待其他玩家结束游戏，从新排队
var MATCH_NOTIFY_WAIT_END       = 1//等待其他玩家结束游戏，结束结算
var MATCH_NOTIFY_MOVE_NEXT      = 2; //通知比赛移动到下一场
var MATCH_NOTIFY_RANK           = 3;//通知比赛的排名
var MATCH_NOTIFY_GAMETABLECOUNT = 4;//通知当前还在游戏中的桌子数

//登陆类型
var LOGINTYPE_GUEST     = 0;
var LOGINTYPE_USER      = 1;
var LOGINTYPE_AGENT     = 2;

//最大充值验证次数
var MAXPAYVERIFYNUM = 3;

var RES_UPDATE_NONE        =     0   //资源未更新
var RES_UPDATE_LOAD_ING    =     1   //资源正在下载
var RES_UPDATE_LOAD_SUC    =     2   //资源下载成功
var RES_UPDATE_LOAD_FAIL   =     3   //资源下载失败
var RES_UPDATE_UNZIP_FAIL  =     4   //资源解压缩失败
var RES_UPDATE_END         =     5   //资源更新结束（解压缩完成）


//保存在本地的变量名
var HAS_LOCAL_USER_DATA         = "hasLocalUserData";
var HAS_LOCAL_GUEST_USER_DATA   = "hasLocalguestUserData";
var LOCAL_GUESTGUID             = "guestguid"
var LOCAL_LOGINTYPE             = "logintype"
var LOCAL_LOGINAGENT            = "loginagent"
var LOCAL_USERNAME              = "username"
var LOCAL_PASSWORD              = "password"
var LOCAL_REMEMBERPWD           = "rememberpwd"
var LOCAL_MUSICON               = "musicon"
var LOCAL_SOUNDON               = "soundon"
var LOCAL_PROPSIMGVER           = "props_imgver"
var LOCAL_PRIZEIMGVER           = "prize_imgver"
var HAS_LOCAL_IMG_DATA          = "hasLocalImgData";
var HAS_LOCAL_GUESTID           = "haslocalguestid"
var LOCAL_GUESTID               = "guestid"

var IOS_PUSH_TOKEN_UID         = "iospushtokenuid";

var LOCAL_MJ_NEWGUIDE           = "localmjnewguide"




//***********************
//牌的花色
//0:桃 1:杏 2:梅 3:方  4:小王(15)  5:大王(16)
//牌的点数定义
//3 4 5 6 7 8 9 10 11J 12Q 13K 14A 15_2 16小王 17大王

//牌的 cardvalue （网络数据）
//    for(i=2; i < 15; i++){
//        cards[p++]=i + 0x00; //黑
//        cards[p++]=i + 0x10; //红
//        cards[p++]=i + 0x20; //梅
//        cards[p++]=i + 0x30;//方
//    }
//        cards[p++]=  0x4F; //小王
//        cards[p++]=  0x5F; //大王
//***********************
