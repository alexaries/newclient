/**
 * Created by apple on 15-12-16.
 */
var SettingLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mSettingLayer = this;
            sGameData.mCurrLayer = this;

            log("SettingLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;


            this.mTitle = sResWord.w_setting;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,300);
            this.mTopShowType = 1; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 3; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            var csize = cc.size(size.width-20,size.height-92-20);


            var musiclabel = cc.LabelTTF.create(sResWord.w_music+":", sGameData.mFontname, 28);
            musiclabel.attr({
                x:size.width/2-50,
                y:size.height/2+90
            });
            this.addChild(musiclabel,3);

            var soundlabel = cc.LabelTTF.create(sResWord.w_sound+":", sGameData.mFontname, 28);
            soundlabel.attr({
                x:size.width/2-50,
                y:size.height/2+10
            });
            this.addChild(soundlabel,3);

            this.initButtons();

            this.setButtonShow();

            bRet = true;
        }
        return bRet;
    },

    initButtons:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 150;
        var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
        var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
        var point_panel_close = cc.p(4,-4);//边线的高度
        var size_tab_size = cc.size(300,49);
        var csize = this.getContentSize();



        var musiconSprite = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_on,cc.p(0.3,0.5),24,0);
        var musiconSprite1 = ButtonSpriteWithWordInner("#poker_switch_off.png",sResWord.w_off,cc.p(0.7,0.5),24,0);
        var musiconSprite2 = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_on,cc.p(0.3,0.5),24,0);
        var musiconItem = cc.MenuItemSprite.create(
            musiconSprite,
            musiconSprite1,
            musiconSprite2,
            this.setMusicOn,this);
        musiconItem.attr({
            x:size.width/2+60,
            y:size.height/2+90
        });
        this.mMusicItem = musiconItem;

        var soundonSprite = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_on,cc.p(0.3,0.5),24,0);
        var soundonSprite1 = ButtonSpriteWithWordInner("#poker_switch_off.png",sResWord.w_off,cc.p(0.7,0.5),24,0);
        var soundonSprite2 = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_on,cc.p(0.3,0.5),24,0);
        var soundonItem = cc.MenuItemSprite.create(
            soundonSprite,
            soundonSprite1,
            soundonSprite2,
            this.setSoundOn,this);
        soundonItem.attr({
            x:size.width/2+60,
            y:size.height/2+10
        });
        this.mSoundItem = soundonItem;



        var kefuSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_contactkefu,cc.p(0.5,0.5),28,0)
        var kefuSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_contactkefu,cc.p(0.5,0.5),28,1)
        var kefuSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_contactkefu,cc.p(0.5,0.5),28,0)
        var kefuItem = cc.MenuItemSprite.create(
            kefuSprite,
            kefuSprite1,
            kefuSprite2,
            this.clickKefu,this);
        kefuItem.attr({
            x:size.width/2 - 150 ,
            y:size.height- paneltopPosY-size_panel_inner.height-5 + 50,
            anchorX:0.5,
            anchorY:0
        });
        kefuItem.setVisible(false);


        var noticeSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gonggao,cc.p(0.5,0.5),28,0)
        var noticeSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gonggao,cc.p(0.5,0.5),28,1)
        var noticeSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gonggao,cc.p(0.5,0.5),28,0)
        var noticeItem = cc.MenuItemSprite.create(
            noticeSprite,
            noticeSprite1,
            noticeSprite2,
            this.clickSysNotice,this);
        noticeItem.attr({
            x:size.width/2 + 150,
            y:size.height- paneltopPosY-size_panel_inner.height-5 + 50,
            anchorX:0.5,
            anchorY:0
        });
        if(!sGameData.mAppCanShowSysGonggao){
            noticeItem.setVisible(false)
        }


        var helpSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_help,cc.p(0.5,0.5),28,0)
        var helpSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_help,cc.p(0.5,0.5),28,1)
        var helpSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_help,cc.p(0.5,0.5),28,0)
        var helpItem = cc.MenuItemSprite.create(
            helpSprite,
            helpSprite1,
            helpSprite2,
            this.clickHelp,this);
        helpItem.attr({
            x:size.width/2 -150 ,
            y:size.height- paneltopPosY-size_panel_inner.height-45,
            anchorX:0.5,
            anchorY:0
        });
        if(!sGameData.mAppRoomShowInfoBtn){
            helpItem.setVisible(false);
        }




        var quitword = sResWord.w_userquit
        var quitSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",quitword,cc.p(0.5,0.5),28,0)
        var quitSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",quitword,cc.p(0.5,0.5),28,1)
        var quitSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",quitword,cc.p(0.5,0.5),28,0)
        var quitItem = cc.MenuItemSprite.create(
            quitSprite,
            quitSprite1,
            quitSprite2,
            this.clickQuit,this);
        quitItem.attr({
            x:size.width/2 + 150,
            y:size.height- paneltopPosY-size_panel_inner.height-45,
            anchorX:0.5,
            anchorY:0
        });


        //var test1Sprite = ButtonSpriteWithWordInner("#poker_buygold_button.png","t1_game1",cc.p(0.5,0.5),28,0)
        //var test1Sprite1 = ButtonSpriteWithWordInner("#poker_buygold_button.png","t1_game1",cc.p(0.5,0.5),28,1)
        //var test1Sprite2 = ButtonSpriteWithWordInner("#poker_buygold_button.png","t1_game1",cc.p(0.5,0.5),28,0)
        //var test1Item = cc.MenuItemSprite.create(
        //    test1Sprite,
        //    test1Sprite1,
        //    test1Sprite2,
        //    this.clickTest1,this);
        //test1Item.attr({
        //    x:size.width/2 + 360,
        //    y:size.height- paneltopPosY-100-5,
        //    anchorX:0.5,
        //    anchorY:0
        //});
        //
        //var test2Sprite = ButtonSpriteWithWordInner("#poker_buygold_button.png","t2_fruit",cc.p(0.5,0.5),28,0)
        //var test2Sprite1 = ButtonSpriteWithWordInner("#poker_buygold_button.png","t2_fruit",cc.p(0.5,0.5),28,1)
        //var test2Sprite2 = ButtonSpriteWithWordInner("#poker_buygold_button.png","t2_fruit",cc.p(0.5,0.5),28,0)
        //var test2Item = cc.MenuItemSprite.create(
        //    test2Sprite,
        //    test2Sprite1,
        //    test2Sprite2,
        //    this.clickTest2,this);
        //test2Item.attr({
        //    x:size.width/2 + 360,
        //    y:size.height- paneltopPosY-200-5,
        //    anchorX:0.5,
        //    anchorY:0
        //});
        //
        //var test3Sprite = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkexit",cc.p(0.5,0.5),28,0)
        //var test3Sprite1 = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkexit",cc.p(0.5,0.5),28,1)
        //var test3Sprite2 = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkexit",cc.p(0.5,0.5),28,0)
        //var test3Item = cc.MenuItemSprite.create(
        //    test3Sprite,
        //    test3Sprite1,
        //    test3Sprite2,
        //    this.clickSDKQuitGame,this);
        //test3Item.attr({
        //    x:size.width/2 + 360,
        //    y:size.height- paneltopPosY-300-5,
        //    anchorX:0.5,
        //    anchorY:0
        //});
        //
        //var test4Sprite = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkpay",cc.p(0.5,0.5),28,0)
        //var test4Sprite1 = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkpay",cc.p(0.5,0.5),28,1)
        //var test4Sprite2 = ButtonSpriteWithWordInner("#poker_buygold_button.png","sdkpay",cc.p(0.5,0.5),28,0)
        //var test4Item = cc.MenuItemSprite.create(
        //    test4Sprite,
        //    test4Sprite1,
        //    test4Sprite2,
        //    this.clickSDKPay,this);
        //test4Item.attr({
        //    x:size.width/2 + 360,
        //    y:size.height- paneltopPosY-400-5,
        //    anchorX:0.5,
        //    anchorY:0
        //});



        var menu = null;
        if(sGameData.mIsTestNoNet){
            //menu = cc.Menu.create(musiconItem,soundonItem,helpItem,dailyItem,noticeItem,quitItem,test1Item,test2Item);
            menu = cc.Menu.create(musiconItem,soundonItem,helpItem,kefuItem,noticeItem,quitItem);
        }else{
            menu = cc.Menu.create(musiconItem,soundonItem,helpItem,kefuItem,noticeItem,quitItem);
        }
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 3);
    },

    setMusicOn:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        sGameData.mMusicon = !sGameData.mMusicon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        if(!sGameData.mMusicon){
            SoundManager.stopBGMusic();
        }else{
            sGameData.mMainScene.playBGMusic();
        }
        this.setButtonShow();
    },
    setSoundOn:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        sGameData.mSoundon = !sGameData.mSoundon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        this.setButtonShow();
    },
    setButtonShow:function(){
        log("setButtonShow=="+sGameData.mMusicon+"|"+sGameData.mSoundon);
        if(sGameData.mMusicon){
            this.mMusicItem.unselected();
        }else{
            this.mMusicItem.selected();
        }
        if(sGameData.mSoundon){
            this.mSoundItem.unselected();
        }else{
            this.mSoundItem.selected();
        }
    },

    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }
    },
    clickHelp:function() {
        log("clickHelp")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //if (cc.sys.isNative) {
            if (true) {
            if (sGameData.mCurrLayer != sGameData.mHelpLayer) {
                sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
                var thelayer = HelpLayer.create();
                if (thelayer) {
                    sGameData.mCurrScene.addChild(thelayer, 1);
                }
            }
        }else{
            var url = sGameData.mHelpUrl+"?random="+Math.random();
            window.open(url,"help","width=700,height=400,directories");
        }

    },
    clickKefu:function(){
        log("clickKefu")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForContactKefu();
        //var durl = "http://192.168.0.168/qpgame/tapk.apk";
        //CallCpp.doSomeString(885, durl, "", "", "", "");

        //var durl = "http://192.168.0.168/qpgame/tapk.apk";
        //CallCpp.doSomeString(6, durl, "", "", "", "");
    },
    clickSysNotice:function(){
        log("clickSysNotice")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        var msg = sGameData.mSysNoticemsg;
        if(msg.length > 0){
            msg = formatMsgFromNet(msg);
            if(sGameData.mAppCanShowSysGonggao) {
                showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
            }
        }



    },
    clickQuit:function(){
        log("clickQuit")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        doResetDataForLogout()
        gotoSceneByLoading(TargetSceneLogin,0)

    },
    clickFanchenmi:function(){
        log("clickFanchenmi")
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.openSdkView(96);
        }
    },
    clickShiming:function(){
        log("clickShiming")
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.openSdkView(97);
        }
    },
    clickQuitGame:function(){
        log("clickQuitGame")
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.openSdkView(98);
        }
    },
    clickTest1:function(){
        log("clickTest1")
        //gotoGameGGL()

//        var sharedata = new FSH_ShareData();
//        sharedata.mWinScore = 100;
//        sharedata.mLineNum = 9;
//        sharedata.mBaseBetNum = 5;
//        sharedata.mMLCount = 2;
//        sharedata.mType = 2;
//        sGameData.mFShShareData = sharedata
//        gotoGameFML();


        //var player = sGameData.mUser;
        //showGamePlayerInfo(true,player,2,1);

        //gotoGameLuckyFruit();
    },
    clickTest2:function(){
        log("clickTest2")

//        if(cc.sys.isNative) {
//            var gameJSB = cc.GameJSB.sharedGJSB();
//            gameJSB.openSdkView(1001);
//        }


//        if(sGameData.mIsTestNoNet){
//            gotoGameFruitSH();
//        }else{
//            this.gotoHallRoomDJ(GAME_TYPE_FRUITSH)
//        }
    },
    //进入单机房间
    enterDJOpenRoom:function(gameId){
        var rooms = getRoomListByOpenType(gameId)
        if(rooms.length > 0){
            var room = rooms[0];
            sGameData.mCurrRoom = room;
            if(!sGameData.mIsSendEnterRoomIng&&!sGameData.mIsEnterGameing){
                sGameData.mIsSendEnterRoomIng = true;
                sGameData.mGameNet.reConnect(room.ipAddress,room.websocketPort,1);
            }
        }else{
            showLittleNotice(sResWord.w_notopen)
        }
    },
    //跳转到 游戏房间大厅
    gotoHallRoomDJ:function(gametype){
        log("gotoHallRoomDJ=="+gametype);
        sGameData.mCurrGameType = gametype
        gotoShowViewForGameRoomsForDJ(gametype)
    },


    clickSDKLogin:function(){
        log("clickSDKLogin")
        if(sGameData.mIsTestAnySDK){
            if(sGameData.mAppUsesdklogin&&cc.sys.os == cc.sys.OS_ANDROID) { //android sdk 登录
                CallCpp.doSomeString(20, "", "", "", "", "");
            }
        }
    },
    clickSDKEnterPT:function(){
        log("clickSDKEnterPT")
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.openSdkView(1);
        }
    },
    clickSDKQuitGame:function(){
        log("clickSDKQuitGame")
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.openSdkView(2);
        }
    },
    clickSDKPay:function(){
        log("clickSDKPay")
        if(cc.sys.isNative) {
            var productid = "1.pay.qp";//有时为平台商品id（联想等）
            var orderNo = productid;//getOrderNo()
            var einfo = getPayinfo(productid);
            var sdkinfo = "|"+sGameData.mUser.id+"|"+sGameData.mUser.nickName+"|"+sGameData.mUser.level+"|"+sGameData.mUser.softCash;
            var money = 10
            CallCpp.doSomeString(21, "anysdk", orderNo, einfo+sdkinfo, ""+money, "");
        }
    }


});

SettingLayer.create = function () {
    var sg = new SettingLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};