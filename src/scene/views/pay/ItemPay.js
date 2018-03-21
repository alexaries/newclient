/**
 * Created by Administrator on 14-6-3.
 */

var ItemPay = BaseObject.extend({
    mPay:null,
    mIndex:0, //某位置 0-5
    mIsSelected:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tsize = cc.size(150,207);
            var bgsprite = cc.Sprite.create("#pay_btnbg.png")//createSysPanel_munu(tsize)
            bgsprite.setAnchorPoint(cc.p(0,0))
            this.addChild(bgsprite);
            bgsprite.setTag(9001);
            bgsprite.setColor(cc.color(200, 200, 200));
            this.setContentSize(bgsprite.getContentSize());
            var csize = this.getContentSize();

            var iconpic = "#pay_gold_"+(this.mIndex+1)+".png"
            var iconsprite = cc.Sprite.create(iconpic);
            iconsprite.setPosition(cc.p(csize.width/2,csize.height*0.5+15));
            this.addChild(iconsprite);

            var pCashLabel = cc.LabelTTF.create(this.mPay.displayName,sGameData.mFontname, 24);//垂直对齐
            pCashLabel.setPosition(cc.p(csize.width/2,csize.height*0.86));
            pCashLabel.setTag(8001);
            this.addChild(pCashLabel,1);
            this.setLabelScale(pCashLabel,110);
            //pCashLabel.setVisible(false);

            var pMoneyLabel = cc.LabelTTF.create("¥"+(this.mPay.price/100)+this.mPay.priceUnit,sGameData.mFontname, 24);//垂直对齐
            pMoneyLabel.setPosition(cc.p(csize.width/2,csize.height*0.15));
            pMoneyLabel.setTag(8002);
            this.addChild(pMoneyLabel,1);
            this.setLabelScale(pMoneyLabel,110);
            pMoneyLabel.setColor(cc.color(255,255,255))



            //xxx
            bRet = true;
        }
        return bRet;
    },
    updateInfo:function(){
        var pCashLabel = this.getChildByTag(8001);
        if(pCashLabel){
            pCashLabel.setString(this.mPay.displayName)
        }

        var pMoneyLabel = this.getChildByTag(8002);
        if(pMoneyLabel){
            pMoneyLabel.setString("¥"+(this.mPay.price/100)+this.mPay.priceUnit)
        }
    },
    choose:function(){
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(200, 200, 200));
            //sprite1.setSpriteFrame("poker_store_gold_item_selected.png")
        }
    },
    unchoose:function(){
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(200, 200, 200));
            //sprite1.setSpriteFrame("poker_store_gold_item.png")
        }
    },
    checkClick:function(pos){
        var itemsize = cc.size(112,144);
        var cpos = cc.p(this.x,this.y);
        var rect = cc.rect(cpos.x,cpos.y,itemsize.width,itemsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemPay.create = function (index,pay) {
    var sg = new ItemPay();
    if (sg  ) {
        sg.mIndex = index;
        sg.mPay = pay
        sg.init()
        return sg;
    }
    return null;
};
