/**
 * Created by Administrator on 14-5-6.
 * 牌显示
 */
var BASE_CARD_WIDTH = 84;
var BASE_CARD_HEIGHT = 112;
var BaseCard = cc.Node.extend({
    mSeat:0, //位置
    mIndex:0, //某位置
    mCardValue:0, //牌值大小
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //var name = getNameFromCardsPic(this.mCardValue);
            var cardsprite =  BaseCardShow.create(this.mCardValue);
            cardsprite.setTag(9001);
            //cardsprite.getTexture().setAntiAliasTexParameters();
            this.addChild(cardsprite,1);
            this.setContentSize(cardsprite.getContentSize());

            bRet = true;
        }
        return bRet;
    },
    //改变牌值
    setCardValue:function(cardvalue){
        this.mCardValue = cardvalue;
        var cardSprite = this.getChildByTag(9001);
        if(cardSprite){
            //var name = getNameFromCardsPic(this.mCardValue,1);
            //cardSprite.setSpriteFrame(name); //要 不带#
            //cardSprite.getTexture().setAntiAliasTexParameters();
            cardSprite.setCardValue(this.mCardValue)
        }
    }

});


BaseCard.create = function () {
    var sg = new BaseCard();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


