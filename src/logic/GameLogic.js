/**
 * Created by Administrator on 14-5-13.
 * 游戏逻辑
 */
    //小的
var game_num_coin= [0,1,2,5,10, 20,25,50,100,250, 500,1000,2000,5000,10000, 20000,50000,100000,1000000];

//玩家 数据 变化 状态－－－
var EXIT_ROOM_CHANGE = 0 			// 离开房间
var ENTER_ROOM_CHANGE = 1 		// 进入房间
var ENTER_TABLE_CHANGE = 2 		// 进入桌子
var EXIT_TABLE_CHANGE = 3 		// 玩家退出桌子
var SITDOWN_CHANGE = 4 			// 坐下
var STANDUP_CHANGE = 5 			// 站立
var BASIC_INFO_CHANGE = 6  // 玩家基本信息发生变化
var SCORE_INFO_CHANGE = 7  // 玩家得分信息发生变化
var INSCRE_CHIP_CHANGE = 8  // 增加筹码 --dzpk
var NOTIFY_READY = 8;         // 玩家准备 --zjh

// 我的状态
var MYSTATE_SITDOWN  =   1  //已坐下
var MYSTATE_STAND    =   0

//是否坐下
var SITDOWN_YES  =   1  //坐下
var SITDOWN_NO   =   0  //未坐下

//是否在本局游戏中
var ISINGAME_YSE  =  1  //进入了本局游戏
var ISINGAME_NO  =   0  //未进入了本局游戏

//在本局游戏的状态
var PGAMESTATE_INGAME     =   0//在 本局游戏 中 还在游戏
var PGAMESTATE_OVERGAME   =   1//在 本局游戏 中 已不能操作（已弃牌）（zjh已出局）（dn已分牌）

//玩家状态
var P_NONE_STATE = 0;            //玩家不存在
var P_STAND_STATE = 1;           //玩家站立
var P_SITDOWN_STATE = 2;         //玩家坐下
var P_READY_STATE = 3;           //准备
var P_GAME_STATE = 4;            //玩家游戏

//桌子人数类型
var TABLE_TYPE_5 = 0; //5人桌 （zjh dn）
var TABLE_TYPE_9 = 1;//9人桌 （dzpk）


var TICK_ONLINE_COUNT = 1;  //在线人数
var TICK_NOTIFY = 2 ;       //通知消息
var TICK_USER_MSG = 3;      //用户消息
var TICK_FRIEND = 4;        //好友信息

var ROOM_ZI_JIAN_TYPE = 0; 		//自建场
var ROOM_TI_YAN_TYPE = 1; 		//体验场
var ROOM_XING_SHOU_TYPE = 2; 	//新手场
var ROOM_HUAN_LE_TYPE = 3; 		//欢乐场
var ROOM_CAI_FU_TYPE = 4; 		//财富场


var GameLogic = cc.Class.extend({
    mIndex:0, //某位置
    init:function () {

    },
    //获取筹码名称
    getCoinindex:function(num){
        var index = 0;
        for(var i=0;i<game_num_coin.length;i++){
            var num_coin = game_num_coin[i];
            if(num_coin <= num){
                index = i;
            }else{
                break;
            }
        }
        return index;
    }
});

//----更新 bug 先放这 BaseObject
