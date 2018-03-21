/**
 * Created by apple on 14-12-4.
 */
var TaskLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mSelectedcell:null,//选中的单元
    mSelectedData:null,//选中的消息
    mTableView:null,//表视图
    mOffsetY:1,//表视图的偏移 （刷新数据时，保持原来位置）
    mSoftcashshow:null,
    mHardcashshow:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mTaskLayer = this;
            sGameData.mCurrLayer = this;

            log("TaskLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(920,size_panel.height*0.85+67);


            this.mTitle = sResWord.w_task;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-20-20,size.height-92-46);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            this.showCash();
            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_task.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));



            // 添加tableview
            var size_table = cc.size(size_panel_inner.width,size_panel_inner.height);
            var tableView = cc.TableView.create(this, size_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(cc.p(size.width/2-size_panel_inner.width/2,size.height- paneltopPosY-csize.height*0.035-size_panel_inner.height+40));
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
                scroolbar.setPosition(cc.p(size.width/2+size_panel_inner.width/2+5,size.height- paneltopPosY-csize.height*0.035-2));
                this.addChild(scroolbar,5,16888);
            }




            var tiplabel = cc.LabelTTF.create(sResWord.w_no_list, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,1));
            tiplabel.setPosition(cc.p(size.width/2,size.height- paneltopPosY-csize.height*0.035-70-50));
            tiplabel.setTag(8002);
            this.addChild(tiplabel,10);
            if(sGameData.mUserTasks.length > 0){
                tiplabel.setVisible(false);
            }



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
        this.mSelectedData = this.mSelectedcell.mMsg;

    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(580, 55);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;
        if(this.mSelectedData){
            i = this.mSelectedData.id;
        }
        var r = sGameData.mUserTasks[idx];
        if (!cell) {
            var item = ItemTask.create(r,idx);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mUTask = r;
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
        return sGameData.mUserTasks.length;
    },

    updateInfo:function(){

        this.mOffsetY = this.mTableView.getContentOffset().y;
        this.mTableView.reloadData();

        if(this.mOffsetY != 1){ //位置设置成之前的
            this.mTableView.setContentOffset(cc.p(0,this.mOffsetY),false);
        }

        this.mSoftcashshow.setValue(3,formatcash(sGameData.mUser.softCash),1,1);
        //this.mHardcashshow.setValue(3,formatcash(sGameData.mUser.hardCash),1,1);
    }




});

TaskLayer.create = function () {
    var sg = new TaskLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};