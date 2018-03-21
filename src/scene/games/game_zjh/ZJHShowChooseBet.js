/**
 * 显示 选择 投注 （只有一个背景）
 * Created by Administrator on 14-5-14.
 */
var ZJHShowChooseBet = cc.Node.extend({
    mIndex:0, //某位置
    mCoinShow:null,//
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            //var bgSprite = cc.Sprite.create("#mask.png");
            //this.addChild(bgSprite);
            //bgSprite.setScaleX(size.width/50);
            //bgSprite.setScaleY(5);

            var psize = cc.size(580,85);
            var panel = cc.Sprite.create("#zjh_op_bet_bg.png");
            this.addChild(panel,1);
            this.setContentSize(panel.getContentSize());
            var csize = this.getContentSize()

//            var coinshow = ZJHCoin.create();
//            coinshow.setBetValue(1);
//            coinshow.setPosition(cc.p(csize.width*0.393,0));
//            this.addChild(coinshow,1);
//            coinshow.setVisible(false);
//            this.mCoinShow = coinshow;

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //
    showBet:function(state,num){
//        if(state){
//            this.mCoinShow.setBetValue(num);
//        }
//        this.mCoinShow.setVisible(state);
    }

});
ZJHShowChooseBet.create = function () {
    var sg = new ZJHShowChooseBet();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
