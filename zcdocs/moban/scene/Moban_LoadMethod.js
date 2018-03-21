/**
 * 先在GameDef 定义相应的 gameId 和 场景id 及 指令类型
 * xxx_loadmethod 文件 放到g_game_load里
 * xxx_loadmethod 加到 JSDelegate
 * 设置gameConfigData_xxx
 * 把gameConfigData_xxx 配置到 gameLogic 的 setVersionInfo
 * 游戏用到的资源和js文件都放到xxx_loadmethod里
 * _MOBAN 后缀全大写
 */

//跳转到场景－－ 游戏 （从外部进入游戏都调用此方法）
var gotoGameMoban = function(){
    cc.log("gotoGameMoban---")
    if(g_hasLoadJs_MOBAN){
        gotoGameMobanAfterLoadJS();
    }else{
        loadGameJS_MOBAN();
    }
}

//加载了本游戏的js后进入游戏
var gotoGameMobanAfterLoadJS = function(){
    cc.log("gotoGameMobanAfterLoadJS---")
    g_hasLoadJs_MOBAN = true;
    gotoSceneByLoading(TargetSceneMoban);
}

//从游戏退出 （）
var goToMainFromGame_MOBAN = function(){
    var hasDo = false;
    if(sGameData.mCurrLayer == sGameData.mMobanLayer){//
        if(sGameData.mExitRoomForAction ==0) {
            if (sGameData.mUseRandomSit) {
                connectHallWhenExitRoom();
            }
            sGameData.mMobanLayer.mGameUI.gotoMain();
        }
        hasDo = true;
    }
    return hasDo;
}
//网络重连 进入房间  （）
var continueActionAfterReconnectNet_enter_MOBAN = function(){
    cc.log("continueActionAfterReconnectNet_enter_MOBAN--")
    var hasDo = false;
    if(sGameData.mCurrRoom.gameId == GAME_TYPE_MOBAN){
        //sGameNetData.mMobanNet.sendMobanEnterRoom(sGameData.mCurrRoom.roomId,sGameData.mUser.sessionId)
        hasDo = true;
    }
    return hasDo;
}


//loadSceneByTarget  ---在这个方法 加入 跳转判断

//加载 场景 －－游戏 （）
var loadGameMoban = function(){
    cc.log("loadGameMoban----")
    sGameData.mGameMode = GAMEMODE_NORMAL;
    var resources = concatArray([g_MOBAN_resources,g_all_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new MobanGameScene.scene());
    }, this);
}

//初始化游戏网络
var initNetData_MOBAN = function(){
    sGameNetData.mMobanNet = new GameMobanNet();
    sGameNetData.mHandleNetData_MOBAN = new Moban_HandleNetData();
}
//接受指令 方法
var receGCommand_MOBAN = function(command,packet){
    sGameNetData.mMobanNet.receMobanCommand(command,packet);
}
//处理指令方法
var noticeCommand_MOBAN = function(netdata,basescene){
    sGameNetData.mHandleNetData_MOBAN.noticeMobanCommand(netdata,basescene);
}

/**
 * 游戏配置数据
 * ［0:gameId,1:场景对应id，2:类型，3:open方法,4:load方法，
 * 5:goToMainFromGame方法，6:continueActionAfterReconnectNet方法,
 * 7:指令类型，8:初始化游戏网络方法,9:接受指令方法， 10:处理指令方法]
 * 类型 1先进棋牌大厅（棋牌） 2先进单机大厅（动物快跑） 3直接进游戏（套牛） 4比赛
 * 必须要在包含的n个方法后面
 */
var gameConfigData_MOBAN =  [GAME_TYPE_MOBAN,TargetSceneMoban,3,
    gotoGameMoban,loadGameMoban,
    goToMainFromGame_MOBAN,continueActionAfterReconnectNet_enter_MOBAN,
    T_MOBAN_COMMAND,initNetData_MOBAN,
    receGCommand_MOBAN,noticeCommand_MOBAN];

//加载游戏 js 文件
var loadGameJS_MOBAN = function(){
    cc.log("jsman---loadGameJS_MOBAN-----start")
    cc.loader.loadJs("",g_JSPaths_MOBAN,gotoGameMobanAfterLoadJS);
    cc.log("jsman---loadGameJS_MOBAN-----end ")
}


//是否加载了本游戏的js
var g_hasLoadJs_MOBAN = false;

//本游戏 js 放这
var g_JSPaths_MOBAN = [
//    "src/scene/game_cp_MOBAN/MobanGameScene.js",
//    "src/scene/game_cp_MOBAN/MobanGameLayer.js",
//    "src/scene/game_cp_MOBAN/MobanGameUI.js"
]

//进入场景时，加载的plist
var g_loadplist_MOBAN = [];

// 游戏资源
var  g_MOBAN_resources = [

//    res.game_bg_vip_plist,
//    res.game_bg_vip_png

];

