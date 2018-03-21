/**
 * Created by apple on 15-7-27.
 * 先在GameDef 定义相应的 gameId 和 场景id 及 指令类型
 * xxx_loadmethod 文件 放到g_game_load里
 * xxx_loadmethod 加到 JSDelegate
 * 设置gameConfigData_xxx
 * 把gameConfigData_xxx 配置到 gameLogic 的 setVersionInfo
 * 游戏用到的资源和js文件都放到xxx_loadmethod里
 */

//跳转到场景－－ 斗牛
var gotoGameDN = function(){
    log("gotoGameDN---")
    var canEnterDN = true;
    if(!canEnterDN){
        return;
    }
    if(g_hasLoadJs_DN){
        gotoGameDNAfterLoadJS();
    }else{
        loadGameJS_DN();
    }
}


//加载了本游戏的js后进入游戏
var gotoGameDNAfterLoadJS = function(){
    log("gotoGameDNAfterLoadJS---")
    g_hasLoadJs_DN = true;
    gotoSceneByLoading(TargetSceneDN);
}

//从游戏退出 （）
var goToMainFromGame_DN = function(){
    if(sGameData.mCurrLayer == sGameData.mDNLayer){//
        if(sGameData.mExitRoomForAction ==0) {
            if (sGameData.mUseRandomSit) {
                connectHallWhenExitRoom();
            }
            sGameData.mDNLayer.gotoMain();
        }
    }
}
//网络重连 进入房间  （）
var continueActionAfterReconnectNet_enter_DN = function(){
    log("continueActionAfterReconnectNet_enter_DN--")

    if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
        sGameNetData.mDNNet.sendDNEnterRoom(sGameData.mCurrRoom.roomId,sGameData.mUser.sessionId)
    }
}


//loadSceneByTarget  ---在这个方法 加入 跳转判断

//加载 场景 －－斗牛
var loadGameDN = function(){
    sGameData.mGameMode = GAMEMODE_NORMAL;
    var resources = concatArray([g_dn_resources,g_all_resources,g_game_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new DNGameScene.scene());
    }, this);
}


//初始化游戏网络
var initNetData_DN = function(){
    sGameNetData.mDNNet = new GameDNNet();
    sGameNetData.mHandleNetData_DN = new DN_HandleNetData();
}
//接受指令 方法
var receGCommand_DN = function(command,packet){
    sGameNetData.mDNNet.receDNCommand(command,packet);
}
//处理指令方法
var noticeCommand_DN = function(netdata,basescene){
    sGameNetData.mHandleNetData_DN.noticeDNCommand(netdata,basescene);
}

/**
 * 游戏配置数据
 * ［0:gameId,1:场景对应id，2:类型，3:open方法,4:load方法，
 * 5:goToMainFromGame方法，6:continueActionAfterReconnectNet方法,
 * 7:指令类型，8:初始化游戏网络方法,9:接受指令方法， 10:处理指令方法]
 * 类型 1先进棋牌大厅（棋牌） 2先进单机大厅（动物快跑） 3直接进游戏（套牛） 4比赛
 * 必须要在包含的n个方法后面
 */
var gameConfigData_DN =  [GAME_TYPE_DN,TargetSceneDN,GAME_ENTERTYPE_QPHALL,
    gotoGameDN,loadGameDN,
    goToMainFromGame_DN,continueActionAfterReconnectNet_enter_DN,
    T_DN_COMMAND,initNetData_DN,
    receGCommand_DN,noticeCommand_DN];


//加载游戏 js 文件
var loadGameJS_DN = function(){
    sGameData.mPausedCommand_Use = true; //断线重连时这里暂停取指令
    log("jsman---loadGameJS_DN-----start")
    cc.loader.loadJs("",g_JSPaths_DN,gotoGameDNAfterLoadJS);
    log("jsman---loadGameJS_DN-----end ")
}


//是否加载了本游戏的js
var g_hasLoadJs_DN = false;

//本游戏 js 放这
var g_JSPaths_DN = [
    "src/scene/games/game_dn/DNGameScene.js",
    "src/scene/games/game_dn/DNLayer.js",
    "src/scene/games/game_dn/DNCard.js",
    "src/scene/games/game_dn/DNUserHead.js",
    "src/scene/games/game_dn/DNLogic.js",
    "src/scene/games/game_dn/DNShowCardType.js",
    "src/scene/games/game_dn/DNBetNumShow.js",
    "src/scene/games/game_dn/DNCoin.js",
    "src/scene/games/game_dn/DNShowOP.js",
    "src/scene/games/game_dn/DNChairShow.js",
    "src/scene/games/game_dn/DNTopMenuPanel.js",
    "src/scene/games/game_dn/DNShowTip.js",
    "src/scene/games/game_dn/DNShowBasePoint.js",
    "src/scene/games/game_dn/DNScore.js",
    "src/scene/games/game_dn/DNClock.js",
    "src/scene/games/game_dn/DNShowOpTalk.js",
    "src/scene/games/game_dn/DNNiuCalculate.js",
    "src/scene/games/game_dn/DNShowQiangz.js",
    "src/scene/games/game_dn/DNShowWinLose.js",
    "src/scene/games/game_dn/DNGameUI.js"
]

var g_loadplist_dn = [res.cards_plist,res.coins_plist,res.dn_ui_plist,res.game_bg_vip_plist];

//dn资源
var g_dn_resources = [
    //plist
    res.game_bg_vip_plist,
    res.game_bg_vip_png,


    res.dn_ui_plist,
    res.dn_ui_png,

    res.dn_btn_changetable_png,
    res.g_ok_png,

    res.dn_nnWin_ExportJson,//: "res/dn/anims/win/nnWin.ExportJson",
    res.dn_nnWin0_plist,//: "res/dn/anims/win/nnWin0.plist",
    res.dn_nnWin0_png,//: "res/dn/anims/win/nnWin0.png",

    res.dn_nnLose_ExportJson,//: "res/dn/anims/lose/nnLose.ExportJson",
    res.dn_nnLose0_plist,//: "res/dn/anims/lose/nnLose0.plist",
    res.dn_nnLose0_png,//: "res/dn/anims/lose/nnLose0.png",

    res.dn_bomb_ExportJson,//: "res/dn/anims/Bomb/bomb.ExportJson",
    res.dn_bomb0_plist,//: "res/dn/anims/Bomb/bomb0.plist",
    res.dn_bomb0_png,//: "res/dn/anims/Bomb/bomb0.png",

    res.dn_color_4_ExportJson,//: "res/dn/anims/Color4/color_4.ExportJson",
    res.dn_color_40_plist,//: "res/dn/anims/Color4/color_40.plist",
    res.dn_color_40_png,//: "res/dn/anims/Color4/color_40.png",

    res.dn_color_5_ExportJson,//: "res/dn/anims/Color5/color_5.ExportJson",
    res.dn_color_50_plist,//: "res/dn/anims/Color5/color_50.plist",
    res.dn_color_50_png,//: "res/dn/anims/Color5/color_50.png",

    res.dn_Ox_10_ExportJson,//: "res/dn/anims/OX10/Ox_10.ExportJson",
    res.dn_Ox_100_plist,//: "res/dn/anims/OX10/Ox_100.plist",
    res.dn_Ox_100_png,//: "res/dn/anims/OX10/Ox_100.png",

    res.dn_small_ExportJson,//: "res/dn/anims/Small/small.ExportJson",
    res.dn_small0_plist,//: "res/dn/anims/Small/small0.plist",
    res.dn_small0_png,//: "res/dn/anims/Small/small0.png",


    res.coins_plist,
    res.coins_png,


    res.clock_dot_png,

    res.bg_music_game_mp3,

    res.clock_mp3,
    res.warning_clock_mp3,
    res.desk_move_chips_mp3,
    res.desk_new_card_mp3,
    res.desk_post_bet_mp3,

    res.dn_anim_ox_10_mp3,//: "res/sound/dn/dn_anim_ox_10.mp3",
    res.dn_anim_ox_11_mp3,//: "res/sound/dn/dn_anim_ox_11.mp3",
    res.dn_anim_ox_13_mp3,//: "res/sound/dn/dn_anim_ox_13.mp3",
    res.dn_banker_stop_mp3,//: "res/sound/dn/dn_banker_stop.mp3",

    res.dn_call_1_0_mp3,//: "res/sound/dn/dn_call_1_0.mp3",
    res.dn_call_1_1_mp3,//: "res/sound/dn/dn_call_1_1.mp3",
    res.dn_call_2_0_mp3,//: "res/sound/dn/dn_call_2_0.mp3",
    res.dn_call_2_1_mp3,//: "res/sound/dn/dn_call_2_1.mp3",

    res.dn_gamelost_mp3,//: "res/sound/dn/dn_gamelost.mp3",
    res.dn_gamewin_mp3,//: "res/sound/dn/dn_gamewin.mp3",


    res.dn_mulity_1_0_mp3,//: "res/sound/dn/dn_mulity_1_0.mp3",
    res.dn_mulity_1_1_mp3,//: "res/sound/dn/dn_mulity_1_1.mp3",
    res.dn_mulity_2_0_mp3,//: "res/sound/dn/dn_mulity_2_0.mp3",
    res.dn_mulity_2_1_mp3,//: "res/sound/dn/dn_mulity_2_1.mp3",
    res.dn_mulity_5_0_mp3,//: "res/sound/dn/dn_mulity_5_0.mp3",
    res.dn_mulity_5_1_mp3,//: "res/sound/dn/dn_mulity_5_1.mp3",
    res.dn_mulity_8_0_mp3,//: "res/sound/dn/dn_mulity_8_0.mp3",
    res.dn_mulity_8_1_mp3,//: "res/sound/dn/dn_mulity_8_1.mp3",
    res.dn_mulity_10_0_mp3,//: "res/sound/dn/dn_mulity_10_0.mp3",
    res.dn_mulity_10_1_mp3,//: "res/sound/dn/dn_mulity_10_1.mp3",
    res.dn_mulity_15_0_mp3,//: "res/sound/dn/dn_mulity_15_0.mp3",
    res.dn_mulity_15_1_mp3,//: "res/sound/dn/dn_mulity_15_1.mp3",


    res.dn_ox_0_0_mp3,//: "res/sound/dn/dn_ox_0_0.mp3",
    res.dn_ox_0_1_mp3,//: "res/sound/dn/dn_ox_0_1.mp3",
    res.dn_ox_1_0_mp3,//: "res/sound/dn/dn_ox_1_0.mp3",
    res.dn_ox_1_1_mp3,//: "res/sound/dn/dn_ox_1_1.mp3",
    res.dn_ox_2_0_mp3,//: "res/sound/dn/dn_ox_2_0.mp3",
    res.dn_ox_2_1_mp3,//: "res/sound/dn/dn_ox_2_1.mp3",
    res.dn_ox_3_0_mp3,//: "res/sound/dn/dn_ox_3_0.mp3",
    res.dn_ox_3_1_mp3,//: "res/sound/dn/dn_ox_3_1.mp3",
    res.dn_ox_4_0_mp3,//: "res/sound/dn/dn_ox_4_0.mp3",
    res.dn_ox_4_1_mp3,//: "res/sound/dn/dn_ox_4_1.mp3",
    res.dn_ox_5_0_mp3,//: "res/sound/dn/dn_ox_5_0.mp3",
    res.dn_ox_5_1_mp3,//: "res/sound/dn/dn_ox_5_1.mp3",
    res.dn_ox_6_0_mp3,//: "res/sound/dn/dn_ox_6_0.mp3",
    res.dn_ox_6_1_mp3,//: "res/sound/dn/dn_ox_6_1.mp3",
    res.dn_ox_7_0_mp3,//: "res/sound/dn/dn_ox_7_0.mp3",
    res.dn_ox_7_1_mp3,//: "res/sound/dn/dn_ox_7_1.mp3",
    res.dn_ox_8_0_mp3,//: "res/sound/dn/dn_ox_8_0.mp3",
    res.dn_ox_8_1_mp3,//: "res/sound/dn/dn_ox_8_1.mp3",
    res.dn_ox_9_0_mp3,//: "res/sound/dn/dn_ox_9_0.mp3",
    res.dn_ox_9_1_mp3,//: "res/sound/dn/dn_ox_9_1.mp3",
    res.dn_ox_10_0_mp3,//: "res/sound/dn/dn_ox_10_0.mp3",
    res.dn_ox_10_1_mp3,//: "res/sound/dn/dn_ox_10_1.mp3",
    res.dn_ox_11_0_mp3,//: "res/sound/dn/dn_ox_11_0.mp3",
    res.dn_ox_11_1_mp3,//: "res/sound/dn/dn_ox_11_1.mp3",
    res.dn_ox_12_0_mp3,//: "res/sound/dn/dn_ox_12_0.mp3",
    res.dn_ox_12_1_mp3,//: "res/sound/dn/dn_ox_12_1.mp3",
    res.dn_ox_13_0_mp3,//: "res/sound/dn/dn_ox_13_0.mp3",
    res.dn_ox_13_1_mp3,//: "res/sound/dn/dn_ox_13_1.mp3",
    res.dn_ox_14_0_mp3,//: "res/sound/dn/dn_ox_14_0.mp3",
    res.dn_ox_14_1_mp3, //: "res/sound/dn/dn_ox_14_1.mp3"

    res.zjh_man01_mp3,//"res/sound/zjh/talk/zjh_man01.mp3",
    res.zjh_man03_mp3,//"res/sound/zjh/talk/zjh_man03.mp3",
    res.zjh_man04_mp3,//"res/sound/zjh/talk/zjh_man04.mp3",
    res.zjh_man05_mp3,//"res/sound/zjh/talk/zjh_man05.mp3",
    res.zjh_man09_mp3,//"res/sound/zjh/talk/zjh_man09.mp3",
    res.zjh_man10_mp3,//"res/sound/zjh/talk/zjh_man10.mp3",

    res.zjh_woman01_mp3,//"res/sound/zjh/talk/zjh_woman01.mp3",
    res.zjh_woman02_mp3,//"res/sound/zjh/talk/zjh_woman02.mp3",
    res.zjh_woman04_mp3,//"res/sound/zjh/talk/zjh_woman04.mp3",
    res.zjh_woman05_mp3,//"res/sound/zjh/talk/zjh_woman05.mp3",
    res.zjh_woman06_mp3,//"res/sound/zjh/talk/zjh_woman06.mp3",
    res.zjh_woman07_mp3,//"res/sound/zjh/talk/zjh_woman07.mp3",
    res.zjh_woman08_mp3,//"res/sound/zjh/talk/zjh_woman08.mp3",
    res.zjh_woman09_mp3,//"res/sound/zjh/talk/zjh_woman09.mp3",
    res.zjh_woman10_mp3,//"res/sound/zjh/talk/zjh_woman10.mp3",
    res.zjh_woman11_mp3,//"res/sound/zjh/talk/zjh_woman11.mp3",
    res.zjh_woman12_mp3//"res/sound/zjh/talk/zjh_woman12.mp3"




];