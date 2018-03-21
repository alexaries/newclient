/**
 * Created by apple on 15-4-1.
 */

var WorldChatPanel = cc.Node.extend({
    mIndex:0, //某位置
    mEditbox_msg:null,
    mSelectedcell:null,
    mTableView:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            sGameData.mWorldChatPanel = this;

//            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
//            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
//            this.addChild(colorlayer);

            var tempW = (winsize.width - 960)*0.3;
            var rwidth = 360+tempW;

            var size_panel = cc.size(rwidth*2-20,440);
            var size_panel_inner = cc.size(size_panel.width-4, 310);
            var point_panel_close = cc.p(4,-4);//边线的高度


            var  bgimg = createSysPanel(size_panel);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(0,-10));
            this.addChild(innerimg);


            // top
            var size_nick_area = cc.size(size_panel_inner.width-132, 55);
            var s9sprite = createInputNew(size_nick_area)

            var aEditBox_search = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_search = new cc.EditBox(size_nick_area,s9sprite);
            }else{
                aEditBox_search = cc.EditBox.create(size_nick_area,s9sprite);
            }
            aEditBox_search.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_search.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_search.setPlaceHolder(sResWord.w_tip_input_syschat);
            aEditBox_search.setPlaceholderFont(sGameData.mFontname,24);
            aEditBox_search.setAnchorPoint(cc.p(0,0));
            aEditBox_search.setPosition(cc.p(-size_panel_inner.width/2+5,size.height/2-68));
            aEditBox_search.setTag(7558);
            aEditBox_search.setMaxLength(28);
            aEditBox_search.setString("");
            aEditBox_search.setFontColor(cc.color(60,60,60));
            aEditBox_search.setFontSize(24);
            this.addChild(aEditBox_search,6);
            this.mEditbox_msg = aEditBox_search;



            var chatSprite = ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,0)
            var chatSprite1 = ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,1)
            var chatSprite2 = ButtonSpriteWithWordInner("#g_btn_blue.png",sResWord.w_send,cc.p(0.5,0.5),24,0)
            var chatItem = cc.MenuItemSprite.create(
                chatSprite,
                chatSprite1,
                chatSprite2,
                this.clickSendChat,this);
            chatItem.attr({
                x:size_panel_inner.width/2-10,
                y:size.height/2-68+25,
                anchorX:1,
                anchorY:0.5
            });

            var menu = cc.Menu.create(chatItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            sGameData.mShowMsgList = sGameData.mScrollMsgs;//
            sGameData.mShowMsgList.sort(sortByIDDesc);

            // 添加tableview
            var size_table = cc.size(size_panel_inner.width,size_panel_inner.height);
            var tableView = cc.TableView.create(this, size_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(cc.p(-size_panel_inner.width/2,-size_panel_inner.height/2-10));
            tableView.setDelegate(this);
            tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(tableView,4);
            tableView.reloadData();
            this.mTableView = tableView;


            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_table.height;

            var barsize = cc.size(4,280);
            var scroolbar = ScrollBar.create(barsize);
            scroolbar.setPosition(cc.p(size_panel_inner.width/2+5,size_panel_inner.height/2-7-15));
            this.addChild(scroolbar,5,16888);
            //scroolbar.setVisible(false);


            var tiplabel = cc.LabelTTF.create(sResWord.w_tip_syschat, sGameData.mFontname, 24);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,0.5));
            tiplabel.setPosition(cc.p(0,-size_panel.height/2+30));
            //tiplabel.setColor(cc.color(72,72,72))
            tiplabel.setTag(8002);
            this.addChild(tiplabel,2);

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mWorldChatPanel = null;
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var tempW = (size.width - 960)*0.3;
        var rwidth = 360+tempW;
        var size_panel = cc.size(rwidth*2-20,440);
        var size_panel_inner = cc.size(size_panel.width-45, 310);
        if(this.mTableView){
            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_panel_inner.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//
            value = (this.mTableView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },
    clickSendChat:function(){
        log("clickSendChat---")
        var value = this.mEditbox_msg.getString();
        if(value&&value.length > 0){
            this.mEditbox_msg.setString("");
            sGameData.mGameNet.sendWorldMsg(value)

            if(sGameData.mIsTestNoNet){
                var aMsg = {};
                aMsg.id = sGameData.mScrollMsgId;
                aMsg.msg = value;
                aMsg.time = (new Date()).getTime()
                sGameData.mScrollMsgId++;
                sGameData.mScrollMsgs.push(aMsg);
                this.updateChats();
            }
        }
    },
    /**
     * 显示通知
     */
    showChats:function(){
        this.updateChats();
        //setClickSwallows(this);
    },
    updateChats:function(){
        sGameData.mShowMsgList = sGameData.mScrollMsgs;//
        sGameData.mShowMsgList.sort(sortByIDDesc);
        this.mTableView.reloadData();

        var tableheight = this.mTableView.getContentSize().height;
        var tableViewHeight = 310;
        var tableslider = this.getChildByTag(16888);
        if(tableslider) {
            if (tableheight > tableViewHeight) {
                tableslider.setVisible(true)
                this.checkTableScrollBar();
            } else {
                tableslider.setVisible(false)
            }
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

    },
    tableCellSizeForIndex:function (table, idx) {
        var winsize = cc.director.getWinSize();
        var tempW = (winsize.width - 960)*0.3;
        var rwidth = 360+tempW;
        var size_panel = cc.size(rwidth*2-20,440);
        return cc.size(size_panel.width-45, 61);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();

        var r = sGameData.mShowMsgList[idx];
        if (!cell) {
            var item = ItemWorldChat.create(r,idx);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mMsg = r;
            cell.mIndex = idx;
            cell.updateInfo();
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return sGameData.mShowMsgList.length;
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        this.hiddenUIWithClick(pos)
    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },

    //点击时隐藏界面
    hiddenUIWithClick:function(pos){
        //log("hiddenUIWithClick=="+pos.x+"|"+pos.y)
        //log("this.x=="+this.x+"|"+this.y)
        //log("this.x=="+this.width+"|"+this.width)
        var tar = this;
        var winsize = cc.director.getWinSize();
        var tempW = (winsize.width - 960)*0.3;
        var rwidth = 360+tempW;

        var size_panel = cc.size(rwidth*2-20-tempW,440);

        if(tar&&tar.visible){
            if(pos.x <tar.x+tar.width/2 && pos.x >tar.x-tar.width/2
                &&pos.y<tar.y+tar.height/2&&pos.y>tar.y-tar.height/2){

            }else{
                tar.clickOK();

            }
        }

    },

    //确定
    clickOK:function(){
        log("clickOK--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        sGameData.mIsShowWorldChatPaneling = false;
    }
});
WorldChatPanel.create = function () {
    var sg = new WorldChatPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
