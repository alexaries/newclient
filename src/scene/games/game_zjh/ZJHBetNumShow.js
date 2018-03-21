/**
 * 显示 投注额
 * Created by Administrator on 14-5-6.
 */
//投注数量显示
var ZJHBetNumShow = cc.Node.extend({
    mSeat:0, //某位置
    mShowNum:0,//投注值
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var bgsprite =  cc.Sprite.create("#zjh_desk_amount.png");
            this.addChild(bgsprite);

            var size = bgsprite.getContentSize();

            var index = sGameData.mGameLogic.getCoinindex(this.mShowNum);
            var num_coin = game_num_coin[index];
            if(num_coin<1){
                num_coin = num_coin*100;
            }
            var coinpic  = "#chip_"+num_coin+"@2x.png";

            var coinsprite =  cc.Sprite.create(coinpic);

            if(this.mSeat>0 && this.mSeat<3){
                coinsprite.setPosition(cc.p(size.width/2,0));
            }else{
                coinsprite.setPosition(cc.p(-size.width/2,0));
            }
            coinsprite.setTag(9001);
            this.addChild(coinsprite);
            var csize = coinsprite.getContentSize();

            var numstr = "0";
            var blockSize = cc.size(size.width-csize.width/2+5,size.height);
            var numLabel = cc.LabelTTF.create(numstr, sGameData.mFontname,20, blockSize, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            numLabel.setAnchorPoint(cc.p(0,0.5));
            if(this.mSeat>0 && this.mSeat<3){
                numLabel.setPosition(cc.p(-size.width/2,0));
            }else{
                numLabel.setPosition(cc.p(-size.width/2+csize.width/2,0));
            }
            numLabel.setTag(8001);
            this.addChild(numLabel);

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置投注值
    setBetNum:function(num){
        //log("setBetNum="+num +"="+ this.mSeat)
        this.mShowNum = num;
        var numLabel = this.getChildByTag(8001);
        if(numLabel){
            var numstr = ""+formatcash(this.mShowNum);
            numLabel.setString(numstr);
        }
        if(num!=0){
            var coinsprite = this.getChildByTag(9001);
            if(coinsprite){
                var index = sGameData.mGameLogic.getCoinindex(this.mShowNum);
                var num_coin = game_num_coin[index];
                if(num_coin<1){
                    num_coin = num_coin*100;
                }
                var coinpic  = "chip_"+num_coin+"@2x.png";
                coinsprite.setSpriteFrame(coinpic);
            }
            this.setVisible(true);
        }else{
            this.setVisible(false);
        }
    },
    //设置坐标
    setXY:function(){
        var size = cc.director.getWinSize();
        var pos =  sGameData.mZJHLayer.mZJHLogic.getBetNumShowPos()
        var tpos = pos[this.mSeat]
        this.x = tpos.x
        this.y = tpos.y
    }
});
ZJHBetNumShow.create = function (seat) {
    var sg = new ZJHBetNumShow();
    if (sg) {
        sg.mSeat = seat;
        sg.init();
        return sg;
    }
    return null;
};
