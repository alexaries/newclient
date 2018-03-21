/**
 * Created by apple on 14-6-23.
 * 显示等待
 */

var DDZWait = cc.Node.extend({
    mDot1sprite:null,//点1
    mDot2sprite:null,//点2
    mDot3sprite:null,//点3
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var wordsprite = cc.Sprite.create("#ddz_w_wait.png");
            this.addChild(wordsprite);

            var dot1sprite = cc.Sprite.create("#ddz_dot.png");
            this.addChild(dot1sprite);
            dot1sprite.setPosition(cc.p(130,-10));
            this.mDot1sprite = dot1sprite;

            var dot2sprite = cc.Sprite.create("#ddz_dot.png");
            this.addChild(dot2sprite);
            dot2sprite.setPosition(cc.p(160,-10));
            this.mDot2sprite = dot2sprite;

            var dot3sprite = cc.Sprite.create("#ddz_dot.png");
            this.addChild(dot3sprite);
            dot3sprite.setPosition(cc.p(190,-10));
            this.mDot3sprite = dot3sprite;

            this.showAnim();

            bRet = true;
        }
        return bRet;
    },
    //显示动画
    showAnim:function(){
        this.stopAnim()

        var delay1 = cc.DelayTime.create(0.4);
        var shownanim = cc.Show.create()
        var delay2 = cc.DelayTime.create(1.2);
        var hiddenanim = cc.Hide.create()
        var seq1 = cc.Sequence.create(delay1,shownanim,delay2,hiddenanim);
        this.mDot1sprite.runAction(cc.RepeatForever.create(seq1));

        var delay1 = cc.DelayTime.create(0.8);
        var shownanim = cc.Show.create()
        var delay2 = cc.DelayTime.create(0.8);
        var hiddenanim = cc.Hide.create()
        var seq1 = cc.Sequence.create(delay1,shownanim,delay2,hiddenanim);
        this.mDot2sprite.runAction(cc.RepeatForever.create(seq1));

        var delay1 = cc.DelayTime.create(1.2);
        var shownanim = cc.Show.create()
        var delay2 = cc.DelayTime.create(0.4);
        var hiddenanim = cc.Hide.create()
        var seq1 = cc.Sequence.create(delay1,shownanim,delay2,hiddenanim);
        this.mDot3sprite.runAction(cc.RepeatForever.create(seq1));

    },
    //停止动画
    stopAnim:function(){
        this.mDot1sprite.setVisible(false);
        this.mDot1sprite.stopAllActions();

        this.mDot2sprite.setVisible(false);
        this.mDot2sprite.stopAllActions();

        this.mDot3sprite.setVisible(false);
        this.mDot3sprite.stopAllActions();
    }

});
DDZWait.create = function () {
    var sg = new DDZWait();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
