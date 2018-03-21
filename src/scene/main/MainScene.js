/**
 * Created by Administrator on 14-4-15.
 * 主场景
 */
var MainScene = BaseScene.extend({

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMainScene = this;
            sGameData.mCurrScene = this;
            log("start show MainScene");


            var plistpicres = [];//,g_loadplist_hall_qp

            plistpicres = concatArray([g_loadplist_all,g_loadplist_hall_qp,g_loadplist_main,g_loadplist_match]);//,

            var plistanimress = concatArray([]);
            var ccsanimress = concatArray([]);
            var plistmanyanimresed = concatArray([]);
            this.startLoadRes(plistpicres,plistanimress,ccsanimress,plistmanyanimresed) //加载资源

            bRet = true;
        }
        return bRet;
    },
    //资源加载完 显示界面
    showView:function(){
        this.cleanLoadView();

        showUILoadWait(true);
        var size = cc.director.getWinSize();

        var bgimg = cc.Sprite.create("#mainbg.png")//mainbg.png
        bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
        this.addChild(bgimg);
        if(sGameData.mAppMainBGScale) {
            bgimg.setScaleX(size.width / bgimg.width)
            bgimg.setScaleY(size.height / bgimg.height)
        }

        //ui
        var aUILayer = UILayer.create();
        this.addChild(aUILayer,5);

        //显示 层
        var aMainLayer = MainLayer.create();
        this.addChild(aMainLayer,1);

        var doRefreshRoom = false;
        //进入 主场景时，显示界面 不是默认主界面
        if(sGameData.mShowMainLayerIndex == 1){ //进入 桌子列表
            sGameData.mShowMainLayerIndex = 0;
            gotoShowViewForHallList();
            doRefreshRoom = true;
        }else if(sGameData.mShowMainLayerIndex == 2){ //进入 桌子列表
            sGameData.mShowMainLayerIndex = 0;
            gotoShowViewForHallTable();
            doRefreshRoom = true;
        }else if(sGameData.mShowMainLayerIndex == 3){ //进入 房间显示
            sGameData.mShowMainLayerIndex = 0;
            //aMainLayer.gotoHallRoom(sGameData.mCurrGameType);
        }else if(sGameData.mShowMainLayerIndex == 4){ //进入 充值
            sGameData.mShowMainLayerIndex = 0;
            if(sGameData.mPayList.length == 0&&sGameData.mGameNet&&sGameNetData.mNetIsConnected){
                if(!sGameData.mIsSendingData) {
                    sGameData.mIsSendingData = true
                    sGameData.mGameNet.sendPayList();
                }
            }else{
                gotoShowViewForPay();
            }
        }else if(sGameData.mShowMainLayerIndex == 5){ //进入 个人信息
            sGameData.mShowMainLayerIndex = 0;
            gotoShowViewForPlayerInfo();
        }else if(sGameData.mShowMainLayerIndex == 6){ //进入 房间显示 dj
            sGameData.mShowMainLayerIndex = 0;
            //aMainLayer.gotoHallRoomDJ(sGameData.mCurrGameType);
        }else {
            sGameData.mShowMainLayerIndex = 0;
        }

        if(doRefreshRoom){ //退出游戏时刷新
            if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                sGameNetData.mZJHNet.sendZJHRefreshRoom();
            }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
                sGameNetData.mDNNet.sendDNRefreshRoom();
            }
        }


        this.playBGMusic();

        showUILoadWait(false);

        this.schedule(this.update,0.05);

    },

    //进入时执行
    onEnter:function(){
        this._super();
        log("main scene enter")
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mMainScene = null;
        SoundManager.stopBGMusic();
        removeSpriteChangeScene();
    },
    //每帧更新
    update:function(){
        if(!sGameData.mIsShowTurnTableing){
            this._super();

            if(sGameData.mCurrLayer == sGameData.mHallTableLayer){
                sGameData.mHallTableLayer.update();
            }
            if(sGameData.mCurrLayer == sGameData.mHallListLayer){
                sGameData.mHallListLayer.update();
            }
        }

    },
    //更新网络指令
    updateOnLoadDataInHall:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_LOGIN:
                this.noticeLogin(netdata);
                break;
            case S_SIGNIN:
                this.noticeSignin(netdata);
                break;
            case S_FRIEND_FOLLOW:
                this.noticeFriendFollow(netdata);
                break;
            case S_FRIEND_GETLIST:
                this.noticeFriendGetList(netdata);
                break;
            case S_SEARCHUSER:
                if(sGameData.mFriendSearchLayer){
                    sGameData.mFriendSearchLayer.noticeSearchUser(netdata)
                }
                break;
            case S_MSGLIST:
                this.noticeMsgList(netdata);
                break;
            case S_MSG_READ:
                this.noticeMsgRead(netdata);
                break;
            case S_MSG_DEL:
                this.noticeMsgDel(netdata);
                break;
            case S_UPROPSLIST:
                this.noticeUPropsList(netdata);
                break;
            case S_PROPS_LIST:
                this.noticePropsList(netdata);
                break;
            case S_PROPS_BUY:
                this.noticePropsBuy(netdata);
                break;
            case S_PAY_LIST:
                this.noticePayList(netdata);
                break;
            case S_PAY_LOG:
                this.noticePayLog(netdata);
                break;
            case S_USER_MSG_KIT_PROC:
                this.noticeUserMsgKitProc(netdata);
                break;
            case S_CHANGE_USERINFO:
                this.noticeChangeUserInfo(netdata);
                break;
            case S_STORE_LIST:
                this.noticeStoreList(netdata);
                break;
            case S_STORE_EXCHANGE:
                this.noticeStoreChange(netdata);
                break;
            case S_STORE_EXCHANGE_LOG:
                this.noticeStoreChangeLog(netdata);
                break;
            case S_PRIZE_ACCEPT:
                this.noticePrizeAccept(netdata);
                break;
            case S_UPMP_GETTRADENO:
                this.noticeUpmpGetTradeNo(netdata);
                break;

            case S_MATCH_VIDEO_LIST:
                this.noticeMatchVideoList(netdata);
                break;
            case S_MATCH_VIDEO_USERS:
                this.noticeMatchVideoUsers(netdata);
                break;
            case S_MATCH_VIDEO_RECORD_LIST:
                this.noticeMatchVideoRecordList(netdata);
                break;
            case S_MATCH_VIDEO_SEE:
                this.noticeMatchVideoSee(netdata);
                break;
            case S_OLPLAYER_LIST:
                this.noticeOLPlayerList(netdata);
                break;
            case S_UTASK_LIST:
                this.noticeUTaskList(netdata);
                break;
            case S_UTASK_AWARD:
                this.noticeUTaskAward(netdata);
                break;
            case S_WALL_TASK_LIST:
                this.noticeWallTaskList(netdata);
                break;
            case S_WALL_TASK_AWARD:
                this.noticeWallTaskAward(netdata);
                break;
            case S_ADER_WALL:
                this.noticeADerWall(netdata);
                break;
            case S_BINDMOBILE_GETCODE:
                this.noticeBindMobileGetCode(netdata);
                break;
            case S_BINDMOBILE_VERIFYCODE:
                this.noticeBindMobileVerifyCode(netdata);
                break;
            case S_WEIXIN_TASK:
                this.noticeWeixinTask(netdata);
                break;
            case S_RANK_LIST:
                this.noticeRankList(netdata);
                break;
            case S_UPGRADE_GUEST_USER:
                this.noticeUpgradeGuestUser(netdata);
                break;
            case S_WORLD_MSG:
                this.noticeWorldMsg(netdata);
                break;
            case S_GET_USERINFO:
                this.noticeGetUserInfo(netdata);
                break;
            case S_QUESTION_SERVICE:
                this.noticeQuestionService(netdata);
                break;
            case S_CHANGE_EBANK_PWD:
                this.noticeChangeEbankPwd(netdata);
                break;
            case S_BIND_ALIPAY:
                this.noticeBindAlipay(netdata);
                break;
            case S_CHANGE_ALIPAY:
                this.noticeChangeAlipay(netdata);
                break;
            case S_CHANGECASH:
                this.noticeChangeCash(netdata);
                break;
            case S_EBANK_SAVECASH:
                this.noticeEbankSaveCash(netdata);
                break;
            case S_EBANK_GETCASH:
                this.noticeEbankGetCash(netdata);
                break;
            default:
                log("unknown command="+command);
                break;
        }
    },
    //登陆
    noticeLogin:function(netdata){
        log("noticeLogin")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var user = netdata[2];
            var roomlist = netdata[3];
            var onLineRoomId = netdata[4];
            var onLineTableId = netdata[5];
            var noticemsg = netdata[6];
            //sGameData.mSysNoticemsg = noticemsg
            user.onLineRoomId=onLineRoomId;
            user.onLineTableId=onLineTableId;
            sGameData.mUser = user; //用户数据
            sGameData.mRoomlist = roomlist;
            sGameData.mIsLogined = true;

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //签到
    noticeSignin:function(netdata){
        log("noticeSignin")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

            var signdata = netdata[2];
            var msg = netdata[3];
            var signin = getSigninById(sGameData.mUser.signday);
            if(signin){
                showLittleNotice(sResWord.w_getprize_suc_s1+signin.prizesInfo+sResWord.w_getprize_suc_s2);
                var awards = analyseAwards(signin.prizes)
                for(var i=0;i<awards.length;i++){
                    var award = awards[i];
                    if(award.gtype == GOODS_SOFTCASH){
                        sGameData.mUser.softCash += award.value;
                    }else if(award.gtype == GOODS_HARDCASH){
                        sGameData.mUser.hardCash += award.value;
                    }
                }
                if(sGameData.mMainLayer){
                    sGameData.mMainLayer.updateCash();
                }
            }else{
                showLittleNotice(sResWord.w_getprize_suc_s1+sResWord.w_getprize_suc_s2);
            }
            if(msg.length > 0){
                if(sGameData.mAppCanShowSysGonggao) {
                    showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
                }
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //关注好友
    noticeFriendFollow:function(netdata){
        log("noticeFriendFollow")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //好友列表
    noticeFriendGetList:function(netdata){
        log("noticeFriendGetList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var users = netdata[2];
            sGameData.mFriendList = users;
            if(sGameData.mGetFriendFrom == 1){
                gotoShowViewForFriend();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //消息列表
    noticeMsgList:function(netdata){
        log("noticeMsgList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgdata = netdata[2];
            sGameData.mMsgList = msgdata;
            gotoShowViewForMsgView();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //阅读消息
    noticeMsgRead:function(netdata){
        log("noticeMsgRead")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgId = netdata[2] ;
            var readTime = netdata[3] ;
            var aMsg = getMsgById(msgId);
            if(aMsg){
                aMsg.readTime =  readTime;
            }
            if(sGameData.mMsgLayer){
                sGameData.mMsgLayer.updataState();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //删除消息
    noticeMsgDel:function(netdata){
        log("noticeMsgDel")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgId = netdata[2];
            log("del=="+msgId);
            removeFromTableById(sGameData.mMsgList,msgId);
            if(sGameData.mMsgLayer){
                sGameData.mMsgLayer.mTableView.reloadData();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //用户道具列表
    noticeUPropsList:function(netdata){
        log("noticeUPropsList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var uprops = netdata[3];
            if(type == 4){
                sGameData.mUserPropsList = uprops
                //if(sGameData.mUILayer){
                //    gotoShowViewForBag();
                //}else if(sGameData.mCurrLayer == sGameData.mUserPrizeLayer){
                //    gotoShowViewForBag();
                //}
                if(sGameData.mPlayerInfoLayer){
                    sGameData.mPlayerInfoLayer.showRightView(2);
                }
            }else if(type == 5){
                sGameData.mUserPrizeList = uprops
                if(sGameData.mCurrLayer == sGameData.mBagLayer){
                    gotoShowViewForUserPrize();
                }
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //系统道具列表
    noticePropsList:function(netdata){
        log("noticePropsList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var propses = netdata[2];
            sGameData.mPropsList = propses;
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //道具购买
    noticePropsBuy:function(netdata){
        log("noticePropsBuy")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var propsId = netdata[2];
            var count = netdata[3];
            var gold = netdata[4];
            var hardCash = netdata[5];
            sGameData.mUser.softCash = gold
            sGameData.mUser.hardCash = hardCash
            if(sGameData.mCurrLayer == sGameData.mPropsBuyLayer){
                sGameData.mPropsBuyLayer.updateCashInfo();
            }
            showLittleNotice(sResWord.w_buy_suc);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //充值列表
    noticePayList:function(netdata){
        log("noticePayList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var pays = netdata[2];
            sGameData.mPayList = pays;
            sGameData.mPayTypes = getAllPayType();
            log("smPayTypesa=="+sGameData.mPayTypes)
            checkPayAllows();
            if(sGameData.mPayTypes.length > 0){
                sGameData.mCurrPayType = sGameData.mPayTypes[0];
                if(sGameData.mAppIsSubmitToAppStore&&cc.sys.os == cc.sys.OS_IOS){
                    sGameData.mCurrPayType = getPayTypeAppStore(sGameData.mPayTypes);
                }
            }
            log("allow mPayTypes=="+sGameData.mPayTypes+"  c="+sGameData.mCurrPayType)

            sGameData.mUILayer.gotoShopView();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //充值纪录
    noticePayLog:function(netdata){
        log("noticePayLog")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //处理用户消息附件
    noticeUserMsgKitProc:function(netdata){
        log("noticeUserMsgKitProc")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msgId = netdata[2] ;
            var kitTime = netdata[3] ;

            var aMsg = getMsgById(msgId);
            if(aMsg){
                aMsg.kitTime =  kitTime;
            }
            if(sGameData.mCurrLayer==sGameData.mMsgLayer && sGameData.mIsShowTopView){
                sGameData.mMsgInfoPanel.updateInfo();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //更改用户信息
    noticeChangeUserInfo:function(netdata){
        log("noticeChangeUserInfo")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var value = netdata[3];
            log("type="+type+"-"+value)
            if(type == 1){
                sGameData.mUser.nickName = value;
                if(sGameData.mCurrLayer == sGameData.mPlayerInfoLayer) {
                    var uh = sGameData.mPlayerInfoLayer.mUserHead
                    uh.setPlayer(sGameData.mUser);
                }

            }else if(type ==2){
                sGameData.mUser.avatar = value;
                log("headpic="+value)
                if(sGameData.mCurrLayer == sGameData.mPlayerInfoLayer){
                    var uh = sGameData.mPlayerInfoLayer.mUserHead
                    //sGameData.mLoadResObserverId = 0;
                    uh.loadImg(1);
                }
                if(sGameData.mUILayer){
                    sGameData.mUILayer.mMainPalyerInfo.loadImg();
                }
            }else if(type == 3){
                sGameData.mUser.sex = Number(value);
            }else if(type == 8){
                sGameData.mPwd_login = sGameData.mPwd_change
                changeUserPwd(sGameData.mPwd_login);
                showLittleNotice(sResWord.w_change_suc);
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //奖品列表
    noticeStoreList:function(netdata){
        log("noticeStoreList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var stores = netdata[2];
            sGameData.mPrizeList = stores;
            gotoShowViewForPrizeChange();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //兑换奖品
    noticeStoreChange:function(netdata){
        log("noticeStoreChange")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var hardCash = netdata[2];
            sGameData.mUser.hardCash = hardCash;
            if(sGameData.mCurrLayer == sGameData.mChangePrizeLayer){
                sGameData.mChangePrizeLayer.gotoChangeResult();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //奖品兑换纪录
    noticeStoreChangeLog:function(netdata){
        log("noticeStoreChangeLog")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var logs = netdata[2];
            sGameData.mChangePrizeLogList = logs;
            //gotoShowViewForPrizeChangeLog();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //奖品领取
    noticePrizeAccept:function(netdata){
        log("noticePrizeAccept")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var upid = netdata[2];
            if(sGameData.mCurrLayer == sGameData.mPrizeAcceptLayer){
                sGameData.mPrizeAcceptLayer.gotoAcceptResult();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //银联流水号
    noticeUpmpGetTradeNo:function(netdata){
        log("noticeUpmpGetTradeNo")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var tradeno = netdata[2];
            var orderno = netdata[3];
            sGameData.mUpmpTradeNo = tradeno;
            log("mUpmpTradeNo="+sGameData.mUpmpTradeNo);
            CallCpp.doSomeString(7,tradeno,orderno,"","","");
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //有录像的比赛  列表
    noticeMatchVideoList:function(netdata){
        log("noticeMatchVideoList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var datas = netdata[2];

            sGameData.mVideoMatchList = datas
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.gotoGameVideo();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //比赛的玩家列表
    noticeMatchVideoUsers:function(netdata){
        log("noticeMatchVideoUsers")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var datas = netdata[2];
            sGameData.mVideoMatchUsers = datas
            if(sGameData.mCurrLayer == sGameData.mGameVideoLayer){
                sGameData.mGameVideoLayer.gotoVideoUser();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //比赛玩家的录像列表
    noticeMatchVideoRecordList:function(netdata){
        log("noticeMatchVideoRecordList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var datas = netdata[2];
            sGameData.mMatchGameVideos = datas
            if(sGameData.mCurrLayer == sGameData.mGameVideoUserLayer){
                sGameData.mGameVideoUserLayer.gotoVideoGame();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //查看录像
    noticeMatchVideoSee:function(netdata){
        log("noticeMatchVideoSee")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var data = netdata[2];
            log("data=="+data.gameNo);
            sGameData.mVideoData = data;
            gotoSeeMatchVideo();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //在线玩家列表
    noticeOLPlayerList:function(netdata){
        log("noticeOLPlayerList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var olplayers = netdata[2];
            sGameData.mOLPlayers = olplayers;
            if(sGameData.mCurrLayer == sGameData.mMainLayer){
                sGameData.mMainLayer.updateOLPlayers();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //用户任务列表
    noticeUTaskList:function(netdata){
        log("noticeUTaskList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var utasks = netdata[2];
            var utasks1 = analyseUTasks(utasks)
            sGameData.mUserTasks = utasks1;
            sGameData.mUserTasks.sort(sortByUTask);
            gotoShowViewForTask();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //用户任务奖励
    noticeUTaskAward:function(netdata){
        log("noticeUTaskAward")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var goodses = netdata[2];
            var utasks = netdata[3];
            dealAwardGoods(goodses);
            var utasks1 = analyseUTasks(utasks)
            sGameData.mUserTasks = utasks1;
            sGameData.mUserTasks.sort(sortByUTask);
            if(sGameData.mCurrLayer == sGameData.mTaskLayer){
                sGameData.mTaskLayer.updateInfo();
            }
            showLittleNotice(sResWord.w_getprize+sResWord.w_getprize_suc_s2);

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //积分墙 任务列表
    noticeWallTaskList:function(netdata){
        log("noticeWallTaskList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var walltasks = netdata[2];
            //sGameData.mUserTasksForScoreWall = walltasks;
            //gotoShowViewForTaskScoreWallPrize();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //积分墙任务奖励
    noticeWallTaskAward:function(netdata){
        log("noticeWallTaskAward")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var walltask = netdata[2];
            var point = netdata[3];
            var softcash = netdata[4];

            var twalltask =  getUWallTask(walltask.id)
            if(twalltask){
                twalltask.state = walltask.state;
                twalltask.getPrizeTime = walltask.getPrizeTime;
            }
            sGameData.mUser.softCash = softcash
            //if(sGameData.mCurrLayer == sGameData.mTaskScoreWallLayer){
            //    sGameData.mTaskScoreWallLayer.updateInfo();
            //}

            showLittleNotice(sResWord.w_getprize+sResWord.w_getprize_suc_s2);

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //积分墙 广告商列表
    noticeADerWall:function(netdata){
        log("noticeADerWall")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var ads = netdata[2];
            sGameData.mWallADers = ads;
            checkWallAllows();
            gotoShowViewForEarnWallScore();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeBindMobileGetCode:function(netdata){
        log("noticeBindMobileGetCode")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var intervalTime = netdata[2];

            sGameData.mGetVCodeTime = (new Date()).getTime()
            if(sGameData.mBindPhonePanel){
                sGameData.mBindPhonePanel.checkState();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeBindMobileVerifyCode:function(netdata){
        log("noticeBindMobileVerifyCode")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var phone = netdata[2];
            var award = netdata[3];
            var softcash = netdata[4];
            sGameData.mUser.phone = phone;
            sGameData.mUser.softCash = softcash;
            showLittleNotice(sResWord.w_bind_suc);

            if(sGameData.mPlayerInfoLayer){
                sGameData.mPlayerInfoLayer.showBindState();
            }
            if(sGameData.mUILayer){
                sGameData.mUILayer.showBindPhone(false);
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeWeixinTask:function(netdata){
        log("noticeWeixinTask")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var utasks = netdata[2];
            var utasks1 = analyseUTasks(utasks)
            sGameData.mUserTasks = utasks1;
            sGameData.mUserTasks.sort(sortByUTask);
            if(sGameData.mCurrLayer == sGameData.mTaskLayer){
                sGameData.mTaskLayer.updateInfo();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeRankList:function(netdata){
        log("noticeRankList")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            var users = netdata[3];
            var myrank = netdata[4] ;
            sGameData.mRankType = type;
            sGameData.mRankList = users;
            sGameData.mMyRank = myrank;
            if(sGameData.mCurrLayer == sGameData.mRankListLayer){
                sGameData.mRankListLayer.updateInfo();
            }else{
                gotoShowViewForRank();
            }

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeUpgradeGuestUser:function(netdata){
        log("noticeUpgradeGuestUser")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var username = netdata[2];
            var nickname = netdata[3];
            var award =netdata[4];
            var softcash = netdata[5];
            sGameData.mUser.userName = username
            sGameData.mUser.nickName = nickname
            sGameData.mUser.softCash = softcash;
            sGameData.mUser.type = 1;
            if(sGameData.mCurrLayer == sGameData.mUpGuestLayer){
                sGameData.mUpGuestLayer.saveToLocal(1);
            }
            gotoShowViewForPlayerInfo();

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeWorldMsg:function(netdata){
        log("noticeWorldMsg")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){

        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeGetUserInfo:function(netdata){
        log("noticeGetUserInfo")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var type = netdata[2];
            log("type="+type)
            if(type == 1){
                var value = netdata[3];
                if(sGameData.mGetUserInfoUid == sGameData.mUser.id){
                    sGameData.mUser.avatar = value;
                    log("headpic="+value)
                    if(sGameData.mCurrLayer == sGameData.mPlayerInfoLayer){
                        var uh = sGameData.mPlayerInfoLayer.mUserHead
                        //sGameData.mLoadResObserverId = 0;
                        uh.loadImg(1);
                    }
                    if(sGameData.mUILayer){
                        sGameData.mUILayer.mMainPalyerInfo.loadImg();
                    }
                }
            }else if(type == 2){
                var hasbindalipay = netdata[3];
                var alipay = netdata[4];
                var realname = netdata[5];
                var hasEbankPwd = netdata[6];
                var ebankCash = netdata[7];
                sGameData.mUser.hasBindAlipay = hasbindalipay;
                sGameData.mUser.alipay = alipay;
                sGameData.mUser.realName = realname
                sGameData.mUser.hasEbankPwd = hasEbankPwd
                sGameData.mUser.ebankCash = ebankCash
                log("hasbindalipay=="+hasbindalipay+" hasEbankPwd=="+hasEbankPwd)
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeQuestionService:function(netdata){
        log("noticeQuestionService")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            showLittleNotice(sResWord.w_tip_submitok);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeChangeEbankPwd:function(netdata){
        log("noticeChangeEbankPwd")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            showLittleNotice(sResWord.w_change_suc);
            sGameData.mUser.hasEbankPwd = 1;
            gotoShowViewForPlayerInfo();
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    noticeBindAlipay:function(netdata){
        log("noticeBindAlipay")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mUser.hasBindAlipay = 1;
            sGameData.mUser.alipay = sGameData.mTempData.alipay;
            sGameData.mUser.realName = sGameData.mTempData.realname;
            showLittleNotice(sResWord.w_bind_suc);
            if(sGameData.mPlayerInfoLayer){
                sGameData.mPlayerInfoLayer.showBindState();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeChangeAlipay:function(netdata){
        log("noticeChangeAlipay")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mUser.hasBindAlipay = 1;
            sGameData.mUser.alipay = sGameData.mTempData.alipay;
            sGameData.mUser.realName = sGameData.mTempData.realname;
            showLittleNotice(sResWord.w_change_suc);
            if(sGameData.mPlayerInfoLayer){
                sGameData.mPlayerInfoLayer.showBindState();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeChangeCash:function(netdata){
        log("noticeChangeCash")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softCash = netdata[2];
            sGameData.mUser.softCash = softCash
            showLittleNotice(sResWord.w_tip_submitok);
            if(sGameData.mChangeLayer){
                sGameData.mChangeLayer.updateCash();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeEbankSaveCash:function(netdata){
        log("noticeEbankSaveCash")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softCash = netdata[2];
            var ebankCash = netdata[3];
            sGameData.mUser.softCash = softCash
            sGameData.mUser.ebankCash = ebankCash
            showLittleNotice(sResWord.w_tip_submitok);
            if(sGameData.mBankSaveCashLayer){
                sGameData.mBankSaveCashLayer.updateCash();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    noticeEbankGetCash:function(netdata){
        log("noticeEbankGetCash")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var softCash = netdata[2];
            var ebankCash = netdata[3];
            sGameData.mUser.softCash = softCash
            sGameData.mUser.ebankCash = ebankCash
            showLittleNotice(sResWord.w_tip_submitok);
            if(sGameData.mBankGetCashLayer){
                sGameData.mBankGetCashLayer.updateCash();
            }
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },

    //播放背景音乐
    playBGMusic:function(){
        var musics = [res.bg_music_main_mp3,res.bg_music_main_mp3];//,res.bg_music_3_mp3
        var rand = randomInt(2);
        var name = musics[rand];
        SoundManager.playBGMusic(name);
    }


});

MainScene.create = function () {
    var sg = new MainScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MainScene.scene = function () {
    //cc.
    var scene = cc.Scene.create();
    var layer = MainScene.create();
    scene.addChild(layer);
    return scene;
};

