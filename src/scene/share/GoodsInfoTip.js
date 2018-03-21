
/**
 * Created by apple on 14-9-20.
 * 物品信息提示
 */

var GoodsInfoTip = cc.Node.extend({
    mIndex:0, //某位置
    mNameLabel:null,
    mMsgLabel:null,
    mTipLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            var itemsize = cc.size(270, 378);

            var innerimg = createGoodsInfoBg(itemsize);
            //innerimg.setPosition(cc.p(0,3));
            this.addChild(innerimg);

            var line = cc.Sprite.create("#cell_small_delimeter.png")
            line.setPosition(cc.p(0,itemsize.height*0.35));
            line.setScaleX(270/120)
            this.addChild(line)

            var line1 = cc.Sprite.create("#cell_small_delimeter.png")
            line1.setPosition(cc.p(0,-itemsize.height*0.35));
            line1.setScaleX(270/120)
            this.addChild(line1)

            var nameLabel = cc.LabelTTF.create("",sGameData.mFontname, 24);//垂直对齐
            nameLabel.setPosition(cc.p(0,itemsize.height*0.42));
            nameLabel.setColor(cc.color(58,123,167));
            nameLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(nameLabel);
            this.mNameLabel = nameLabel

            //提示
            this.mMsg = "";
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 22,//字体  ，字体大小
                cc.size(360,245),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_TOP);//垂直对齐
            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0.5,1));
            pMsgLabel.setPosition(cc.p(0,itemsize.height*0.30))
            this.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;
            pMsgLabel.setColor(cc.color(56,140,87));


            var tipLabel = cc.LabelTTF.create("aa",sGameData.mFontname, 22);//垂直对齐
            tipLabel.setPosition(cc.p(0,-itemsize.height*0.42));
            tipLabel.setColor(cc.color(125,125,125));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel);
            this.mTipLabel = tipLabel


            //xxx
            bRet = true;
        }
        return bRet;
    },
    showInfo:function(name,info,tip1){
        this.mNameLabel.setString(name)
        this.mMsgLabel.setString(info)
        this.mTipLabel.setString(tip1)
    }
});
GoodsInfoTip.create = function () {
    var sg = new GoodsInfoTip();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
