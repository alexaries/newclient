/**
 * Created by Administrator on 14-4-17.
 * 主场景显示层
 */
var MainLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mListener:null,//监听
    mDragRoom:false,//是否在拖动房间
    mOnLineShow:null,//在线显示

    mHallBg:null,

    mMainHallGameView:null,
    mMainHallRoomView:null,
    mMainMatchRoomView:null,
    mHallNode:null,
    mHallScrollView:null,
    mShowHallType:1,//1game 2room 3match
    mStartPoint:cc.p(0,0),//点击开始时的坐标
    mMovedirection:0,//1 横向 2竖向
    mLogoSprite:null,//
    mIsScrollMoving:false,//
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMainLayer = this;
            sGameData.mCurrLayer = this;

            log("MainLayer start");
            if(sGameData.mUILayer){
                sGameData.mUILayer.setVisible(true);
                sGameData.mUILayer.showView(0);
            }

            var size = cc.director.getWinSize();

            var hallbg = cc.Sprite.create("#hallbg_1.png");
            hallbg.attr({
                x:size.width*0.5,
                y: size.height*0.5
            });
            this.addChild(hallbg);
            hallbg.setVisible(false);
            this.mHallBg = hallbg;


            var tempW = (size.width - 960)*0.2;

            var bsize_top = cc.size(size.width-40,90);
            var topbg = cc.Scale9Sprite.create();
            topbg.initWithSpriteFrameName("main_top_bg.png")
            topbg.setContentSize(bsize_top);

            topbg.attr({
                x: size.width/2,
                y: size.height+1,
                anchorX:0.5,
                anchorY:1
            });
            this.addChild(topbg,1);


            var logoimg = cc.Sprite.create(sGameData.mHallLogoPic);
                            if(logoimg){
                                logoimg.attr({
                                             x:size.width *0.5,
                                             y: size.height-45   //  size.height-26 ol
                                             });
                                this.addChild(logoimg,2);
                                logoimg.setScale(0.9);
                                //this.mLogoSprite = logoimg;
                            }



            var atempW = (size.width - 960)*0.5;
            var aMarqueeShow = MarqueeShow.create();
            aMarqueeShow.setPosition(cc.p(size.width/2+410+atempW/2,size.height*0.85-8))
            this.addChild(aMarqueeShow,1);
            //aMarqueeShow.setVisible(false);

            sGameData.mUILayer.checkFreeGold();

            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        this.scheduleOnce(this.initInSecondFrame,0.05);
    },
    //第2帧初始化
    initInSecondFrame:function(){
        showUILoadWait(false);
        dealClickTouch(this);
        this.initGameData();
    },
    //更新货币显示
    updateCash:function(){
        sGameData.mUILayer.mMainPalyerInfo.updateCash();
    },

    //断线重连 操作
    doReConnRoom:function(){
        //断线重连 操作
        if(sGameData.mNeedReConnRoom){//
            log("need re enter")
            if(sGameData.mUser.onLineRoomId > 0 && sGameData.mUserMatchDatas.length == 0) {//只有普通游戏的 直接断线重连进去
                var room = getRoomById(sGameData.mUser.onLineRoomId);
                if (room) {
                    sGameData.mNeedReConnRoom = false;

                    sGameData.mCurrRoom = room;

                    sGameData.mCurrGameType = room.gameId;

                    if(!sGameData.mNetSendDataAfterEnterGame) {
                        if (room.gameId == GAME_TYPE_DDZ && !cc.sys.isNative) {
                            log("re enter ddz")
                            gotoGameScene(room.gameId);
                        } else {
                            log("re enter game")
                            sGameData.mIsSendEnterRoomIng = true;
                            sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                        }
                    }else{
                        sGameData.mSendDataTypeInGame = 0;
                        gotoGameScene(room.gameId);
                    }
                }
            }else{
                sGameData.mNeedReConnRoom = false;

                var showdatas = [];
                if(sGameData.mUser.onLineRoomId > 0){
                    var room = getRoomById(sGameData.mUser.onLineRoomId);
                    if (room) {
                        showdatas.push([1,room]);
                    }
                }
                for(var i=0;i<sGameData.mUserMatchDatas.length;i++){
                    var umatch = sGameData.mUserMatchDatas[i];
                    showdatas.push([2,umatch]);
                }
                showChooseEnterGame(true,showdatas);

            }
        }
    },

    //初始化游戏数据
    initGameData:function(){
        var size = cc.director.getWinSize();
        if(sGameData.mGameLogic == null){
            sGameData.mGameLogic = new GameLogic();
        }
        log("all rooms = "+sGameData.mRoomlist.length)
        //显示 系统公告

        if(sGameData.mNoticeNeedReg){
            sGameData.mNoticeNeedReg = false;
            showNotice(sResWord.w_notice,sResWord.w_tip_need_upguest,3,30);

        }else{
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
        this.createShowHall();

        //断线重连 操作
        this.doReConnRoom();

        //没有好友 列表 请求次 好友
        if(sGameData.mDoActionOnceAfterLogin){
            sGameData.mDoActionOnceAfterLogin = false;

            sGameData.mGetFriendFrom = 2;
            //sGameData.mGameNet.sendFriendGetList(3);

            if(cc.sys.isNative) {//放mainscene里做
                sGameData.mIsVerifyAfterLogin = true;
                var gameJSB = cc.GameJSB.sharedGJSB();
                var result = gameJSB.getVerifyOrderNos(sGameData.mCurrZoneId,sGameData.mUser.id);
                if(result.length > 0){
                    setAllVerifyPaylog(result);
                }
            }
        }

    },
    createShowHall:function(){
        var size = cc.director.getWinSize();

        var hallnode = cc.Node.create();
        this.addChild(hallnode);

        var scsize = cc.size(size.width,size.height*2);
        var svsize = size;
        var scrollview = cc.ScrollView.create(svsize);
        var layer = cc.Layer.create();
        layer.setContentSize(scsize);
        scrollview.setContentSize(scsize);
        scrollview.setViewSize(svsize);
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        scrollview.setDelegate(this);
        scrollview.setPosition(cc.p(0,0));

        hallnode.addChild(scrollview);
        scrollview.setTag(7888)
        scrollview.setTouchEnabled(false);
        this.mHallScrollView = scrollview;

        var gameview = MainHallGameView.create();
        layer.addChild(gameview);
        this.mMainHallGameView = gameview;

        var hallroomview = MainHallRoomView.create();
        layer.addChild(hallroomview);
        hallroomview.setPosition(cc.p(0,size.height));
        this.mMainHallRoomView = hallroomview;


        var matchroomview = MainMatchRoomView.create();
        layer.addChild(matchroomview);
        matchroomview.setPosition(cc.p(0,size.height));
        matchroomview.setVisible(false);
        this.mMainMatchRoomView = matchroomview;

        this.mHallNode = hallnode;
    },

    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mMainLayer = null;
    },
    //更新在线人数
    updateOnline:function(num){
        log("updateOnline=")
        //this.mOnLineShow.setValue(4,sGameData.mOnlineNum,1,1);
    },
    //跳转到显示玩家信息
    gotoPlayerInfo:function(){
        gotoShowViewForPlayerInfo();
    },
    //滚动视图 接口
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--"+pos.y)
        if(this.mIsScrollMoving) return;

        if(sGameData.mIsShowWorldChatPaneling){
            sGameData.mWorldChatPanel.hiddenUIWithClick(pos);
            if(!sGameData.mIsShowWorldChatPaneling){
                return;
            }
        }
        this.mDragRoom = false;
        if(!checkButtonEnable()){
            return;
        }
        this.mMovedirection = 0;
        sGameData.mClickState = 1;
        var clickroomrect = this.checkClickRoomRect(pos)
        if(clickroomrect > 0){
            this.mDragRoom = true;
            this.mStartPoint = pos;

            var offsetY = this.mHallScrollView.getContentOffset().y;
            if(this.mShowHallType == 1){
                var x = this.mMainHallGameView.x
                var y = this.mMainHallGameView.y;
                var pos1 = cc.p(pos.x-x,pos.y-y-offsetY)
                this.mMainHallGameView.onTouchBegan_g(pos1);
            }else if(this.mShowHallType == 2){
                var x = this.mMainHallRoomView.x
                var y = this.mMainHallRoomView.y;
                var pos1 = cc.p(pos.x-x,pos.y-y-offsetY)
                this.mMainHallRoomView.onTouchBegan_g(pos1);
            }else if(this.mShowHallType == 3){
                var x = this.mMainMatchRoomView.x
                var y = this.mMainMatchRoomView.y;
                var pos1 = cc.p(pos.x-x,pos.y-y-offsetY)
                this.mMainMatchRoomView.onTouchBegan_g(pos1);
            }
        }else{

        }
    },
    //点击移动
    onTouchMoved_g:function(pos){
        if(this.mIsScrollMoving) return;
        if(this.mShowHallType == 2&&this.mDragRoom&&this.mMovedirection==0){
            if(Math.abs(pos.y-this.mStartPoint.y) > Math.abs(pos.x-this.mStartPoint.x)){
                this.mMovedirection = 2
                this.mMainHallRoomView.mScrollView.setTouchEnabled(false);
            }else{
                this.mMovedirection = 1
                this.mHallScrollView.setTouchEnabled(false);
            }
        }else if(this.mShowHallType == 3&&this.mDragRoom&&this.mMovedirection==0){
            if(Math.abs(pos.y-this.mStartPoint.y) > Math.abs(pos.x-this.mStartPoint.x)){
                this.mMovedirection = 2
                this.mMainHallRoomView.mScrollView.setTouchEnabled(false);
            }else{
                this.mMovedirection = 1
                this.mHallScrollView.setTouchEnabled(false);
            }
        }
    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--"+pos.y)
        if(this.mIsScrollMoving) return;
        if(!checkButtonEnable()){
            return;
        }
        if(this.mDragRoom){

            var offsetY = this.mHallScrollView.getContentOffset().y;
            if(this.mShowHallType == 1){
                var x = this.mMainHallGameView.x
                var y = this.mMainHallGameView.y;
                var pos1 = cc.p(pos.x-x,pos.y-y-offsetY)
                this.mMainHallGameView.onTouchEnded_g(pos1);
            }else if(this.mShowHallType == 2||this.mShowHallType == 3){
                var tarview = this.mMainHallRoomView;
                if(this.mShowHallType == 3){
                    tarview = this.mMainMatchRoomView;
                }
                var x = tarview.x
                var y = tarview.y;
                var pos1 = cc.p(pos.x-x,pos.y-y-offsetY)
                if(this.mMovedirection==1){
                    tarview.onTouchEnded_g(pos1);
                }else{
                    if(Math.abs(this.mStartPoint.y - pos.y) < 10){//小于10 当点击
                        tarview.onTouchEnded_g(pos1, 1);
                    }else{
                        tarview.onTouchEnded_g(pos1, 2);
                    }
                }
            }
            if(this.mShowHallType == 2||this.mShowHallType == 3) {
                var yoffset = pos.y - this.mStartPoint.y;
                if (Math.abs(yoffset) > Math.abs(this.mStartPoint.x - pos.x)) {
                    this.adjustScrollView(yoffset);
                }else{
                    var size = cc.director.getWinSize();
                    var soffset = cc.p(0, -size.height);
                    var scrollview = this.mHallScrollView;
                    scrollview.unscheduleAll();
                    scrollview.setContentOffsetInDuration(soffset, 0.3);
                }
            }
        }else{
            if(sGameData.mClickState == 1){
                if(this.checkClickPlayerInfo(pos)){
                    this.clickPlayerInfo();
                }else if(this.checkClickSysChat(pos)&&sGameData.mAppCanShowWorldMsg){
                    this.clickSysChat();
                }
            }
        }
        if(this.mShowHallType == 2){
            this.mHallScrollView.setTouchEnabled(true);
            this.mMainHallRoomView.mScrollView.setTouchEnabled(true);
            this.mMainMatchRoomView.mScrollView.setTouchEnabled(false);
        }else if(this.mShowHallType == 3){
            this.mHallScrollView.setTouchEnabled(true);
            this.mMainMatchRoomView.mScrollView.setTouchEnabled(true);
            this.mMainHallRoomView.mScrollView.setTouchEnabled(false);
        }
        this.mDragRoom = false;
    },

    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    },
    //调整滚动视图位置
    adjustScrollView:function(offset){
        log("main:adjustScrollView=="+offset)
        var size = cc.director.getWinSize();
        var changepage = false;
        if(Math.abs(offset) > 50&&offset>0){ //移动距离超过多少就翻页
            changepage = true;
        }
        var scrollview = this.mHallScrollView;
        scrollview.unscheduleAll();
        var soffset = cc.p(0, -size.height);
        if(changepage){
            soffset = cc.p(0, 0);
            this.mMainHallGameView.setVisible(true);
            this.mShowHallType = 1;
            this.showHallTypeView();
            scrollview.setTouchEnabled(false);
        }
        scrollview.setContentOffsetInDuration(soffset, 0.3)

        // 移动时不接收点击事件
        this.mIsScrollMoving = true;
        var delay = cc.DelayTime.create(0.3)
        var callback = cc.CallFunc.create(this.setScrollState, this);
        var seq =cc.Sequence.create(delay,callback);
        this.stopAllActions();
        this.runAction(seq);

    },
    //title——logo 修改 用户信息
    showHallTypeView:function(){

        sGameData.mUILayer.mMainPalyerInfo.showHallTypeView(this.mShowHallType);
        sGameData.mUILayer.showHallTypeView(this.mShowHallType);
        this.showTitle(this.mShowHallType);
    },
    changeTitlePic:function(){
        if(this.mShowHallType ==1){
            this.mHallBg.setVisible(false);
        }else if(this.mShowHallType ==2){
            this.mHallBg.setVisible(true);
            if(sGameData.mCurrGameType == GAME_TYPE_DN){
                this.mHallBg.setSpriteFrame("hallbg_1.png");
            }else if(sGameData.mCurrGameType == GAME_TYPE_ZJH){
                this.mHallBg.setSpriteFrame("hallbg_2.png");
            }else{
                this.mHallBg.setVisible(false);
            }
        }else if(this.mShowHallType ==3){

        }



    },
    showTitle:function(type){
        //this.mLogoSprite.stopAllActions();
        //var scaleanim1 = cc.ScaleTo.create(0.3,0);
        //var callback = cc.CallFunc.create(this.changeTitlePic, this);
        //var scale = 0.8
        //if(this.mShowHallType ==1) {
        //    scale = 0.9
        //}else if(this.mShowHallType ==3) {
        //    scale = 0.73
        //}else{
        //    if(sGameData.mCurrGameType == GAME_TYPE_DDZ){
        //        scale = 0.73
        //    }
        //}
        //var scaleanim2 = cc.ScaleTo.create(0.3,scale);
        //
        //var seq =cc.Sequence.create(scaleanim1,callback,scaleanim2);
        //this.mLogoSprite.runAction(seq);

        this.changeTitlePic();
    },
    getGameTitle:function(gametype){
        var title = "g_title_ddzmatch.png";
        if(gametype == GAME_TYPE_DDZ){
            title = "g_title_ddz.png";
        }else if(gametype == GAME_TYPE_ZJH){
            title = "g_title_psz.png";
        }else if(gametype == GAME_TYPE_DN){
            title = "g_title_dn.png";
        }
        return title;
    },
    //移出监听点击
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //世界聊天的范围
    syschatRect:function(){
        var size = cc.director.getWinSize();
        var atempW = (size.width - 960)*0.5;
        var rwidth = 320+atempW;
        var itemsize = cc.size(820+atempW,42)
        var x = size.width/2+410+atempW/2;
        var y = size.height*0.85-8;
        var width = itemsize.width;
        var height = itemsize.height;
        return cc.rect(x-width,y-height, width, height);
    },
    //检测是否点击世界聊天
    checkClickSysChat:function(pos){
        var touched = false;
        //触摸点坐标
        var p = pos;
        var rect = this.syschatRect();
        if(cc.rectContainsPoint(rect,p)){       //判断鼠标拖拉的区域是否在位置上
            touched = true;
        }
        return touched;
    },
    //玩家信息的范围
    playerRect:function(){
        var size = cc.director.getWinSize();
        var size_player_shadow = cc.size(225, 90);
        var tempW = (size.width - 960)*0.2;
        var x = 30;
        var y = size.height - 2;
        var width = size_player_shadow.width;
        var height = size_player_shadow.height;
        return cc.rect(x,y-height, width, height);
    },
    //检测是否点击年玩家信息
    checkClickPlayerInfo:function(pos){
        var touched = false;
        //触摸点坐标
        var p = pos;
        var rect = this.playerRect();
        if(cc.rectContainsPoint(rect,p)){       //判断鼠标拖拉的区域是否在位置上
            touched = true;
        }
        return touched;
    },
    //点击了玩家信息
    clickPlayerInfo:function(){
        playClickSound();
        this.removeListeners();
        this.stopAllActions();
        var callback = cc.CallFunc.create(this.gotoPlayerInfo, this);
        var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
        this.runAction(seq);
    },
    //检测是否点击年房间 区域
    checkClickRoomRect:function(pos){
        var touched = 0;
        //触摸点坐标
        var p = pos;
        var rect = this.scrollRect();
        if(cc.rectContainsPoint(rect,p)){       //判断鼠标拖拉的区域是否在位置上
            touched = 1;
        }
        return touched;
    },
    //滚动的范围
    scrollRect:function(){
        var size = cc.director.getWinSize();
        var viewsize = cc.size(size.width, 378)
        var x = 0
        var y = 100
        var width = viewsize.width;
        var height = viewsize.height;
        return cc.rect(x,y, width, height);
    },

    clickSysChat:function(){
        log("clickWorldChat==")
        showWorldChat();
    },
    setScrollState:function(){
        this.mIsScrollMoving = false;
    },
    showHallRoom:function(gametype){
        log("showHallRoom----"+gametype);
        var size = cc.director.getWinSize();
        if(this.mShowHallType ==1) {

            var soffset = cc.p(0, -size.height);
            //this.mMainHallGameView.setVisible(false);
            this.mMainMatchRoomView.setVisible(false);
            this.mHallScrollView.unscheduleAll();
            this.mHallScrollView.setContentOffsetInDuration(soffset, 0.3)
            this.mHallScrollView.setTouchEnabled(true);
            this.mMainHallRoomView.setVisible(true);
            this.mMainHallRoomView.startShowHallRoom();
            this.mShowHallType = 2;
            this.showHallTypeView();

            // 移动时不接收点击事件
            this.mIsScrollMoving = true;
            var delay = cc.DelayTime.create(0.3)
            var callback = cc.CallFunc.create(this.setScrollState, this);
            var seq =cc.Sequence.create(delay,callback);
            this.stopAllActions();
            this.runAction(seq);
        }
    },
    showMatchRoom:function(){
        var size = cc.director.getWinSize();
        if(this.mShowHallType ==1){
            var soffset = cc.p(0, -size.height);
            //this.mMainHallGameView.setVisible(false);
            this.mMainHallRoomView.setVisible(false);
            this.mHallScrollView.unscheduleAll();
            this.mHallScrollView.setContentOffsetInDuration(soffset, 0.3)
            this.mHallScrollView.setTouchEnabled(true);
            this.mMainMatchRoomView.setVisible(true);
            this.mMainMatchRoomView.startShowMatchRoom();
            this.mShowHallType = 3;
            this.showHallTypeView();
            //// 移动时不接收点击事件
            this.mIsScrollMoving = true;
            var delay = cc.DelayTime.create(0.3)
            var callback = cc.CallFunc.create(this.setScrollState, this);
            var seq =cc.Sequence.create(delay,callback);
            this.stopAllActions();
            this.runAction(seq);
        }
    }

});

MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
