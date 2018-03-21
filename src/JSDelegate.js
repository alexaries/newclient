/**
 * Created by apple on 14-7-29.
 * js 入口 （main.js 直接调用此文件）
 */

//加载游戏 js 文件
var loadGameJS = function(){
    log("jsman---loadGameJS-----start")
    cc.loader.loadJs("",JSPaths,startGame);
    log("jsman---loadGameJS-----end ")
}

//加载完开始游戏
var startGame =function(){
    log("startGame");

    //load resources
    var setScreen = function(){
        if(cc.sys.isMobile){
            var size = cc.director.getWinSize();
            var width = (size.width/size.height)*640;
            if(width < 960){
                width = 960
            }
            log("new width=="+width)
            cc.view.setDesignResolutionSize(width, 640, cc.ResolutionPolicy.SHOW_ALL);

        }else{
            if(sGameConfig.isLocalTest||sGameData.mIsTestNoNet){
                //cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL); //设置后会根据屏幕放大缩小
            }
        }
        cc.view.resizeWithBrowserSize(true);
    }
    var resources = concatArray([g_login_resources,g_all_resources]);
    cc.LoaderScene.preload(resources, function () {
        setScreen();
        cc.director.runScene(new JSStartScene.scene());
    }, this);
}


//全部 js 放这
var JSPaths = [

    "src/GameDef.js",
    "src/GameConfig.js",
    "src/BaseData.js",
    "src/CppCall.js",
    "src/ViewSetByAgent.js",
    "src/CommonMethod.js",
    "src/GameUtil.js",
    "src/CommonMethodForView.js",
    "src/UICreateManager.js",
    "src/AnimationManager.js",
    "src/SoundManager.js",
    "src/SqliteManager.js",

    "src/TestManager.js",

    "src/bean/DataConfig.js",
    "src/bean/GameBean.js",

    "src/logic/BaseUserHead.js",
    "src/logic/BaseGameLayer.js",
    "src/logic/BaseScene.js",
    "src/logic/GameLogic.js",
    "src/logic/BaseObject.js",
    "src/logic/MD5.js",
    "src/logic/BasePanelLayer.js",
    "src/logic/BaseCircleHead.js",
    "src/logic/BaseCardShow.js",


    "src/net/Packet.js",
    "src/net/GameSysNet.js",
    "src/net/GameNet.js",
    "src/net/game/GameDDZNet.js",
    "src/net/game/GameZJHNet.js",
    "src/net/game/GameDNNet.js",
    "src/net/game/DDZMatchNet.js",
    "src/net/game_handle/DDZ_HandleNetData.js",
    "src/net/game_handle/ZJH_HandleNetData.js",
    "src/net/game_handle/DN_HandleNetData.js",
    "src/net/SHA256.js",


    "src/sys_data/g_sys_gameconfig.js",
    "src/sys_data/g_sys_prize.js",
    "src/sys_data/g_sys_props.js",
    "src/sys_data/g_sys_userlevel.js",

    "src/scene/TestScene.js",
    "src/scene/JSStartScene.js",
    "src/scene/LoadingScene.js",
    "src/scene/ReConnNetScene.js",

    "src/scene/login/LoginScene.js",
    "src/scene/login/LoginLayer.js",
    "src/scene/login/RegLayer.js",
    "src/scene/login/UserAgreementLayer.js",
    "src/scene/login/GetPwdPanel.js",

    "src/scene/main/MainScene.js",
    "src/scene/main/MainLayer.js",
    "src/scene/main/UILayer.js",
    "src/scene/main/MainHallGameView.js",
    "src/scene/main/MainHallRoomView.js",
    "src/scene/main/MainMatchRoomView.js",
    "src/scene/main/NetWaitShow.js",
    "src/scene/main/DownLoadGameRes.js",
    "src/scene/main/formain/ItemRoom.js",
    "src/scene/main/formain/ItemWorldChat.js",
    "src/scene/main/formain/MainFreeGold.js",
    "src/scene/main/formain/MainPlayerInfo.js",
    "src/scene/main/formain/MarqueeShow.js",
    "src/scene/main/formain/WorldChatPanel.js",

    "src/scene/hall/HallListLayer.js",
    "src/scene/hall/ItemListTable.js",
    "src/scene/hall/HallTableLayer.js",
    "src/scene/hall/ItemHTable.js",
    "src/scene/hall/ItemHChair.js",
    "src/scene/hall/ItemHUserHead.js",
    "src/scene/hall/ItemGRoom.js",
    "src/scene/hall/HallRoomLayer.js",


    "src/scene/share/ShowNum.js",
    "src/scene/share/ScrollBar.js",
    "src/scene/share/PageBarDot.js",
    "src/scene/share/PageBarDotV.js",
    "src/scene/share/TopMsgBar.js",
    "src/scene/share/ChooseEnterGame.js",
    "src/scene/share/ItemGameForEnter.js",
    "src/scene/share/ShowEmitIcon.js",
    "src/scene/share/ShowWebViewFullScreen.js",
    "src/scene/share/ShowDeviceInfo.js",
    "src/scene/share/GoodsInfoTip.js",
    "src/scene/share/CountDownShow.js",
    "src/scene/share/game/BaseCard.js",
    "src/scene/share/game/GameChatMsg.js",
    "src/scene/share/game/GameChatFace.js",
    "src/scene/share/game/GameChatInput.js",
    "src/scene/share/game/GamePlayerInfo.js",
    "src/scene/share/game/ItemTalk.js",
    "src/scene/share/game/ItemFace.js",
    "src/scene/share/game/ItemInterative.js",
    "src/scene/share/game/GameSetting.js",
    "src/scene/share/game/ItemChatShow.js",
    "src/scene/share/game/GameShowChatMsg.js",
    "src/scene/share/game/GameShowChatFace.js",
    "src/scene/share/game/GameChatMsg_yellow.js",
    "src/scene/share/game/GameChatFace_yellow.js",
    "src/scene/share/game/GameChatInput_yellow.js",

    "src/scene/views/user/BasePlayerInfoLayer.js",
    "src/scene/views/user/PlayerInfoLayer.js",
    "src/scene/views/user/BindPhonePanel.js",
    "src/scene/views/user/ChangePwdLayer.js",
    "src/scene/views/user/ItemAvatar.js",
    "src/scene/views/user/SetSysAvatarLayer.js",
    "src/scene/views/user/SetAvatarNotice.js",
    "src/scene/views/user/UpGuestLayer.js",
    "src/scene/views/user/PlayerInfoPanel.js",
    "src/scene/views/user/BagPropsPanel.js",
    "src/scene/views/user/ItemUserProps.js",
    "src/scene/views/user/ChangeBankPwdLayer.js",
    "src/scene/views/user/BindAlipayPanel.js",
    "src/scene/views/user/ChangeAlipayPanel.js",



    "src/scene/views/task/TaskLayer.js",
    "src/scene/views/task/ItemTask.js",


    "src/scene/views/pay/DeliveryPanel.js",
    "src/scene/views/pay/PayLayer.js",
    "src/scene/views/pay/ItemPay.js",
    "src/scene/views/pay/PayLayer_ios.js",
    "src/scene/views/pay/PayWaitLayer.js",

    "src/scene/views/change/ChangeLayer.js",



    "src/scene/views/msg/NoticeLayer.js",
    "src/scene/views/msg/LittleNoticeNode.js",
    "src/scene/views/msg/MsgLayer.js",
    "src/scene/views/msg/ItemMsg.js",
    "src/scene/views/msg/MsgInfoPanel.js",
    "src/scene/views/msg/KitShow.js",
    "src/scene/views/msg/SysGonggaoLayer.js",
    "src/scene/views/msg/NeedPayNotice.js",
    "src/scene/views/msg/HelpPanel.js",



    "src/scene/views/bank/BankSaveCashLayer.js",
    "src/scene/views/bank/BankGetCashLayer.js",


    "src/scene/views/rank/RankListLayer.js",
    "src/scene/views/rank/ItemRankList.js",
    "src/scene/views/rank/ItemRankPrize.js",

    "src/scene/views/setting/SettingLayer.js",
    "src/scene/views/setting/HelpLayer.js",
    "src/scene/views/setting/ContactKefuLayer.js",
    "src/scene/views/setting/SettingPanel.js",

    "src/scene/games/g_game_load/DDZ_LoadMethod.js",
    "src/scene/games/g_game_load/ZJH_LoadMethod.js",
    "src/scene/games/g_game_load/DN_LoadMethod.js",



    "src/language/ResWord_zhcn.js",
    "src/language/ResWord_zhtw.js"

]
