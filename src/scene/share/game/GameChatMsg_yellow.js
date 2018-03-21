/**
 * Created by apple on 15-12-8.
 */
//聊天面板 （5句）
var GameChatMsg_yellow = cc.Node.extend({
    mTalks:[],//聊天语句
    mTableView:null,//表显示
    mSelectedcell:null,//选中项
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sex = sGameData.mUser.sex;
            if(this.mGameType == 1) {
                this.mTalks = sGameData.mDZPKLayer.mDZPKLogic.mTalkMsg[sex];
            }else if(this.mGameType == 2) {
                this.mTalks = sGameData.mZJHLayer.mZJHLogic.mTalkMsg[sex];
            }else if(this.mGameType == 3) {
                this.mTalks = sGameData.mDNLayer.mDNLogic.mTalkMsg[sex];
            }else if(this.mGameType == 4) {
                this.mTalks = sGameData.mDDZLayer.mTalkMsg[sex];
            }else if(this.mGameType == 5) {
                this.mTalks = sGameData.mMJLayer.mMJLogic.mTalkMsg[sex];
            }else if(this.mGameType == 6) {
                this.mTalks = sGameData.mGYMJLayer.mMJLogic.mTalkMsg[sex];
            }

            var winsize = cc.director.getWinSize();

            var size_notice = cc.size(710,410);//500,280
            var  bgimg = createSysPanel_chatyellow(size_notice);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            log("talks len="+this.mTalks.length);




            //添加按钮 tab1

            var tab02sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor_yellow.png","#w_c_face2_yellow.png",cc.p(0.55,0.5),0);
            var tab02sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_face1_yellow.png",cc.p(0.55,0.5),0);
            var tab02sprite2 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_face1_yellow.png",cc.p(0.55,0.5),0);
            var tab02Item = cc.MenuItemSprite.create(
                tab02sprite,
                tab02sprite1,
                tab02sprite2,
                this.clickTab2,this);
            tab02Item.setAnchorPoint(cc.p(1,0));
            tab02Item.setPosition(cc.p(-size_notice.width*0.5+1,65));
            tab02Item.setScale(0.6);
            this.mTab2Item = tab02Item


            var tab01sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor_yellow.png","#w_c_cy2_yellow.png",cc.p(0.55,0.5),0);
            var tab01sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_cy1_yellow.png",cc.p(0.55,0.5),0);
            var tab01sprite2 =  ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_cy1_yellow.png",cc.p(0.55,0.5),0);
            var tab01Item = cc.MenuItemSprite.create(
                tab01sprite,
                tab01sprite1,
                tab01sprite2,
                this.clickTab1,this);
            tab01Item.setAnchorPoint(cc.p(1,0.5));
            tab01Item.setPosition(cc.p(-size_notice.width*0.5+2,0));
            tab01Item.setScale(0.6);
            tab01Item.setEnabled(false);
            this.mTab1Item = tab01Item

            var tab03sprite = ButtoSpritenWithSpriteInner("#ui_panel_tabl_nor_yellow.png","#w_c_chat2_yellow.png",cc.p(0.55,0.5),0);
            var tab03sprite1 = ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_chat1_yellow.png",cc.p(0.55,0.5),0);
            var tab03sprite2 =  ButtoSpritenWithSpriteInner("#ui_panel_tabl_sel_yellow.png","#w_c_chat1_yellow.png",cc.p(0.55,0.5),0);
            var tab03Item = cc.MenuItemSprite.create(
                tab03sprite,
                tab03sprite1,
                tab03sprite2,
                this.clickTab3,this);
            tab03Item.setAnchorPoint(cc.p(1,1));
            tab03Item.setPosition(cc.p(-size_notice.width*0.5+1,-65));
            tab03Item.setScale(0.6);
            this.mTab3Item = tab03Item
            if(!sGameData.mAppCanChat){
                tab03Item.setVisible(false);
            }


            var menu = cc.Menu.create(tab01Item,tab02Item,tab03Item);//tab2Item
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            var size_table = cc.size(700,400);
            var point_tables = cc.p(-350,-200);
            var tableView = cc.TableView.create(this, size_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(point_tables);
            tableView.setDelegate(this);
            tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(tableView);
            tableView.reloadData();
            this.mTableView = tableView

            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_table.height;
            if(tableheight>tableViewHeight){
                var barsize = cc.size(4,390);
                var scroolbar = ScrollBar.create(barsize);
                scroolbar.setPosition(cc.p(size_table.width/2-5,195));
                this.addChild(scroolbar,5,16888);
            }



            //xxx
            bRet = true;
        }
        return bRet;
    },

    clickTab1:function(){
        log("clickTab1")
        if(this.mGameType>0) {
            sGameData.mCurrLayer.buttonClicked();
        }
    },
    //切换到表情
    clickTab2:function(){
        log("clickTab2")
        playClickSound();
        if(this.mGameType>0){
            sGameData.mCurrLayer.op_showGameChatFace();
        }
    },
    clickTab3:function(){
        log("clickTab3")
        playClickSound();
        sGameData.mCurrLayer.op_showGameChatInput();
    },


    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 150;
        var size_table = cc.size(700,400);
        if(this.mTableView){
            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = size_table.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mTableView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },
    //选择聊天
    choostTalk:function(index,msg){
        //log("choostTalk="+index)
        if(this.visible){ //不显示 也可以点到
            log("choostTalk="+index+"|"+msg)
            if(this.mGameType>0) {
                sGameData.mCurrLayer.startShowPlayerTalk(index);
            }
        }
    },
    //滚动视图 接口
    scrollViewDidScroll:function (view) {
        this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    },
    tableCellTouched:function (table, cell) {
        //log("cell touched at index: " + cell.getIdx());
        if(this.mSelectedcell){
            this.mSelectedcell.unchoose();
        }
        cell.choose();
        this.mSelectedcell = cell;
        var msg = cell.mMsg;
        this.choostTalk(cell.getIdx(),msg);
    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(700, 65);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;
        var r = this.mTalks[idx];
        if (!cell) {
            var item =  ItemTalk.create(r,idx);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mMsg = r;
            cell.mIndex = idx;
            cell.updateInfo();
            cell.unchoose();
        }
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.mTalks.length;
    }
});
GameChatMsg_yellow.create = function (gametype) {
    var sg = new GameChatMsg_yellow();
    if (sg) {
        sg.mGameType = gametype;
        sg.init()
        return sg;
    }
    return null;
};
