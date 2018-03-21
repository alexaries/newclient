/**
 * 显示 筹码
 * Created by Administrator on 14-5-13.
 */

var ZJHCoin = cc.Node.extend({
    mCoinValue:0,//筹码值
    mCoinNum:0,//数量
    mCoinPic:"",//图片
    mCoin:null,//筹码1
    mCoin1:null,//筹码2
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var coin =  cc.Sprite.create("#b_1.png");
            this.addChild(coin);
            coin.setTag(9001);
            coin.setScale(0.5);
            this.mCoin = coin;
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置筹码值
    setBetValue:function(value){
        this.mCoinValue = value;
        this.setPicNum();
        var coin = this.getChildByTag(9001);
        if(coin){
            coin.setSpriteFrame(this.mCoinPic); //要 不带#
        }
        if(this.mCoinNum > 1){
            var coin1 =  cc.Sprite.create("#"+this.mCoinPic);
            this.addChild(coin1);
            coin1.setPosition(cc.p(20,10));
            coin1.setScale(0.5);
            this.mCoin1 = coin1;
        }
    },
    //设置数量
    setPicNum:function(){
        this.mCoinNum = 1;
        var value = this.mCoinValue
        value = Number(formatcash(value));
        switch (value){
            case 500000:
            case 200000:
            case 100000:
            case 50000:
            case 20000:
            case 10000:
            case 5000:
            case 2000:
            case 1000:
            case 500:
            case 200:
            case 100:
            case 50:
            case 20:
            case 10:
            case 5:
            case 2:
            case 1:
            case 0.5:
            case 0.2:
            case 0.1:
            case 0.05:
            case 0.02:
            case 0.01:
                this.mCoinPic  ="b_"+value+".png";
                break
            case 40000:
            case 4000:
            case 400:
            case 40:
            case 4:
            case 0.4:
            case 0.04:
                this.mCoinNum = 2;
                this.mCoinPic  ="b_"+value/2+".png";
                break;
            default:
                this.mCoinPic  ="b_1.png";
                break;
        }
    },
    //设置坐标
    setXY:function(seat){
        var size = cc.director.getWinSize();
        var pos =  sGameData.mZJHLayer.mZJHLogic.getHeadsPos();
        var tpos = pos[seat]
        this.x = tpos.x
        this.y = tpos.y
    },
    //显示动画
    starShowAnim:function(){
        this.mCoin.setOpacity(0)
        var fadeanim1 = cc.FadeIn.create(0.3);
        this.mCoin.runAction(fadeanim1)
        if(this.mCoin1){
            this.mCoin1.setOpacity(0)
            var fadeanim1 = cc.FadeIn.create(0.3);
            this.mCoin1.runAction(fadeanim1)
        }
    },
    //隐藏动画
    starHiddenAnim:function(){
        var fadeanim1 = cc.FadeOut.create(0.3);
        this.mCoin.runAction(fadeanim1)
        if(this.mCoin1){
            var fadeanim1 = cc.FadeOut.create(0.3);
            this.mCoin1.runAction(fadeanim1)
        }
    }

});
ZJHCoin.create = function () {
    var sg = new ZJHCoin();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
