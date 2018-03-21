/**
 * Created by Administrator on 14-4-21.
 */
//玩家手里牌的数量
var DDZCardCount = cc.Node.extend({
    mNumShow:null,//数量显示
    mFlashsprite:null,//闪烁的图片
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsprite = cc.Sprite.create("#ddz_card_counter.png");
            bgsprite.attr({
                anchorX:0.5,
                anchorY:1
            });
            this.addChild(bgsprite, 0);

            var flashsprite = cc.Sprite.create("#ddz_card_counter_1.png");
            flashsprite.attr({
                anchorX:0.5,
                anchorY:1
            });
            this.addChild(flashsprite, 0);
            flashsprite.setVisible(false);
            this.mFlashsprite = flashsprite;

//            var tiplabel = cc.LabelTTF.create("0", sGameData.mFontname, 24);
//            tiplabel.setPosition(cc.p(0,- bgsprite.height*0.6));
//            tiplabel.setColor(cc.color(0,0,0));
//            this.addChild(tiplabel,1);
//            this.mNumlabel = tiplabel;

            var countshow = ShowNum.create();
            countshow.setPosition(cc.p(0,- bgsprite.height*0.6));
            countshow.setScale(0.8)
            this.addChild(countshow,1);
            countshow.setValue(3,0,3,1);
            this.mNumShow = countshow
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置数量
    setCount:function(count){
        //this.mNumlabel.setString(""+count);
        this.mNumShow.setValue(3,count,3,1);
    },
    //报警时闪烁
    setFlash:function(){
        var flashsprite = this.mFlashsprite
        flashsprite.setVisible(true);
        flashsprite.setOpacity(0);
        flashsprite.stopAllActions();
        var fadeanim = cc.FadeOut.create(0.5);
        var fadeanim1 = cc.FadeIn.create(0.5);
        var seq = cc.Sequence.create(fadeanim1,fadeanim);
        flashsprite.runAction(cc.RepeatForever.create(seq));
    },
    //停止闪烁
    stopFlash:function(){
        var flashsprite = this.mFlashsprite
        flashsprite.setVisible(false);
        flashsprite.setOpacity(255);
        flashsprite.stopAllActions();
    }


});
DDZCardCount.create = function () {
    var sg = new DDZCardCount();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
