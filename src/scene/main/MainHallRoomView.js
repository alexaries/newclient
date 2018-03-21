/**
 * Created by apple on 15-12-11.
 */

var MainHallRoomView = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mScrollView: null,//滚动视图
    mCurrPage: 0,//当前页
    mAllPage:0,
    mCanDarg:false,//能否拖动
    mStartPos: cc.p(0, 0),//点击开始时坐标
    mHasDrag: false,//是否已经拖动
    mStartDargScale:false,//开始拖动放缩
    mRoomShows:[],//房间显示
    mRoomList:null,//房间列表
    mPageBar:null,//分页
    mClickItem:null,
    mHasInited:false,
    mIsEnterRoomDelaying:false,
    mOffsetX:0,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMainHallRoomView = this;
            log("MainHallRoomView start");
            this.initGameData();

            bRet = true;
        }
        return bRet;
    },

    //初始化游戏数据
    initGameData:function(){



        var size = cc.director.getWinSize();

        var vsize = cc.size(size.width,450)

        var csize = vsize
        log("scrollview view w=="+vsize.width);
        log("scrollview content w=="+csize.width);
        var scrollview = cc.ScrollView.create(vsize);
        var layer = cc.Layer.create();
        layer.setContentSize(csize);
        scrollview.setContentSize(csize);
        scrollview.setViewSize(vsize);
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollview.setDelegate(this);
        scrollview.setPosition(cc.p(0,(size.height-450)/2));
        scrollview.setContentOffset(cc.p(0,0));
        this.addChild(scrollview);
        scrollview.setTag(7888)
        this.mScrollView = scrollview


    },
    onExit:function(){
        this._super();
        sGameData.mMainHallRoomView = null;
    },
    startShowHallRoom:function(){


        this.mRoomShows = []
        var roomlists = getRoomListByType(sGameData.mCurrGameType);
        this.mRoomList = roomlists

        var size = cc.director.getWinSize();

        //var tempX = (size.width-960)/4;
        //var rwidth = 240+tempX;
        var rwidth = size.width/5;

        if(rwidth >= 230+10){
            sGameData.mRoomScale = 1;
        }else{
            sGameData.mRoomScale = (rwidth-10)/230
        }
        //


        var roomlen = roomlists.length;
        var allpage = Math.floor((roomlists.length+4)/5);

        var csize = cc.size(rwidth*allpage,450)

        var layer = this.mScrollView.getContainer();
        layer.removeAllChildren();

        for (var i = 0; i <roomlen; ++i) {
            var room = roomlists[i];
            var itemroom = ItemGRoom.create(i,room);
            var x = rwidth/2 + rwidth*(i);
            var y = 195 ;
            itemroom.setPosition(cc.p(x,y))
            itemroom.setScale(sGameData.mRoomScale);
            layer.addChild(itemroom)
            //itemroom.setScale(0.9);

            this.mRoomShows.push(itemroom);
        }

        this.mScrollView.setContentSize(csize);
        this.mScrollView.setContentOffset(cc.p(0,0));

        if(roomlen <= 5){
            var tx = rwidth*(5-roomlen)/2;
            this.mScrollView.setContentOffset(cc.p(tx,0));
            this.mOffsetX = tx;
        }


        this.mAllPage = allpage;

        if(this.mPageBar){
            this.removeChild(this.mPageBar);
            this.mPageBar = null;
        }
        if(this.mAllPage > 1){
            var pageBarDot = PageBarDot.create(allpage);
            this.addChild(pageBarDot,2);
            pageBarDot.setPosition(cc.p(size.width/2,105));
            this.mPageBar = pageBarDot;
        }
    },
    //滚动视图接口
    scrollViewDidScroll:function (view) {
        //log("aaa===")
    },
    scrollViewDidZoom:function (view) {
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        if(!checkButtonEnable()){
            return;
        }
        var size = cc.director.getWinSize();
        this.mHasDrag = false;
        this.mCanDarg = false;
        this.mClickItem = null;
        sGameData.mClickState = 1;
        if(pos.y > 115 && pos.y < 475){
            var item = this.checkClickRoom(pos)
            if(item) {
                item.choose();
                this.mClickItem = item
            }
            this.mHasDrag = true;
            this.mStartPos = pos;
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){
        if(!checkButtonEnable()){
            return;
        }

    },
    //点击结束
    onTouchEnded_g:function(pos,type){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(type==null){
            type = 1;
        }
        if(type == 1){
            if(this.mHasDrag) {
                if(Math.abs(this.mStartPos.x - pos.x) < 20){
                    if (this.mClickItem) {
                        log("is clicked----")
                        this.op_enterroom(this.mClickItem.mRoom);
                    }else{
                        var  distance = pos.x - this.mStartPos.x;
                        this.adjustScrollView(distance);
                    }
                }else{
                    var  distance = pos.x - this.mStartPos.x;
                    this.adjustScrollView(distance);
                }
            }else{
                var  distance = pos.x - this.mStartPos.x;
                this.adjustScrollView(distance);
            }
        }
        if(this.mClickItem){
            this.mClickItem.unchoose();
        }
        this.mHasDrag = false;
        this.mCanDarg = false;
    },
    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    },
    //调整滚动视图位置
    adjustScrollView:function(offset){
        log("mainhallroom:adjustScrollView=="+offset)
        var size = cc.director.getWinSize();
        var changepage = false;
        if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
            changepage = true;
        }
        if(this.mAllPage > 1) {
            var scrollview = this.mScrollView;
            scrollview.unscheduleAll();
            var allpage = this.mAllPage;
            if (changepage) {
                var lastPage = this.mCurrPage;
                if (offset < 0) {
                    this.mCurrPage++
                } else {
                    this.mCurrPage--;
                }
                if (this.mCurrPage > allpage - 1) {
                    this.mCurrPage = allpage - 1;
                }
                if (this.mCurrPage < 0) {
                    this.mCurrPage = 0;
                }
                log("this.mCurrPage==" + this.mCurrPage)
            }
            //var currRoom = this.mRoomShows[this.mCurrPage] // 把当前桌子放大成本来大小
            //var scaleanim1 = cc.ScaleTo.create(0.3,1);
            //currRoom.stopAllActions();
            //currRoom.runAction(scaleanim1)
            //currRoom.showStar(1);

            this.mPageBar.setPage(this.mCurrPage);


            var soffset = cc.p(-size.width * this.mCurrPage, 0);
            scrollview.setContentOffsetInDuration(soffset, 0.3)
        }else{
            var tx = this.mOffsetX;
            this.mScrollView.unscheduleAll();
            var soffset = cc.p(tx, 0);
            this.mScrollView.setContentOffsetInDuration(soffset, 0.3)
        }
    },
    //检查是否点击房间
    checkClickRoom:function(pos){
        var item = null;
        var size = cc.director.getWinSize();

        for(var i = 0;i<this.mRoomShows.length;i++){
            var itemroom = this.mRoomShows[i];
            var room = itemroom.mRoom;

            var x = 0
            var y = (size.height-450)/2;
            var offsetX = this.mScrollView.getContentOffset().x;
            var pos1 = cc.p(pos.x-x-offsetX,pos.y-y)
            if(itemroom.checkClick(pos1)){
                item = itemroom
                log("itemroom=="+itemroom.mRoom.roomId+itemroom.mRoom.roomName)
                break;
            }

        }
        return item;
    },

    //点击 进入房间 （点击时立即执行报错，延迟0.05s）
    op_enterroom:function(room){
        log("clickRoom=="+room.roomId)
        playClickSound();
        //this.removeListeners();
        var tarscene = null;
        tarscene = sGameData.mMainScene

        if(!sGameData.mIsEnterGameing&&sGameData.mCurrScene==tarscene){
            //var room = this.mRoomList[this.mCurrPage];

            if(!this.mIsEnterRoomDelaying){
                this.mIsEnterRoomDelaying = true;
                this.stopAllActions();
                var callback = cc.CallFunc.create(this.doEnterRoom, this,room);
                var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
                this.runAction(seq);
            }
        }
    },
    //执行进入房间
    doEnterRoom:function(nodeExecutingAction, room){
        log("doEnterRoom=="+room.roomId)
        this.mIsEnterRoomDelaying = false;
        sGameData.mDelayLoadingForEnterGame = true;
        sGameData.mCurrRoom = room;
        if(!sGameData.mIsTestNoNet){
            var sendcmdmow = true;
            if(sGameData.mNetSendDataAfterEnterGame){
                if(sGameData.mUseRandomSit){
                    sendcmdmow = false;
                }else if(room.gameId == GAME_TYPE_DDZ){
                    sendcmdmow = false;
                }
            }
            if(!cc.sys.isNative&&room.gameId == GAME_TYPE_DDZ){
                sendcmdmow = false;
            }

            if(sGameData.mUser.softCash < room.enterPoint){
                //showLittleNotice(sResWord.w_softcash_notenough);
                var tipmsg = sResWord.w_tip_needpay_s1 + formatcash(room.enterPoint-sGameData.mUser.softCash) +sResWord.w_softcash+sResWord.w_tip_needpay_s2;
                showNeedPayNotice(0,sResWord.w_tip_needpay+tipmsg);
            }else{
                if(sendcmdmow){ //jsb 先发进入指令后进入游戏 （进入房间，都是先连到房间服务器，再验证，再进入房间）
                    if(!sGameData.mIsSendEnterRoomIng&&!sGameData.mIsEnterGameing){
                        sGameData.mIsSendEnterRoomIng = true;
                        sGameData.mGameNet.reConnect(room.ipAddress,room.websocketPort,1);
                    }
                }else{ //html5 ddz 先进入游戏后发进入指令
                    sGameData.mSendDataTypeInGame = 0;
                    sGameData.mIsEnterGameing = true;
                    gotoGameScene(room.gameId);
                }
            }
        }else{
            gotoGameScene(room.gameId);
        }
    }



});

MainHallRoomView.create = function () {
    var sg = new MainHallRoomView();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};