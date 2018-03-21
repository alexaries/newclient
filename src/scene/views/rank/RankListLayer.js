/**
 * Created by apple on 14-12-23.
 */
var RankListLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mTitleBar:null,
    mMyRankTip:null,
    mTabTitle:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mRankListLayer = this;
            sGameData.mCurrLayer = this;

            log("RankListLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85+57);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(220,49);
            var size_tab_size1 = cc.size(220,45);


            this.mTitle = sResWord.w_ranklist;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-20-20,size.height-92-153);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            var csize = cc.size(size.width-20,size.height-92-20);


            var titleSprite = cc.Sprite.create("#w_title_rank.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            var panelnode = cc.Node.create();
            this.addChild(panelnode,5);
            panelnode.setPosition(cc.p(size.width/2,size.height/2-50));
            this.mPanelNode = panelnode;

            //840,440
            var panelsize = cc.size(800,417);
            var panelbg = createSysPanel_black(panelsize);
            this.mPanelNode.addChild(panelbg);
            //panelbg.setPosition(cc.p(size.width/2,size.height/2-50));

            var leftbg = cc.Sprite.create("#panel_cash_bg.png");
            this.mPanelNode.addChild(leftbg,1);
            leftbg.setPosition(cc.p(-240,0));



            //var bgsize1 = this.mPanelInnerSize;
            //var bgSprite1 = createSysPanel_t3(bgsize1);
            //bgSprite1.setPosition(cc.p(size.width * 0.5, size.height-97 -70));
            //bgSprite1.setAnchorPoint(cc.p(0.5,1));
            //this.addChild(bgSprite1,1);


            //var tabtitle = ButtonSpriteWithWordInner("#panel_tab.png", sResWord.w_rank_gold, cc.p(0.5, 0.6), 32, 0);
            //tabtitle.setPosition(cc.p(size.width - 120-220, size.height));
            //tabtitle.setAnchorPoint(cc.p(0.5, 1));
            //this.addChild(tabtitle, 15);
            //tabtitle.setVisible(false);
            //this.mTabTitle = tabtitle;

            ////添加按钮 tab1
            //var tabsize = cc.size(220,90);
            //var tabsprite = createTabSprite_newui(tabsize, sResWord.w_rank_gold, cc.p(0.5,0.5),32,0);
            //var tabsprite1 = createTabSprite_newui(tabsize, sResWord.w_rank_gold, cc.p(0.5,0.5),32,1);
            //var tabsprite2 = createTabSprite_newui(tabsize, sResWord.w_rank_gold, cc.p(0.5,0.5),32,0);
            //var tabItem = cc.MenuItemSprite.create(
            //    tabsprite,
            //    tabsprite1,
            //    tabsprite2,
            //    this.clickTab1,this);
            //tabItem.setAnchorPoint(cc.p(0.5,1));
            //tabItem.setPosition(cc.p(size.width-120-220,size.height));
            //this.mTab1Item = tabItem
            //
            ////添加按钮 tab1
            //var tab2sprite = createTabSprite_newui(tabsize, sResWord.w_rank_lv, cc.p(0.5,0.5),32,0);
            //var tab2sprite1 = createTabSprite_newui(tabsize, sResWord.w_rank_lv, cc.p(0.5,0.5),32,1);
            //var tab2sprite2 = createTabSprite_newui(tabsize, sResWord.w_rank_lv, cc.p(0.5,0.5),32,0);
            //var tab2Item = cc.MenuItemSprite.create(
            //    tab2sprite,
            //    tab2sprite1,
            //    tab2sprite2,
            //    this.clickTab2,this);
            //tab2Item.setAnchorPoint(cc.p(0.5,1));
            //tab2Item.setPosition(cc.p(size.width-120,size.height));
            //tab2Item.setEnabled(false);
            //this.mTab2Item = tab2Item
            ////tab2Item.setVisible(false);
            //
            //var menu = cc.Menu.create(tabItem,tab2Item);//tab3Item
            //menu.x = 0;
            //menu.y = 0;
            //this.addChild(menu, 10);

            this.showLeftView();
            this.showRightView();


            bRet = true;
        }
        return bRet;
    },
    showLeftView:function(){

        var titleSprite = cc.Sprite.create("#w_title_todayrank_prize.png");
        this.mPanelNode.addChild(titleSprite,3);
        titleSprite.setPosition(cc.p(-233,176));

        var t1label = cc.LabelTTF.create(sResWord.w_rank, sGameData.mFontname, 22);//
        t1label.setAnchorPoint(cc.p(0,0.5));
        t1label.setPosition(cc.p(-330,140));
        this.mPanelNode.addChild(t1label,10);
        t1label.setColor(cc.color(60,60,60))

        var t2label = cc.LabelTTF.create(sResWord.w_rank_prize, sGameData.mFontname, 22);//
        t2label.setAnchorPoint(cc.p(0,0.5));
        t2label.setPosition(cc.p(-230,140));
        this.mPanelNode.addChild(t2label,10);
        t2label.setColor(cc.color(60,60,60))

        var lineSprite = cc.Sprite.create("#rank_line.png");
        this.mPanelNode.addChild(lineSprite,3);
        lineSprite.setPosition(cc.p(-253,120));
        lineSprite.setScaleX(6);
        lineSprite.setScaleY(2);

        var datas = [["1","100.00"],["2","50.00"],["3","30.00"],["4-10","10.00"],["11-50","5.00"],["51-100","1.00"]]
        if(!sGameData.mCashUseDot){
            datas = [["1","10000"],["2","5000"],["3","3000"],["4-10","1000"],["11-50","500"],["51-100","100"]]
        }

        for(var i=0;i<6;i++){
            var pshow = ItemRankPrize.create(i,datas[i]);
            this.mPanelNode.addChild(pshow,3);
            pshow.setPosition(cc.p(-280,90-35*i))
        }

        var tiplabel = cc.LabelTTF.create(sResWord.w_rank_tip1, sGameData.mFontname, 20,//字体  ，字体大小
            cc.size(255,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_TOP);//
        tiplabel.setAnchorPoint(cc.p(0.5,0.5));
        tiplabel.setPosition(cc.p(-230,-160));
        this.mPanelNode.addChild(tiplabel,10);
        tiplabel.setColor(cc.color(71,71,71))



        var tip1label = cc.LabelTTF.create(sResWord.w_rank_tip2, sGameData.mFontname, 20);//
        tip1label.setAnchorPoint(cc.p(0,0.5));
        tip1label.setPosition(cc.p(-230,-225));
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(220,220,220))

        var tip2label = cc.LabelTTF.create(sResWord.w_rank_tip3, sGameData.mFontname, 20);//
        tip2label.setAnchorPoint(cc.p(0,0.5));
        tip2label.setPosition(cc.p(-230,-250));
        this.mPanelNode.addChild(tip2label,10);
        tip2label.setColor(cc.color(220,220,220))

    },
    showRightView:function(){

        var size = cc.director.getWinSize();
        var paneltopPosY = 150;
        //var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
        //var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85+57);

        var csize = cc.size(size.width-20,size.height-92-20);

        var titleSprite = cc.Sprite.create("#w_title_todayrank.png");
        this.mPanelNode.addChild(titleSprite,3);
        titleSprite.setPosition(cc.p(140,176));

        // 添加tableview
        var size_table = cc.size(360,250);
        var tableView = cc.TableView.create(this, size_table);
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(-20,-150));
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.mPanelNode.addChild(tableView,4);
        tableView.reloadData();
        this.mTableView = tableView;


        var tableheight = this.mTableView.getContentSize().height;
        var tableViewHeight = size_table.height;
        if(tableheight>tableViewHeight){
            var barsize = cc.size(4,225);
            var scroolbar = ScrollBar.create(barsize);
            scroolbar.setPosition(cc.p(345,100));
            this.mPanelNode.addChild(scroolbar,5,16888);
        }

        this.createTitleBar();

        var myrank = sResWord.w_rank_my+":"+sResWord.w_rank_norank;
        if(sGameData.mMyRank > 0){
            myrank = sResWord.w_rank_my+":"+sResWord.w_rank_mr_s1+sGameData.mMyRank+sResWord.w_rank_mr_s2
        }
        var msglabel = cc.LabelTTF.create(myrank, sGameData.mFontname, 20);//
        msglabel.setAnchorPoint(cc.p(0,0.5));
        msglabel.setPosition(cc.p(-20,-170));
        this.mPanelNode.addChild(msglabel,10);
        msglabel.setColor(cc.color(200,200,200))
        this.mMyRankTip = msglabel;
    },

    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 150;
        if(this.mTableView){
            var tableheight = this.mTableView.getContentSize().height;
            var tableViewHeight = 250
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mTableView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.mPanelNode.getChildByTag(16888);
            if(tableslider){
                tableslider.setPercent(value);
            }
        }
    },
    createTitleBar:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 150;

        var csize = this.getContentSize();
        //单元格背景
        var ccsize = cc.size(size.width*0.92,63);
        var titlebar =  ItemRankList.create(null,1);
        titlebar.setPosition(cc.p(-20,100));
        this.mPanelNode.addChild(titlebar,5);
        titlebar.showTitle(sResWord.w_rank,sResWord.w_player,sResWord.w_score);
        this.mTitleBar = titlebar;
    },
    clickTab1:function(){
        log("clickTab1")
        playClickSound();
        this.showTab(1)
        if(sGameData.mRankType != 1){
            sGameData.mGameNet.sendRankList(1);
        }
    },
    clickTab2:function(){
        log("clickTab2")
        playClickSound();
        this.showTab(2)
        if(sGameData.mRankType != 3){
            sGameData.mGameNet.sendRankList(3);
        }
    },
    clickTab3:function(){
        log("clickTab2")
        playClickSound();
        this.showTab(3)
//        if(sGameData.mRankType != 3){
//            sGameData.mGameNet.sendRankList(1);
//        }
    },
    //typt 1tab1 2tab2 3tab3
    showTab:function(type){
        //var size = cc.director.getWinSize();
        //var tab1Item = this.mTab1Item;
        //if(tab1Item){
        //    setTabState(tab1Item,type,1,sResWord.w_rank_gold);
        //}
        //var tab2Item = this.mTab2Item;
        //if(tab2Item){
        //    setTabState(tab2Item,type,2,sResWord.w_rank_lv);
        //}
        //var title = sResWord.w_rank_gold;
        //if(type == 2){
        //    title = sResWord.w_rank_lv;
        //}
        //this.mTabTitle.setVisible(true);
        //this.mTabTitle.x = size.width-120+((type-2)*220);
        //changeTabTitleWord(this.mTabTitle,title);
        //
        //if(type ==2){
        //    this.mTitleBar.showTitle(sResWord.w_rank,sResWord.w_player,sResWord.w_level);
        //}else{
        //    this.mTitleBar.showTitle(sResWord.w_rank,sResWord.w_player,sResWord.w_softcash);
        //}

    },
    gotoClose:function(){
        log("gotoClose")
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
        this.mSelectedData = this.mSelectedcell.mUser;

    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(380, 50);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;
        if(this.mSelectedData){
            i = this.mSelectedData.id;
        }
        var r = sGameData.mRankList[idx];
        if (!cell) {
            var item = ItemRankList.create(r,0);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mUser = r;
            cell.mIndex = idx;
            cell.updateInfo();
            if(this.mSelectedData){
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
        return sGameData.mRankList.length;
    },

    updateInfo:function(){
        this.mTableView.reloadData();
        var myrank = sResWord.w_rank_my+":"+sResWord.w_rank_norank;
        if(sGameData.mMyRank > 0){
            myrank = sResWord.w_rank_my+":"+sResWord.w_rank_mr_s1+sGameData.mMyRank+sResWord.w_rank_mr_s2
        }
        this.mMyRankTip.setString(myrank)
    }


});

RankListLayer.create = function () {
    var sg = new RankListLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};