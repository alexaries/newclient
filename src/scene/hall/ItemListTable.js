/**
 * Created by Administrator on 14-5-8.
 * 列表的桌子项
 */
var ItemListTable = cc.TableViewCell.extend({
    mIndex:0,//索引
    mTable:null,//桌子
    mIsSelected:false,//是否选中
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            //单元格背景
            var ccsize = cc.size(size.width*0.96,82);
            var sprite =  createHallListbg(ccsize)
            //sprite.setContentSize(ccsize)
            sprite.setAnchorPoint(cc.p(0, 0));
            sprite.setPosition(cc.p(0, 0));
            sprite.setTag(9001);
            this.addChild(sprite,1);

            var itemsize = sprite.getContentSize();

            if(this.mTable!=null){
                //名称
                var idstr = this.mTable.name;
                var idlabel = cc.LabelTTF.create(idstr,sGameData.mFontname, 28,//字体  ，字体大小
                    cc.size(272,35),  //设置文本的宽高
                    cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                idlabel.setAnchorPoint(cc.p(0.5,0.5));
                idlabel.setPosition(cc.p(itemsize.width*0.125, itemsize.height*0.5));
                idlabel.setTag(8001);
                this.addChild(idlabel,1);


                var olstr = this.mTable.tablePlayers+"/"+this.mTable.chairCount;
                var ollabel = cc.LabelTTF.create(olstr,sGameData.mFontname, 28,//字体  ，字体大小
                    cc.size(190,35),  //设置文本的宽高
                    cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                ollabel.setAnchorPoint(cc.p(0.5,0.5));
                ollabel.setPosition(cc.p(itemsize.width*0.875, itemsize.height*0.5));
                ollabel.setTag(8004);
                this.addChild(ollabel,1);

                var minbetstr = "";
                var carrystr = ""
                if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
                    var mangstr = this.mTable.minBet
                    var mincstr = this.mTable.enterPoint+"/-";
                    minbetstr = mangstr
                    carrystr = mincstr
                }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
                    var mangstr = this.mTable.minBet
                    var mincstr = "-";
                    minbetstr = mangstr
                    carrystr = mincstr
                }
                var manglabel = cc.LabelTTF.create(minbetstr, sGameData.mFontname, 28,//字体  ，字体大小
                    cc.size(222,35),  //设置文本的宽高
                    cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                manglabel.setAnchorPoint(cc.p(0.5,0.5));
                manglabel.setPosition(cc.p(itemsize.width*0.375, itemsize.height*0.5));
                manglabel.setTag(8002);
                this.addChild(manglabel,1);


                var minlabel = cc.LabelTTF.create(carrystr, sGameData.mFontname, 28,//字体  ，字体大小
                    cc.size(241,35),  //设置文本的宽高
                    cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
                minlabel.setAnchorPoint(cc.p(0.5,0.5));
                minlabel.setPosition(cc.p(itemsize.width*0.625, itemsize.height*0.5));
                minlabel.setTag(8003);
                this.addChild(minlabel,1);

            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //更新显示物品的信息
    updateInfo:function()
    {
        //log("zjh mTable="+this.mTable.id);
        var idlabel = this.getChildByTag(8001);
        if(idlabel){
            var idstr = this.mTable.name;
            idlabel.setString(idstr);
        }

        var ollabel = this.getChildByTag(8004);
        if(ollabel){
            var olstr = this.mTable.tablePlayers+"/"+this.mTable.chairCount;
            ollabel.setString(olstr);
        }

        var minbetstr = "";
        var carrystr = ""
        if(sGameData.mCurrRoom.gameId == GAME_TYPE_ZJH){
            var mangstr = this.mTable.minBet
            var mincstr = this.mTable.enterPoint+"/-";
            minbetstr = mangstr
            carrystr = mincstr
        }else if(sGameData.mCurrRoom.gameId == GAME_TYPE_DN){
            var mangstr = this.mTable.minBet
            var mincstr = "-";
            minbetstr = mangstr
            carrystr = mincstr
        }
        var manglabel = this.getChildByTag(8002);
        if(manglabel){
            manglabel.setString(minbetstr);
        }

        var minlabel = this.getChildByTag(8003);
        if(minlabel){
            minlabel.setString(carrystr);
        }

    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(220, 220, 220));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255, 255, 255));
        }
    }
});
ItemListTable.create = function (table,index) {
    var sg = new ItemListTable();
    if (sg) {
        sg.mTable = table;
        sg.mIndex = index;
        sg.init();
        return sg;
    }
    return null;
};
