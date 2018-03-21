/**
 * Created by Administrator on 14-4-21.
 * ui 层
 */
var UILayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mMenu:null,//按钮
    mCountBg:null,//消息数量背景
    mCountShow:null,//消息数量显示
    mBackBtn:null,
    //mFreegoldView:null,
    mMainPalyerInfo:null,//用户信息显示

    init:function () {
        var bRet = false;
        if (this._super()) {
            sGameData.mUILayer = this;
            log("UILayer start");

            var size = cc.director.getWinSize();
 
            var size_ui_btn = cc.size(85,80);
            //添加 登录

            var tempW = (size.width - 960)*0.2;
            var rwidth = 100+tempW;



            var bsize = cc.size(size.width-40,90);

            var bottombg = cc.Scale9Sprite.create();
            bottombg.initWithSpriteFrameName("main_bottom_bg.png")
            bottombg.setContentSize(bsize);

            bottombg.attr({
                x: size.width/2,
                y: 0,
                anchorX:0.5,
                anchorY:0
            });
            this.addChild(bottombg);
                              

            var btnnum = 5;
            var linenum = 6;
                              
            var btnwidth = (size.width - 160)/btnnum;

            var posXs = [size.width/2-btnwidth*2,size.width/2-btnwidth,size.width/2,size.width/2+btnwidth,size.width/2+btnwidth*2];

            var splitposXs = [size.width/2-btnwidth*2-btnwidth/2,size.width/2-btnwidth*2+btnwidth/2,size.width/2-btnwidth+btnwidth/2,size.width/2+btnwidth/2,size.width/2+btnwidth+btnwidth/2,size.width/2+btnwidth*2+btnwidth/2];

            if(sGameData.mAppIsSubmitToAppStore){
                btnnum = 2;
                linenum = 3;
                btnwidth = (size.width - 160)/btnnum;
                posXs = [size.width/2-btnwidth*0.5,0,0,0,size.width/2+btnwidth*0.5];
                splitposXs = [size.width/2-btnwidth,
                    size.width/2,
                    size.width/2+btnwidth];
            }

            if(sGameData.mAppIsTestPayH5){
                btnnum = 4;
                linenum = 5;
                btnwidth = (size.width - 160)/btnnum;
                posXs = [size.width/2-btnwidth*1.5,size.width/2-0.5*btnwidth,0,size.width/2+0.5*btnwidth,size.width/2+btnwidth*1.5];
                splitposXs = [size.width/2-btnwidth*1.5,
                    size.width/2-0.5*btnwidth,
                    size.width/2+0.5*btnwidth,
                    size.width/2+btnwidth*1.5];
            }

            if(!sGameData.mAppIsTestPayH5){
                for(var i=0;i<linenum;i++){
                    var splitSprite = cc.Sprite.create("#main_split.png");
                    this.addChild(splitSprite)
                    splitSprite.setPosition(cc.p(splitposXs[i],45));
                    splitSprite.setScaleX(2);
                    splitSprite.setScaleY(1.5);
                }
            }

            var bankSprite = cc.Sprite.create("#main_btn_bank.png")
            var bankSprite1 = cc.Sprite.create("#main_btn_bank.png")
            bankSprite1.setColor(cc.color(200,200,200))
            var bankSprite2 = cc.Sprite.create("#main_btn_bank.png")
            var bankItem = cc.MenuItemSprite.create(
                bankSprite,
                bankSprite1,
                bankSprite2,
                this.clickBank,this);
            bankItem.attr({
                x:posXs[0],
                y:45
            });



            var rankSprite = cc.Sprite.create("#main_btn_rank.png");
            var rankSprite1 = cc.Sprite.create("#main_btn_rank.png");
            rankSprite1.setColor(cc.color(200, 200, 200));
            var rankSprite2 = cc.Sprite.create("#main_btn_rank.png");
            var rankItem = cc.MenuItemSprite.create(
                rankSprite,
                rankSprite1,
                rankSprite2,
                this.gotoRank,this);
            rankItem.attr({
                x:posXs[1],
                y:45
            });
            if(sGameData.mAppIsSubmitToAppStore){
                rankItem.setVisible(false);
            }

            var changeSprite = cc.Sprite.create("#main_btn_change.png")
            var changeSprite1 = cc.Sprite.create("#main_btn_change.png")
            changeSprite1.setColor(cc.color(200,200,200))
            var changeSprite2 = cc.Sprite.create("#main_btn_change.png")
            var changeItem = cc.MenuItemSprite.create(
                changeSprite,
                changeSprite1,
                changeSprite2,
                this.clickChange,this);
            changeItem.attr({
                x:posXs[2],
                y:45
            });
            if(sGameData.mAppIsSubmitToAppStore){
                changeItem.setVisible(false);
            }

            if(sGameData.mAppIsTestPayH5){
                changeItem.setVisible(false);
            }


            var taskSprite = cc.Sprite.create("#main_btn_task.png")
            var taskSprite1 = cc.Sprite.create("#main_btn_task.png")
            taskSprite1.setColor(cc.color(200,200,200))
            var taskSprite2 = cc.Sprite.create("#main_btn_task.png")
            var taskItem = cc.MenuItemSprite.create(
                taskSprite,
                taskSprite1,
                taskSprite2,
                this.clickTask,this);
            taskItem.attr({
                x:posXs[3],
                y:45
            });

            if(sGameData.mAppIsSubmitToAppStore){
                taskItem.setVisible(false);
            }


            var shopSprite = cc.Sprite.create("#main_btn_pay.png")
            var shopSprite1 = cc.Sprite.create("#main_btn_pay.png")
            shopSprite1.setColor(cc.color(200,200,200))
            var shopSprite2 = cc.Sprite.create("#main_btn_pay.png")
            var shopItem = cc.MenuItemSprite.create(
                shopSprite,
                shopSprite1,
                shopSprite2,
                this.clickShop,this);
            shopItem.attr({
                x:posXs[4],
                y:45
            });


            var noticeSprite = cc.Sprite.create("#main_btn_notice.png")
            var noticeSprite1 = cc.Sprite.create("#main_btn_notice.png")
            noticeSprite1.setColor(cc.color(200,200,200))
            var noticeSprite2 = cc.Sprite.create("#main_btn_notice.png")
            var noticeItem = cc.MenuItemSprite.create(
                noticeSprite,
                noticeSprite1,
                noticeSprite2,
                this.clickNotice,this);
            noticeItem.attr({
                x:size.width -85 -rwidth*2,
                y:size.height-45
            });
            if(sGameData.mAppIsSubmitToAppStore){
                noticeItem.setVisible(false);
            }

            var msgSprite = cc.Sprite.create("#main_btn_msg.png")
            var msgSprite1 = cc.Sprite.create("#main_btn_msg.png")
            msgSprite1.setColor(cc.color(200,200,200))
            var msgSprite2 = cc.Sprite.create("#main_btn_msg.png")
            var msgItem = cc.MenuItemSprite.create(
                msgSprite,
                msgSprite1,
                msgSprite2,
                this.clickMsg,this);
            msgItem.attr({
                x:size.width -85 -rwidth,
                y:size.height-45
            });


            var settingSprite = cc.Sprite.create("#main_btn_setting.png")
            var settingSprite1 = cc.Sprite.create("#main_btn_setting.png")
            settingSprite1.setColor(cc.color(200,200,200));
            var settingSprite2 = cc.Sprite.create("#main_btn_setting.png")
            var settingItem = cc.MenuItemSprite.create(
                settingSprite,
                settingSprite1,
                settingSprite2,
                this.clickSetting,this);
            settingItem.attr({
                x:size.width - 85,
                y:size.height-45
            });




            var backSprite = cc.Sprite.create("#main_back.png")
            var backSprite1 = cc.Sprite.create("#main_back.png")
            backSprite1.setColor(cc.color(200,200,200));
            var backSprite2 = cc.Sprite.create("#main_back.png")
            var backItem = cc.MenuItemSprite.create(
                backSprite,
                backSprite1,
                backSprite2,
                this.clickBack,this);
            backItem.attr({
                x:70,
                y:size.height-45
            });
            this.mBackBtn = backItem;
            backItem.setVisible(false);


            var helpSprite = cc.Sprite.create("#g_btn_help.png")
            var helpSprite1 = cc.Sprite.create("#g_btn_help.png")
            helpSprite1.setColor(cc.color(200,200,200));
            var helpSprite2 = cc.Sprite.create("#g_btn_help.png")
            var helpItem = cc.MenuItemSprite.create(
                helpSprite,
                helpSprite1,
                helpSprite2,
                this.clickHelp,this);
            helpItem.attr({
                x:70,
                y:130
            });
            this.mHelpBtn = helpItem;
            helpItem.setVisible(false);


            var menu = cc.Menu.create(shopItem,msgItem,bankItem,settingItem,taskItem,rankItem,changeItem,backItem,noticeItem,helpItem);//giftItem
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            this.mMenu = menu;
            //添加按钮 end
            bRet = true;

            //var freegold = MainFreeGold.create();
            //this.addChild(freegold,50)
            //freegold.attr({
            //    x:size.width -65-rwidth*2,
            //    y:size.height-50
            //});
            //freegold.setScale(0.7);
            //this.mFreegoldView = freegold;
            //if(sGameData.mAppIsSubmitToAppStore){
            //    freegold.attr({
            //        x:posXs[4],
            //        y:45
            //    });
            //}

            var msgnumbg = cc.Sprite.create("#main_msg_icon_has.png");
            msgnumbg.attr({
                x:size.width -80 -rwidth+27,
                y:size.height*0.93+7
            });
            this.addChild(msgnumbg,2);
            this.mCountBg = msgnumbg
            msgnumbg.setVisible(false);




            var aMainPalyerInfo = MainPalyerInfo.create();
            aMainPalyerInfo.attr({
                x: 30,
                y: size.height - 2
            });
            this.addChild(aMainPalyerInfo,1);
            this.mMainPalyerInfo = aMainPalyerInfo;


            this.showMsgNum();
        }
        return bRet;
    },
    //初始化游戏数据
    initGameData:function(){

    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mUILayer = null;
    },
    checkFreeGold:function(){
        //this.mFreegoldView.checkState();
    },
    //显示消息数量
    showMsgNum:function(){
        var count = sGameData.mUserMsgCount;
        if(count > 0){
            this.mCountBg.setVisible(true);
        }else{
            this.mCountBg.setVisible(false);
        }
    },
    clickHelp:function(){
        log("clickHelp");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        sGameData.mClickState = 2;
        showWebviewFullScreen(1);
    },
    clickBack:function(){
        log("clickBack");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        sGameData.mClickState = 2;
        if(sGameData.mMainLayer){
            sGameData.mMainLayer.adjustScrollView(100);
        }
    },
    clickChange:function(){
        log("clickChange");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        //未绑定手机号码的用户不能进入兑换界面
        var phone = sGameData.mUser.phone;
       // if(phone==null||phone==""||phone.length<6) {
       //     this.showBindPhone(true);
       // }else{
            gotoShowViewForChange();
       // }
    },


    //显示bind
    showBindPhone:function(state){
        var setl = this.getChildByTag(5555);
        if(!setl){
            setl = BindPhonePanel.create();
            if(setl){
                this.addChild(setl,50,5555);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.startShow();
            }else{
                setl.stopShow();
            }
        }
    },

    //任务
    clickTask:function(){
        log("clickTask");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        sGameData.mGetNewWallTaskData = true;
        gotoTask();
    },
    //打开背包
    gotoGift:function(){
        log("gotoGift");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();


    },
    //进入单机房间
    enterDJOpenRoom:function(gameId){
        sGameData.mCurrGameType = gameId;
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
    //打开商城
    clickShop:function(){
        log("clickShop");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoPay();

    },
    //打开消息
    clickMsg:function(){
        log("clickMsg");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mIsTestNoNet){
            gotoShowViewForMsgView();
        }else{
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendMsgList();
            }
        }
    },
    clickNotice:function(){
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
    gotoRank:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoRank();

    },
    //点击好友
    clickBank:function(){
        log("clickFriend");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        gotoShowViewForBank();

    },
    //打开设置
    clickSetting:function(){
        log("clickSetting");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //gotoShowViewForSetting();
        showSettingPanel();

    },
    //注销
    clickLogout:function(){
        log("clickLogout");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        doResetDataForLogout()
        gotoSceneByLoading(TargetSceneLogin,0)
    },

    //返回主显示界面
    clickGotoMain:function(){
        log("clickGotoMain");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.gotoMain();
    },
    //跳转到主界面
    gotoMain:function(){
        gotoShowViewForMain();
    },

    //跳转到商城界面
    gotoShopView:function(){
        gotoShowViewForPay();
    },

    //显示界面（最后1按钮） type 0显示 1隐藏
    showView:function(type){
        if(type == 0){
            this.setVisible(true);
            this.showHallTypeView(1);
        }else{
            this.setVisible(false);
            this.showHallTypeView(1);
        }
        this.mMainPalyerInfo.updateCash()
    },
    showHallTypeView:function(type){
        if(type == 1){
            this.mBackBtn.setVisible(false);
            this.mMainPalyerInfo.showHallTypeView(type);
            this.mHelpBtn.setVisible(false);
        }else{
            this.mBackBtn.setVisible(true);
            this.mMainPalyerInfo.showHallTypeView(type);
            this.mHelpBtn.setVisible(true);
        }
    }

});

UILayer.create = function () {
    var sg = new UILayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
