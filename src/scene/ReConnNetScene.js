/**
 * Created by apple on 15-4-22.
 *  断线之后重新登录
 */
var ReConnNetScene = BaseScene.extend({
    mIsFristIn:true,//第1次进入
    mIsGotoLogin:false,//是否跳转到登录
    mNetLabel:null,
    mHasShowBtn:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            log("screen wh="+size.width+"-"+size.height);

            sGameData.mReConnNetScene = this;
            sGameData.mCurrScene = this;

            //加载plist 1
            cc.spriteFrameCache.addSpriteFrames(res.mainbg_plist);
            cc.spriteFrameCache.addSpriteFrames(res.main_ui_plist);
            cc.spriteFrameCache.addSpriteFrames(res.game_ui_plist);
            cc.spriteFrameCache.addSpriteFrames(res.gameui_scale9_plist);

            var bgimg = cc.Sprite.create("#mainbg.png")
            bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
            this.addChild(bgimg);
            if(sGameData.mAppMainBGScale) {
                bgimg.setScaleX(size.width / bgimg.width)
                bgimg.setScaleY(size.height / bgimg.height)
            }

            var loadlogo = res.init_logo_png;

            var logoimg = cc.Sprite.create(loadlogo);
                           if(logoimg){
                                      logoimg.attr({
                                                   x:size.width *0.5,
                                                   y: size.height *0.5+169
                                                   });
                                      this.addChild(logoimg);
                           }
            this.mNetLabel = cc.LabelTTF.create(sResWord.w_net_isconnecting, sGameData.mFontname, 24);
            this.mNetLabel.x = size.width / 2;
            this.mNetLabel.y = 30;
            this.addChild(this.mNetLabel, 6);
            sGameData.netTipLabel = this.mNetLabel;
            this.schedule(this.update,0.05);
            this.mNetLabel.setColor(sGameData.mTipColor);

            var varstr = "v"+sGameData.mGameVersion;
            if(sGameConfig.isLocalTest){
                varstr += "_local ";
            }
            var versionLabel = cc.LabelTTF.create(varstr, sGameData.mFontname, 24);
            versionLabel.x = 0;
            versionLabel.y = 0;
            versionLabel.setAnchorPoint(cc.p(0,0));
            this.addChild(versionLabel, 5);
            versionLabel.setColor(sGameData.mTipColor);

            bRet = true;
        }
        return bRet;
    },

    //退出时执行
    onExit:function(){
        log("jsstart scene exit")
        this._super();
        sGameData.netTipLabel = null;
    },
    //初始化游戏数据
    initInSecondFrame:function(){
        if(!sGameData.mIsTestNoNet){
            //初始化网络
            sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,0);
            //sGameData.mGameNet.init(sGameConfig.serverIp,sGameConfig.serverWebSocketPort);
        }else{
            this.gotoGameLogin();
        }
    },
    //每帧更新
    update:function(){
        this._super();
        if(this.mIsFristIn){
            this.mIsFristIn = false;
            this.initInSecondFrame();
        }
        if(sGameData.mGameNet) {
            if (!this.mIsGotoLogin && sGameNetData.mNetIsConnected) { //网络 连接 成功，进入 登录
                this.mIsGotoLogin = true;
                this.gotoGameLogin();
            }
        }

    },



    //显示提示
    showTip:function(msg){
        log("tip11=="+msg);
        if(this.mNetLabel!=null){
            this.mNetLabel.setString(msg);
        }
    },
    //保存信息到本地
    saveToLocal:function(logintype){
        sGameData.mUserName_login = this.mName
        sGameData.mPwd_login = this.mPwd
        saveUserInfo(this.mName,this.mPwd,logintype);
    },

    loginByGuest:function(){
        log("loginByGuest---")
        var guestuuid = sGameData.mGuestUUID;
        var tmp = md5(guestuuid)
        var pwd = tmp.substring(0, 6);
        sGameData.mAccountLoginType = 0;
        sGameData.mGameNet.sendLogin(0, guestuuid, pwd, sGameData.mAgent, sGameData.mGameVersion, sGameData.mPlatform, sGameData.mDeviceName,sGameData.mPromoter);
    },

    //跳转到登陆
    gotoGameLogin:function(){
        log("gotoGameLogin")
        var ls = cc.sys.localStorage;
        if(sGameData.mIsTestNoNet){
            this.showGameLoginScene();
        }else{
            var has = getBoolFromLocalStorage(ls,HAS_LOCAL_USER_DATA);
            if(has){
                var logintype = Number(ls.getItem(LOCAL_LOGINTYPE));
                if(logintype == 0){
                    sGameData.netTipLabel.setString(sResWord.w_tip_autologin);
                    this.loginByGuest();
                }else if (logintype > 0 ) {
                    sGameData.netTipLabel.setString(sResWord.w_tip_autologin);
                    var aName = ls.getItem(LOCAL_USERNAME);
                    var aPwd = ls.getItem(LOCAL_PASSWORD);
                    this.mName = aName
                    this.mPwd = aPwd
                    sGameData.mAccountLoginType = logintype;
                    sGameData.mGameNet.sendLogin(logintype, aName, aPwd, sGameData.mAgent, sGameData.mGameVersion, sGameData.mPlatform, sGameData.mDeviceName,sGameData.mPromoter);
                }else{
                    this.showGameLoginScene();
                }
            }else{
                //this.showGameLoginScene();
                sGameData.netTipLabel.setString(sResWord.w_tip_autologin);
                this.loginByGuest();
            }
        }

    },
    showGameLoginScene:function(){
        cc.director.runScene(new LoginScene.scene());
    },
    showMainScene:function(){
        gotoSceneByLoading(TargetSceneMain,0);
    },

    //本地版本 本地连不上时显示
    showNetBtn:function(){
        if(sGameConfig._isLocalVersion&&!this.mHasShowBtn){
            this.mHasShowBtn = true;
            var size = cc.director.getWinSize();
            //添加 注册
            var netSprite = ButtonSpriteWithWordInner(res.button2_png,"toserver",cc.p(0.5,0.5),20);
            var netSprite1 = ButtonSpriteWithWordInner(res.button2_1_png,"toserver",cc.p(0.5,0.5),20,1);
            var netSprite2 = ButtonSpriteWithWordInner(res.button2_png,"toserver",cc.p(0.5,0.5),20);
            var netItem = cc.MenuItemSprite.create(
                netSprite,
                netSprite1,
                netSprite2,
                this.changeNet,this);
            netItem.attr({
                x:size.width-50,
                y:size.height-30
            });
            var menu = cc.Menu.create(netItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
        }
    },
    //更改网络 （local to server）
    changeNet:function(){
        //从本地改到网络
        changeConnectNetAddr(false);
    }

});
ReConnNetScene.create = function () {
    var sg = new ReConnNetScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
ReConnNetScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = ReConnNetScene.create();
    scene.addChild(layer);
    return scene;
};
