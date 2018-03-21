/**
 * Created by mac_apple on 16/2/19.
 */

var ItemRankPrize = cc.Node.extend({
    mIndex:0, //某位置
    mData:[],

    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var t1label = cc.LabelTTF.create(this.mData[0], sGameData.mFontname, 22);//
            t1label.setAnchorPoint(cc.p(0,0.5));
            t1label.setPosition(cc.p(-50,0));
            this.addChild(t1label,10);
            t1label.setColor(cc.color(60,60,60))

            var iconSprite = cc.Sprite.create("#icon_rank_gold.png");
            this.addChild(iconSprite,3);
            iconSprite.setPosition(cc.p(53,0));

            var t2label = cc.LabelTTF.create(this.mData[1], sGameData.mFontname, 22);//
            t2label.setAnchorPoint(cc.p(0,0.5));
            t2label.setPosition(cc.p(70,0));
            this.addChild(t2label,10);
            t2label.setColor(cc.color(190,156,120))

            bRet = true;
        }
        return bRet;
    }
});
ItemRankPrize.create = function (index,data) {
    var sg = new ItemRankPrize();
    if (sg) {
        sg.mIndex = index;
        sg.mData = data
        sg.init()
        return sg;
    }
    return null;
};
