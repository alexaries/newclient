/**
 * 显示 筹码
 * Created by Administrator on 14-5-16.
 */

var DNCoin = cc.Node.extend({
    mCoinValue:0,//筹码的数值
    mCoinNum:0,//筹码显示数量
    mCoinPic:"",//筹码图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var coin =  cc.Sprite.create("#b_1.png");
            this.addChild(coin);
            coin.setTag(9001);
            coin.setScale(0.5);

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
    },
    //设置图片数量
    setPicNum:function(){
        this.mCoinNum = 1;
        var value = this.mCoinValue
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
            default:
                this.mCoinPic  ="b_1.png";
                break;
        }
    },
    //设置坐标
    setXY:function(seat){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 154)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var tpos = pos[seat]
        this.x = tpos.x
        this.y = tpos.y
    }

});
DNCoin.create = function () {
    var sg = new DNCoin();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
