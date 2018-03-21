/**
 * Created by apple on 14-6-17.
 * 显示牌提示
 */

var DDZShowCardTip = cc.Node.extend({
    mIndex:0, //某位置
    mTipSprite:null,//提示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tipsprite = cc.Sprite.create("#ddz_tip1.png");
            this.addChild(tipsprite);
            tipsprite.setVisible(false);
            this.mTipSprite = tipsprite;
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示提示 type 0 不显示 1不符合规则 2没有大过上家的牌
    showTip:function(type){
        this.mTipSprite.setVisible(true);
        if(type == 0){
            this.mTipSprite.setVisible(false);
        }else if(type == 1){
            this.mTipSprite.setSpriteFrame("ddz_tip1.png")
        }else if(type == 2){
            this.mTipSprite.setSpriteFrame("ddz_tip2.png")
        }

    }
});
DDZShowCardTip.create = function () {
    var sg = new DDZShowCardTip();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
