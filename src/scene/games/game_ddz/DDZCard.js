/**
 * Created by Administrator on 14-4-10.
 */

var DDZ_CARD_WIDTH = 197;
var DDZ_CARD_HEIGHT = 268;
//牌显示
var DDZCard = cc.Node.extend({
    mSeat:-1, //位置
    mIndex:0, //某位置
    mCardValue:0, //牌值大小
    mChoosed:false, //是否被选中
    mDisable:true,//不可操作
    mIsOut:false,//是否是出牌
    mOffsetY:0,//y偏移
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //var pos = getPosFromCardsPic(this.mCardValue);
            //var cardsprite = cc.Sprite.create(res.cards_png,cc.rect(DDZ_CARD_WIDTH*pos.x+2, DDZ_CARD_HEIGHT*pos.y+2, DDZ_CARD_WIDTH,DDZ_CARD_HEIGHT));
            //var name = getNameFromCardsPic(this.mCardValue);
            var cardsprite = BaseCardShow.create(this.mCardValue);
                //cc.Sprite.create(name);
            cardsprite.attr({
                anchorX: 0,
                anchorY:0
            });
            cardsprite.setTag(9001);
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
            //var pos = getPosFromCardsPic(this.mCardValue);
            //var rec = cc.rect(DDZ_CARD_WIDTH*pos.x+2, DDZ_CARD_HEIGHT*pos.y+2, DDZ_CARD_WIDTH,DDZ_CARD_HEIGHT);
            //var name = getNameFromCardsPic(this.mCardValue,1);
            if(this.mSeat==0){
                this.setScale(sGameData.mDDZ_mycard_scale);
            }
            //cardSprite.setSpriteFrame(name); //要 不带#
            cardSprite.setCardValue(this.mCardValue)
        }
    },
    //检查是否点击
    checkClick:function(pos){
        var cardsize = cc.size(DDZ_CARD_WIDTH*sGameData.mDDZ_mycard_scale,DDZ_CARD_HEIGHT*sGameData.mDDZ_mycard_scale);
        var cpos = cc.p(this.x,this.y);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    },
    //点击牌
    cardClicked:function(){
        log("cardClicked==");
        if(this.mDisable) return;

        if(this.mChoosed){
            this.mChoosed = false;
            this.y -= 20;
        }else{
            this.mChoosed = true;
            this.y += 20;
        }
    },
    //选中牌，
    choose:function(){
        if(this.mDisable) return;
        if(!this.mChoosed){
            this.mChoosed = true;
            this.y += 20;
        }
    },
    //设置牌颜色 变灰或正常
    setColorType:function(type){
        var cardSprite = this.getChildByTag(9001);
        if(cardSprite){
            if(type == 1){
                cardSprite.setColor(cc.color(200,200,200))
            }else{
                cardSprite.setColor(cc.color(255,255,255))
            }
        }
    },
    //取消选中
    unchoose:function(){
        if(this.mDisable) return;
        if(this.mChoosed){
            this.mChoosed = false;
            this.y -= 20;
        }
        this.setColorType(0);
    },
    //设置大小动画（出牌时）
    setDaxiaoAnim:function(){
        if(this.mSeat==0&&this.mIsOut){
            var cardSprite = this.getChildByTag(9001);
            if(cardSprite){
                var anim2 = cc.ScaleTo.create(0.15,sGameData.mDDZ_othercard_scale);
                this.runAction(anim2);
            }
        }

    },
    //设置大小
    setDaxiao:function(){
        if(this.mSeat==0&&this.mIsOut){
            var cardSprite = this.getChildByTag(9001);
            if(cardSprite){
                this.setScale(sGameData.mDDZ_othercard_scale);
            }
        }
    },
    //加上地主标志
    addDizhuIcon:function(){

        var cardSprite = this.getChildByTag(9001);
        if(cardSprite){
            var iconsprite = cc.Sprite.create("#card_dizhu.png");
            iconsprite.attr({
                x:this.width-5,
                y:this.height-5,
                anchorX: 1,
                anchorY:1
            });
            cardSprite.addChild(iconsprite);
        }
    }

});


DDZCard.create = function () {
    var sg = new DDZCard();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


