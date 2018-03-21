/**
 * 显示 底分
 * Created by Administrator on 14-5-14.
 */

var DNShowBasePoint = cc.Node.extend({
    mDifenShow:null,//底分显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            //var bgimg = cc.Sprite.create("#dn_betCount.png")
            var betsize = cc.size(220,53);
            var bgimg = cc.Scale9Sprite.create();
            bgimg.initWithSpriteFrameName("dn_betCount.png");
            bgimg.setContentSize(betsize);
            bgimg.setOpacity(80);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize()


            var animg1 = cc.Sprite.create("#dn_w_danzhu.png")
            animg1.setPosition(cc.p(-60,2));
            this.addChild(animg1,1);

//            var difenLabel = cc.LabelTTF.create(sResWord.w_dn_difen+":", sGameData.mFontname,20);
//            difenLabel.attr({
//                x : -40,
//                y : 0+tempY_a
//            });
//            difenLabel.setColor(cc.color(255,255,0));
//            this.addChild(difenLabel, 1);


            var allbet = ShowNum.create();
            allbet.attr({
                x : 0,
                y : 2
            });
            this.addChild(allbet,2);
            this.mDifenShow = allbet;
            this.showAllBet();
            allbet.setScale(0.8);



            bRet = true;
        }
        return bRet;
    },
    //设置底分
    showAllBet:function(){
        var difen = sGameData.mDNLayer.mMinBet;
        this.mDifenShow.setValue(2,formatcash(difen),3,1);
    }
});
DNShowBasePoint.create = function () {
    var sg = new DNShowBasePoint();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
