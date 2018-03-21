/**
 * Created by Administrator on 14-4-8.
 * 登陆场景
 */
var LoginLayer = cc.Layer.extend({
    mEditbox_name:null,//用户名 输入框
    mEditbox_pwd:null,//密码 输入框
    mNetLabel:null,//网络提示
    mName:"",//用户名
    mPwd:"",//密码
    mFBUser:null,
    mFBHasReturnData:false,
    mNoticeBtn:null,
    mTempTime:0,//
    mReLoginNum:0,
    init:function () {
        var bRet = false;
        if (this._super()) {

            log("show login layer ");

            sGameData.mLoginLayer = this;
            sGameData.mCurrLayer = this;
            var size = cc.director.getWinSize();

            var ls = cc.sys.localStorage;
            var has = ls.getItem(HAS_LOCAL_USER_DATA);
            if(has){
                this.mName = ls.getItem(LOCAL_USERNAME);
                if(sGameData.mNeedRememberPwd) {
                    this.mPwd = ls.getItem(LOCAL_PASSWORD);
                }
                log("mName=="+this.mName+"|"+this.mPwd);
            }

            this.initLayer();



            var varstr = "v"+sGameData.mGameVersion;
            if(sGameConfig.isLocalTest){
                varstr += "_local";
            }
            var versionLabel = cc.LabelTTF.create(varstr, sGameData.mFontname, 24);
            versionLabel.x = 0;
            versionLabel.y = 0;
            versionLabel.setAnchorPoint(cc.p(0,0));
            this.addChild(versionLabel, 5);
            versionLabel.setColor(sGameData.mTipColor);

            //var guid = getWebGuid();
            //log("guid=="+guid);

            bRet = true;
        }
        return bRet;
    },

    startCheck:function(){
        this.mTempTime = (new Date()).getTime();
        this.schedule(this.doCheckLogin,8);
    },
    doCheckLogin:function(){
        log("doCheckLogin==="+sGameData.mUid_sdk)
        if(sGameData.mUid_sdk == null || sGameData.mUid_sdk.length < 4){
            this.showTip(sResWord.w_tip_getsdkaccount_error);
            this.unschedule(this.doCheckLogin);
        }else{
            sGameData.mIsSendingData = false;
            this.mReLoginNum++;
            if(this.mReLoginNum < 6){
                this.showTip(sResWord.w_tip_reislogining+this.mReLoginNum);
                this.loginBySdk();
            }else{
                this.unschedule(this.doCheckLogin);
                this.showTip(sResWord.w_tip_logingame_error);
            }
        }
    },
    //界面
    initLayer:function(){
        var size = cc.director.getWinSize();

        var loadlogo = res.init_logo_png;
        var tempY_i = 0;
        if(cc.sys.os == cc.sys.OS_ANDROID){
            tempY_i = -5;
        }

        var logoimg = cc.Sprite.create(loadlogo)
        if(logoimg){
             logoimg.setPosition(cc.p(size.width / 2,size.height-25))
             logoimg.setAnchorPoint(cc.p(0.5,1))
             this.addChild(logoimg);
        }

        if(sGameData.mAppUsesdklogin&&cc.sys.os == cc.sys.OS_ANDROID){ //android sdk 登录
            //CallCpp.doSomeString(20,"","","","","");

//            var noticeSprite = cc.Sprite.create("#login_notice.png");
//            var noticeSprite1 = cc.Sprite.create("#login_notice.png");
//            noticeSprite1.setColor(cc.color(200, 200, 200));
//            var noticeSprite2 = cc.Sprite.create("#login_notice.png");
//            var noticeItem = cc.MenuItemSprite.create(
//                noticeSprite,
//                noticeSprite1,
//                noticeSprite2,
//                this.clickNotice, this);
//            noticeItem.attr({
//                x: 100,
//                y: size.height - 20,
//                anchorX: 0.5,
//                anchorY: 0.97
//            });
//            this.mNoticeBtn = noticeItem;
//
//
//            var menu = cc.Menu.create(noticeItem);
//            menu.x = 0;
//            menu.y = 0;
//            this.addChild(menu, 1);

        }else {

        }

            var loginbg = cc.Sprite.create("#login_bg.png");
            loginbg.attr({
                x: size.width/2,
                y: 25,
                anchorY:0
            });
            this.addChild(loginbg);



            var s9sprite1 = cc.Scale9Sprite.create();
            s9sprite1.initWithSpriteFrameName("blank.png");
            //添加输入框
            this.mEditbox_name = null;
            if (sGameData.mCocosVerCode >= 30100) {
                this.mEditbox_name = new cc.EditBox(cc.size(260, 50), s9sprite1);
            } else {
                this.mEditbox_name = cc.EditBox.create(cc.size(260,50), s9sprite1);
            }
            this.mEditbox_name.setString(this.mName);
            this.mEditbox_name.setPlaceHolder(sResWord.w_tip_input_name);
            this.mEditbox_name.setPlaceholderFont(sGameData.mFontname,24);
            this.mEditbox_name.setFontSize(22);
            this.mEditbox_name.x = size.width / 2 + 70;
            this.mEditbox_name.y = size.height * 0.22 + 137;
            this.mEditbox_name.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            this.mEditbox_name.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            //this.mEditbox_name.setPlaceholderFontColor(cc.color(72,72,72));
            //this.mEditbox_name.setFontColor(cc.color(72,72,72));
            //this.mEditbox_name.setDelegate(this);
            this.addChild(this.mEditbox_name);

            //添加输入框
            var s9sprite2 = cc.Scale9Sprite.create();
            s9sprite2.initWithSpriteFrameName("blank.png");
            this.mEditbox_pwd = null;
            if (sGameData.mCocosVerCode >= 30100) {
                this.mEditbox_pwd = new cc.EditBox(cc.size(260, 50), s9sprite2);
            } else {
                this.mEditbox_pwd = cc.EditBox.create(cc.size(260, 50), s9sprite2);
            }
            //this.mEditbox_pwd.setPlaceHolder(sResWord.w_tip_input_pwd);
            this.mEditbox_pwd.setFontSize(32);
            this.mEditbox_pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            this.mEditbox_pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            this.mEditbox_pwd.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            this.mEditbox_pwd.setString(this.mPwd);

            this.mEditbox_pwd.x = size.width / 2 + 70;
            this.mEditbox_pwd.y = size.height * 0.22 - 28 + 104+tempY_i;
            //this.mEditbox_pwd.setFontColor(cc.color(72,72,72));
            //this.mEditbox_pwd.setPlaceholderFontColor(cc.color(72,72,72));
            //this.mEditbox_pwd.setDelegate(this);
            this.addChild(this.mEditbox_pwd);


            //添加 登录
            var loginSprite = cc.Sprite.create("#login_loginBtn.png");
            var loginSprite1 = cc.Sprite.create("#login_loginBtn.png");
            loginSprite1.setColor(cc.color(200, 200, 200))
            var loginSprite2 = cc.Sprite.create("#login_loginBtn.png");
            var loginItem = cc.MenuItemSprite.create(
                loginSprite,
                loginSprite1,
                loginSprite2,
                this.clickLogin, this);
            loginItem.attr({
                x: size.width / 2 + 37+28,
                y: size.height * 0.16 + 50
            });
            //添加 注册
            var guestSprite = cc.Sprite.create("#login_regBtn.png");
            var guestSprite1 = cc.Sprite.create("#login_regBtn.png");
            guestSprite1.setColor(cc.color(200, 200, 200))
            var guestSprite2 = cc.Sprite.create("#login_regBtn.png");
            var guestItem = cc.MenuItemSprite.create(
                guestSprite,
                guestSprite1,
                guestSprite2,
                this.clickGuset, this);
            guestItem.attr({
                x: size.width / 2 + 120,
                y: size.height * 0.06 + 29
            });




            var findpwdSprite = cc.Sprite.create("#login_findPwBtn.png");
            var findpwdSprite1 = cc.Sprite.create("#login_findPwBtn.png");
            findpwdSprite1.setColor(cc.color(200, 200, 200))
            var findpwdSprite2 = cc.Sprite.create("#login_findPwBtn.png");
            var findpwdItem = cc.MenuItemSprite.create(
                findpwdSprite,
                findpwdSprite1,
                findpwdSprite2,
                this.clickfindpwd, this);
            findpwdItem.attr({
                x: size.width / 2 - 120,
                y: size.height * 0.06 + 29
            });





            var boxSprite = cc.Sprite.create("#check_u.png");
            var boxSprite1 = cc.Sprite.create("#check_u.png");
            boxSprite1.setColor(cc.color(200, 200, 200));
            var boxSprite2 = cc.Sprite.create("#check_u.png");
            var boxItem = cc.MenuItemSprite.create(
                boxSprite,
                boxSprite1,
                boxSprite2,
                this.clickBox, this);
            boxItem.attr({
                x: size.width / 2 - 175,
                y: size.height * 0.16 + 34
            });

            var check = cc.Sprite.create("#check_c.png")
            check.attr({
                x: size.width / 2 - 175,
                y: size.height * 0.16 + 34
            });
            this.addChild(check, 6)
            this.mChcekSprite = check;
            if (!sGameData.mNeedRememberPwd) {
                check.setVisible(false);
            }

            var noticeSprite = cc.Sprite.create("#login_notice.png");
            var noticeSprite1 = cc.Sprite.create("#login_notice.png");
            noticeSprite1.setColor(cc.color(200, 200, 200));
            var noticeSprite2 = cc.Sprite.create("#login_notice.png");
            var noticeItem = cc.MenuItemSprite.create(
                noticeSprite,
                noticeSprite1,
                noticeSprite2,
                this.clickNotice, this);
            noticeItem.attr({
                x: 100,
                y: size.height - 20,
                anchorX: 0.5,
                anchorY: 0.97
            });
            this.mNoticeBtn = noticeItem;



            var menu = cc.Menu.create(loginItem, guestItem, findpwdItem, boxItem, noticeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);



        this.startNoticeAnim();
    },

    startNoticeAnim:function(){
        var btn = this.mNoticeBtn;
        if(btn){
           // btn.setVisible(false);
            btn.stopAllActions()
            var anim1 = cc.RotateTo.create(0.3,20);
            var delay1 = cc.DelayTime.create(1);
            var anim3 = cc.RotateTo.create(0.3,0);
            var delay2 = cc.DelayTime.create(3);
            var seq = cc.Sequence.create(anim1,delay1,anim3,delay2);
            btn.runAction(cc.RepeatForever.create(seq));
        }
    },


    clickGuset:function(){
        log("clickGuset----")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //this.gotoLogin();
        this.clickGuestLogin();
    },

    clickGuestLogin:function(){
        log("clickGuestLogin----")
        var ls = cc.sys.localStorage;
        var has = getBoolFromLocalStorage(ls,HAS_LOCAL_USER_DATA);
        var tlogintype = 0;
        if(has){
            var logintype = Number(ls.getItem(LOCAL_LOGINTYPE));
            if(logintype == 0){
                tlogintype = 0
            }else if(logintype == 1){
                tlogintype = 1;
            }
        }else {
            tlogintype = 0;
        }

        var guestuuid = sGameData.mGuestUUID;
        var tmp = md5(guestuuid)
        var pwd = tmp.substring(0,6);
        this.mName = guestuuid
        this.mPwd = pwd
        sGameData.mAccountLoginType = 0;
        sGameData.mGameNet.sendLogin(0, guestuuid, pwd, sGameData.mAgent, sGameData.mGameVersion, sGameData.mPlatform, sGameData.mDeviceName,sGameData.mPromoter);
    },


    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mLoginLayer = null;
    },

    loginByTest:function(name,pwd){
        log("loginByTest---")
        if(sGameData.mGameNet&&sGameNetData.mNetIsConnected){
            this.mName = name;
            this.mPwd = pwd;
            sGameData.mAccountLoginType = 1;
            if(!sGameData.mIsSendingData){
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendLogin(1,name,pwd,"apple",sGameData.mGameVersion,sGameData.mPlatform,sGameData.mDeviceName,sGameData.mPromoter);
            }
        }else{
            this.doReConnNet();
        }
    },

    //type 1获取local帐号失败
    loginSdkError:function(type){
        log("loginSdkError---"+type)
        if(type == 1){
            this.showTip(sResWord.w_tip_getsdkaccount_error);
        }

    },

    loginBySdk:function(){
        log("loginBySdk---")
        if(sGameData.mGameNet&&sGameNetData.mNetIsConnected){
            //local账号作为sdk账号获取，作为系统账号登录
            //其他平台账号作为sdk账号获取，作为sdk账号登录（test－游客）
            var name = sGameData.mUid_sdk;
            var pwd = sGameData.mSession_sdk;
            this.mName = name;
            this.mPwd = pwd;
            sGameData.mAccountLoginType = 1;
            sGameData.mGameNet.sendLogin(sGameData.mAccountLoginType ,name,pwd,sGameData.mAgent,sGameData.mGameVersion,sGameData.mPlatform,sGameData.mDeviceName,sGameData.mPromoter);
        }else{
            this.doReConnNet();
        }
    },
    //登陆
    clickLogin:function(){
        log("clickLogin")

        if(!checkButtonEnable()){
            return;
        } 
        playClickSound();
        if(!sGameData.mIsTestNoNet){
            var name = this.mEditbox_name.getString();
            var pwd = this.mEditbox_pwd.getString();
            if(name!=null&& name.length > 0 &&pwd!=null&& pwd.length > 0){

                    if(sGameData.mGameNet&&sGameNetData.mNetIsConnected){
                        this.mName = name;
                        this.mPwd = pwd;
                        sGameData.mAccountLoginType = 1;
                        if(!sGameData.mIsSendingData){
                            sGameData.mIsSendingData = true
                            sGameData.mGameNet.sendLogin(1,name,pwd,sGameData.mAgent,sGameData.mGameVersion,sGameData.mPlatform,sGameData.mDeviceName,sGameData.mPromoter);
                        }
                    }else{
                        this.doReConnNet();
                    }

            }else{
                showLittleNotice(sResWord.w_tip_input_nameorpwd);
            }
        }else{
            sGameData.mLoginScene.gotoMain();
        }

    },

    clickfindpwd:function(){
        log("clickfindpwd")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.showGetPwd(true);
    },

    //显示bind
    showGetPwd:function(state){
        var setl = this.getChildByTag(5555);
        if(!setl){
            setl = GetPwdPanel.create();
            if(setl){
                this.addChild(setl,50,5555);
                //setl.setPosition(cc.p(0,0));
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
        if(!cc.sys.isNative){
            if(state){
                this.mEditbox_name.setVisible(false)
                this.mEditbox_pwd.setVisible(false)
            }else{
                this.mEditbox_name.setVisible(true)
                this.mEditbox_pwd.setVisible(true)
            }
        }

    },

    clickNotice:function(){
        log("clickNotice")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        var msg = getGameSysConfig("billboard")
        if(msg.length > 0){
            msg = formatMsgFromNet(msg);
            showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
        }
    },

    clickBox:function(){
        log("clickBox")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        if(!sGameData.mNeedRememberPwd){
            sGameData.mNeedRememberPwd = true
            this.mChcekSprite.setVisible(true);
        }else{
            sGameData.mNeedRememberPwd = false
            this.mChcekSprite.setVisible(false);
        }
    },

    //重连网络
    doReConnNet:function(){
        if(sGameNetData.mNetIsClosed
            &&!sGameNetData.mIsConnectIng
            &&!sGameNetData.mISReConnect_close){
            sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,5);
        }
    },
    //保存信息到本地
    saveToLocal:function(type){
        sGameData.mUserName_login = this.mName
        sGameData.mPwd_login = this.mPwd
        saveUserInfo(this.mName,this.mPwd,type);
    },
    //清除输入框
    cleanText:function(){
        this.mEditbox_name.setString("");
        this.mEditbox_pwd.setString("");
    },
    //显示提示
    showTip:function(msg){
        log("tip11=="+msg);
        if(this.mNetLabel!=null){
            this.mNetLabel.setString(msg);
        }
    },
    //点击到注册界面
    clickReg:function(){
        log("clickReg")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.gotoReg();

        //this.clickFBLogin();

    },
    //跳转到注册
    gotoReg:function(){
        log("gotoReg")
        if(sGameData.mCurrLayer!=sGameData.mRegLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = RegLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    }
});

LoginLayer.create = function () {
    var sg = new LoginLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

