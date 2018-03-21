/**
 * Created by apple on 15-1-24.
 * 先在GameDef 定义相应的 gameId 和 场景id 及 指令类型
 * xxx_loadmethod 文件 放到g_game_load里
 * xxx_loadmethod 加到 JSDelegate
 * 设置gameConfigData_xxx
 * 把gameConfigData_xxx 配置到 gameLogic 的 setVersionInfo
 * 游戏用到的资源和js文件都放到xxx_loadmethod里
 */


//跳转到场景－－ 斗地主
var gotoGameDDZ = function(mode){
    log("gotoGameDDZ---")
    if(mode == null){
        mode = 0;
    }
    g_enter_data_ddz = mode;
    log("gotoGameDDZ---"+mode)
    if(g_hasLoadJs_DDZ){
        gotoGameDDZAfterLoadJS();
    }else{
        loadGameJS_DDZ();
    }
}

//进入游戏时带的数据
var g_enter_data_ddz = 0;

//加载了本游戏的js后进入游戏
var gotoGameDDZAfterLoadJS = function(){
    log("gotoGameDDZAfterLoadJS---")
    g_hasLoadJs_DDZ = true;
    gotoSceneByLoading(TargetSceneDDZ,g_enter_data_ddz);
}

//从游戏退出 （）
var goToMainFromGame_DDZ = function(){
    if(sGameData.mCurrLayer == sGameData.mDDZLayer){//
        if(sGameData.mExitRoomForAction ==0) {
            if(sGameData.mGoToMainFromGameType == 10){
                connectHallWhenExitRoom(10);
            }else if (sGameData.mUseRandomSit) {
                connectHallWhenExitRoom();
            }
            sGameData.mDDZLayer.mGameUI.gotoMain();
        }
    }
}
//网络重连 进入房间  （）
var continueActionAfterReconnectNet_enter_DDZ = function(){
    log("continueActionAfterReconnectNet_enter_DDZ--")
    if(sGameData.mCurrRoom.gameId == GAME_TYPE_DDZ){
        sGameNetData.mDDZNet.sendDDZEnterRoom(sGameData.mCurrRoom.roomId,sGameData.mUser.sessionId)
    }
}


//loadSceneByTarget  ---在这个方法 加入 跳转判断

//加载 场景 －－斗地主
var loadGameDDZ = function(mode){
    if(mode == null){
        mode = GAMEMODE_NORMAL;
    }
    sGameData.mGameMode = mode
    var resources = concatArray([g_ddz_resources,g_all_resources,g_game_resources]);
    if(sGameData.mGameMode != GAMEMODE_NORMAL) {
        resources = concatArray([g_ddz_resources,g_all_resources,g_game_resources,g_ddzmatch_resources]);
    }
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new DDZGameScene.scene());
    }, this);
}


//初始化游戏网络
var initNetData_DDZ = function(){
    sGameNetData.mDDZNet = new GameDDZNet();
    sGameNetData.mHandleNetData_ddz = new DDZ_HandleNetData();
}
//接受指令 方法
var receGCommand_DDZ = function(command,packet){
    sGameNetData.mDDZNet.receDDZCommand(command,packet);
}
//处理指令方法
var noticeCommand_DDZ = function(netdata,basescene){
    sGameNetData.mHandleNetData_ddz.noticeDDZCommand(netdata,basescene);
}

/**
 * 游戏配置数据
 * ［0:gameId,1:场景对应id，2:类型，3:open方法,4:load方法，
 * 5:goToMainFromGame方法，6:continueActionAfterReconnectNet方法,
 * 7:指令类型，8:初始化游戏网络方法,9:接受指令方法， 10:处理指令方法]
 * 类型 1先进棋牌大厅（棋牌） 2先进单机大厅（动物快跑） 3直接进游戏（套牛） 4比赛
 * 必须要在包含的n个方法后面
 */
var gameConfigData_DDZ =  [GAME_TYPE_DDZ,TargetSceneDDZ,GAME_ENTERTYPE_QPHALL,
    gotoGameDDZ,loadGameDDZ,
    goToMainFromGame_DDZ,continueActionAfterReconnectNet_enter_DDZ,
    T_DDZ_COMMAND,initNetData_DDZ,
    receGCommand_DDZ,noticeCommand_DDZ];



//********** ddz 比赛 ************

//********* ddz 比赛 *************


//加载游戏 js 文件
var loadGameJS_DDZ = function(){
    sGameData.mPausedCommand_Use = true; //断线重连时这里暂停取指令
    log("jsman---loadGameJS_ddz-----start")
    cc.loader.loadJs("",g_JSPaths_ddz,gotoGameDDZAfterLoadJS);
    log("jsman---loadGameJS_ddz-----end ")
}


//是否加载了本游戏的js
var g_hasLoadJs_DDZ = false;

//本游戏 js 放这
var g_JSPaths_ddz = [

    "src/scene/games/game_ddz/DDZGameScene.js",
    "src/scene/games/game_ddz/DDZLayer.js",
    "src/scene/games/game_ddz/DDZLogic.js",
    "src/scene/games/game_ddz/DDZCard.js",
    "src/scene/games/game_ddz/DDZUserHead.js",
    "src/scene/games/game_ddz/DDZCardsNote.js",
    "src/scene/games/game_ddz/DDZShowOP.js",
    "src/scene/games/game_ddz/DDZCardCount.js",
    "src/scene/games/game_ddz/DDZClock.js",
    "src/scene/games/game_ddz/DDZGameUI.js",
    "src/scene/games/game_ddz/DDZScore.js",
    "src/scene/games/game_ddz/DDZScoreItem.js",
    "src/scene/games/game_ddz/DDZEffects.js",
    "src/scene/games/game_ddz/DDZShowCardTip.js",
    "src/scene/games/game_ddz/DDZWait.js",
    "src/scene/games/game_ddz/DDZShowNum.js",
    "src/scene/games/game_ddz/DDZScore_normal.js",
    "src/scene/games/game_ddz/DDZQuitClock.js",

    "src/scene/games/game_ddz/match/DDZMatchWait.js",
    "src/scene/games/game_ddz/match/DDZMatchResult.js",
    "src/scene/games/game_ddz/match/DDZMatchTip.js",
    "src/scene/games/game_ddz/match/DDZMatchInfoTips.js",
    "src/scene/games/game_ddz/match/DDZMatchProgress.js",
    "src/scene/games/game_ddz/match/DDZMatchNoticeLayer.js",
    "src/scene/games/game_ddz/match/DDZMatchPrizeItem.js",
    "src/scene/games/game_ddz/match/DDZMatchPrize.js",
    "src/scene/games/game_ddz/match/DDZMatchRank.js",
    "src/scene/games/game_ddz/match/DDZMatchRankItem.js",
    "src/scene/games/game_ddz/match/DDZMatchUpProgress.js",
    "src/scene/games/game_ddz/match/DDZMatchUpProgressItem.js"

]


var g_loadplist_ddz = [res.cards_plist,res.ddz_ui_plist,res.ddz_bg_plist,res.ddz_effects_plist,res.ddz_scoreanim_plist,res.ddz_score_plist,res.ddz_anim_win_plist,res.ddz_anim_lose_plist,res.ddz_anim_losewind_plist];

var g_loadplist_ddzmatch = [];

//ddz match 资源
var g_ddzmatch_resources = [
    //res.gamematch_ui_plist,
    //res.gamematch_ui_png,
    //
    //res.gamematch_bgs_plist,
    //res.gamematch_bgs_png,
    //
    //res.gamematch_prizebg_plist,
    //res.gamematch_prizebg_png,
    //
    //res.gamematch_light_plist,
    //res.gamematch_light_png,
    //
    //res.gamematch_run_plist,
    //res.gamematch_run_png
]

//ddz资源
var g_ddz_resources = [
    //plist
    res.ddz_ui_plist,
    res.ddz_ui_png,
    res.ddz_bg_plist,
    res.ddz_bg_png,




    res.ddz_scoreanim_plist,
    res.ddz_scoreanim_png,
    res.ddz_effects_plist,
    res.ddz_effects_png,
    res.ddz_bomb_plist,
    res.ddz_bomb_png,

    res.ddz_score_plist,
    res.ddz_score_png,

    res.ddz_title_png,


    res.ddz_anim_win_plist,
    res.ddz_anim_win_png,

    res.ddz_anim_lose_plist,
    res.ddz_anim_lose_png,

    res.ddz_anim_losewind_plist,
    res.ddz_anim_losewind_png,

    res.panel_button_bg_png,
    res.desks_bottom_bar_bg_png,



    res.bg_music_ddz_mp3,

    res.clock_mp3,
    res.put_card_mp3,
    res.warning_clock_mp3,

    res.ddz_win_mp3,
    res.ddz_lose_mp3,
    res.ddz_warning_card_mp3,
    res.ddz_boom_mp3,
    res.ddz_supper_boom_mp3,
    res.ddz_link_other_mp3,


    //res.ddz_woman_dao_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_dao.mp3",
    //res.ddz_woman_budao_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_budao.mp3",
    //res.ddz_woman_la_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_la.mp3",
    //res.ddz_woman_bula_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_bula.mp3",
    //res.ddz_woman_menzhua_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_menzhua.mp3",
    //res.ddz_woman_zhua_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_zhua.mp3",
    //res.ddz_woman_buzhua_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_buzhua.mp3",
    //res.ddz_woman_kanpai_mp3,//: "res/g_ddz/ddzsounds/ddz_woman_kanpai.mp3",
    //
    //res.ddz_man_dao_mp3,//: "res/g_ddz/ddzsounds/ddz_man_dao.mp3",
    //res.ddz_man_budao_mp3,//: "res/g_ddz/ddzsounds/ddz_man_budao.mp3",
    //res.ddz_man_la_mp3,//: "res/g_ddz/ddzsounds/ddz_man_la.mp3",
    //res.ddz_man_bula_mp3,//: "res/g_ddz/ddzsounds/ddz_man_bula.mp3",
    //res.ddz_man_menzhua_mp3,//: "res/g_ddz/ddzsounds/ddz_man_menzhua.mp3",
    //res.ddz_man_zhua_mp3,//: "res/g_ddz/ddzsounds/ddz_man_zhua.mp3",
    //res.ddz_man_buzhua_mp3,//: "res/g_ddz/ddzsounds/ddz_man_buzhua.mp3",
    //res.ddz_man_kanpai_mp3,//: "res/g_ddz/ddzsounds/ddz_man_kanpai.mp3",


    res.ddz_woman_landlord_1_mp3,//"man_landlord_1.mp3",
    res.ddz_woman_landlord_2_mp3,//"man_landlord_2.mp3",
    res.ddz_woman_landlord_3_mp3,//"man_landlord_3.mp3",
    res.ddz_woman_landlord_no_mp3,//"woman_landlord_no.mp3",
    res.ddz_woman_pass_mp3,//"woman_pass.mp3",
    res.ddz_woman_follow_1_mp3,//"woman_follow_1.mp3",
    res.ddz_woman_follow_2_mp3,//"woman_follow_2.mp3",
    res.ddz_woman_bujiabei_mp3,// "res/g_ddz/ddzsounds/ddz_man_bujiabei.mp3",
    res.ddz_woman_jiabei_mp3,// "res/g_ddz/ddzsounds/ddz_man_jiabei.mp3",

    res.ddz_woman_talk_1_mp3,//"woman_talk_1.mp3",
    res.ddz_woman_talk_2_mp3,//"woman_talk_2.mp3",
    res.ddz_woman_talk_3_mp3,//"woman_talk_3.mp3",
    res.ddz_woman_talk_4_mp3,//"woman_talk_4.mp3",
    res.ddz_woman_talk_5_mp3,//"woman_talk_5.mp3",

    res.ddz_woman_win_mp3, //"woman_win.mp3"

    res.ddz_woman_double_card_mp3,//"woman_double_card.mp3",
    res.ddz_woman_double_link_card_mp3,//"woman_double_link_card.mp3",
    res.ddz_woman_four_card,//"woman_four_card.mp3",
    res.ddz_woman_four_two_card_mp3,//"woman_four_two_card.mp3",
    res.ddz_woman_link_card_mp3,//"woman_link_card.mp3",
    res.ddz_woman_single_card_mp3,//"woman_single_card.mp3",
    res.ddz_woman_supper_boom_card_mp3,//"woman_supper_boom_card.mp3",
    res.ddz_woman_three_card_mp3,//"woman_three_card.mp3",
    res.ddz_woman_three_link_two_card_mp3,//"woman_three_link_two_card.mp3",
    res.ddz_woman_three_one_card_mp3,//"woman_three_one_card.mp3",
    res.ddz_woman_three_two_card_mp3,//"woman_three_two_card.mp3",
    res.ddz_woman_three_link_card_mp3,//"woman_tree_link_card.mp3",

    res.ddz_woman_single_2_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_2.mp3",
    res.ddz_woman_single_3_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_3.mp3",
    res.ddz_woman_single_4_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_4.mp3",
    res.ddz_woman_single_5_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_5.mp3",
    res.ddz_woman_single_6_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_6.mp3",
    res.ddz_woman_single_7_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_7.mp3",
    res.ddz_woman_single_8_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_8.mp3",
    res.ddz_woman_single_9_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_9.mp3",
    res.ddz_woman_single_10_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_10.mp3",
    res.ddz_woman_single_j_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_j.mp3",
    res.ddz_woman_single_q_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_q.mp3",
    res.ddz_woman_single_k_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_k.mp3",
    res.ddz_woman_single_a_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_a.mp3",
    res.ddz_woman_single_joker1_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_joker1.mp3",
    res.ddz_woman_single_joker2_mp3,// "res/g_ddz/ddzsounds/ddz_woman_single_joker2.mp3",

    res.ddz_woman_double_2_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_2.mp3",
    res.ddz_woman_double_3_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_3.mp3",
    res.ddz_woman_double_4_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_4.mp3",
    res.ddz_woman_double_5_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_5.mp3",
    res.ddz_woman_double_6_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_6.mp3",
    res.ddz_woman_double_7_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_7.mp3",
    res.ddz_woman_double_8_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_8.mp3",
    res.ddz_woman_double_9_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_9.mp3",
    res.ddz_woman_double_10_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_10.mp3",
    res.ddz_woman_double_j_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_j.mp3",
    res.ddz_woman_double_q_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_q.mp3",
    res.ddz_woman_double_k_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_k.mp3",
    res.ddz_woman_double_a_mp3,// "res/g_ddz/ddzsounds/ddz_woman_double_a.mp3",


    res.ddz_man_landlord_1_mp3,//"man_landlord_1.mp3",
    res.ddz_man_landlord_2_mp3,//"man_landlord_2.mp3",
    res.ddz_man_landlord_3_mp3,//"man_landlord_3.mp3",
    res.ddz_man_landlord_no_mp3,//"man_landlord_no.mp3",
    res.ddz_man_pass_mp3,//"man_pass.mp3",
    res.ddz_man_follow_1_mp3,//"man_follow_1.mp3",
    res.ddz_man_follow_2_mp3,//"man_follow_2.mp3",
    res.ddz_man_bujiabei_mp3,// "res/g_ddz/ddzsounds/ddz_man_bujiabei.mp3",
    res.ddz_man_jiabei_mp3,// "res/g_ddz/ddzsounds/ddz_man_jiabei.mp3",

    res.ddz_man_talk_1_mp3,//"man_talk_1.mp3",
    res.ddz_man_talk_2_mp3,//"man_talk_2.mp3",
    res.ddz_man_talk_3_mp3,//"man_talk_3.mp3",
    res.ddz_man_talk_4_mp3,//"man_talk_4.mp3",
    res.ddz_man_talk_5_mp3,//"man_talk_5.mp3",

    res.ddz_man_win_mp3, //"man_win.mp3"

    res.ddz_man_double_card_mp3,//"man_double_card.mp3",
    res.ddz_man_double_link_card_mp3,//"man_double_link_card.mp3",
    res.ddz_man_four_card,//"man_four_card.mp3",
    res.ddz_man_four_two_card_mp3,//"man_four_two_card.mp3",
    res.ddz_man_single_card_mp3,//"man_single_card.mp3",
    res.ddz_man_supper_boom_card_mp3,//"man_supper_boom_card.mp3",
    res.ddz_man_three_card_mp3,//"man_three_card.mp3",
    res.ddz_man_three_link_two_card_mp3,//"man_three_link_two_card.mp3",
    res.ddz_man_three_one_card_mp3,//"man_three_one_card.mp3",
    res.ddz_man_three_two_card_mp3,//"man_three_two_card.mp3",
    res.ddz_man_three_link_card_mp3,//"man_tree_link_card.mp3",

    res.ddz_man_single_2_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_2.mp3",
    res.ddz_man_single_3_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_3.mp3",
    res.ddz_man_single_4_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_4.mp3",
    res.ddz_man_single_5_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_5.mp3",
    res.ddz_man_single_6_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_6.mp3",
    res.ddz_man_single_7_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_7.mp3",
    res.ddz_man_single_8_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_8.mp3",
    res.ddz_man_single_9_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_9.mp3",
    res.ddz_man_single_10_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_10.mp3",
    res.ddz_man_single_j_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_j.mp3",
    res.ddz_man_single_q_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_q.mp3",
    res.ddz_man_single_k_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_k.mp3",
    res.ddz_man_single_a_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_a.mp3",
    res.ddz_man_single_joker1_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_joker1.mp3",
    res.ddz_man_single_joker2_mp3,//: "res/g_ddz/ddzsounds/ddz_man_single_joker2.mp3",

    res.ddz_man_double_2_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_2.mp3",
    res.ddz_man_double_3_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_3.mp3",
    res.ddz_man_double_4_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_4.mp3",
    res.ddz_man_double_5_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_5.mp3",
    res.ddz_man_double_6_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_6.mp3",
    res.ddz_man_double_7_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_7.mp3",
    res.ddz_man_double_8_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_8.mp3",
    res.ddz_man_double_9_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_9.mp3",
    res.ddz_man_double_10_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_10.mp3",
    res.ddz_man_double_j_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_j.mp3",
    res.ddz_man_double_q_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_q.mp3",
    res.ddz_man_double_k_mp3,//: "res/g_ddz/ddzsounds/ddz_man_double_k.mp3",
    res.ddz_man_double_a_mp3//: "res/g_ddz/ddzsounds/ddz_man_double_a.mp3",



];