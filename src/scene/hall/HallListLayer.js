/**
 * Created by Administrator on 14-5-8.
 * 以列表形式显示房间桌子大厅
 */
var HallListLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mTableView:null,//表视图
    mSelectedTable : null,//选中的桌子
    mSelectedcell:null,//选中的单元
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mHallListLayer = this;
            sGameData.mCurrLayer = this;

            log("HallListLayer start");

            if(sGameData.mUILayer){
                sGameData.mUILayer.setVisible(false);
            }
            var size = cc.director.getWinSize();

            var bgimg = cc.Sprite.create("#game_bg_vip.png")
            bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
            this.addChild(bgimg);


            var size_hall_table = cc.size(size.width*0.96,370);  //925 * 82
            var point_tables = cc.p((size.width-size_hall_table.width)/2,(size.height-size_hall_table.height-40)/2);
            var point_hall_back = cc.p((size.width+size_hall_table.width)/2-20,size.height-10 - 32);
            var point_hall_playerinfo_name = cc.p(size.width*0.12,point_hall_back.y+5-12);
            var point_hall_seatch = cc.p((size.width-size_hall_table.width)/2+20,size.height-10 - 32);
            var tableY = point_tables.y-20;

            var titlesize = cc.size(size.width*0.96,64)
            var tabletitle = createFrameSprite("panel_button_frame.png",res.hall_title_bar_png,titlesize);//cc.Sprite.create("#hall_rooms_title.png");
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

            var titlesize = cc.size(size.width*0.96,64)
//            var tabletitle = createFrameSprite("panel_button_frame.png",res.desks_bottom_bar_bg_png,titlesize);//cc.Sprite.create("#hall_rooms_title.png");
//            tabletitle.setPosition(cc.p(size.width/2,tableY+size_hall_table.height));
//            tabletitle.setAnchorPoint(cc.p(0.5,0));
//            this.addChild(tabletitle,1);

            var topline1 =cc.Sprite.create("#desks_splitter.png");
            topline1.setAnchorPoint(cc.p(0.5,0));
            topline1.setScaleY(0.8);
            topline1.setPosition(cc.p(size.width/2+size.width*0.24,tableY+size_hall_table.height+29));
            this.addChild(topline1,2);
            var topline2 =cc.Sprite.create("#desks_splitter.png");
            topline2.setAnchorPoint(cc.p(0.5,0));
            topline2.setScaleY(0.8);
            topline2.setPosition(cc.p(size.width/2,tableY+size_hall_table.height+29));
            this.addChild(topline2,2);
            var topline3 =cc.Sprite.create("#desks_splitter.png");
            topline3.setAnchorPoint(cc.p(0.5,0));
            topline3.setScaleY(0.8);
            topline3.setPosition(cc.p(size.width/2-size.width*0.24,tableY+size_hall_table.height+29));
            this.addChild(topline3,2);

            var basestr = sResWord.w_basepoint_dzpk;
            if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                basestr = sResWord.w_basepoint_zjh;
            }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
                basestr = sResWord.w_basepoint_zjh;
            }
            var basepointlabel = cc.LabelTTF.create(basestr,sGameData.mFontname, 28);
            //basepointlabel.setAnchorPoint(cc.p(0,1));
            basepointlabel.setPosition(cc.p(size.width/2-size.width*0.12,tableY+size_hall_table.height+50));
            this.addChild(basepointlabel,1);

            var rnamelabel = cc.LabelTTF.create(sResWord.w_hall_name,sGameData.mFontname, 28);
            rnamelabel.setPosition(cc.p(size.width/2-size.width*0.36,tableY+size_hall_table.height+50));
            this.addChild(rnamelabel,1);

            var rcarrylabel = cc.LabelTTF.create(sResWord.w_hall_carry,sGameData.mFontname, 28);
            rcarrylabel.setPosition(cc.p(size.width/2+size.width*0.12,tableY+size_hall_table.height+50));
            this.addChild(rcarrylabel,1);

            var ronlinelabel = cc.LabelTTF.create(sResWord.w_hall_online,sGameData.mFontname, 28);
            ronlinelabel.setPosition(cc.p(size.width/2+size.width*0.36,tableY+size_hall_table.height+50));
            this.addChild(ronlinelabel,1);


            var tableframe = createHallTablebg(cc.size(size_hall_table.width,size_hall_table.height+70))
//            cc.Scale9Sprite.create();
//            tableframe.initWithSpriteFrameName("hall_tables_bg.png",cc.rect(16,15,50,50))
//            tableframe.setContentSize(cc.size(size_hall_table.width,size_hall_table.height+70));
            tableframe.setAnchorPoint(cc.p(0.5,1));
            tableframe.setPosition(cc.p(size.width/2,tableY+size_hall_table.height+85));
            this.addChild(tableframe);


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

            var searchSprite = createUIButtonSpriteLight(btnsize,"#hall_tableShow.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),0,25)
            var searchSprite1 = createUIButtonSpriteLight(btnsize,"#hall_tableShow.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),1,25)
            var searchSprite2 = createUIButtonSpriteLight(btnsize,"#hall_tableShow.png",cc.p(0.25,0.5),sResWord.w_changeshow,cc.p(0.7,0.5),0,25)
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



            // 添加tableview

            var tableView = cc.TableView.create(this, size_hall_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(point_tables);
            tableView.setDelegate(this);
            tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(tableView);
            tableView.reloadData();
            this.mTableView = tableView;


            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_hall_table.height;
            if(tableheight>tableViewHeight){
                var barsize = cc.size(4,330);
                var scroolbar = ScrollBar.create(barsize);
                scroolbar.setPosition(cc.p(size.width/2+size_hall_table.width/2-5,point_tables.y+size_hall_table.height-10));
                this.addChild(scroolbar,5,16888);
            }


            this.initGameData();

            bRet = true;
        }
        return bRet;
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var size_hall_table = cc.size(size.width*0.96,410);
        if(this.mTableView){
            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_hall_table.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mTableView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },

    //初始化游戏数据
    initGameData:function(){

        //断线重连 获取 桌子数据
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
            log(" enter friend-----"+sGameData.mUser.onFriendRoomId+"|"+sGameData.mCurrRoom.onFriendTableId)
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

        this.loadImg();
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mHallListLayer = null;
    },
    //每帧更新
    update:function(){
        if(!sGameData.mIsTestNoNet){
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
    //点击快速进入
    click_quickenter:function(){
        log("click_quickenter")
        sGameData.mEnterFromViewType = 0;
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
    //刷新房间数据
    reflushRoomData:function(){
        this.mTableView.reloadData();
    },
    //改变显示模式
    changeShowMode:function(){
        playClickSound();
        gotoShowViewForHallTable();

    },
    //进入桌子
    gotoTable:function(table){
        log("gotoTable=="+table.id+"/"+table.name);
        playClickSound();
        if(sGameData.mCurrRoom) {
            if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                //showLittleNotice(sResWord.w_softcash_notenough);
                showNeedPayNotice(0,sResWord.w_tip_needpay)
            }else {
                sGameData.mEnterFromViewType = 0;

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
        }else {
            showLittleNotice(sResWord.w_rechoose_room);
        }
    },

    //表视图 接口
    scrollViewDidScroll:function (view) {
        this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    },
    tableCellTouched:function (table, cell) {
        //log("cell touched at index: " + cell.getIdx());
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(this.mSelectedcell){
            this.mSelectedcell.unchoose();
        }
        cell.choose();
        this.mSelectedcell = cell;
        this.mSelectedTable = this.mSelectedcell.mTable;
        this.gotoTable(this.mSelectedTable);
    },
    tableCellSizeForIndex:function (table, idx) {
        var size = cc.director.getWinSize();
        return cc.size(size.width*0.96, 82);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;
        if(this.mSelectedTable){
            i = this.mSelectedTable.id;
        }
        var r = sGameData.mShowTablesList[idx];
        if (!cell) {

            var item =  null;
            item = ItemListTable.create(r,idx);

            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mTable = r;
            cell.mIndex = idx;
            cell.updateInfo();

            if(this.mSelectedTable){
                if(i != r.id){
                    cell.unchoose();
                }else{
                    cell.choose();
                }
            }
        }
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return sGameData.mShowTablesList.length;
    },
    //加载图
    loadImg:function(){
        var avatar = sGameData.mUser.avatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        //log("loadImg--"+avatar)
        loadImg_base(avatar,avatar,filepath,this,9900,80,80,loadImgOver)
    }

});

HallListLayer.create = function () {
    var sg = new HallListLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};