/**
 * Created by Administrator on 14-5-30.
 * 消息显示
 */
var MsgLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mSelectedcell:null,//选中的单元
    mSelectedMsg:null,//选中的消息
    mTableView:null,//表视图
    mOffsetY:1,//表视图的偏移 （刷新数据时，保持原来位置）
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMsgLayer = this;
            sGameData.mCurrLayer = this;

            log("MsgLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 110;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.94,size_panel.height*0.98);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(220,49);
            //var size_tab_size1 = cc.size(300,45);

            this.mTitle = sResWord.w_msg;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-20-20,size.height-92-46);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_msg.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            sGameData.mShowMsgList = sGameData.mMsgList;//
            sGameData.mShowMsgList.sort(sortByIDDesc);

            // 添加tableview
            var size_table = cc.size(size_panel_inner.width,size_panel_inner.height);
            var tableView = cc.TableView.create(this, size_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(cc.p(size.width/2-size_panel_inner.width/2,size.height-97 -17-16-size_panel_inner.height+15));
            tableView.setDelegate(this);
            tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(tableView,4);
            tableView.reloadData();
            this.mTableView = tableView;


            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_table.height;
            if(tableheight>tableViewHeight){
                var barsize = cc.size(4,388);
                var scroolbar = ScrollBar.create(barsize);
                scroolbar.setPosition(cc.p(size.width/2+size_panel_inner.width/2+5,size.height- paneltopPosY-csize.height*0.035-2-42));
                this.addChild(scroolbar,5,16888);
            }

            var tiplabel = cc.LabelTTF.create(sResWord.w_no_list, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,1));
            tiplabel.setPosition(cc.p(size.width/2,size.height- paneltopPosY-csize.height*0.035-70-50));
            tiplabel.setTag(8002);
            this.addChild(tiplabel,10);
            if(sGameData.mShowMsgList.length > 0){
                tiplabel.setVisible(false);
            }


            var helpsprite = cc.Sprite.create("#btn_kefu.png")
            var helpsprite1 = cc.Sprite.create("#btn_kefu.png")
            helpsprite1.setColor(cc.color(200,200,200));
            var helpsprite2 = cc.Sprite.create("#btn_kefu.png")
            var helpItem = cc.MenuItemSprite.create(
                helpsprite,
                helpsprite1,
                helpsprite2,
                this.clickHelp,this);
            helpItem.setAnchorPoint(cc.p(0.5,0.5));
            helpItem.setPosition(cc.p(size.width-120,size.height- 45));

            var menu = cc.Menu.create(helpItem);

            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 10);



            bRet = true;
        }
        return bRet;
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 150;
        var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
        var size_panel_inner = cc.size(size.width*0.85,size_panel.height*0.85);
        if(this.mTableView){
            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_panel_inner.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mTableView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },
    //关闭
    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }
    },
    //表视图接口
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
        this.mSelectedMsg = this.mSelectedcell.mMsg;
        this.showMsgInfo(true);
        this.mOffsetY = this.mTableView.getContentOffset().y;
        log("mOffsetY=="+this.mOffsetY);
        if(this.mSelectedMsg.readTime==null||this.mSelectedMsg.readTime==0){
            sGameData.mGameNet.sendMsgRead(this.mSelectedMsg.id);
            sGameData.mUserMsgCount--;
            if(sGameData.mUILayer){
                sGameData.mUILayer.showMsgNum();
            }
        }
    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(580, 125);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;
        if(this.mSelectedMsg){
            i = this.mSelectedMsg.id;
        }
        var r = sGameData.mShowMsgList[idx];
        if (!cell) {
            var item = ItemMsg.create(r,idx);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mMsg = r;
            cell.mIndex = idx;
            cell.updateInfo();
            if(this.mSelectedMsg){
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
        return sGameData.mShowMsgList.length;
    },
    //消息更新状态（已读）
    updataState:function(){
        this.mTableView.reloadData();
        if(this.mOffsetY != 1){ //位置设置成之前的
            this.mTableView.setContentOffset(cc.p(0,this.mOffsetY),false);
        }
    },
    //显示消息详情
    showMsgInfo:function(state){
        var setl = this.getChildByTag(5555);
        if(!setl){
            setl = MsgInfoPanel.create();
            if(setl){
                this.addChild(setl,50,5555);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.setValue(this.mSelectedMsg)
                this.mTableView.setTouchEnabled(false)
            }else{
                this.mTableView.setTouchEnabled(true)
            }
        }
    },
    clickHelp:function(){
        this.clickShowHelp(true);
        //if (cc.sys.os == cc.sys.OS_IOS){
        //    showWebviewFullScreen(2);
        //}else{
        //    showWebKefu_android();
        //}
        
    },
    clickShowHelp:function(state){
        var setl = this.getChildByTag(5666);
        if(!setl){
            setl = HelpPanel.create();
            if(setl){
                this.addChild(setl,50,5666);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.setValue()
                this.mTableView.setTouchEnabled(false)
            }else{
                this.mTableView.setTouchEnabled(true)
            }
        }
    }


});

MsgLayer.create = function () {
    var sg = new MsgLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};