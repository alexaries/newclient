/**
 * Created by apple on 14-9-3.
 */
var DDZMatchTip = cc.Node.extend({
    mIndex:0, //某位置
    mTipSprite:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tipsprite = cc.Sprite.create("#ddz_match_tip_1.png")
            this.addChild(tipsprite);
            this.mTipSprite = tipsprite
            tipsprite.setVisible(false);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //type 0不显示 1正在报名 2请等待其他桌结束等待重新排座 3等待计算排名
    showTip:function(type){
        var tempY = 0;
        if(type == 1){
            tempY = 0;
            this.mTipSprite.setSpriteFrame("ddz_match_tip_1.png")
        }else if(type == 2){ //等待重新排座
            tempY = 0;
            this.mTipSprite.setSpriteFrame("ddz_match_tip_2.png")
        }else if(type == 3){ //等待计算排名
            tempY = 0;
            this.mTipSprite.setSpriteFrame("ddz_match_tip_3.png")
        }
        var pos = cc.p(0,tempY);
        //if(type>0){
        //    this.mTipSprite.setVisible(true);
        //    this.mTipSprite.setPosition(pos);
        //}else{
        //    this.mTipSprite.setVisible(false);
        //}
    }
});
DDZMatchTip.create = function () {
    var sg = new DDZMatchTip();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
