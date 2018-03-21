/**
 * Created by apple on 15-12-11.
 */

var MainHallGameView = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mScrollView:null,//房间滚动视图
    mRoomShows:[],//房间显示集合
    mDragRoom:false,//是否在拖动房间
    mClickItem:null,//点击的对象
    mStartPoint:cc.p(0,0),//点击开始时的坐标
    mRoomScrollHeight:0,
    mRoomAllPage:0,
    mRoomCurrPage:0,
    mRoomPageShow:null,
    mTypeWidth:1000,
    mShowGameType:0,//0:3game; 1:4game;
    mShowGameNum:3,//
    mIsEnterGameDelaying:false,
    mOffsetX:0,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMainHallGameView = this;
            log("MainHallGameView start");

            var size = cc.director.getWinSize();

            //if(size.width >= this.mTypeWidth){
            //    this.mShowGameType = 2;
            //    this.mShowGameNum = 4;
            //}else{
            //    this.mShowGameType = 1;
            //    this.mShowGameNum = 3;
            //}

            this.mShowGameType = 1;
            this.mShowGameNum = 3;

            // 每个类型游戏 取 一个房间
            var gameroomlist = getRoomListByTypeOne();//
            if(sGameData.mAppCanShowMatch) { //允许显示比赛，把比赛也加进去
                var matchroom = createVirtualRoom(GAME_TYPE_DDZMATCH)
                gameroomlist.push(matchroom);
            }

            var djgametypelist = sGameData.mGamesShowInDJArea;
            for(var i = 0;i<djgametypelist.length;i++){
                var gametype = djgametypelist[i]
                if(isGameShow(gametype)) {
                    var vroom = createVirtualRoom(gametype)
                    gameroomlist.push(vroom);
                }
            }

            log("gameroomlist =="+gameroomlist.length);
            sGameData.mShowGameRoomList = gameroomlist; //当前的显示游戏 列表
            sortRooms(sGameData.mShowGameRoomList);
            var roomlen = sGameData.mShowGameRoomList.length;


            this.mRoomAllPage = Math.floor((roomlen+this.mShowGameNum-1)/this.mShowGameNum);


            // 添加 一个 scrollview 显示 游戏
            var tempW = (size.width - 960)/this.mShowGameNum;
            var rwidth = size.width/this.mShowGameNum;
            var rheight = 378;

            var contentsize = cc.size(rwidth*roomlen,rheight)
            var viewsize = cc.size(size.width, rheight)

            // CCScrollView
            var scrollview  = cc.ScrollView.create(viewsize);
            var layer = cc.Layer.create();
            var h = 15*30;
            layer.setPosition(cc.p(0,0));

            //var menu = cc.Menu.create();
            //menu.x = 0;
            //menu.y = 0;
            //layer.addChild(menu, 1);


            layer.setContentSize(contentsize);
            scrollview.setPosition(cc.p(0,105));//CCPointZero
            scrollview.setContentOffset(cc.p(0,0));
            scrollview.setContentSize(contentsize);//设置内容的宽高
            scrollview.setViewSize(viewsize);//设置显示区域的宽高
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
            scrollview.setTag(7777);
            scrollview.setDelegate(this);
            this.addChild(scrollview,3);
            this.mScrollView = scrollview;
            this.mRoomShows = [];
            var gameroomlist = sGameData.mShowGameRoomList;
            for(var i = 0;i<gameroomlist.length;i++){
                var room = gameroomlist[i];
                var rtype = 0;
                var itemroom = ItemRoom.create(room,rtype);
                itemroom.attr({
                    x: rwidth/2+i*rwidth,
                    y: rheight/2
                });
                layer.addChild(itemroom);
                //itemroom.setScale(0.9);
                this.mRoomShows.push(itemroom);
            }
            scrollview.setContentOffset(cc.p(0,0));

            if(roomlen <= this.mShowGameNum){
                var tx = rwidth*(this.mShowGameNum-roomlen)/2;
                scrollview.setContentOffset(cc.p(tx,0));
                this.mOffsetX = tx;
            }


            // 添加 一个 scrollview 显示 游戏 end
            if(this.mRoomAllPage > 1){
                var pageshow = PageBarDot.create(this.mRoomAllPage);
                pageshow.setPosition(cc.p(size.width/2,102));
                this.addChild(pageshow)
                this.mRoomPageShow = pageshow;
            }

            bRet = true;
        }
        return bRet;
    },
    onExit:function(){
        this._super();
        sGameData.mMainHallGameView = null;
    },

    //滚动视图 接口
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        this.mDragRoom = false;
        this.mClickItem = null;
        if(!checkButtonEnable()){
            return;
        }
        var clickroomrect = this.checkClickRoomRect(pos)
        if(clickroomrect > 0){
            this.mDragRoom = true;
            this.mStartPoint = pos;
            var item = this.checkClickRoom(pos)
            if(item) {
                item.choose();
                this.mClickItem = item
            }
        }else{

        }
    },
    //点击移动
    onTouchMoved_g:function(pos){

    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(this.mDragRoom){
            if(Math.abs(this.mStartPoint.x - pos.x) < 20){
                if(this.mClickItem){
                    this.clickRoom(this.mClickItem.mRoom)
                }else{
                    var  distance = pos.x - this.mStartPoint.x;
                    this.adjustScrollView(distance);
                }
            }else{
                var  distance = pos.x - this.mStartPoint.x;
                this.adjustScrollView(distance);
            }
        }else{

        }
        if(this.mClickItem){
            this.mClickItem.unchoose();
        }
        this.mDragRoom = false;
    },

    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    },

    //调整滚动视图位置
    adjustScrollView:function(offset){
        log("mainhallgame:adjustScrollView=="+offset)
        var size = cc.director.getWinSize();
        var tempW = (size.width - 960)/3;
        var rwidth = size.width/this.mShowGameNum;

        if(this.mRoomAllPage > 1){
            var changepage = false;
            if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
                changepage = true;
            }
            var scrollview = this.mScrollView;
            scrollview.unscheduleAll();
            var allpage = this.mRoomAllPage
            if(changepage){
                var lastPage = this.mRoomCurrPage;
                if(offset < 0){
                    this.mRoomCurrPage ++
                }else{
                    this.mRoomCurrPage --;
                }
                if(this.mRoomCurrPage > allpage-1){
                    this.mRoomCurrPage = allpage-1;
                }
                if(this.mRoomCurrPage < 0){
                    this.mRoomCurrPage = 0;
                }
                log("this.mRoomCurrPage=="+this.mRoomCurrPage)
            }

            this.mRoomPageShow.setPage(this.mRoomCurrPage);
            var soffset = cc.p(-(rwidth*this.mShowGameNum*this.mRoomCurrPage),0);
            scrollview.setContentOffsetInDuration(soffset,0.3)
        }else{
            var tx = this.mOffsetX;
            this.mScrollView.unscheduleAll();
            var soffset = cc.p(tx, 0);
            this.mScrollView.setContentOffsetInDuration(soffset, 0.3)
        }
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
        var y = 105
        var width = viewsize.width;
        var height = viewsize.height;
        return cc.rect(x,y, width, height);
    },
    //检查是否点击房间
    checkClickRoom:function(pos){
        var item = null;
        var size = cc.director.getWinSize();
        var tempW = (size.width - 960)*0.2;


        for(var i = 0;i<this.mRoomShows.length;i++){
            var itemroom = this.mRoomShows[i];
            var room = itemroom.mRoom;

            var x = 0
            var y = 105;

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
    //点击房间
    clickRoom:function(room) {
        log("clickRoom==" + room.roomId)
        playClickSound();
        //this.doEnterRoom(room);
        if(isOpenGame(room.gameId) || (room.gameId == GAME_TYPE_DDZMATCH&&sGameData.mAppCanOpenMatch)){ //判断 游戏 是否开放

            if(sGameData.mAppUseDownGameRes){
                //首先检查是否需要更新资源
                var hasdown = checkHasDownBaseRes(room.gameId);
                if (!hasdown) {
                    if (!sGameData.mIsDownLoadingGameRes) {
                        //showLittleNotice("download game res now");
                        sGameData.mCurrDownGameId = room.gameId
                        var gamename = getGameName(room.gameId)
                        var allsize = getGameBaseResSize(room.gameId,0);
                        if(allsize > 0){
                            var sizestr = getFileSize(allsize);
                            var word = gamename+sResWord.w_tip_down_game_s1+sizestr+sResWord.w_tip_down_game_s2
                            //startLoadGameBaseRes(room.gameId);
                            showNotice(sResWord.w_notice,word,3,50)
                        }else{
                            showLittleNotice(sResWord.w_tip_down_nores);
                        }
                    }else{
                        var gamename = getGameName(sGameData.mCurrDownGameId)
                        var word = sResWord.w_tip_down_other_s1+gamename+sResWord.w_tip_down_other_s2;
                        showLittleNotice(word);

                    }
                    return;
                }
            }

            this.stopAllActions();
            if(!this.mIsEnterGameDelaying){
                this.mIsEnterGameDelaying = true;
                var callback = cc.CallFunc.create(this.doEnterRoom, this,room);
                var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
                this.runAction(seq);
            }
        }else{
            showLittleNotice(sResWord.w_notopen)
        }
    },
    //进入房间
    doEnterRoom:function(nodeExecutingAction, room){
        log("doEnterRoom=="+room.roomId)
        this.mIsEnterGameDelaying = false;
        sGameData.mCurrRoom = room;

        sGameData.mCurrGameType = room.gameId;

        var entertype = getGameConfigDataByType(GameData_ID_GAMEID,room.gameId,GameData_ID_ENTERTYPE);
        if(entertype == GAME_ENTERTYPE_QPHALL){//进入棋牌大厅
            this.gotoHallRoom(room.gameId);
        }else if(entertype == GAME_ENTERTYPE_DJHALL){//进入单机大厅 －－暂无
            this.gotoHallRoomDJ(room.gameId)
        }else if(entertype == GAME_ENTERTYPE_ENTERGAME){//直接进入游戏
            if(!sGameData.mIsTestNoNet){
                this.enterDJRoom(room.gameId);
            }else{
                doGameFunc(GameData_ID_GAMEID,room.gameId,GameData_ID_ENTERGAME_FUNC);
            }
        }else if(entertype == GAME_ENTERTYPE_MATCH){//比赛
            if(sGameData.mIsTestNoNet) {
                //gotoMatch();
                sGameData.mMainLayer.showMatchRoom();
            }else{
                sGameData.mGameNet.sendGetMatchList();
            }
        }

    },
    //进入单机房间
    enterDJRoom:function(gameId){
        sGameData.mCurrGameType = gameId;
        var rooms = getRoomListByType(gameId)
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
    getRoomShowByGameId:function(gameId){
        for(var i = 0;i<this.mRoomShows.length;i++){
            var itemroom = this.mRoomShows[i];
            var room = itemroom.mRoom;
            if(room.gameId == gameId){
                return itemroom;
            }
        }
        return null;
    },
    //跳转到 游戏房间大厅
    gotoHallRoom:function(gametype){
        log("gotoHallRoom=="+gametype);
        sGameData.mCurrGameType = gametype
        //gotoShowViewForGameRooms(gametype)
        sGameData.mMainLayer.showHallRoom(gametype);

    },
    //跳转到 游戏房间大厅
    gotoHallRoomDJ:function(gametype){
        log("gotoHallRoomDJ=="+gametype);
        sGameData.mCurrGameType = gametype
        gotoShowViewForGameRoomsForDJ(gametype)
    }



});

MainHallGameView.create = function () {
    var sg = new MainHallGameView();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};