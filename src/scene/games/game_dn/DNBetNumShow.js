/**
 * 显示 投注额
 * Created by Administrator on 14-5-16.
 */
//投注数量显示
var DNBetNumShow = cc.Node.extend({
    mSeat:0, //某位置
    mShowNum:0,//数量－现在为倍数
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var bgsprite =  cc.Sprite.create("#dn_desk_amount.png");
            this.addChild(bgsprite);

            var size = bgsprite.getContentSize();

            var index = 6;//sGameData.mGameLogic.getCoinindex(this.mShowNum);
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
//            var blockSize = cc.size(size.width-csize.width/2+5,size.height);
//            var numLabel = cc.LabelTTF.create(numstr, sGameData.mFontname,20, blockSize, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
//
//            numLabel.setAnchorPoint(cc.p(0,0.5));
//            if(this.mSeat>0 && this.mSeat<4){
//                numLabel.setPosition(cc.p(-size.width/2,0));
//            }else{
//                numLabel.setPosition(cc.p(-size.width/2+csize.width/2,0));
//            }
//            numLabel.setTag(8001);
//            this.addChild(numLabel);
            var xsprite = cc.Sprite.create("#dn_x.png");
            if(this.mSeat>0 && this.mSeat<3){
                xsprite.setPosition(cc.p(-size.width/2+15,0));
            }else{
                xsprite.setPosition(cc.p(-size.width/2+28,0));
            }
            this.addChild(xsprite,1);
            xsprite.setTag(9009);

            var countshow = ShowNum.create();
            if(this.mSeat>0 && this.mSeat<3) {
                countshow.setPosition(cc.p(1, 0));
            }else{
                countshow.setPosition(cc.p(13, 0));
            }
            this.addChild(countshow,1);
            countshow.setScale(0.9);
            countshow.setValue(5,0,3,1);
            countshow.setTag(8001);


            var countsize = countshow.getShowSize()
            if(this.mSeat>0 && this.mSeat<3){
                xsprite.setPosition(cc.p(1-11-countsize.width/2,0));
            }else{
                xsprite.setPosition(cc.p(14-11-countsize.width/2,0));
            }



            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示投注倍数
    setBetNum:function(num){
        //cc.log("setBetNum="+num +"="+ this.mSeat)
        this.mShowNum = num;
        var numLabel = this.getChildByTag(8001);
        if(numLabel){
            //var numstr = ""+this.mShowNum;
            numLabel.setValue(5,this.mShowNum,3,1);

            var xsprite = this.getChildByTag(9009);
            if(xsprite){
            var countsize = numLabel.getShowSize()
                if(this.mSeat>0 && this.mSeat<3){
                    xsprite.setPosition(cc.p(1-11-countsize.width/2,0));
                }else{
                    xsprite.setPosition(cc.p(14-11-countsize.width/2,0));
                }
            }

        }
        if(num!=0){
            var coinsprite = this.getChildByTag(9001);
            if(coinsprite){
                var index = 6;//sGameData.mGameLogic.getCoinindex(this.mShowNum);
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
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 58)
        var pos1 = cc.p(size.width/2 + 272,size.height/2 - 80)
        var pos2 = cc.p(size.width/2 + 272,size.height/2 + 97)
        var pos3 = cc.p(size.width/2 - 272,size.height/2 + 97)
        var pos4 = cc.p(size.width/2 - 272,size.height/2 - 80)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var tpos = pos[this.mSeat]
        this.x = tpos.x
        this.y = tpos.y
    }
});
DNBetNumShow.create = function (seat) {
    var sg = new DNBetNumShow();
    if (sg) {
        sg.mSeat = seat;
        sg.init();
        return sg;
    }
    return null;
};
