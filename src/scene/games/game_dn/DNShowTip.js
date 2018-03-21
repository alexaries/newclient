/**
 * Created by Administrator on 14-5-20.
 * 显示提示
 */

var DNShowTip = cc.Node.extend({
    mTipSprite:null,//提示图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tipsprite = cc.Sprite.create("#dn_tipText5.png")
            this.addChild(tipsprite);
            this.mTipSprite = tipsprite
            tipsprite.setVisible(false);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示提示 type 0不显示 1请下注 2等待闲家下注 3准备 4抢庄（自己操作结束） 5抢庄 （自己没操作）
    //6金币不足不能抢庄 7分牌  8等待结束
    showTip:function(type){
        var tempY = 0;
        if(type == 1){
            tempY = 70;
            this.mTipSprite.setSpriteFrame("dn_tipText5.png")
        }else if(type == 2){
            this.mTipSprite.setSpriteFrame("dn_tipText6.png")
        }else if(type == 3){
            tempY = 70;
            this.mTipSprite.setSpriteFrame("dn_tipText1.png")
        }else if(type == 4){
            this.mTipSprite.setSpriteFrame("dn_tipText2.png")
        }else if(type == 5){
            tempY = 70;
            this.mTipSprite.setSpriteFrame("dn_tipText3.png")
        }else if(type == 6){
            tempY = 70;
            this.mTipSprite.setSpriteFrame("dn_tipText4.png")
        }else if(type == 7){
            tempY = 70;
            this.mTipSprite.setSpriteFrame("dn_tipText7.png")
        }else if(type == 8){
            this.mTipSprite.setSpriteFrame("dn_tipText8.png")
        }
        var pos = cc.p(0,tempY);
        if(type>0){
            this.mTipSprite.setVisible(true);
            this.mTipSprite.setPosition(pos);
        }else{
            this.mTipSprite.setVisible(false);
        }
    }
});
DNShowTip.create = function () {
    var sg = new DNShowTip();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
