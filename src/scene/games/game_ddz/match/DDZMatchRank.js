/**
 * Created by apple on 14-9-11.
 */

var DDZMatchRank = cc.Node.extend({
    mIndex:0, //某位置
    mMsgLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsize = cc.size(709,548);
            var point_panel_close = cc.p(4,-8);//边线的高度
            var bgsprite = cc.Sprite.create("#match_result_bg.png")
            this.addChild(bgsprite)

            var titleLabel = cc.LabelTTF.create(sResWord.w_match_rank, sGameData.mFontname,30);
            titleLabel.attr({
                x : 0,
                y : 225,
                anchorY:0.5
            });
            this.addChild(titleLabel, 5);
            //titleLabel.setColor(cc.color(255,255,0))


            var msg = sResWord.w_match_ranktitle;
            var msglabel = cc.LabelTTF.create(msg, sGameData.mFontname,24,
                cc.size(675,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            msglabel.attr({
                x : 0,
                y : 147,
                anchorY:0.5
            });
            this.addChild(msglabel, 5);
            this.mMsgLabel = msglabel;


            //添加按钮 关闭
            var closeSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,1);
            var closeSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.gotoClose,this);
            closeItem.attr({
                x:0,
                y:-bgsize.height/2+55,
                anchorX:0.5,
                anchorY:0.5
            });

            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 3);

            sGameData.mMatchRankList = [];
            log("ranklen = "+sGameData.mMatchRankList.length)

            var size_hall_table = cc.size(670,290);
            var point_tables = cc.p(-size_hall_table.width/2,-bgsize.height/2+107)

            var tableView = cc.TableView.create(this, size_hall_table);
            tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            tableView.setPosition(point_tables);
            tableView.setDelegate(this);
            tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(tableView,4);
            tableView.reloadData();
            this.mTableView = tableView;



            //xxx
            bRet = true;
        }
        return bRet;
    },
    gotoClose:function(){
        this.setVisible(false);
    },
    updateInfo:function(name,rank){
        this.mTableView.reloadData();
    },

    scrollViewDidScroll:function (view) {
        //this.checkTableScrollBar();
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
        return cc.size(660, 60);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var i = -1;

        var r = sGameData.mMatchRankList[idx];
        if (!cell) {
            var item = DDZMatchRankItem.create(r,idx);
            cell = item;
        } else {
            //log("index=="+idx+"|"+ r.id);
            cell.mRankData = r;
            cell.mIndex = idx;
            cell.updateInfo();
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return sGameData.mMatchRankList.length;
    }
});
DDZMatchRank.create = function () {
    var sg = new DDZMatchRank();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
