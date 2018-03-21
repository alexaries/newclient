/**
 * Created by apple on 16/1/14.
 */

var MainMatchRoomView = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mScrollView:null,
    mItemShows:[],
    mDragItem:false,
    mStartPoint:null,
    mClickedItem:null,
    mSoftCashShow:null,
    mHardCashShow:null,
    mInited:false,
    mCurrPage:0,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMainMatchRoomView = this;

            log("MainMatchRoomView start");

            this.mInited = false;

            var size = cc.director.getWinSize();
            var point_hall_info = cc.p(95,size.height*0.99)
            var point_hall_back = cc.p(size.width-95,size.height*0.99);


            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        log("MainMatchRoomView start--a1");
        this.scheduleOnce(this.initInSecondFrame,0.05);//
    },
    onExit:function(){
        this._super();
        //this.removeListeners();
        sGameData.mMainMatchRoomView = null;
    },
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    initInSecondFrame:function(){
        log("MainMatchRoomView start---initInSecondFrame");
        this.initGameScene();
        this.initGameData();
        //dealClickTouch(this);
    },
    initGameData:function(){
        if(sGameData.mUserMatchDatas.length > 0){
            var showdatas = [];
            for(var i=0;i<sGameData.mUserMatchDatas.length;i++){
                var umatch = sGameData.mUserMatchDatas[i];
                showdatas.push([2,umatch]);
            }
            showChooseEnterGame(true,showdatas);
            sGameData.mUserMatchDatas = [];
        }
    },

    click_back:function(){
        log("click_back--")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoSceneByLoading(TargetSceneMain);
    },
    click_matchresult:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        log("click_matchresult")
    },

    //初始化游戏数据
    initGameScene:function(){

        var size = cc.director.getWinSize();
        var twidth = (size.width - 960)*0.8
        var tempW = (size.width - 960)*0.2;
        var rwidth = (size.width/2);
        var rheight = 400;

        var contentsize = cc.size(rwidth*2,rheight)
        var viewsize = cc.size(size.width , 400)

        var scrollview  = cc.ScrollView.create(viewsize);
        var layer = cc.Layer.create();
        layer.setPosition(cc.p(0,0));

        this.mCurrPage = 0;

        layer.setContentSize(contentsize);
        scrollview.setPosition(cc.p(0,75));//CCPointZero
        scrollview.setContentOffset(cc.p(0,0));
        scrollview.setContentSize(contentsize);//设置内容的宽高
        scrollview.setViewSize(viewsize);//设置显示区域的宽高
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollview.setTag(7777);
        scrollview.setDelegate(this);
        this.addChild(scrollview,3);
        this.mScrollView = scrollview;
        this.mItemShows = [];

        scrollview.setContentOffset(cc.p(0,0));


        this.mInited = true;

    },
    startShowMatchRoom:function(){
        this.updateMatchs();
    },
    updateMatchs:function(){
        this.initGameData();
        if(this.mInited){
            var layer = this.mScrollView.getContainer();
            layer.removeAllChildren();

            var size = cc.director.getWinSize();
            var twidth = (size.width - 960)*0.8
            var tempW = (size.width - 960)*0.2;
            var rwidth = (size.width/2);
            var rheight = 400;//Math.floor((sGameData.mMatchShowList.length+1)/2)*200;


            var contentsize = cc.size(rwidth*Math.floor((sGameData.mMatchShowList.length+1)/2),rheight)
            this.mScrollView.setContentSize(contentsize);
            this.mScrollView.setContentOffset(cc.p(0,0));

            this.mItemShows = [];
            var list = sGameData.mMatchShowList;
            for(var i=0;i<list.length;i++){
                var itemMatch = ItemMatch.create(i,list[i]);
                layer.addChild(itemMatch);
                itemMatch.setPosition(cc.p(rwidth/2+rwidth*Math.floor(i/2),rheight-90-(i%2)*190))
                this.mItemShows.push(itemMatch);
            }


            if(this.mPageBar){
                this.removeChild(this.mPageBar);
                this.mPageBar = null;
            }

            var roomlen = Math.floor((sGameData.mMatchShowList.length+3)/4);

            var pageBarDot = PageBarDot.create(roomlen);
            this.addChild(pageBarDot,2);
            pageBarDot.setPosition(cc.p(size.width/2,100));
            this.mPageBar = pageBarDot;
            if(roomlen >1){
                this.mPageBar.setVisible(true)
            }else{
                this.mPageBar.setVisible(false)
            }
        }
    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        this.mDragItem = false;
        if(!checkButtonEnable()){
            return;
        }
        this.mDragItem = true;
        this.mStartPoint = pos;
        var item = this.checkClickMatch(pos)
        if(item){
            item.choose();
            this.mClickedItem = item
        }
    },
    onTouchMoved_g:function(pos){
    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(this.mDragItem){
            if(Math.abs(this.mStartPoint.x - pos.x) < 20){
                if(this.mClickedItem){
                    this.clickMatch(this.mClickedItem.mMatch)
                }
            }else{
                var  distance = pos.x - this.mStartPoint.x;
                this.adjustScrollView(distance);
            }
        }
        if(this.mClickedItem){
            this.mClickedItem.unchoose();
        }
        this.mClickedItem = null;
        this.mDragItem = false;
    },

    //调整滚动视图位置
    adjustScrollView:function(offset){
        log("adjustScrollView=="+offset)
        var changepage = false;
        if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
            changepage = true;
        }
        var scrollview = this.mScrollView;
        scrollview.unscheduleAll();
        var roomlen = Math.floor((sGameData.mMatchShowList.length+3)/4);
        if(changepage){
            var lastPage = this.mCurrPage;
            if(offset < 0){
                this.mCurrPage ++
            }else{
                this.mCurrPage --;
            }
            if(this.mCurrPage > roomlen-1){
                this.mCurrPage = roomlen-1;
            }
            if(this.mCurrPage < 0){
                this.mCurrPage = 0;
            }
            log("this.mCurrPage=="+this.mCurrPage)
        }

        this.mPageBar.setPage(this.mCurrPage);

        var size = cc.director.getWinSize();
        var twidth = (size.width - 960)*0.8
        var tempW = (size.width - 960)*0.2;
        var rwidth = (size.width/2);

        var soffset = cc.p(-rwidth*2*this.mCurrPage,0);
        scrollview.setContentOffsetInDuration(soffset,0.3)
    },




    checkClickMatch:function(pos){
        var item = null;
        var size = cc.director.getWinSize();
        var tempW = (size.width - 960)*0.2;
        var rwidth = size.width/2;
        var x = size.width/2-rwidth+this.mScrollView.getContentOffset().x
        var offsetY = 75
        var pos1 = cc.p(pos.x-x,pos.y-offsetY)
        for(var i = 0;i<this.mItemShows.length;i++){
            var itemshow = this.mItemShows[i];
            if(itemshow.checkClick(pos1)){
                item = itemshow

                break;
            }
        }
        return item;
    },
    clickMatch:function(match){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        log("clickMatch=="+match.name)
        this.stopAllActions();
        var callback = cc.CallFunc.create(this.doShowMatch, this,match);
        var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
        this.runAction(seq);
    },

    doShowMatch:function(tar,match){
        sGameData.mCurrMatch = match;
        this.showMatchInfo(true,match);
    },

    //显示提示
    showMatchInfo:function(state,match){
        log("showNotice---");
        var notice = (sGameData.mCurrScene.getChildByTag(88888));
        if(!notice){
            notice = MatchInfoPanel.create();
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
            sGameData.mCurrScene.addChild(notice,104,88888);
        }
        if(notice){
            if(state){
                notice.setVisible(true);
                sGameData.mIsShowTopView = true;
                notice.showMatch(match);
                this.mScrollView.setTouchEnabled(false);
            }else{
                sGameData.mIsShowTopView = false;
                notice.setVisible(false);
                this.mScrollView.setTouchEnabled(true);
            }
        }
    },
    updateMatchInfo:function(){
        var notice = (sGameData.mCurrScene.getChildByTag(88888));
        if(notice){
            notice.updateshow();
        }
    },

    updateshow:function(){
        for(var i = 0;i<this.mItemShows.length;i++) {
            var itemshow = this.mItemShows[i];
            itemshow.updateshow()
        }
        this.updateMatchInfo();
        if(sGameData.mMainLayer){
            sGameData.mMainLayer.updateCash();
        }
    }



});

MainMatchRoomView.create = function () {
    var sg = new MainMatchRoomView();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};