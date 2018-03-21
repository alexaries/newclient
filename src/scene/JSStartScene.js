/**
 * Created by Administrator on 14-4-16.
 * js 的 开始（第一个）界面
 * 在此连接网络，连接成功，跳到登陆
 */
cc.sys.dump();
var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var JSStartScene = BaseScene.extend({
    mIsFristIn:true,//第1次进入
    mIsGotoLogin:false,//是否跳转到登录
    mIsCheckConfigVersion:0,//是否正在检测版本  ／／0 1正在 2已结束 3已保存
    mNetLabel:null,
    mHasShowBtn:false,
    mDoReLoad:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            log("screen wh="+size.width+"-"+size.height);

            sGameData.mJSStartScene = this;
            sGameData.mCurrScene = this;

            //初始化 数据 设置
            sGameConfig.setConfigData(2);//设在前面 jsb 和 html5
            setVersionInfo();
            setLanguageWord();
            setSysData_config();
            initDataBeforeStartGame();

            getGuestUUID();

            if (cc.sys.isNative) {
                if(sGameData.mUseSqliteByJS){//js 端 使用数据库
                    var sqlm = new SqliteManager();
                    sqlm.init();
                    sGameData.mSysDataDBMan = sqlm;
                }
            }


            if (cc.sys.isNative) {
                //叫cpp 给js 传递数据（返回 CppCall.getInitdataFromCpp）
                CallCpp.doSomeString(3, "","","","","");
                //app base ver
                CallCpp.doSomeString(13, "","","","","");
            } else {
                sGameData.mGameVersion = sGameConfig.clientVersion+"."+sGameConfig.resVersion;
            }
            //
            dealCppVerbuild();
            if(sGameData.mAppBaseVersion.length == 0){
                sGameData.mAppBaseVersion = sGameConfig.clientVersion+"_"+sGameConfig.resVersion;
            }
            log("game version=" + sGameData.mGameVersion);
            log("app base version=" + sGameData.mAppBaseVersion);
            checkSysFunctionCanuse();


            //加载plist 1
            cc.spriteFrameCache.addSpriteFrames(res.mainbg_plist);
            cc.spriteFrameCache.addSpriteFrames(res.main_ui_plist);

            getVersion();

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
                                                 y: size.height *0.5
                                                 });
                                    this.addChild(logoimg);
                                }

            //build 20 之前的是 直接连得正式服务器，20之后的都可以跳转
            log("sGameData.mGameVersion = " + sGameData.mGameVersion);
            log("sGameData shUpdateVersion = "+ sGameData.shUpdateVersion);
            if (cc.sys.os == cc.sys.OS_IOS&&sGameConfig.useconfig!="app") {//ios 才检测
                var cppbuild = Number(sGameData.mAppCppBuild);
                if(cppbuild > 15){
                var index = sGameData.mGameVersion.lastIndexOf(".");
                    sGameConfig.mCppResVersion = sGameData.mGameVersion.substring(index+1);
                    log("sGameConfig.mCppResVersion=="+sGameConfig.mCppResVersion)
                    if (sGameConfig.mCppResVersion == sGameConfig.shUpdateVersion  //测试服务器像正式服务器过度，重新 加载 (资源版本自动加1)
                        || (!sGameData.mAppIsSubmitToAppStore && cppbuild>=20)
                        || (sGameConfig.mCppResVersion == "28" &&  sGameConfig.shUpdateVersion == "14")
                        || (sGameConfig.mCppResVersion == "19" &&  sGameConfig.shUpdateVersion == "16")// 18 16  ->19
                        || (sGameConfig.mCppResVersion == "21" &&  sGameConfig.shUpdateVersion == "16")// 18 16  ->21
                        || (sGameConfig.mCppResVersion == "22" &&  sGameConfig.shUpdateVersion == "16")// 18 16  ->22
                        || (sGameConfig.mCppResVersion == "21" &&  sGameConfig.shUpdateVersion == "19")// 18 19  ->21
                        || (sGameConfig.mCppResVersion == "22" &&  sGameConfig.shUpdateVersion == "19")// 18 19  ->22
                        || (sGameConfig.mCppResVersion == "22" &&  sGameConfig.shUpdateVersion == "21")
                        || (sGameConfig.mCppResVersion == "24" &&  sGameConfig.shUpdateVersion == "16")
                        || (sGameConfig.mCppResVersion == "24" &&  sGameConfig.shUpdateVersion == "19")
                        || (sGameConfig.mCppResVersion == "24" &&  sGameConfig.shUpdateVersion == "21")
                        || (sGameConfig.mCppResVersion == "24" &&  sGameConfig.shUpdateVersion == "23")
                        || (sGameConfig.mCppResVersion == "25" &&  sGameConfig.shUpdateVersion == "16")
                        || (sGameConfig.mCppResVersion == "25" &&  sGameConfig.shUpdateVersion == "19")
                        || (sGameConfig.mCppResVersion == "25" &&  sGameConfig.shUpdateVersion == "21")
                        || (sGameConfig.mCppResVersion == "25" &&  sGameConfig.shUpdateVersion == "23")) { //临时添加条件
                        this.mDoReLoad = true;
                        this.scheduleOnce(this.doReLoadInSecondFrame,0.05);
                        return true;
                    }
                }

                if(sGameData.mAppCppVersion=="1.5" && !sGameData.mAppIsSubmitToAppStore){
                    this.mDoReLoad = true;
                    this.scheduleOnce(this.doReLoadInSecondFrame,0.05);
                    return true;
                }
            }

            this.mNetLabel = cc.LabelTTF.create(sResWord.w_loading, sGameData.mFontname, 24);
            this.mNetLabel.x = size.width / 2;
            this.mNetLabel.y = 30;
            this.addChild(this.mNetLabel, 6);
            this.mNetLabel.setColor(sGameData.mTipColor);
            sGameData.netTipLabel = this.mNetLabel;
            this.schedule(this.update,0.05);


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
    doReLoadInSecondFrame:function(){
        if(this.mDoReLoad){
            this.cleanAllJs();
            sGameConfig.useconfig = "app";//脚本清除不掉，直接改变配置值
            CallCpp.doSomeString(1001, "","","","","");
            this.mDoReLoad = false;
        }
    },
    //清除所有js(fileUtil 里的缓存 也必须清除，不然不会生效)
    cleanAllJs:function(){
        log("cleanAllJs---")
        //Clean script should also clean up the cache in file utils.
        for(var i=0;i<JSPaths.length;i++){
            var jspath = JSPaths[i];
            CallCpp.doSomeString(11, jspath,"","","","");
        }
        jsb.fileUtils.purgeCachedEntries();
    },

    //测试代码区
    test:function(){
        log("test----")

        var md5str = md5("abc");
        log("md5str=="+md5str)

        log("now=="+(new Date()).getTime())
        log("sGameConfig.serverResWebhttp=="+sGameConfig.serverResWebhttp)
        var time = 1398758884856
        if(cc.sys.isNative){
            //var paths = jsb.FileUtils.getSearchPaths()
            //log("searchpaths=="+paths)
        }

        //            var   s   =   "2014-08-01 17:13:17";
//            var   d   =   new   Date(Date.parse(s.replace(/-/g,   "/")));
//            var long2 =d.getTime() ;
//            var long1 =1406884397770 ;
//            log("long2=="+long2+"|"+long1) //1402589430147
//            var testp = Packet.create();
//            testp.writeLong(long2);
//            testp.writeLong(long1);
//            var t1 = testp.readLong()
//            var t2 = testp.readLong()
//            log("t1=="+t1+"|"+t2) //1402589430147


        if(cc.sys.isNative){
            //CallCpp.doSomeString(999999,"1","aaa","bbb","","");
        }else{

        }


        log("test----end")
    },
    //退出时执行
    onExit:function(){
        log("jsstart scene exit")
        this._super();
        sGameData.netTipLabel = null;
    },
    //初始化游戏数据
    initGameData:function(){
        if(!sGameData.mIsGameDataInited) {
            sGameData.mIsGameDataInited = true;
            log("start game---initGameData")

            //if (cc.sys.isNative) {
               // loadGameNewJS(); //加载新增加的js
            //}

            sGameData.mPlatform = cc.sys.os;  //iphone android web
            sGameData.mPlatform = sGameData.mPlatform.toLowerCase()
            if (cc.sys.os == cc.sys.OS_IOS) {
                sGameData.mPlatform = "iphone"
            }
            if(!cc.sys.isNative){
                sGameData.mPlatform = "android"
                sGameData.mDeviceName = "vivo"
            }

            log("mPlatform=" + sGameData.mPlatform);
            log("mDeviceName=" + sGameData.mDeviceName);
            log("isNative=" + cc.sys.isNative);

            if (cc.sys.os == cc.sys.OS_IOS) {
                sGameData.mFontname = "STHeiti-Medium";
            }

            var guid = "";
            var ls = cc.sys.localStorage;
            var has = ls.getItem(HAS_LOCAL_GUEST_USER_DATA);
            if (has) {
                guid = ls.getItem(LOCAL_GUESTGUID);
            } else {
                if (sGameData.mPlatform == cc.sys.OS_IOS) {
                    guid = getWebGuid();
                } else if (sGameData.mPlatform == cc.sys.OS_ANDROID) {
                    guid = getWebGuid();
                } else {
                    guid = getWebGuid();
                }
            }
            sGameData.mGuid = guid;
            log("mGuid==" + sGameData.mGuid);

            log(" agent is :" + sGameData.mAgent);

            //this.showNetBtn();
            sGameData.mGameNet = new GameNet();

            //sGameData.mGameNetHandle

            cc.spriteFrameCache.addSpriteFrames(res.game_ui_plist);
            cc.spriteFrameCache.addSpriteFrames(res.gameui_scale9_plist);


            AnimationManager.initAllViewAnim();


            //获取电量等信息
            CallCpp.doSomeString(80, "","","","","");
            setDataConfigToCpp();

            var nowtime = (new Date()).getTime();
            var nowtimestr = getLocalTime_hm(nowtime);
            log("nowtimestr==" +nowtimestr);

            if(sGameData.mIsTestNoNet){
                initTestGameBaseDatas();
            }

            if(!cc.sys.isNative) {
                var canloadPicHtml5 = true;

                var hostname = window.location.hostname;
                var hostport = window.location.port;
                if (sGameConfig.serverResWebhttp.indexOf(hostname) == -1) {
                    canloadPicHtml5 = false;
                } else {
                    if (hostport != 80 && sGameConfig.serverResWebhttp.indexOf(hostname) == -1) {
                        canloadPicHtml5 = false;
                    }
                }
                sGameData.mCanloadPicHtml5 = canloadPicHtml5
                log("canloadPicHtml5==" + canloadPicHtml5);
            }


        }
    },
    //初始化游戏数据
    initInSecondFrame:function(){


        this.initGameData();

        var forceUpdate = false;
        //if (cc.sys.os == cc.sys.OS_ANDROID ) {
        //    log("check update -- sGameData.mAppCppVersion=="+sGameData.mAppCppVersion);
        //    if(Number(sGameData.mAppCppBuild) < 15){
        //        forceUpdate = true;
        //        sGameData.mForceUpUrl = "http://www.duoleyx.com/qp_dl_v1.1.18_0708.apk";
        //        if(sGameData.mPromoter == "android_bobo_duoleyx.com"){
        //            sGameData.mForceUpUrl = "http://www.duoleyx.com/qp_dl_bobo_v1.1.18_0708.apk";
        //        }
        //    }
        //}
        if (cc.sys.os == cc.sys.OS_IOS) {
            //var info = checkUpdate(sGameData.mAgent,sGameData.mPromoter,sGameData.mAppCppVersion);
            //if(info){
            //    forceUpdate = true;
            //    sGameData.mForceUpUrl = info[5];
            //}
        }
        if(forceUpdate){
            var tipmsg = "因充值SDK升级，旧充值SDK即将停用，请升级到新版本。是否升级到新版本？";
            //showNotice("升级提示",tipmsg,10,0);
            showNotice("升级提示",tipmsg,3,7);

            sGameData.netTipLabel.setString(tipmsg);
        }else{
            this.initNet();
        }


        this.test();
    },
    initNet:function() {
        if(!sGameData.mIsTestNoNet){
            //初始化网络
            log("sGameConfig.serverIp=="+sGameConfig.serverIp)
            if(sGameConfig.serverIp.length > 0){
                sGameData.mGameNet.init(sGameConfig.serverIp,sGameConfig.serverWebSocketPort);
            }else{
                log("server weihu")
                sGameData.netTipLabel.setString(sResWord.w_tip_server_weihu);
            }
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
       if(sGameData.mGameNet){
           if(!this.mIsGotoLogin&&sGameNetData.mNetIsConnected){ //网络 连接 成功，进入 登录
               this.mIsGotoLogin = true;

               if(sGameData.mAppCanCheckConfigVersion){//需要检测配置版本版本
                   if(sGameData.mUseSqliteByJS) {
                       if(sGameData.mSysDataDBMan){
                           sGameData.mSysDataDBMan.initTest();
                       }
                       log("config starttime = "+(new Date()).getTime())
                       doStartSendGetConfig();
                       this.mIsCheckConfigVersion = 1;//正在检测
                       sGameData.mGameNet.showTip(sResWord.w_net_tip_checkconfig);
                   }else{
                       this.gotoGameLogin();
                   }
               }else{
                   this.gotoGameLogin();
               }
           }


           if(this.mIsCheckConfigVersion == 2){
               log("----load local config----")
               loadLocalConfigByDB();
               this.mIsCheckConfigVersion = 3;
           }

           if(this.mIsCheckConfigVersion == 3){//保存配置 放到进入后台时进行
               log("----save local config----")
               //saveConfigDataToDB();
               if(sGameData.mAppCanLocalPushMsg){
                   //if(cc.sys.isNative) {
                   sendLocalPushMsg();
                   //}
               }
               if(sGameData.mAppUseDownGameRes){
                    getGameResListFromServer();
                    this.mIsCheckConfigVersion = 9;
               }else{
                    this.mIsCheckConfigVersion = 4;
               }
           }
           if(this.mIsCheckConfigVersion == 9) { //正在获取游戏资源信息
               if(sGameData.mHasGetGameResData){
                   this.mIsCheckConfigVersion = 4;
               }
           }
           if(this.mIsCheckConfigVersion == 4){//检测结束
               log("---- config over   gotologin----")
               log("config endtime = "+(new Date()).getTime())
               initSysDataByConfig();
               this.gotoGameLogin();
               this.mIsCheckConfigVersion = 5;
           }
       }

    },


    //更新网络指令
    updateOnLoadDataInHall:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_CONFIG_VERSION:
                this.noticeConfigVersion(netdata)
                break;
            default:
                log("unknown command="+command);
                break;
        }
    },
    noticeConfigVersion:function(netdata){
        log("noticeConfigVersion--")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            this.showTip(sResWord.w_net_tip_loadconfig);
            var cfgdatas = netdata[2];
            for(var i = 0;i<cfgdatas.length;i++){
                var cfgdata = cfgdatas[i];
                var config = getLocalDBConfigByName(cfgdata.name);
                var configId = config[0];
                sGameData.mSysDataConfiglist.push([configId,cfgdata.version]);
                sGameData.mConfigDataNeedLoadByDB[configId] = 0;
                sGameData.mConfigDataNeedSaveToDB[configId] = 1;
                if(configId == CONFIG_GAMECONFIG) {
                    sGameData.mSys_GameConfigs = cfgdata.datas
                }else if(configId == CONFIG_PRIZE) {
                    sGameData.mSys_Prizes = cfgdata.datas
                }else if(configId == CONFIG_PROPS) {
                    sGameData.mSys_Propses = cfgdata.datas
                }else if(configId == CONFIG_SIGNIN) {
                    sGameData.mSys_Signins = cfgdata.datas
                }else if(configId == CONFIG_TASK) {
                    sGameData.mSys_Tasks = cfgdata.datas
                }else if(configId == CONFIG_USERLEVEL) {
                    sGameData.mSys_UserLevels = cfgdata.datas
                }else if(configId == CONFIG_VIP) {
                    sGameData.mSys_Vips = cfgdata.datas
                }
            }
            this.mIsCheckConfigVersion = 2;

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //显示提示
    showTip:function(msg){
        log("tip11=="+msg);
        if(this.mNetLabel!=null){
            this.mNetLabel.setString(msg);
        }
    },


    //type 1获取local帐号失败
    loginSdkError:function(type){
        log("loginSdkError---"+type)
        if(type == 1){
            this.showTip(sResWord.w_tip_getsdkaccount_error);
        }

        this.showTip(sResWord.w_tip_autologin);
        this.loginByGuest();
    },

    loginBySdk:function(){
        log("loginBySdk---")
        //local账号作为sdk账号获取，作为系统账号登录
        //其他平台账号作为sdk账号获取，作为sdk账号登录（test－游客）

        var name = sGameData.mUid_sdk;
        var pwd = sGameData.mSession_sdk;
        this.mName = name;
        this.mPwd = pwd;
        sGameData.mAccountLoginType = 1;
        sGameData.mGameNet.sendLogin(sGameData.mAccountLoginType,name,pwd,sGameData.mAgent,sGameData.mGameVersion,sGameData.mPlatform,sGameData.mDeviceName,sGameData.mPromoter);

    },
    loginByGuest:function(){
        log("loginByGuest---")
        if(sGameData.mUseGuestLoginNum<3){
            var guestuuid = sGameData.mGuestUUID;
            var tmp = md5(guestuuid)
            var pwd = tmp.substring(0, 6);
            this.mName = guestuuid
            this.mPwd = pwd
            sGameData.mAccountLoginType = 0;
            sGameData.mGameNet.sendLogin(0, guestuuid, pwd, sGameData.mAgent, sGameData.mGameVersion, sGameData.mPlatform, sGameData.mDeviceName,sGameData.mPromoter);
            sGameData.mUseGuestLoginNum++;
        }else{
            this.showGameLoginScene();
        }
    },

    //跳转到登陆
    gotoGameLogin:function(){
        log("gotoGameLogin")
        var ls = cc.sys.localStorage;

        if(sGameData.mIsTestNoNet){
            this.showGameLoginScene();
        }else {
            if (sGameData.mAppUseUUIDAutoLogin){
                var has = getBoolFromLocalStorage(ls, HAS_LOCAL_USER_DATA);
                if (has) {
                    var logintype = Number(ls.getItem(LOCAL_LOGINTYPE));
                    if (logintype == 0) {
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
                    }else {
                        this.showGameLoginScene();
                    }
                } else {// 没有默认数据
                    //this.showGameLoginScene();
                    if(cc.sys.os == cc.sys.OS_ANDROID&&sGameData.mAppUseLocalAccount) { //android sdk 登录 //尝试取账号
                        log("---try get local account----")
                        CallCpp.doSomeString(20, "", "", "", "", "");
                        sGameData.netTipLabel.setString(sResWord.w_tip_islogining);
                    }else {
                        sGameData.netTipLabel.setString(sResWord.w_tip_autologin);
                        this.loginByGuest();
                    }
                }
            }else{
                this.showGameLoginScene();
            }
        }

    },
    showGameLoginScene:function(){
        cc.director.runScene(new LoginScene.scene());
    },
    showMainScene:function(){
        gotoSceneByLoading(TargetSceneMain,0);
    },
    //保存信息到本地
    saveToLocal:function(logintype){
        sGameData.mUserName_login = this.mName
        sGameData.mPwd_login = this.mPwd
        saveUserInfo(this.mName,this.mPwd,logintype);
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
JSStartScene.create = function () {
    var sg = new JSStartScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
JSStartScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = JSStartScene.create();
    scene.addChild(layer);
    return scene;
};
