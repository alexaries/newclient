/**
 * Created by apple on 15-1-24.
 * 先在GameDef 定义相应的 gameId 和 场景id 及 指令类型
 * xxx_loadmethod 文件 放到g_game_load里
 * xxx_loadmethod 加到 JSDelegate
 * 设置gameConfigData_xxx
 * 把gameConfigData_xxx 配置到 gameLogic 的 setVersionInfo
 * 游戏用到的资源和js文件都放到xxx_loadmethod里
 */

//跳转到场景－－ 炸金花
var gotoGameZJH = function(){
    log("gotoGameZJH---")
    var canEnterZJH = true;
    if(!canEnterZJH){
        return;
    }
    if(g_hasLoadJs_ZJH){
        gotoGameZJHAfterLoadJS();
    }else{
        loadGameJS_ZJH();
    }
}


//加载了本游戏的js后进入游戏
var gotoGameZJHAfterLoadJS = function(){
    log("gotoGameZJHAfterLoadJS---")
    g_hasLoadJs_ZJH = true;
    gotoSceneByLoading(TargetSceneZJH);
}

//从游戏退出 （）
var goToMainFromGame_ZJH = function(){
    if(sGameData.mCurrLayer == sGameData.mZJHLayer){//
        if(sGameData.mExitRoomForAction ==0) {
            if (sGameData.mUseRandomSit) {
                connectHallWhenExitRoom();
            }
            sGameData.mZJHLayer.gotoMain();
        }
    }
}
//网络重连 进入房间  （）
var continueActionAfterReconnectNet_enter_ZJH = function(){
    log("continueActionAfterReconnectNet_enter_ZJH--")

    if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
        sGameNetData.mZJHNet.sendZJHEnterRoom(sGameData.mCurrRoom.roomId,sGameData.mUser.sessionId)
    }
}

//loadSceneByTarget  ---在这个方法 加入 跳转判断

//加载 场景 －－炸金花
var loadGameZJH = function(){
    sGameData.mGameMode = GAMEMODE_NORMAL;
    var resources = concatArray([g_zjh_resources,g_all_resources,g_game_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new ZJHGameScene.scene());
    }, this);
}

//初始化游戏网络
var initNetData_ZJH = function(){
    sGameNetData.mZJHNet = new GameZJHNet();
    sGameNetData.mHandleNetData_zjh = new ZJH_HandleNetData();
}
//接受指令 方法
var receGCommand_ZJH = function(command,packet){
    sGameNetData.mZJHNet.receZJHCommand(command,packet);
}
//处理指令方法
var noticeCommand_ZJH = function(netdata,basescene){
    sGameNetData.mHandleNetData_zjh.noticeZJHCommand(netdata,basescene);
}

/**
 * 游戏配置数据
 * ［0:gameId,1:场景对应id，2:类型，3:open方法,4:load方法，
 * 5:goToMainFromGame方法，6:continueActionAfterReconnectNet方法,
 * 7:指令类型，8:初始化游戏网络方法,9:接受指令方法， 10:处理指令方法]
 * 类型 1先进棋牌大厅（棋牌） 2先进单机大厅（动物快跑） 3直接进游戏（套牛） 4比赛
 * 必须要在包含的n个方法后面
 */
var gameConfigData_zjh =  [GAME_TYPE_ZJH,TargetSceneZJH,GAME_ENTERTYPE_QPHALL,
    gotoGameZJH,loadGameZJH,
    goToMainFromGame_ZJH,continueActionAfterReconnectNet_enter_ZJH,
    T_ZJH_COMMAND,initNetData_ZJH,
    receGCommand_ZJH,noticeCommand_ZJH];


//加载游戏 js 文件
var loadGameJS_ZJH = function(){
    sGameData.mPausedCommand_Use = true; //断线重连时这里暂停取指令
    log("jsman---loadGameJS_ZJH-----start")
    cc.loader.loadJs("",g_JSPaths_ZJH,gotoGameZJHAfterLoadJS);
    log("jsman---loadGameJS_ZJH-----end ")
}


//是否加载了本游戏的js
var g_hasLoadJs_ZJH = false;

//本游戏 js 放这
var g_JSPaths_ZJH = [

    "src/scene/games/game_zjh/ZJHGameScene.js",
    "src/scene/games/game_zjh/ZJHLayer.js",
    "src/scene/games/game_zjh/ZJHUserHead.js",
    "src/scene/games/game_zjh/ZJHChairShow.js",
    "src/scene/games/game_zjh/ZJHCard.js",
    "src/scene/games/game_zjh/ZJHLogic.js",
    "src/scene/games/game_zjh/ZJHBetNumShow.js",
    "src/scene/games/game_zjh/ZJHCoin.js",
    "src/scene/games/game_zjh/ZJHWinLose.js",
    "src/scene/games/game_zjh/ZJHShowCardType.js",
    "src/scene/games/game_zjh/ZJHShowAllBet.js",
    "src/scene/games/game_zjh/ZJHShowChooseBet.js",
    "src/scene/games/game_zjh/ZJHScore.js",
    "src/scene/games/game_zjh/ZJHTopMenuPanel.js",
    "src/scene/games/game_zjh/ZJHShowOP.js",
    "src/scene/games/game_zjh/ZJHJiCardInfo.js",
    "src/scene/games/game_zjh/ZJHGameUI.js"


]

//,res.game_bg_vip_plist,res.game_table_vip_plist,res.game_chair_vip_plist
var g_loadplist_zjh = [res.cards_plist,res.coins_plist,res.zjh_bg_plist,res.zjh_ui_plist,res.zjh_chat_ui_plist];

//zjh资源
var g_zjh_resources = [
    //plist
    res.zjh_ui_plist,
    res.zjh_ui_png,

    res.zjh_chat_ui_plist,
    res.zjh_chat_ui_png,

    res.zjh_bg_plist,
    res.zjh_bg_png,

    res.g_ok_png,

    //res.game_bg_vip_plist,
    //res.game_bg_vip_png,
    //res.game_table_vip_plist,
    //res.game_table_vip_png,
    //res.game_chair_vip_plist,
    //res.game_chair_vip_png,


    res.coins_plist,
    res.coins_png,

    res.clock_dot_png,


    res.zjh_bomb_plist,
    res.zjh_bomb_png,
    res.zjh_lightning_plist,
    res.zjh_lightning_png,


    res.bg_music_game_mp3,
    res.clock_mp3,
    res.warning_clock_mp3,

    res.zjh_bet1_mp3,//"res/sound/zjh/zjh_bet1.mp3",
    res.zjh_deal_mp3,//"res/sound/zjh/zjh_deal.mp3",
    res.zjh_sitdown_mp3,//"res/sound/zjh/zjh_sitdown.mp3",
    res.zjh_explode1_mp3,//"res/sound/zjh/zjh_explode1.mp3",
    res.zjh_fullmonney_mp3,//"res/sound/zjh/zjh_fullmonney.mp3",
    res.zjh_gameover_mp3,//"res/sound/zjh/zjh_gameover.mp3",
    res.zjh_goout_mp3,//"res/sound/zjh/zjh_goout.mp3",
    res.zjh_lightning_mp3,//"res/sound/zjh/zjh_lightning.mp3",
    res.zjh_opendoor_mp3,//"res/sound/zjh/zjh_opendoor.mp3",
    res.zjh_pass1_mp3,//"res/sound/zjh/zjh_pass1.mp3",
    res.game_ready_mp3,//"res/sound/zjh/zjh_ready.mp3",
    res.zjh_readybtn_mp3,//"res/sound/zjh/zjh_ready.mp3",
    res.zjh_recvmonney_mp3,//"res/sound/zjh/zjh_recvmonney.mp3",
    res.zjh_selmonney_mp3,//"res/sound/zjh/zjh_selmonney.mp3",
    res.zjh_selmonney1_mp3,//"res/sound/zjh/zjh_selmonney.mp3",
    res.zjh_slotr_mp3,//"res/sound/zjh/zjh_slotr.mp3",
    res.zjh_timeoutnotice_mp3,//"res/sound/zjh/zjh_timeoutnotice.mp3",
    res.zjh_winBet_mp3,//"res/sound/zjh/zjh_winBet.mp3",


    res.zjh_woman_addbet1_mp3,//"res/sound/zjh/zjh_woman_addbet1.mp3",
    res.zjh_woman_addbet2_mp3,//"res/sound/zjh/zjh_woman_addbet2.mp3",
    res.zjh_woman_callbet1_mp3,//"res/sound/zjh/zjh_woman_callbet1.mp3",
    res.zjh_woman_callbet2_mp3,//"res/sound/zjh/zjh_woman_callbet2.mp3",
    res.zjh_woman_compare1_mp3,//"res/sound/zjh/zjh_woman_compare1.mp3",
    res.zjh_woman_discard1_mp3,//"res/sound/zjh/zjh_woman_discard1.mp3",
    res.zjh_woman_discard2_mp3,//"res/sound/zjh/zjh_woman_discard2.mp3",
    res.zjh_woman_reqdeal1_mp3,//"res/sound/zjh/zjh_woman_reqdeal1.mp3",
    res.zjh_woman_seecard1_mp3,//"res/sound/zjh/zjh_woman_seecard1.mp3",
    res.zjh_woman_seecard2_mp3,//"res/sound/zjh/zjh_woman_seecard2.mp3",
    res.zjh_woman_win1_mp3,//"res/sound/zjh/zjh_woman_win1.mp3",

    res.zjh_man_addbet1_mp3,//"res/sound/zjh/zjh_man_addbet1.mp3",
    res.zjh_man_callbet1_mp3,//"res/sound/zjh/zjh_man_callbet1.mp3",
    res.zjh_man_callbet2_mp3,//"res/sound/zjh/zjh_man_callbet2.mp3",
    res.zjh_man_compare1_mp3,//"res/sound/zjh/zjh_man_compare1.mp3",
    res.zjh_man_discard1_mp3,//"res/sound/zjh/zjh_man_discard1.mp3",
    res.zjh_man_reqdeal1_mp3,//"res/sound/zjh/zjh_man_reqdeal1.mp3",
    res.zjh_man_seecard1_mp3,//"res/sound/zjh/zjh_man_seecard1.mp3",
    res.zjh_man_win1_mp3, //"res/sound/zjh/zjh_man_win1.mp3"

    res.zjh_man01_mp3,//"res/sound/zjh/talk/zjh_man01.mp3",
    res.zjh_man02_mp3,//"res/sound/zjh/talk/zjh_man02.mp3",
    res.zjh_man03_mp3,//"res/sound/zjh/talk/zjh_man03.mp3",
    res.zjh_man04_mp3,//"res/sound/zjh/talk/zjh_man04.mp3",
    res.zjh_man05_mp3,//"res/sound/zjh/talk/zjh_man05.mp3",
    res.zjh_man08_mp3,//"res/sound/zjh/talk/zjh_man08.mp3",
    res.zjh_man09_mp3,//"res/sound/zjh/talk/zjh_man09.mp3",
    res.zjh_man10_mp3,//"res/sound/zjh/talk/zjh_man10.mp3",

    res.zjh_woman01_mp3,//"res/sound/zjh/talk/zjh_woman01.mp3",
    res.zjh_woman02_mp3,//"res/sound/zjh/talk/zjh_woman02.mp3",
    res.zjh_woman03_mp3,//"res/sound/zjh/talk/zjh_woman03.mp3",
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
