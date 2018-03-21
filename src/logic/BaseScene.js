/**
 * Created by Administrator on 14-4-18.
 * 基本 Scene
 */
var BaseScene = cc.Layer.extend({
    vtime:0,
    lastClickTime:0,
    mPlistPicRes:[],//plist 图片资源
    mPlistAnimRes:[],//plist 动画资源 1个plist  一个动画
    mPlistManyAnimRes:[],//plist 动画资源  1个plist  多个动画
    mCcsAnimRes:[],//ccs 动画资源
    mCurrLoadIndex:0,//当前加载的编号
    mAllLoadNum:0,//总资源数
    mCanLoadRes:true,//能否加载资源
    mLoadBaseNode:null,//基本节点
    mLoadTip:null,//提示
    mCmdFirstPause:false,//读取指令后，第1次 暂停 读取指令
    mCmdPauseTime:0,//暂停 读取指令 时间
    mGetDeviceInfoTime:0,//获取电量信号时间
    mGetDownSizeTime:0,//获取下载大小时间
    init:function () {
        var bRet = false;
        if (this._super()) {
            sGameData.mIsGameShowAniming = false;
            sGameData.mPausedCommand_Use = false;
            sGameData.mIsGameSitDownAnimNum = 0;
            sGameData.mIsGameSitDownAniming = false;
            sGameData.mIsGameShowBetAniming = false;
            sGameData.mIsEnterGameing = false;
            sGameData.mIsShowTopView = false;
            sGameData.mIsShowNoticeing = false;
            if(sGameData.mUser){
                sGameData.mUser.chairId = -1;
            }
            if(!sGameData.mIsTestNoNet){
                sGameData.mChatMsgList = [];//聊天信息清除
            }

            this.dealKeyboard();

            bRet = true;
        }
        return bRet;
    },
    /**
     * 设置要加载的资源
     * @param plistpicres  plist 图片资源
     * @param plistanimress  plist 动画资源
     * @param ccsanimress cocostudio 动画资源 （目前就dn有）
     * @param plistmanyanimreses 单plist 多动画 资源 （目前就tn有）
     */
    startLoadRes:function(plistpicres,plistanimress,ccsanimress,plistmanyanimreses){

        setTexture2DAlphaPixelFormatTo4444(1)

        this.mPlistPicRes = plistpicres;
        this.mPlistAnimRes = plistanimress;
        this.mCcsAnimRes = ccsanimress;
        this.mPlistManyAnimRes = plistmanyanimreses;
        var allreslen = plistpicres.length+plistanimress.length+ccsanimress.length+this.mPlistManyAnimRes.length;
        log("allres len = "+allreslen);
        this.mAllLoadNum = allreslen;
        this.showInitLoad();
        this.schedule(this.updateLoad,0.01);
    },
    //显示加载界面
    showInitLoad:function(){
        var size = cc.director.getWinSize();
        var baseNode = cc.Node.create();
        this.addChild(baseNode);

        this.mLoadBaseNode = baseNode;

        var tipcolor = sGameData.mTipColor;
        var loadlogo = res.init_logo_png;//res.g_loading_logo_fsz_png,

        var shownormal = true;

        if(shownormal){
            if(sGameData.mAppLoadUseBG) {
                cc.spriteFrameCache.addSpriteFrames(res.mainbg_plist);

                var bgimg = cc.Sprite.create("#mainbg.png")
                bgimg.setPosition(cc.p(size.width / 2, size.height / 2))
                baseNode.addChild(bgimg);
                if(sGameData.mAppMainBGScale){
                    bgimg.setScaleX(size.width/bgimg.width)
                    bgimg.setScaleY(size.height/bgimg.height)
                }
            }
        }else{
            tipcolor = cc.color(255,255,255);
        }

        var logoimg = cc.Sprite.create(loadlogo);
                            if(logoimg){
                                logoimg.attr({
                                             x:size.width *0.5,
                                             y: size.height *0.5
                                             });
                                baseNode.addChild(logoimg,1);
                            }

        AnimationManager.initAllViewAnim();


        var tipstr = "";

        if(sGameData.mCurrScene == sGameData.mZJHGameScene){
            tipstr = sResWord.w_gametip_zjh
        }else if(sGameData.mCurrScene == sGameData.mDDZGameScene){
            tipstr = sResWord.w_gametip_ddz
        }else{
            var tips = [sResWord.w_gametip_1,sResWord.w_gametip_2,sResWord.w_gametip_3]
            var rand = randomInt(tips.length)
            tipstr = sResWord.w_game_littletip+":"+tips[rand];
        }
        var tipLabel2 = cc.LabelTTF.create(tipstr, sGameData.mFontname, 24,
            cc.size(800,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        tipLabel2.x = size.width / 2;
        tipLabel2.y = 80;
        baseNode.addChild(tipLabel2, 6);
        if(sGameData.mAppIsSubmitToAppStore){
            tipLabel2.setVisible(false);
        }
        tipLabel2.setColor(tipcolor);



        var tipLabel = cc.LabelTTF.create(sResWord.w_loading+"...", sGameData.mFontname, 24);
        tipLabel.x = size.width / 2;
        tipLabel.y = 30;
        baseNode.addChild(tipLabel, 6);
        this.mLoadTip = tipLabel;
        tipLabel.setColor(tipcolor);
//        var animsprite = cc.Sprite.create(res.tblank_png);
//        animsprite.setPosition(cc.p(size.width / 2,120));
//        this.addChild(animsprite);
//        var animation = AnimationManager.getAnimation("netwait")
//        if(animation!= null){
//            var frames = animation.getFrames();
//            if(frames.length > 0){
//                var frame = frames[0];
//                var sprite = frame.getSpriteFrame()
//                animsprite.setSpriteFrame(sprite);
//                var animate =  cc.Animate.create(animation);
//                animsprite.runAction(cc.RepeatForever.create(animate));
//            }
//        }
    },
    //更新提示
    updateLoadTip:function(msg){
        if(this.mLoadTip){
            this.mLoadTip.setString(sResWord.w_loading+"..."+msg);
        }
    },
    //清除加载界面
    cleanLoadView:function(){
        if(this.mLoadBaseNode){
            this.mLoadBaseNode.removeAllChildren();
            this.removeChild(this.mLoadBaseNode);
        }
        this.mLoadTip = null;
    },
    //更新加载
    updateLoad:function(){
        if(this.mCanLoadRes){
            if(this.mCurrLoadIndex < this.mAllLoadNum){
                this.doLoadRes(this.mCurrLoadIndex);
            }else{
                this.mCanLoadRes = false;
                this.unschedule(this.updateLoad);
                setTexture2DAlphaPixelFormatTo4444(0);
                this.showView();
            }
        }
    },
    //执行加载某资源
    doLoadRes:function(index){
        log("doLoadRes=="+index);
        this.mCanLoadRes = false;
        if(this.mCurrLoadIndex<this.mPlistPicRes.length){ //加载 plist 图
            var plistres = this.mPlistPicRes[this.mCurrLoadIndex]
            cc.spriteFrameCache.addSpriteFrames(plistres);
        }else  if(this.mCurrLoadIndex<this.mPlistPicRes.length+this.mPlistAnimRes.length){ //加载 plist 动画
            var index = this.mCurrLoadIndex - this.mPlistPicRes.length
            var data = this.mPlistAnimRes[index];
            AnimationManager.createAnimationByData(data);
        }else if(this.mCurrLoadIndex<this.mPlistPicRes.length+this.mPlistAnimRes.length+this.mCcsAnimRes.length){ //加载 ccs 动画
            var index = this.mCurrLoadIndex - this.mPlistPicRes.length-this.mPlistAnimRes.length
            var data = this.mCcsAnimRes[index];
            ccs.armatureDataManager.addArmatureFileInfo(data[1], data[2], data[3]);
        }else{  //加载 单plist 多动画
            var index = this.mCurrLoadIndex - this.mPlistPicRes.length-this.mPlistAnimRes.length-this.mCcsAnimRes.length
            var data = this.mPlistManyAnimRes[index];
            AnimationManager.createAnimationByDataForMany(data)
        }
        this.mCurrLoadIndex++;
        if(this.mAllLoadNum > 100){
            //this.updateLoadTip(Math.floor((this.mCurrLoadIndex+4)/5)+"/"+Math.floor((this.mAllLoadNum+4)/5));
            this.updateLoadTip(this.mCurrLoadIndex+"/"+this.mAllLoadNum);
        }else{
            this.updateLoadTip(this.mCurrLoadIndex+"/"+this.mAllLoadNum);
        }
        this.mCanLoadRes = true;
    },
    //资源加载完 显示界面
    showView:function(){

    },
    //处理点击 触摸  （android 双击 back 退出游戏）
    dealKeyboard: function () {
        var self = this;
//        for(var key in cc.sys.capabilities) {
//            log("cc.sys.capabilities[" + key + "] : " + cc.sys.capabilities[key]);
//        }
        if ('keyboard' in cc.sys.capabilities){
            if(cc.sys.os == cc.sys.OS_ANDROID){
                log("set android keyboard Listener")
                var keyboardListener = cc.EventListener.create({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:  function(keyCode, event){
                        //log("onKeyPressed keyCode--"+keyCode)
                    },
                    onKeyReleased:function(keyCode, event) {
                        log("onKeyReleased keyCode--"+keyCode)
                        if(keyCode == cc.KEY.back){
                            //do something
                            log("back--")
                            var time = (new Date()).getTime();
                            var isDoubleClick = false;
                            if(Math.abs(time - this.lastClickTime) < 750){
                                isDoubleClick = true;
                            }
                            this.lastClickTime = time;
                            if(isDoubleClick){
                                showNotice(sResWord.w_notice,sResWord.w_tip_quitgame,3,100);
                            }else{
                                CallCpp.doSomeString(81, "", "", "", "", "");
                            }
                        }else if(keyCode == cc.KEY.menu){
                            //do something
                        }
                    }
                });
                cc.eventManager.addListener(keyboardListener, this);
            }
        }
    },
    update:function(){
        //驱动网络更新 把接收到的数据保存起来
        if(sGameData.mGameNet){
            sGameData.mGameNet.checkSendDataState();
            sGameData.mGameNet.update();
        }

        if(sGameData.mGameNet){
            //连通到游戏服务器 发送进入房间
            if(sGameData.mGameNet&&sGameNetData.mNetIsConnected&&sGameNetData.mIsReConnectOK){
                sGameNetData.mIsReConnectOK = false;
                if(sGameNetData.mHasChangeNet){ //是真断了线再重连 ，发送服务器验证
                    if(sGameData.mUser&&sGameData.mUser.sessionId) {
                        sGameData.mGameNet.sendServerVerifySession(sGameData.mUser.sessionId);
                    }
                }else{ //前后在一个服务器上（没断线） ，直接后续操作
                    continueActionAfterReconnectNet()
                }
            }
        }

        //处理 接收到的数据
        this.updateOnNetData();

        //判断网络是否异常
        if(!sGameData.mIsTestNoNet
            &&sGameNetData.mNetIsClosed
            &&!sGameNetData.mIsConnectIng
            &&sGameNetData.mConnectFailNum < 5
            &&!sGameNetData.mISReConnect_close){ //当前网络已关闭，没有正在连接，也不是切换服务器时的关闭，连接失败次数在3次以下 提示错误
            sGameData.mIsSendingData = false;
            if(!sGameData.mIsShowNoticeing){
                sGameData.mIsShowNoticeing = true;
                sGameData.mIsSendEnterRoomIng = false;
                showNotice(sResWord.w_net_abnormal, sResWord.w_net_tip_reconnect,2,0);
                if(sGameData.mCurrScene == sGameData.mJSStartScene){
                    sGameData.mJSStartScene.showNetBtn();
                }else if(sGameData.mCurrLayer == sGameData.mHelpLayer){//在帮助界面 断网
                    if(sGameData.mUILayer){
                        sGameData.mUILayer.gotoMain();
                    }
                }
            }
        }

        //充值验证
        if(sGameData.mIsPayVerifying){
            var now = (new Date()).getTime();
            if(now - this.vtime > 15*1000){
                this.vtime = now;
                this.updataPaystate();
            }
        }

        if(sGameData.mCanUpdateDeviceInfo){
            var nowtime = (new Date()).getTime();
            if((nowtime - this.mGetDeviceInfoTime > 30*1000)){
                this.mGetDeviceInfoTime = nowtime;
                var nowtimestr = getLocalTime_hm(nowtime);
                sGameData.mDeviceInfo_time = nowtimestr;
                CallCpp.doSomeString(80, "","","","","");
                log("UpdateDeviceInfo nowtimestr==" +nowtimestr);
                sGameData.mDeviceInfoHasUpdate = true;
            }
            if(sGameData.mDeviceInfoHasUpdate&&
                sGameData.mCurrShowDeviceInfo&&sGameData.mCurrShowDeviceInfo.isRunning()){
                sGameData.mCurrShowDeviceInfo.updateInfo();
            }
        }

        if(sGameData.mIsDownLoadingGameRes){
            var nowtime = (new Date()).getTime();
            if((nowtime - this.mGetDownSizeTime > 500)){
                this.mGetDownSizeTime = nowtime;
                CallCpp.doSomeString(889, "","","","","");
            }
        }

    },
    //充值验证
    updataPaystate:function(){
        if(sGameData.mCurrScene == sGameData.mMainScene) {
            var num = MAXPAYVERIFYNUM;
            if (sGameData.mCurrVerifyNum < num) {
                sGameData.mCurrVerifyNum = sGameData.mCurrVerifyNum + 1;
                //log("msg==="+sGameData.mCurrVerifyMsg);
                sGameData.mIsVerifyAfterLogin = false;
                //sGameData.mGameNet.sendPay(sGameData.mCurrVerifyOrderNo,sGameData.mCurrVerifyMsg);//
                if (sGameData.mCurrVerifyMsg.length > 100) {
                    sGameData.mGameNet.sendPayAppStore(sGameData.mCurrVerifyOrderNo, sGameData.mCurrVerifyMsg);
                } else {
                    sGameData.mGameNet.sendPay(0, sGameData.mCurrVerifyOrderNo);
                }
            } else {
                endPayVerify();
            }
        }
    },
    //进入后台 时，在摸麻将，，返回时要改状态
    //checkCommandWhenEnterForeground:function(){
    //    log("checkCommandWhenEnterForeground")
    //
    //    if(sGameData.mCurrLayer == sGameData.mMJLayer){
    //        if(sGameData.mMJLayer.mIsMoMJIng){
    //            log("mIsMoMJIng set false")
    //            sGameData.mMJLayer.mIsMoMJIng = false;
    //            sGameData.mPausedCommand_Use = false;
    //        }
    //    }else if(sGameData.mCurrLayer == sGameData.mGYMJLayer){
    //        if(sGameData.mGYMJLayer.mIsMoMJIng){
    //            log("mIsMoMJIng gy set false")
    //            sGameData.mGYMJLayer.mIsMoMJIng = false;
    //            sGameData.mPausedCommand_Use = false;
    //        }
    //    }
    //
    //},

    /**
     * 指令 都 存在 mNetDataArray_Socket里
     */
    cleanCommands:function(){
        log("cleanCommands-----")
        //sGameData.mNetDataArray_Game = [];
        log("netds len = "+sGameData.mNetDataArray_Socket.length)

//        var i = 0;
//        while(i<sGameData.mNetDataArray_Socket.length){
//            var packet = sGameData.mNetDataArray_Socket[i];
//            packet.readskip(5);
//            var command = packet.readInt();
//            if(command == S_DN_NOTICE_PLAYERDATA_CHANGE
//                ||command == S_ZJH_NOTICE_PLAYERDATA_CHANGE
//                ||command == S_DZPK_NOTICE_PLAYERDATA_CHANGE){
//                packet._rpos = 0;
//                i++;
//            }else{
//                sGameData.mNetDataArray_Socket.splice(i,1);
//            }
//        }

        log("new netds len = "+sGameData.mNetDataArray_Socket.length)

    },
    //读取网络指令
    updateOnNetData:function(){
        var canRead = true;
        if(sGameData.mPausedCommand_Use){
            canRead = false;
        }
        if(sGameData.mIsGameShowAniming){
            canRead = false;
        }
        if(sGameData.mIsGameSitDownAniming){
            canRead = false;
        }
        if(sGameData.mIsGameShowBetAniming){
            canRead = false;
        }

        //如果暂停读取指令 时间操作 n秒，回复读取 （普通15s ,dzpk 30s）
        if(!canRead){
            var now = (new Date()).getTime();
            if(!this.mCmdFirstPause){
                this.mCmdFirstPause = true;
                this.mCmdPauseTime = now
            }else{
                var basetime = 15;
                if(sGameData.mCurrScene == sGameData.mDZPKGameScene){
                    basetime = 30;
                }
                if(now - this.mCmdPauseTime > basetime*1000){ //10s
                    log("error ---pause cmd")
                    reStartGame();
                    //sGameData.mIsGameShowAniming = false;
                    //sGameData.mPausedCommand_Use = false;
                    //sGameData.mIsGameSitDownAnimNum = 0;
                    //sGameData.mIsGameSitDownAniming = false;
                    //sGameData.mIsGameShowBetAniming = false;
                    //this.mCmdPauseTime = now
                }
            }
        }else{
            this.mCmdFirstPause = false;
        }

        //按序列读取要等之前的指令执行 (顺序执行，要等待 某些动画执行完)
        if(canRead&&sGameData.mCanReadNetData_Game&&sGameData.mNetDataArray_Game.length > 0){
            sGameData.mCanReadNetData_Game = false;
            var netdata = sGameData.mNetDataArray_Game.shift();
            this.dealNetData(netdata);
            sGameData.mCanReadNetData_Game = true;
        }
        //不等之前的指令执行（主要是坐下、站起、离开等指令）
        if(sGameData.mCanReadNetData_Game_nowait&&sGameData.mNetDataArray_Game_nowait.length > 0){
            sGameData.mCanReadNetData_Game_nowait = false;
            var netdata = sGameData.mNetDataArray_Game_nowait.shift();
            this.dealNetData(netdata);
            sGameData.mCanReadNetData_Game_nowait = true;
        }

    },

    dealNetData:function(netdata){
        var command = netdata[0];
        var commandType = command&TYPE_MASK;
        //log("command notice---"+command);
        switch(commandType){
            case T_SYS_COMMAND://大厅命令
                this.noticeSysCommand(netdata);
                break;
            case T_HALL_COMMAND://大厅命令
                this.noticeHallCommand(netdata);
                break;
            default:
                //处理游戏指令
                var func = getGameConfigDataByType(GameData_ID_CMD_TYPE, commandType, GameData_ID_DEALCMD_METHOD);
                if (func) {
                    func(netdata,this);
                }else{
                    log("application:未知命令类型: " + command);
                }
                break;
        }
    },
    //通知 大厅指令 （登录 注册）
    noticeSysCommand:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_SERVER_VERIFYSESSION:
                this.noticeServerVerifySession(netdata);
                break;
            case S_TICK://
                this.noticeTickCommand(netdata);
                break;
            case S_PAY_REQ:
                this.noticePayReq(netdata);
                break;
            case S_PAY_NOTICE:
                this.noticePayNotice(netdata);
                break;
            case S_PAY_QUERY:
            case S_PAY_QUERY_APPSTORE:
                this.noticePay(netdata);
                break;
            case S_SCROLLMSG://
                this.noticeScrollMsgCommand(netdata);
                break;
            case S_NOTIFY_OTHER_LOGIN:
                this.noticeNotifyOtherLogin(netdata);
                break;
            case S_REQ_PROPS_NUM:
                this.noticeReqPropsNum(netdata)
                break;
            case S_FRIEND_START_TALK:
                this.noticeFriendStartTalk(netdata);
                break;
            case S_FRIEND_SEND_TALK:
                this.noticeFriendSendTalk(netdata);
                break;
            case S_FRIEND_UNFOLLOW:
                this.noticeFriendUnfollow(netdata);
                break;
            case S_SEND_USER_MSG:
                this.noticeSendUserMsg(netdata);
                break;
            case S_INVITE_GAME:
                this.noticeInviteGame(netdata);
                break;
            case S_NOTICE_INVITE_GAME:
                this.noticeNoticeInviteGame(netdata);
                break;
            default:
                log("unknown t command="+command);
                break;
        }
    },
    //通知 服务器验证结果
    noticeServerVerifySession:function(netdata){
        log("noticeServerVerifySession")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            continueActionAfterReconnectNet();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            //showLittleNotice(msg);
            showNotice(sResWord.w_notice,msg,2,0);
        }
    },
    noticePayReq:function(netdata){
        log("noticePayReq")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var paydata = netdata[2];
            startPayJStoApp(paydata);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticePayNotice:function(netdata){
        log("noticePayNotice")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var cash = netdata[2];
            //var orderNo = netdata[3];
            sGameData.mUser.softCash = cash;
            // showLittleNotice(sResWord.w_pay_suc);
            // if(cc.sys.isNative) {
            //     var gameJSB = cc.GameJSB.sharedGJSB();
            //     gameJSB.setVPaylogState(orderNo,1);
            // }
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.updateCash();
            }else if(sGameData.mCurrLayer == sGameData.mPayLayer){
                sGameData.mPayLayer.updateCashInfo();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 充值 验证结果
    noticePay:function(netdata){
        log("noticePay")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var cash = netdata[2];
            var orderNo = netdata[3];
            sGameData.mUser.softCash = cash;
            showLittleNotice(sResWord.w_pay_suc);
            if(cc.sys.isNative) {
                var gameJSB = cc.GameJSB.sharedGJSB();
                gameJSB.setVPaylogState(orderNo,1);
            }
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.updateCash();
            }else if(sGameData.mCurrLayer == sGameData.mPayLayer){
                sGameData.mPayLayer.updateCashInfo();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            //showLittleNotice(msg);
        }
        if(sGameData.mIsVerifyAfterLogin){
            sGameData.mReturnNumVPayLogin++;
            if(sGameData.mReturnNumVPayLogin == sGameData.mNeedVerifyPayLogListLogin.length){
                dealAllVerifyPaylogLogin();
            }
        }
    },
    //取消关注
    noticeFriendUnfollow:function(netdata){
        log("noticeFriendUnfollow")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var userId = netdata[2] ;
            removeFromTableById(sGameData.mFriendList,userId);
            if(sGameData.mCurrLayer == sGameData.mFriendLayer){
                sGameData.mFriendLayer.mSelectedFriend = null;
                sGameData.mFriendLayer.showChooseFriendInfo();
                sGameData.mFriendLayer.mTableView.reloadData();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //发送用户消息
    noticeSendUserMsg:function(netdata){
        log("noticeSendUserMsg")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            showLittleNotice(sResWord.w_tip_sendok);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeInviteGame:function(netdata){
        log("noticeInviteGame")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msg = netdata[2];
            showLittleNotice(msg);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeNoticeInviteGame:function(netdata){
        log("noticeNoticeInviteGame")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var roomId = netdata[2];
            var msg = netdata[3];
            log(" roomId =="+roomId);
            var tRoom = getRoomById(roomId);
            if(tRoom) {
                showNotice(sResWord.w_invitegame, msg, 3, 6, roomId);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 大厅指令 （登录 注册）
    noticeHallCommand:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_LOGIN:
                this.noticeLogin(netdata);
                break;

            case S_GOOGLE_PAY:
                this.noticeGooglePay(netdata);
                break;
            case S_TASK_LIST://
                this.noticeTaskListCommand(netdata);
                break;
            case S_MATCH_NOTIFY_START:
                this.noticeMatchNotifyStart(netdata)
                break;
            case S_GAME_RES_LIST:
                this.noticeGameResList(netdata)
                break;
            case S_MATCH_LIST:
                this.noticeMatchList(netdata);
                break;
            case S_MATCH_SIGNUP:
                this.noticeMatchSignup(netdata);
                break;
            case S_MATCH_CANCEL_SIGNUP:
                this.noticeMatchCancelSignup(netdata);
                break;
            case S_MATCH_RANK:
                this.noticeMatchRank(netdata);
                break;
            case S_UPGRADE_FORCE:
                this.noticeUpgradeForce(netdata);
                break;
            case S_REQ_USER_INFO:
                this.noticeReqUserInfo(netdata);
                break;
            default:
                this.updateOnLoadDataInHall(netdata);
                break;
        }
    },
    //登陆结果
    noticeLogin:function(netdata){
        log("noticeLogin")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){


            var user = netdata[2];
            var roomlist = netdata[3];
            var onLineRoomId = netdata[4];
            var onLineTableId = netdata[5];
            var noticemsg = netdata[6];
            var umatchs = netdata[7]

            if(onLineRoomId > 999999999){
                onLineRoomId = 0;
            }
            sGameData.mSysNoticemsg = noticemsg
            user.onLineRoomId=onLineRoomId;
            user.onLineTableId=onLineTableId;
            sGameData.mUser = user; //用户数据
            sGameData.mRoomlist = roomlist;

            //sGameData.mUserMatchDatas = umatchs;
            sGameData.mMatchList = umatchs;// ---0916 改
            getMyMatchs();

            sGameData.mTurnTableTimeSpace = Number(getGameSysConfig("turntable_time_interval"));

            if(user.userName == "aaaa" || user.userName == "bbbb" || user.userName == "cccc"){
                sGameData.mIsTestUser = true;
            }else{
                sGameData.mIsTestUser = false;
            }

            if(onLineRoomId > 0||sGameData.mUserMatchDatas.length>0){
                sGameData.mNeedReConnRoom = true;
            }
            log("mNeedReConnRoom=="+sGameData.mNeedReConnRoom)
            log("noticemsg=="+noticemsg)

            log("user.type=="+user.type)

            if(user.type == 0 && !sGameData.mAppIsSubmitToAppStore){
                sGameData.mNoticeNeedReg = true;
            }

            var ls = cc.sys.localStorage;
            var has = getBoolFromLocalStorage(ls,HAS_LOCAL_USER_DATA);
            if(sGameData.mAccountLoginType == 0){//游客
                if(!has) {
                    saveLoginType(0)
                }
            }else{
                if(sGameData.mCurrScene == sGameData.mLoginScene) {
                    sGameData.mLoginLayer.saveToLocal(sGameData.mAccountLoginType);
                }else if(sGameData.mCurrScene == sGameData.mJSStartScene){
                    sGameData.mJSStartScene.saveToLocal(sGameData.mAccountLoginType);
                }
            }

            sGameData.mIsLogined = true;
            sGameData.mGameNet.sendTick(0);

            //设置 系统奖品 和 道具
            sGameData.mPrizeList = sGameData.mSys_Prizes;
            sGameData.mPropsList = sGameData.mSys_Propses;
            sGameData.mPrizeCanChangeList = getCanChangePrizes()
            sGameData.mSellPropsList = getSellProps();

            var signindata = user.signin.split(":");
            var len = signindata.length;
            var signstate = Number(signindata[len-1]);
            if(signstate == 0){
                sGameData.mCanShowSignin = true;
            }else{
                sGameData.mCanShowSignin = false;
            }
            user.signday = len;

            if(!sGameData.mHasGetUserExtraInfo){
                sGameData.mHasGetUserExtraInfo = true;
                sGameData.mGameNet.sendGetUserInfo(sGameData.mUser.id,2);
            }

            if(sGameData.mCurrScene == sGameData.mLoginScene){
                sGameData.mLoginScene.gotoMain();
            }else if(sGameData.mCurrScene == sGameData.mJSStartScene){
                sGameData.mJSStartScene.showMainScene();
            }else if(sGameData.mCurrScene == sGameData.mReConnNetScene){
                sGameData.mReConnNetScene.showMainScene();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            if(sGameData.mCurrScene == sGameData.mJSStartScene){//要是sdk账号登录不进去，自动游客登录
                sGameData.mJSStartScene.loginByGuest();
            }else if(sGameData.mCurrScene == sGameData.mReConnNetScene){
                sGameData.mReConnNetScene.showGameLoginScene();
            }else{
                showLittleNotice(msg);
            }
        }
    },

    noticeGooglePay:function(netdata){
        log("noticeGooglePay")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var cash = netdata[2];
            var orderNo = netdata[3];
            sGameData.mUser.softCash = cash;
            showLittleNotice(sResWord.w_pay_suc);
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.updateCash();
            }else if(sGameData.mCurrLayer == sGameData.mShopLayer){
                sGameData.mShopLayer.updateCashInfo();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 心跳 数据
    noticeTickCommand:function(netdata){
        log("noticeTickCommand")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var onlinecount = netdata[2];
            var msgcount = netdata[3]; //滚动消息
            var msgs = netdata[4];
            var usermsgcount = netdata[5];
            var friendmsgcount = netdata[6];
            sGameData.mOnlineNum = onlinecount;
            if(sGameData.mOnlineNum < 1){
                sGameData.mOnlineNum = 1;
            }
            if(sGameData.mCurrLayer&&sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.updateOnline(onlinecount);
            }
            sGameData.mGetScrollNotifyId += msgcount;
            for(var i=0;i<msgs.length;i++){
                //sGameData.mScrollMsgs.push(msgs[i]);
            }
            log("tick== ol="+onlinecount+" |msgcount="+msgcount+ " |usermsgcount="+usermsgcount+" | friendmsgcount="+friendmsgcount)
            sGameData.mUserMsgCount = usermsgcount;
            if(sGameData.mUILayer){
                sGameData.mUILayer.showMsgNum();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 滚动消息
    noticeScrollMsgCommand:function(netdata){
        log("noticeScrollMsgCommand")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msg = netdata[2];
            log("msg=="+msg);

            if(sGameData.mAppIsSubmitToAppStore){
                return;
            }

            sGameData.mScrollMsgId++;
            var aMsg = {};
            aMsg.id = sGameData.mScrollMsgId;
            aMsg.msg = msg
            aMsg.time = (new Date()).getTime()
            if(sGameData.mCurrScene==sGameData.mMainScene&&sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mScrollMsgs_new.push(aMsg);
            }
            if(checkMsgIsSys(msg)){
                log("it is sys msg")
                sGameData.mScrollMsgs_sys.push(aMsg);
                if(sGameData.mScrollMsgs_sys.length > sGameData.mScrollMsgSysMaxNum){
                    sGameData.mScrollMsgs_sys.splice(0,1);
                }
            }
            sGameData.mScrollMsgs.push(aMsg);
            sGameData.mScrollMsgs.sort(sortByID);
            if(sGameData.mScrollMsgs.length > sGameData.mScrollMsgMaxNum){
                sGameData.mScrollMsgs.splice(0,1);
            }
            if(sGameData.mCurrScene==sGameData.mJSStartScene ||sGameData.mCurrScene==sGameData.mLoginScene || (sGameData.mCurrScene==sGameData.mMainScene&&sGameData.mCurrLayer == sGameData.mMainLayer)){
                //不显
            }else{
                showTopMsg(msg);
            }
            if(sGameData.mIsShowWorldChatPaneling){
                if(sGameData.mWorldChatPanel){
                    sGameData.mWorldChatPanel.updateChats();
                }
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 游戏任务 －－－－已停用
    noticeTaskListCommand:function(netdata){
        log("noticeTaskListCommand")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var tasks = netdata[2];
            var utasks = analyseUTasks(tasks)
            sGameData.mTaskList = utasks;
            sGameData.mShowTaskList = utasks;
            if(sGameData.mCurrLayer == sGameData.mZJHLayer){
                sGameData.mZJHLayer.showTasks();
            }else if(sGameData.mCurrLayer == sGameData.mDNLayer){
                sGameData.mDNLayer.showTasks();
            }else if(sGameData.mCurrLayer == sGameData.mDDZLayer){
                sGameData.mDDZLayer.showTasks();
            }else if(sGameData.mCurrLayer == sGameData.mDZPKLayer){
                sGameData.mDZPKLayer.showTasks();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //通知 好友 开始 聊天
    noticeFriendStartTalk:function(netdata){
        log("noticeFriendStartTalk")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgdatas = netdata[2];
            if(sGameData.mCurrFriend){
                if(sGameData.mCurrFriend.msgdatas == null){
                    sGameData.mCurrFriend.msgdatas = [];
                }
                for(var i=0;i<msgdatas.length;i++){
                    sGameData.mCurrFriend.msgdatas.push(msgdatas[i]);
                }
            }
            if(sGameData.mFriendChatLayer){
                sGameData.mFriendChatLayer.updateMsg();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 好友 发送 聊天
    noticeFriendSendTalk:function(netdata){
        log("noticeFriendSendTalk")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgdatas = netdata[2];
            if(sGameData.mCurrFriend){
                if(sGameData.mCurrFriend.msgdatas == null){
                    sGameData.mCurrFriend.msgdatas = [];
                }
                for(var i=0;i<msgdatas.length;i++){
                    sGameData.mCurrFriend.msgdatas.push(msgdatas[i]);
                }
            }
            if(sGameData.mFriendChatLayer){
                sGameData.mFriendChatLayer.updateMsg();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 账号 在其它位置 登录
    noticeNotifyOtherLogin:function(netdata){
        log("noticeNotifyOtherLogin")
        showNotice(sResWord.w_notice, sResWord.w_tip_otherlogin,6,0);
        if(sGameData.mCurrLayer == sGameData.mHelpLayer){//在帮助界面 断网
            if(sGameData.mUILayer){
                sGameData.mUILayer.gotoMain();
            }
        }
    },


    //通知 比赛通知开始
    noticeMatchNotifyStart:function(netdata){
        log("noticeMatchNotifyStart")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var match = netdata[2];

            var time = "";
            var nowtime = getNowServerTime();
            var timedur = match.startTime - nowtime
            if(timedur > 0){
                var tsec = Math.floor(timedur/1000);
                if(tsec >= 60){
                    var hour = Math.floor(tsec/3600);
                    var mins = Math.floor((tsec%3600)/60);
                    if(hour > 0){
                        time = hour+sResWord.w_hour+mins+sResWord.w_minutes+sResWord.w_match_tip_start_soon;
                    }else{
                        time = mins+sResWord.w_minutes+sResWord.w_match_tip_start_soon;
                    }
                }else{
                    time = tsec+sResWord.w_seconds+sResWord.w_match_tip_start_soon;
                }

            }else{
                time = sResWord.w_match_tip_started;
            }
            var msg = match.name+" "+time+","+sResWord.w_match_start_tip;
            showNotice(sResWord.w_notice,msg,7,0,match)
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeReqPropsNum:function(netdata){
        log("noticeReqPropsNum")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var propsId = netdata[2];
            var value = netdata[3];
            log("propsId=="+propsId+"|"+value);
            if(propsId == BOTS_PROPS){
                sGameData.mUser.dnbotnum = value;
                if(sGameData.mCurrLayer == sGameData.mDNLayer){
                    sGameData.mDNLayer.updateDBotNum();
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeGameResList:function(netdata){
        log("noticeGameResList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var datas = netdata[2];
            sGameData.mGamesResDatas = datas;
            sGameData.mHasGetGameResData = true;
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    // 比赛列表
    noticeMatchList:function(netdata){
        log("noticeMatchList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS) {
            var matchs = netdata[2];
            sGameData.mMatchList = matchs;
            getMyMatchs();
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.showMatchRoom();
            }else{
                if (sGameData.mCurrScene != sGameData.mMatchScene) {
                    gotoMatch();
                }else{
                    if(sGameData.mMatchHallLayer){
                        sGameData.mMatchHallLayer.updateMatchs();
                    }
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeMatchSignup:function(netdata){
        log("noticeMatchSignup")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softCash = netdata[2];
            var hardCash = netdata[3];
            var matchId = netdata[4];
            var matchRoomId = netdata[5];
            var currPlayerCount = netdata[6];

            sGameData.mUser.softCash = softCash
            sGameData.mUser.hardCash = hardCash
            var match = getMatchByRoomId(matchRoomId,matchId);
            if(match){
                sGameData.mCurrMatch = match;
                match.signup =1;
                match.currPlayerCount = currPlayerCount;
            }
            if(sGameData.mMainMatchRoomView){
                sGameData.mMainMatchRoomView.updateshow();
            }else if(sGameData.mMatchHallLayer){
                sGameData.mMatchHallLayer.updateshow();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeMatchCancelSignup:function(netdata){
        log("noticeMatchCancelSignup")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softCash = netdata[2];
            var hardCash = netdata[3];
            var matchId = netdata[4];
            var matchRoomId = netdata[5];

            sGameData.mUser.softCash = softCash
            sGameData.mUser.hardCash = hardCash

            var match = getMatchByRoomId(matchRoomId,matchId);
            if(match){
                sGameData.mCurrMatch = match;
                match.signup = 0;
                match.littleInfo = "";
                match.currPlayerCount -= 1;
            }else{
                sGameData.mCurrMatch.signup = 0;
                sGameData.mCurrMatch.littleInfo = "";
            }

            if(sGameData.mMainMatchRoomView){
                sGameData.mMainMatchRoomView.updateshow();
            }else if(sGameData.mMatchHallLayer){
                sGameData.mMatchHallLayer.updateshow();
            }


        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeMatchRank:function(netdata){
        log("noticeMatchRank")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var datas = netdata[3];
            if(type == 1){
                sGameData.mMatchHisRankList = datas
                showMatchHisWinner(false)
                showMatchHisRank(true);
            }else if(type == 2){
                sGameData.mMatchHisWinnerList = datas
                showMatchHisRank(false);
                showMatchHisWinner(true);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeUpgradeForce:function(netdata){
        log("noticeUpgradeForce")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var upver = netdata[2];
            var forceupver = netdata[3];
            var upmsg = netdata[4];
            var upsize = netdata[5];
            var upurl = netdata[6];
            sGameData.mForceUpUrl = upurl;
            sGameData.mUseGuestLoginNum = 5;
            showNotice(sResWord.w_notice,upmsg,10,0);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeReqUserInfo:function(netdata){
        log("noticeReqUserInfo")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softcash =  netdata[2]
            var hardcash =  netdata[3]
            var vip =  netdata[4]
            sGameData.mUser.softCash = softcash
            sGameData.mUser.hardCash = hardcash
            if(sGameData.mCurrLayer == sGameData.mPayLayer){
                sGameData.mPayLayer.updateCashInfo();
            }else if(sGameData.mCurrScene == sGameData.mMainScene){
                sGameData.mUILayer.mMainPalyerInfo.updateCash();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //通知 其它 大厅 指令
    updateOnLoadDataInHall:function(netdata){
        var command = netdata[0];
        log("unknown command="+command);
        netdata = null;
    },

    noticeGameIngotAwardNotify:function(netdata){
        log("noticeGameIngotAwardNotify")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var hardcash = netdata[2];
            var msg = netdata[3];
            showPengqianAnim(hardcash,2);
            showLittleNotice(msg);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },












    /*
    noticeMoban:function(netdata){
        log("noticeMoban")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    */
    //通知 其它 游戏指令
    updateOnLoadDataInGame:function(netdata){
        var command = netdata[0];
        log("unknown command="+command);
    }


});
