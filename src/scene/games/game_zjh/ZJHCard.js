/**
 * Created by Administrator on 14-5-6.
 * 牌显示
 */
var ZJH_CARD_WIDTH = 84;
var ZJH_CARD_HEIGHT = 112;
var ZJHCard = cc.Node.extend({
    mSeat:0, //位置
    mIndex:0, //某位置
    mCardValue:0, //牌值大小
    mChoosed:false, //是否被选中
    mWinChoose:false,//
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //var name = //getNameFromCardsPic(this.mCardValue);
            var cardsprite = BaseCardShow.create(this.mCardValue);
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
    },
    //输了变灰
    setWinChoose:function(state){
        var cardSprite = this.getChildByTag(9001);
        if(cardSprite){
            if(!state){
                cardSprite.setColor(cc.color(150, 150, 150));
            }else{
                cardSprite.setColor(cc.color(255, 255, 255));
            }
        }
    }


});


ZJHCard.create = function () {
    var sg = new ZJHCard();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


