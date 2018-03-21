/**
 * Created by Administrator on 14-5-6.
 */
var DN_CARD_WIDTH = 197;
var DN_CARD_HEIGHT = 268;
//牌显示
var DNCard = cc.Node.extend({
    mSeat:0, //位置
    mIndex:0, //某位置
    mCardValue:0, //牌值大小
    mChoosed:false, //是否被选中
    mDisable:true,//不可操作
    mIsFen:false,//是否分牌
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //var name = getNameFromCardsPic(this.mCardValue);
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
    //检查是否点中
    checkClick:function(pos){
        var cardsize = cc.size(DN_CARD_WIDTH*0.5,DN_CARD_HEIGHT*0.5);
        var cpos = cc.p(this.x,this.y);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    },
    //牌被点击
    cardClicked:function(){
        //cc.log("cardClicked==");
        if(this.mDisable) return;

        if(this.mChoosed){
            this.mChoosed = false;
            this.y -= 20;
        }else{
            this.mChoosed = true;
            this.y += 20;
        }
    },
    //选择
    choose:function(){
        if(this.mDisable) return;
        if(!this.mChoosed){
            this.mChoosed = true;
            this.y += 20;
        }
    },
    //取消选择
    unchoose:function(){
        if(this.mDisable) return;
        if(this.mChoosed){
            this.mChoosed = false;
            this.y -= 20;
        }
    }


});


DNCard.create = function () {
    var sg = new DNCard();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


