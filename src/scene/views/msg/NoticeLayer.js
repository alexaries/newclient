/**
 * Created by Administrator on 14-4-24.
 * 显示提示
 */
var NoticeLayer = cc.Layer.extend({
    mIndex:0, //某位置
    mName:"",//标题
    mMsg:"",//消息内容
    mType:0, //类型 0正常模式 1充值提示无按钮 2网络中断提示 点击后重连 3提示 确定 取消   4升级提示, 16新手房提示
    mFrom:0, //子类型 mType 3时有用  1退出提示
    mData:null,//传递来的数据
    mOkItem:null,//同意按钮
    mNoItem:null,//不同意按钮
    _listener:null,//监听
    mMsgLabel:null,//消息显示
    mColorLayer:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);
            this.mColorLayer = colorlayer;

            var size_notice = cc.size(600,320);
            var size_panel_inner = cc.size(596,190);
            var  bgimg = createSysPanel(size_notice);

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(0,16));
            this.addChild(innerimg);

            //var titlebg = cc.Sprite.create("#notice_title.png");
            //titlebg.setPosition(cc.p(0,size.height*0.5-16));
            //this.addChild(titlebg);


            //提示
            this.mName = sResWord.w_notice;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(430,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.38+20-6));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);

            var vsize = cc.size(550,188)
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();

            //提示
            this.mMsg = "notice!!!";
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(550,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐

            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0,1));
            layer.addChild(pMsgLabel,1);
            pMsgLabel.setColor(cc.color(60,60,60))
            this.mMsgLabel = pMsgLabel;

            var csize = pMsgLabel.getContentSize();
            pMsgLabel.setPosition(cc.p(0,csize.height));
            layer.setContentSize(csize);
            scrollview.setContentSize(csize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(-vsize.width/2,-78));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview
            if(csize.height > 188){
                scrollview.setContentOffset(cc.p(0,188-csize.height));
            }else{
                scrollview.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }



            //添加 
            var okSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28,1);
            var okSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickOK,this);
            okItem.setPosition(cc.p(0, -size.height*0.3-25));//设定位置
            if(this.mType == 1){
                okItem.setVisible(false);
            }
            this.mOkItem = okItem

            //添加
            var cancelSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_no,cc.p(0.5,0.5),28);
            var cancelSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_no,cc.p(0.5,0.5),28,1);
            var cancelSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_no,cc.p(0.5,0.5),28);
            var cancelItem = cc.MenuItemSprite.create(
                cancelSprite,
                cancelSprite1,
                cancelSprite2,
                this.clickNO,this);
            cancelItem.setPosition(cc.p(size.width*0.2, -size.height*0.3-25));//设定位置
            cancelItem.setVisible(false);
            this.mNoItem = cancelItem

            var menu = cc.Menu.create(okItem,cancelItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //进入时执行
    onEnter:function(){
        this._super();
        log("on enter notice")

    },
    //退出时执行
    onExit:function(){

        this._super();
        log("on exit notice")
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },


    /**
     * 显示通知
     * @param type 0普通 1 充值提示 2网络中断提示 3提示 确定 取消   4升级提示 5踢出房间 6其他地方登录  7比赛开始通知 8从游戏中点击充值 9游戏中绑定手机（scene切换）  10强制升级 11重新开始游戏（重联网）  12 zjh 开牌   13 进入房间失败 14踢出被禁玩家
     * @param from type=3有效  1添加好友 2删除好友 3取消报名 4退出登录 5兑奖绑定手机（scene不切换）6邀请游戏 7选择更新apk 30提示游客升级 50下载游戏基本资源 99 清除更新 100退出游戏
     */
    showNotice:function(name,msg,type,from,data){
        this.mName = name;
        this.mMsg = msg;
        this.mType = type;
        this.mFrom = from;
        this.mData = data;

        var pNameLabel = this.getChildByTag(8001);
        if(pNameLabel){
            pNameLabel.setString(this.mName);
        }
        var pMsgLabel = this.mMsgLabel;
        if(pMsgLabel){
            pMsgLabel.setString(this.mMsg);
            var csize = pMsgLabel.getContentSize();
            var layer = this.mScrollView.getContainer();
            layer.setContentSize(csize);
            this.mScrollView.setContentSize(csize);
            pMsgLabel.setPosition(cc.p(0,csize.height));
            if(csize.height > 188){
                this.mScrollView.setContentOffset(cc.p(0,188-csize.height));
            }else{
                //pMsgLabel.setPosition(cc.p(0,188/2+csize.height/2));
                this.mScrollView.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }
        }

        var winsize = cc.director.getWinSize();
        if(type ==12){
            this.mColorLayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2-100));
            changeBtnWord(this.mOkItem,sResWord.w_zjh_opencard);
            changeBtnWord(this.mNoItem,sResWord.w_zjh_qipai);
        }else if(type == 16){
            this.mColorLayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            changeBtnWord(this.mOkItem,sResWord.w_ok);
            changeBtnWord(this.mNoItem,sResWord.w_go_to_high_level_room);
        }else{
            this.mColorLayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            changeBtnWord(this.mOkItem,sResWord.w_ok);
            changeBtnWord(this.mNoItem,sResWord.w_no);
        }


        this.showButton();
        setClickSwallows(this);
    },
    //同意
    clickOK:function(){
        log("clickOK--"+this.mType+"="+this.mFrom)
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        if(this.mType == 2){
            sGameNetData.mConnectFailNum = 0;
            this.reconnectNet();
//            if(sGameNetData.mConnectFailNum<5){
//                this.reconnectNet();
//            }else{
//                this.showTip(sResWord.w_net_tip_retry)
//            }
        }else if(this.mType == 5){
            goToMainFromGame();
        }else if(this.mType == 3){
            if(this.mFrom == 1){
                var userId = this.mData
                var type = USER_MSG_INVITE_FRIEND
                var msg = sGameData.mUser.nickName+""+sResWord.w_tip_invite_friend;
                var kitdata = "";//"1:100";
                if(!sGameData.mIsSendingData) {
                    sGameData.mIsSendingData = true
                    sGameData.mGameNet.sendSendUserMsg(userId, type, msg, kitdata)
                }
                //sGameData.mGameNet.sendFriendFollow(this.mData)
            }else if(this.mFrom == 2){
                if(!sGameData.mIsSendingData) {
                    sGameData.mIsSendingData = true
                    sGameData.mGameNet.sendFriendUnfollow(this.mData)
                }
            }else if(this.mFrom == 3){
                if(sGameData.mCurrLayer == sGameData.mMatchHallLayer||sGameData.mMainMatchRoomView){
                    var match = sGameData.mCurrMatch;
                    if(match.type == MATCHSTART_TIME){
                        if(!sGameData.mIsSendingData){
                            sGameData.mIsSendingData = true;
                            //sGameData.mGameNet.reConnect(match.ip,match.websocketPort,3);
                            sGameData.mGameNet.sendMatchCancelSignup(match.id,match.roomId);
                        }
                    }
                }
            }else if(this.mFrom == 4){
                doResetDataForLogout()
                gotoSceneByLoading(TargetSceneLogin,0)
            }else if(this.mFrom == 5){
                gotoShowViewForPlayerInfo();
            }else if(this.mFrom == 6){
                log(" goto invite game  roomId =="+this.mData)
                var tRoom = getRoomById(this.mData);
                if(tRoom){
                    inviteGameQuit(tRoom);

                }
            }else if(this.mFrom == 7){
                CallCpp.doSomeString(6, sGameData.mForceUpUrl,"","","","");
                showLittleLoading(true,"正在下载新版本,请稍候...")
            }else if(this.mFrom == 30){
                gotoShowViewForUpGuest();
                if(!sGameData.mHasShowSysNotice){
                    sGameData.mHasShowSysNotice = true;
                    var msg = sGameData.mSysNoticemsg;
                    if(msg.length > 0){
                        msg = formatMsgFromNet(msg);
                        if(sGameData.mAppCanShowSysGonggao) {
                            showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
                        }
                    }
                }
            }else if(this.mFrom == 50){
                startLoadGameBaseRes(sGameData.mCurrDownGameId);
            }else if(this.mFrom == 99){
                CallCpp.doSomeString(200, "","","","","");
                if(cc.sys.isNative){
                    cc.director.end();
                }
            }else if(this.mFrom == 100){
                if(cc.sys.isNative){
                    cc.director.end();
                }
            }
        }else if(this.mType == 6){
            gotoSceneByLoading(TargetSceneLogin,0);
        }else if(this.mType == 7){
            sGameData.mCurrMatch = this.mData;
            if(!sGameData.mIsSendEnterRoomIng&&!sGameData.mIsEnterGameing){
                sGameData.mIsSendEnterRoomIng = true;
                sGameData.mGameNet.reConnect(this.mData.ip,this.mData.websocketPort,4);
            }
        }else if(this.mType == 8){
            if(sGameData.mCurrScene == sGameData.mMainScene){
                gotoPay();
            }else{
                sGameData.mExitRoomForAction = 1;
                goMainForPayNotice(0);
            }
        }else if(this.mType == 9){
            gotoSceneByLoading(TargetSceneMain,5);
        }else if(this.mType == 10){
            CallCpp.doSomeString(6, sGameData.mForceUpUrl,"","","","");
            showLittleLoading(true,"正在下载新版本,请稍候...")
        }else if(this.mType == 11){
            reStartGame();
        }else if(this.mType == 12){
            sGameData.mZJHLayer.op_opencard();
        }else if(this.mType == 13){
            goToMainFromGame();
            connectHallWhenExitRoom();
        }else if(this.mType == 14){
            sGameData.mGameNet.mISReConnect_close = true;
            sGameData.mGameNet.closeNet();
            doResetDataForLogout()
            gotoSceneByLoading(TargetSceneLogin,0)
            sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,3);
        }else if(this.mType == 16){
            sGameNetData.mDDZNet.sendDDZEnterQueue();
        }else if(this.mType == 17){
            sGameNetData.mDNNet.sendDNExitRoom();
            //sGameData.mCurrRoom = null;
            //goToMainFromGame();
            //connectHallWhenExitRoom();
        }
    },
    //不同意
    clickNO:function(){
        log("clickNO--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        if(this.mType == 5){
            goToMainFromGame();
        }else if(this.mType == 6){
            gotoSceneByLoading(TargetSceneLogin,0);
        }else if(this.mType == 3){
            if(this.mFrom == 7){
                sGameData.mJSStartScene.initNet();
            }else if(this.mFrom == 30){
                if(!sGameData.mHasShowSysNotice){
                    sGameData.mHasShowSysNotice = true;
                    var msg = sGameData.mSysNoticemsg;
                    if(msg.length > 0){
                        msg = formatMsgFromNet(msg);
                        if(sGameData.mAppCanShowSysGonggao) {
                            showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
                        }
                    }
                }
            }
        }else if(this.mType == 12){
            sGameData.mZJHLayer.op_qipai();
        }else if(this.mType == 16){
            goToMainFromGame();
            connectHallWhenExitRoom();
        }
    },
    hidden:function(){
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
    },
    //重连网络
    reconnectNet:function(){
        log("reconnectNet1----"+sGameNetData.mConnectFailNum);
        reInitWhenNetClose();
        sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,0);
    },
    //显示按钮
    showButton:function(){
        var size = this.getContentSize();
        if(this.mType == 1){
            this.mOkItem.setVisible(false);
        }else{
            this.mOkItem.setVisible(true);
            if(this.mType == 0||this.mType == 4||this.mType == 5||this.mType == 2||this.mType == 10||this.mType == 11||this.mType == 13||this.mType == 14 || this.mType == 17){
                this.mOkItem.setPosition(cc.p(0, -size.height*0.3-25));//设定位置
            }else{
                this.mOkItem.setPosition(cc.p(-size.width*0.2, -size.height*0.3-25));//设定位置
            }
        }
        if(this.mType == 0||this.mType == 1||this.mType == 4||this.mType == 5||this.mType == 2||this.mType == 10||this.mType == 11||this.mType == 13 || this.mType == 17 ||this.mType == 14){
            this.mNoItem.setVisible(false);
        }else{
            this.mNoItem.setVisible(true);
        }
    },
    //显示提示
    showTip:function(msg){
        log("tip=="+msg);
        if(sGameData.netTipLabel!=null&&msg){
            sGameData.netTipLabel.setString(msg);
        }
    }

});
NoticeLayer.create = function () {
    var sg = new NoticeLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
