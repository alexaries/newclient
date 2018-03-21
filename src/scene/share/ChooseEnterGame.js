/**
 * Created by apple on 14-9-5.
 */

var ChooseEnterGame = cc.Node.extend({
    mIndex:0, //某位置
    mDatas:[],
    mRoomShows:[],
    mPageBar:null,
    mScrollView: null,
    mCurrPage: 0,
    mCanDarg:false,
    mStartPos: cc.p(0, 0),
    mHasDrag: false,
    mClickedItem:null,
    mDragRoom:false,
    init:function () {
        var bRet = false;
        if (this._super()) {



            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(750,385);
            var size_panel_inner = cc.size(700,260);
            var point_panel_close = cc.p(4,-4);//边线的高度


            var bgimg = createSysPanel(size_panel);
            bgimg.setAnchorPoint(cc.p(0.5,0.5));
            bgimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(bgimg,1);
            this.setContentSize(bgimg.getContentSize());
            var itemcsize = this.getContentSize();

            var innerimg = createSysPanel_blue(size_panel_inner);
            innerimg.setAnchorPoint(cc.p(0.5,0.5));
            innerimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(innerimg,2);

            var tipLabel = cc.LabelTTF.create(sResWord.w_choose_enter_game+":", sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2-size_panel_inner.width/2,size.height/2+itemcsize.height*0.42));
            tipLabel.setAnchorPoint(cc.p(0,0.5));
            this.addChild(tipLabel,3);



            //添加按钮 关闭
            var closeSprite = cc.Sprite.create("#g_close_btn.png");
            var closeSprite1 = cc.Sprite.create("#g_close_btn.png");
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#g_close_btn.png");
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.gotoClose,this);
            closeItem.attr({
                x:size.width/2+itemcsize.width/2-8,
                y:size.height/2+itemcsize.height/2-6,
                anchorX:1,
                anchorY:1
            });

            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 3);

//            for(var i=0;i<this.mDatas.length;i++){
//                var data = this.mDatas[i];
//                var type = data[0];
//                var rdata = data[1];
//                var item = ItemGameForEnter.create(i,type,rdata)
//                item.setPosition(cc.p(size.width/2,size.height/2+350*i));
//                this.addChild(item,5)
//            }


            this.scheduleOnce(this.initInSecondFrame,0.05);


            bRet = true;
        }
        return bRet;
    },
    initInSecondFrame:function(){
        this.initScene();
    },
    onExit:function(){
        this._super();
        //this.removeListeners();

    },
    removeListeners:function(){
        log("ceg---")
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    initScene:function(){
        var size = cc.director.getWinSize();

        var size_panel = cc.size(750,385);
        var size_panel_inner = cc.size(700,260);
        var point_panel_close = cc.p(4,-8);//边线的高度

        var roomlen = this.mDatas.length
        var vsize = cc.size(700,260)
        var tempX = (350)/2;
        var csize = cc.size(350*roomlen+tempX,260)
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
        scrollview.setPosition(cc.p(size.width/2-size_panel_inner.width/2,size.height/2-size_panel_inner.height/2));
        this.mRoomShows = [];
        for (var i = 0; i <roomlen; ++i) {
            var data = this.mDatas[i];
            var type = data[0];
            var rdata = data[1];
            var item = ItemGameForEnter.create(i,type,rdata)
            if(roomlen == 1){
                item.setPosition(cc.p(tempX*2+350*i,vsize.height/2));
            }else{
                item.setPosition(cc.p(tempX+350*i,vsize.height/2));
            }

            layer.addChild(item,5)
            this.mRoomShows.push(item);
        }
        this.addChild(scrollview,6);
        scrollview.setTag(7888)
        this.mScrollView = scrollview

        var pageBarDot = PageBarDot.create(Math.floor((roomlen+1)/2));
        this.addChild(pageBarDot,6);
        pageBarDot.setPosition(cc.p(size.width/2,(size.height-385)/2+30));
        this.mPageBar = pageBarDot;
    },
    startShow:function(){
        setClickSwallows(this);
    },
    gotoClose:function(){
        sGameData.mUserMatchDatas = [];
        this.removeListeners();
        showChooseEnterGame(false);
    },
    scrollViewDidScroll:function (view) {
        //log("aaa===")
    },
    scrollViewDidZoom:function (view) {
    },
    onTouchBegan_g:function(pos){
        log("onTouchBegan--")
        var size = cc.director.getWinSize();
        this.mHasDrag = false;
        this.mCanDarg = false;
        if(pos.x > size.width/2-375 && pos.x < size.width/2+375
            &&pos.y > size.height/2-200 && pos.y < size.height/2+200){
            this.mCanDarg = true;
            this.mStartPos = pos;
            var item = this.checkClickRoom(pos)
            if(item){
                item.choose();
                this.mDragRoom = true;
                this.mClickedItem = item
            }
        }

    },
    onTouchMoved_g:function(pos){
        if(this.mCanDarg){
            //log("onTouchMoved--")
            var  distance = pos.x - this.mStartPos.x;
            if(Math.abs(distance)>20&&!this.mHasDrag){
                this.mHasDrag = true;
            }
        }
    },
    onTouchEnded_g:function(pos){
        log("onTouchEnded--")
        if(this.mHasDrag){
            var  distance = pos.x - this.mStartPos.x;
            this.adjustScrollView(distance);
        }else{
            if (this.mDragRoom) {
                if (this.mClickedItem) {
                    this.clickItem(this.mClickedItem)
                }
            }
        }
        if (this.mClickedItem) {
            this.mClickedItem.unchoose();
        }
        this.mHasDrag = false;
        this.mCanDarg = false;
    },
    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    },
    adjustScrollView:function(offset){
        log("adjustScrollView=="+offset)
        var changepage = false;
        if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
            changepage = true;
        }
        var scrollview = this.mScrollView;
        scrollview.unscheduleAll();
        var roomlen = this.mDatas.length
        var allpage = Math.floor((roomlen+1)/2)
        if(changepage){
            var lastPage = this.mCurrPage;
            if(offset < 0){
                this.mCurrPage ++
            }else{
                this.mCurrPage --;
            }
            if(this.mCurrPage > allpage-1){
                this.mCurrPage = allpage-1;
            }
            if(this.mCurrPage < 0){
                this.mCurrPage = 0;
            }
            log("this.mCurrPage=="+this.mCurrPage)
        }
        if(this.mPageBar){
            this.mPageBar.setPage(this.mCurrPage);
        }

        var soffset = cc.p(-700*this.mCurrPage,0);
        scrollview.setContentOffsetInDuration(soffset,0.3)
    },


    checkClickRoom:function(pos){
        var item = null;
        var size = cc.director.getWinSize();
        var size_panel_inner = cc.size(700,260);
        var x = size.width/2-size_panel_inner.width/2 + this.mScrollView.getContentOffset().x
        var offsetY = size.height/2-size_panel_inner.height/2
        var pos1 = cc.p(pos.x-x,pos.y-offsetY)
        for(var i = 0;i<this.mRoomShows.length;i++){
            var itemroom = this.mRoomShows[i];
            if(itemroom.checkClick(pos1)){
                item = itemroom
                log("itemroom=="+itemroom.mIndex);
                break;
            }
        }
        return item;
    },
    clickItem:function(item){
        this.stopAllActions();
        var callback = cc.CallFunc.create(this.doEnterRoom, this,item);
        var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
        this.runAction(seq);
    },
    doEnterRoom:function(nodeExecutingAction, item){
        log("doEnterRoom=="+item)
        sGameData.mUserMatchDatas = [];
        if(item.mType == 1){
            var room = item.mRoom
            sGameData.mCurrGameType = room.gameId;
            log("room=="+room.roomName)
            sGameData.mCurrRoom = room;
            if(!sGameData.mNetSendDataAfterEnterGame) {
                if (room.gameId == GAME_TYPE_DDZ && !cc.sys.isNative) {
                    log("re enter ddz")
                    gotoGameScene(room.gameId);
                }else{
                    log("re enter game")
                    sGameData.mIsSendEnterRoomIng = true;
                    sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                }
            }else{
                sGameData.mSendDataTypeInGame = 0;
                gotoGameScene(room.gameId);
            }
        }else{
            sGameData.mCurrGameType = GAME_TYPE_DDZMATCH;
            var match = item.mMatch;
            log("match=="+match.name)
            sGameData.mCurrMatch = match
            if(!sGameData.mIsSendEnterRoomIng&&!sGameData.mIsEnterGameing){
                sGameData.mIsSendEnterRoomIng = true;
                sGameData.mGameNet.reConnect(match.ip,match.websocketPort,4);
            }
        }

    }
});
ChooseEnterGame.create = function (datas) {
    var sg = new ChooseEnterGame();
    if (sg) {
        sg.mDatas = datas
        sg.init()
        return sg;
    }
    return null;
};
