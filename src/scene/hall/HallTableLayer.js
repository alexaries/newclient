/**
 * Created by Administrator on 14-5-27.
 * 以桌子形式显示房间桌子大厅
 */

var HallTableLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mPageLabel:null,//页码显示
    mScrollView: null,//滚动视图
    mCurrPage: 0,//当前页
    mCanDarg:false,//能否拖动
    mStartPos: cc.p(0, 0),//点击开始坐标
    mHasDrag: false,//是否已经拖动
    mStartDargScale:false,//开始拖动放缩
    mTableShows: [],//桌子显示
    mTempTime:0,//临时时间
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mHallTableLayer = this;
            sGameData.mCurrLayer = this;
            log("HallTableLayer start");

            if(sGameData.mUILayer){
                sGameData.mUILayer.setVisible(false);
            }
            var size = cc.director.getWinSize();


            var bgimg = cc.Sprite.create("#game_bg_vip.png")
            bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
            this.addChild(bgimg);

            var size_hall_table = cc.size(size.width*0.96,410);  //925 * 82
            var point_tables = cc.p((size.width-size_hall_table.width)/2,(size.height-size_hall_table.height-40)/2);
            var point_hall_back = cc.p((size.width+size_hall_table.width)/2-20,size.height-10 - 32);
            var point_hall_playerinfo_name = cc.p(size.width*0.12,point_hall_back.y+5-12);

            var point_hall_seatch = cc.p((size.width-size_hall_table.width)/2+20,size.height-10 - 32);
            var tableY = point_tables.y;

            var titlesize = cc.size(size.width*0.96,64)
            var tabletitle = createFrameSprite("panel_button_frame.png",res.hall_title_bar_png,titlesize);
            tabletitle.setPosition(cc.p(size.width/2,size.height-10));
            tabletitle.setAnchorPoint(cc.p(0.5,1));
            this.addChild(tabletitle,0);
            var msg = sGameData.mCurrRoom.roomName;
            var tipLabel = cc.LabelTTF.create(msg,sGameData.mFontname, 32,//字体  ，字体大小
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height-10 - 30));
            this.addChild(tipLabel,1);

            var bottomline1 =cc.Sprite.create("#desks_splitter.png");
            bottomline1.setAnchorPoint(cc.p(0.5,1));
            bottomline1.setScaleY(0.95);
            bottomline1.setPosition(cc.p(size.width/2+size.width*0.24,size.height-11));
            this.addChild(bottomline1,2);
            var bottomline3 =cc.Sprite.create("#desks_splitter.png");
            bottomline3.setAnchorPoint(cc.p(0.5,1));
            bottomline3.setScaleY(0.95);
            bottomline3.setPosition(cc.p(size.width/2-size.width*0.24,size.height-11));
            this.addChild(bottomline3,2);


            var titlesize = cc.size(size.width*0.96,90)
            var roomtitle = createFrameSprite("panel_button_frame.png",res.desks_bottom_bar_bg_png,titlesize);//cc.Sprite.create("#hall_rooms_title.png");
            roomtitle.setPosition(cc.p(size.width/2,tableY+5));
            roomtitle.setAnchorPoint(cc.p(0.5,1));
            this.addChild(roomtitle,1);

            var bottomline1 =cc.Sprite.create("#desks_splitter.png");
            bottomline1.setAnchorPoint(cc.p(0.5,1));
            bottomline1.setScaleY(1.3);
            bottomline1.setPosition(cc.p(size.width/2+size.width*0.24,tableY+0));
            this.addChild(bottomline1,2);
            var bottomline3 =cc.Sprite.create("#desks_splitter.png");
            bottomline3.setAnchorPoint(cc.p(0.5,1));
            bottomline3.setScaleY(1.3);
            bottomline3.setPosition(cc.p(size.width/2-size.width*0.24,tableY+0));
            this.addChild(bottomline3,2);


            var avatarimg = cc.Sprite.create("#main_player_avatar.png");
            avatarimg.attr({
                x:size.width*0.05+20,
                y:tableY-30-8
            });
            this.addChild(avatarimg,3);
            avatarimg.setTag(9900);
            avatarimg.setScale(80/93);

            var namelabel = cc.LabelTTF.create(sGameData.mUser.nickName,sGameData.mFontname, 24);
            namelabel.setAnchorPoint(cc.p(0,0.5));
            namelabel.setPosition(cc.p(size.width*0.05+65,tableY-15));
            this.addChild(namelabel,3);
            if(namelabel.getContentSize().width > 140){
                namelabel.setScale(140/namelabel.getContentSize().width);
            }
            var scashimg = cc.Sprite.create("#softcash_1.png")
            scashimg.setAnchorPoint(cc.p(0,1));
            //scashimg.setScale(0.45);
            scashimg.setPosition(cc.p(size.width*0.05+62,tableY-30))
            this.addChild(scashimg,3);
            var softcashshow = ShowNum.create();
            softcashshow.setPosition(cc.p(size.width*0.05+100,tableY-42))
            softcashshow.setScale(0.8)
            this.addChild(softcashshow,3);
            softcashshow.setValue(2,sGameData.mUser.softCash,1,1);

            var hcashimg = cc.Sprite.create("#hardcash_1.png")
            hcashimg.setAnchorPoint(cc.p(0,1));
            //scashimg.setScale(0.45);
            hcashimg.setPosition(cc.p(size.width*0.05+62,tableY-55))
            this.addChild(hcashimg,3);

            var hardcashshow = ShowNum.create();
            hardcashshow.setPosition(cc.p(size.width*0.05+100,tableY-67))
            hardcashshow.setScale(0.8)
            this.addChild(hardcashshow,3);
            hardcashshow.setValue(2,sGameData.mUser.hardCash,1,1);


            var btnsize = cc.size(190,60)

            var backSprite = createUIButtonSpriteLight(btnsize,"#hall_btn_back.png",cc.p(0.3,0.5),sResWord.w_back,cc.p(0.6,0.5),0,30)
            var backSprite1 = createUIButtonSpriteLight(btnsize,"#hall_btn_back.png",cc.p(0.3,0.5),sResWord.w_back,cc.p(0.6,0.5),1,30)
            var backSprite2 = createUIButtonSpriteLight(btnsize,"#hall_btn_back.png",cc.p(0.3,0.5),sResWord.w_back,cc.p(0.6,0.5),0,30)
            var backItem = cc.MenuItemSprite.create(
                backSprite,
                backSprite1,
                backSprite2,
                this.click_back,this);
            backItem.setAnchorPoint(cc.p(1,0.5));
            backItem.setPosition(point_hall_back);

            var searchSprite = createUIButtonSpriteLight(btnsize,"#hall_tableList.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),0,25)
            var searchSprite1 = createUIButtonSpriteLight(btnsize,"#hall_tableList.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),1,25)
            var searchSprite2 = createUIButtonSpriteLight(btnsize,"#hall_tableList.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),0,25)
            var searchItem = cc.MenuItemSprite.create(
                searchSprite,
                searchSprite1,
                searchSprite2,
                this.changeShowMode,this);
            searchItem.setAnchorPoint(cc.p(0,0.5));
            searchItem.setPosition(point_hall_seatch);

            var btnsize1 = cc.size(190,82)
            var quickenterSprite = createUIButtonSpriteLight(btnsize1,"#playnow_icon.png",cc.p(0.5,0.7),sResWord.w_quickenter,cc.p(0.5,0.3),0,25)
            var quickenterSprite1 = createUIButtonSpriteLight(btnsize1,"#playnow_icon.png",cc.p(0.5,0.7),sResWord.w_quickenter,cc.p(0.5,0.3),1,25)
            var quickenterSprite2 = createUIButtonSpriteLight(btnsize1,"#playnow_icon.png",cc.p(0.5,0.7),sResWord.w_quickenter,cc.p(0.5,0.3),0,25)
            var quickenterItem = cc.MenuItemSprite.create(
                quickenterSprite,
                quickenterSprite1,
                quickenterSprite2,
                this.click_quickenter,this);
            quickenterItem.setAnchorPoint(cc.p(1,0.5));
            quickenterItem.setPosition(cc.p((size.width+size_hall_table.width)/2-20,tableY-42));
            if(sGameData.mCurrRoom.gameId != GAME_TYPE_DN&&sGameData.mCurrRoom.gameId != GAME_TYPE_ZJH) {
                //quickenterItem.setVisible(false)
            }


            var menu = cc.Menu.create(backItem,searchItem,quickenterItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 5);

            this.initGameData();

            this.scheduleOnce(this.initInSecondFrame,0.05);

            bRet = true;
        }
        return bRet;
    },
    //第2帧初始化
    initInSecondFrame:function(){
        dealClickTouch(this);
        showUILoadWait(true,0);

        this.initScene();
        showUILoadWait(false);
        this.loadImg();
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mHallTableLayer = null;
    },
    //每帧更新
    update:function(){
        if(!sGameData.mIsTestNoNet) {
            var now = (new Date()).getTime();
            var lastroom = sGameData.mCurrRoom
            if(lastroom!=null) {
                if (now - sGameData.mLastGetRoomDataTime > 20 * 1000) {
                    sGameData.mLastGetRoomDataTime = now;
                    if (sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH) {
                        sGameNetData.mZJHNet.sendZJHRefreshRoom();
                    } else if (sGameData.mCurrRoom.gameId == GAME_TYPE_DN) {
                        sGameNetData.mDNNet.sendDNRefreshRoom();
                    }
                }
            }
        }
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //初始化游戏数据
    initGameData:function(){
        log("initGameData---")
        //断线重连 获取 桌子数据 (进入桌子指令 不用发， 系统自动进 )
        if(sGameData.mUser.onLineRoomId > 0 && sGameData.mUser.onLineTableId > 0){
            log("re enter-----"+sGameData.mUser.onLineRoomId+"|"+sGameData.mCurrRoom.roomId)
            var room = sGameData.mCurrRoom;
            if(room.roomId == sGameData.mUser.onLineRoomId){
                var table = getDataById(sGameData.mShowTablesList,sGameData.mUser.onLineTableId);
                if(table){
                    sGameData.mCurrTable =  table
                }
            }
        }
        sGameData.mUser.onLineRoomId = -1;
        sGameData.mUser.onLineTableId = -1;


        if( sGameData.mUser.onFriendRoomId > 0 && sGameData.mUser.onFriendTableId > -1){
            log("enter friend-----"+sGameData.mUser.onFriendRoomId+"|"+sGameData.mCurrRoom.onFriendTableId)
            var room = sGameData.mCurrRoom;
            if(room.roomId == sGameData.mUser.onFriendRoomId&&room.gameId != GAME_TYPE_DDZ){
                var table = getDataById(sGameData.mShowTablesList,sGameData.mUser.onFriendTableId);
                if(table){
                    sGameData.mCurrTable =  table
                    this.gotoTable(table);
                }
            }
        }
        sGameData.mUser.onFriendRoomId = -1;
        sGameData.mUser.onFriendTableId = -1;




    },
    //加载图
    loadImg:function(){
        var avatar = sGameData.mUser.avatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        //log("loadImg--"+avatar)
        loadImg_base(avatar,avatar,filepath,this,9900,80,80,loadImgOver)
    },
    //初始化场景显示
    initScene:function(){
        var size = cc.director.getWinSize();
        var size_hall_table = cc.size(size.width*0.96,410);  //925 * 82
        var point_tables = cc.p((size.width-size_hall_table.width)/2,(size.height-size_hall_table.height-40)/2);
        var tableY = point_tables.y;
        var tabletype = TABLE_TYPE_5;
        var showvip = 1;
        log("initScene gameId=="+sGameData.mCurrRoom.gameId)
        if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
            tabletype = TABLE_TYPE_5;
            showvip = 1;
        }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
            tabletype = TABLE_TYPE_5;
            showvip = 1;
        }

        var len = sGameData.mShowTablesList.length;
        var pageLabel = cc.LabelTTF.create("1/"+len,sGameData.mFontname, 24,//字体  ，字体大小
            cc.size(500,40),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
        pageLabel.setPosition(cc.p(size.width/2+178,size.height-10-30));
        this.addChild(pageLabel,5);
        pageLabel.setTag(8055)
        this.mPageLabel = pageLabel;


        var tablelen = sGameData.mShowTablesList.length
        var vsize = cc.size(size.width,410)
        var tempX = (size.width-700)/2;
        var csize = cc.size(600*tablelen+tempX,410)
        var scrollview = cc.ScrollView.create(vsize);
        var layer = cc.Layer.create();
        layer.setContentSize(csize);
        scrollview.setContentSize(csize);
        scrollview.setViewSize(vsize);
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollview.setDelegate(this);
        scrollview.setPosition(cc.p(0,(size.height-450)/2+15));
        this.mTableShows = [];
        for (var i = 0; i <tablelen; ++i) {
            var atable = sGameData.mShowTablesList[i];
            var itemTable = ItemHTable.create(atable,tabletype,showvip);
            itemTable.setPosition(cc.p(600*i+350+tempX,215-40));
            itemTable.setAnchorPoint(cc.p(0.5,0.5))
            layer.addChild(itemTable);
            if(i !=0){
                itemTable.setScale(0.7);
            }
            if(i==0){
                itemTable.showHead(1);
            }
            this.mTableShows.push(itemTable);
        }
        this.addChild(scrollview);
        scrollview.setTag(7888)
        this.mScrollView = scrollview
    },
    //重新设置桌子显示   0进入  1刷新
    resetTables:function(type){

        if(type == 0){
            this.mCurrPage = 0;
        }
        var pageLabel = this.getChildByTag(8055);
        if(pageLabel){
            var len = sGameData.mShowTablesList.length;
            pageLabel.setString((this.mCurrPage+1)+"/"+len);
        }

        var tabletype = TABLE_TYPE_5;
        var showvip = 0;
        log("initScene gameId=="+sGameData.mCurrRoom.gameId)
        if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
            tabletype = TABLE_TYPE_5;
            showvip = 1;
        }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
            tabletype = TABLE_TYPE_5;
            showvip = 1;
        }
        var tablelen = sGameData.mShowTablesList.length
        var size = cc.director.getWinSize();
        var size_hall_table = cc.size(size.width*0.96,410);  //925 * 82
        var point_tables = cc.p((size.width-size_hall_table.width)/2,(size.height-size_hall_table.height-40)/2);
        var tableY = point_tables.y;
        var vsize = cc.size(size.width,450)
        var tempX = (size.width-700)/2;
        var csize = cc.size(600*tablelen+tempX,450)

        var scrollview = this.getChildByTag(7888);
        if(scrollview){
            if(type == 0) {
                scrollview.setContentOffset(cc.p(0, 0));
            }
            var layer = scrollview.getContainer();
            //layer.removeAllChildren();

            for (var i = 0; i <tablelen; i++) {
                var atable = sGameData.mShowTablesList[i];
                var itemTable = null;
                if(i<this.mTableShows.length){
                    itemTable = this.mTableShows[i];
                    itemTable.updateInfo(atable);
                }else{
                    itemTable = ItemHTable.create(atable,tabletype,showvip);
                    this.mTableShows.push(itemTable);
                    layer.addChild(itemTable);
                }
                itemTable.setPosition(cc.p(600*i+350+tempX,215-40));
                itemTable.setAnchorPoint(cc.p(0.5,0.5))
                if(i != this.mCurrPage){
                    itemTable.setScale(0.7);
                }else{
                    itemTable.setScale(1);
                }
                if(i== this.mCurrPage){
                    if(type == 1){
                        itemTable.showHead(3);
                    }else{
                        itemTable.showHead(1);
                    }
                }
            }

            if(this.mTableShows.length>tablelen){
                //log("showlen = "+this.mTableShows.length+"|"+tablelen)
                for(var i = tablelen; i <this.mTableShows.length; i++){
                    var itemTable = this.mTableShows[i];
                    layer.removeChild(itemTable);
                }
                this.mTableShows.splice(tablelen,(this.mTableShows.length-tablelen));
                //log("showlen1 = "+this.mTableShows.length+"|"+tablelen)
            }
        }
    },
    //点击快速进入
    click_quickenter:function(){
        log("click_quickenter")
        sGameData.mEnterFromViewType = 1;
        if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
            //showLittleNotice(sResWord.w_softcash_notenough);
            showNeedPayNotice(0,sResWord.w_tip_needpay)
        }else {
            if (!sGameData.mIsSendingData) {
                if (!sGameData.mNetSendDataAfterEnterGame) {
                    if (sGameData.mCurrRoom.gameId == GAME_TYPE_DN) {
                        sGameNetData.mDNNet.sendDNRandomEnterTable(-1)
                        sGameData.mIsSendingData = true;
                    } else if (sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH) {
                        sGameNetData.mZJHNet.sendZJHRandomEnterTable(-1)
                        sGameData.mIsSendingData = true;
                    }
                } else {
                    sGameData.mSendDataTypeInGame = 2;
                    gotoGameScene(sGameData.mCurrRoom.gameId);
                }

            }
        }
    },
    //点击返回
    click_back:function(){
        log("click_back--")
        playClickSound();
        if(sGameData.mIsTestNoNet){
            gotoShowViewForMain();
        }else{
            sGameData.mIsHallChangeRoom = false;
            var lastroom = sGameData.mCurrRoom
            if(lastroom!=null){
                if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                    sGameNetData.mZJHNet.sendZJHExitRoom();
                }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
                    sGameNetData.mDNNet.sendDNExitRoom();
                }
            }else{
                gotoShowViewForMain();
            }
        }
    },
    //属性房间数据 type 0进入  1刷新
    reflushRoomData:function(type){
        if(type == null){
            type = 0;
        }
        this.resetTables(type);
    },
    //改变显示模式
    changeShowMode:function(){
        playClickSound();
        gotoShowViewForHallList();
    },
    //进入桌子
    gotoTable:function(table){
        log("gotoTable=="+table.id+"/"+table.name);
        playClickSound();
        if(sGameData.mCurrRoom){
            if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                //showLittleNotice(sResWord.w_softcash_notenough);
                showNeedPayNotice(0,sResWord.w_tip_needpay)
            }else {
                sGameData.mEnterFromViewType = 1;
                if (sGameData.mIsTestNoNet) {
                    sGameData.mCurrTable = table;
                    gotoGameScene(sGameData.mCurrRoom.gameId);
                } else {
                    if (!sGameData.mIsSendingData) {
                        var tableIdx = table.id;
                        //mEnterTableType = ROOM_SYS;
                        sGameData.mCurrTable = table
                        if (!sGameData.mNetSendDataAfterEnterGame) {
                            if (sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH) {
                                sGameNetData.mZJHNet.sendZJHEnterTable(tableIdx);
                            } else if (sGameData.mCurrRoom.gameId == GAME_TYPE_DN) {
                                sGameNetData.mDNNet.sendDNEnterTable(tableIdx);
                            }
                        } else {
                            sGameData.mSendDataTypeInGame = 1;
                            gotoGameScene(sGameData.mCurrRoom.gameId);
                        }
                        sGameData.mIsSendingData = true;
                    }
                }
            }
        }else{
            showLittleNotice(sResWord.w_rechoose_room);
        }
    },
    //点击进入桌子
    op_entertable:function(){
        var table = sGameData.mShowTablesList[this.mCurrPage];
        this.gotoTable(table);
    },
    //接口
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
        if(pos.y > size.height/2-25-185 && pos.y < size.height/2-25+225){
            this.mCanDarg = true;
            this.mStartPos = pos;
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){
        //log("onTouchMoved--")
        if(!checkButtonEnable()){
            return;
        }
        if(this.mCanDarg){
            var  distance = pos.x - this.mStartPos.x;
            if(Math.abs(distance)>5&&!this.mHasDrag){
                this.mHasDrag = true;
                this.mStartDargScale = false;
            }
            if(this.mHasDrag&&!this.mStartDargScale){//移动了 把当前桌子缩小
                //log("move--1")
                this.mStartDargScale = true
                var currTable = this.mTableShows[this.mCurrPage]
                var scaleanim1 = cc.ScaleTo.create(0.2,0.7);
                currTable.stopAllActions();
                currTable.runAction(scaleanim1)
                currTable.showHead(2);
            }
        }
    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(this.mHasDrag){
            var  distance = pos.x - this.mStartPos.x;
            this.adjustScrollView(distance);
        }else{
            var size = cc.director.getWinSize();
            if(pos.y > size.height/2-25-185 && pos.y < size.height/2-25+225
                &&pos.x > size.width/2-350&&pos.x <size.width/2+350){
                log("is clicked----")
                var now = (new Date()).getTime();
                if(now - this.mTempTime < 1200){
                    log("is double clicked")
                    this.op_entertable();
                }
                this.mTempTime = now;
            }
        }
        this.mHasDrag = false;
        this.mCanDarg = false;
    },
    onTouchCancelled:function(pos){
        log("onTouchCancelled--")
    },
    //调整滚动视图
    adjustScrollView:function(offset){
        log("adjustScrollView")
        var changepage = false;
        if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
            changepage = true;
        }
        var scrollview = this.mScrollView;
        scrollview.unscheduleAll();
        var tablelen = sGameData.mShowTablesList.length
        if(changepage){
            var lastPage = this.mCurrPage;
            if(offset < 0){
                this.mCurrPage ++
            }else{
                this.mCurrPage --;
            }
            if(this.mCurrPage > tablelen-1){
                this.mCurrPage = tablelen-1;
            }
            if(this.mCurrPage < 0){
                this.mCurrPage = 0;
            }
            log("this.mCurrPage=="+this.mCurrPage)
        }
        var currTable = this.mTableShows[this.mCurrPage] // 把当前桌子放大成本来大小
        var scaleanim1 = cc.ScaleTo.create(0.3,1);
        currTable.stopAllActions();
        currTable.runAction(scaleanim1)
        currTable.showHead(1);

        this.mPageLabel.setString((this.mCurrPage+1)+"/"+tablelen);

        var soffset = cc.p(-600*this.mCurrPage,0);
        scrollview.setContentOffsetInDuration(soffset,0.3)
    }





});

HallTableLayer.create = function () {
    var sg = new HallTableLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};