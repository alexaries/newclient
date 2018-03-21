/**
 * Created by apple on 14-7-4.
 * 显示输赢
 */

var DNShowWinLose = cc.Node.extend({
    mIndex:0, //某位置
    mResultsprite:null,//结果图
    mSoundId:0,//播放的音效id
    mNiuNode:null,//显示牛的节点
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var niunode = cc.Node.create();
            this.addChild(niunode);
            this.mNiuNode = niunode;

            var niusprite = cc.Sprite.create("#dn_niu.png")
            niunode.addChild(niusprite)
            niusprite.setAnchorPoint(cc.p(0,0));
            niusprite.setPosition(cc.p(20,-50))

            var bgsprite = cc.Sprite.create("#dn_hintResult.png")
            this.addChild(bgsprite)
            bgsprite.setAnchorPoint(cc.p(0,0));
            bgsprite.setPosition(cc.p(0,15))
            bgsprite.setScaleX(size.width/bgsprite.getContentSize().width);


            var resultsprite = cc.Sprite.create("#dn_win_text.png")
            this.addChild(resultsprite,5)
            resultsprite.setAnchorPoint(cc.p(0,0));
            resultsprite.setPosition(cc.p(150,28))
            this.mResultsprite = resultsprite;
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示输赢结果 type 1win 2lose
    showResult:function(type){
//        if(type == 1){
//            this.mResultsprite.setSpriteFrame("dn_win_text.png");
//            this.mSoundId = SoundManager.playSound(res.dn_gamewin_mp3);
//        }else{
//            this.mResultsprite.setSpriteFrame("dn_lose_text.png");
//            this.mSoundId = SoundManager.playSound(res.dn_gamelost_mp3);
//        }
        this.mResultsprite.setVisible(false);

        var time = 0;
        var _armature1 = this.mNiuNode.getChildByTag(10081);
        if(_armature1){
            this.mNiuNode.removeChild(_armature1);
        }

        var animend = function(tar){
            //cc.log("animend");
            time ++;
//            if(time > 3){
//                tar.getAnimation().stop();
//            //tar.getParent().removeChild(tar);
//            }
        }
        var aname = "nnLose";
        if(type == 1){
            aname = "nnWin";
        }
        var _armature = ccs.Armature.create(aname);
        _armature.getAnimation().playWithIndex(0);
        if(type == 1) {
            _armature.x = 119;
            _armature.y = 145;
        }else{
            _armature.x = 100;
            _armature.y = 145;
        }
        _armature.getAnimation().setMovementEventCallFunc(animend,this);
        this.mNiuNode.addChild(_armature,88,10081);

        var showend = function(tar){
            this.mResultsprite.setVisible(true);
            if(type == 1){
                this.mResultsprite.setSpriteFrame("dn_win_text.png");
                this.mSoundId = SoundManager.playSound(res.dn_gamewin_mp3);
            }else{
                this.mResultsprite.setSpriteFrame("dn_lose_text.png");
                this.mSoundId = SoundManager.playSound(res.dn_gamelost_mp3);
            }
        }

        var size = cc.director.getWinSize();
        this.mNiuNode.stopAllActions();
        this.mNiuNode.setPosition(cc.p(size.width,0));
        var moveanim = cc.MoveTo.create(0.6,cc.p(0,0));
        var callback = cc.CallFunc.create(showend, this);
        var seq = cc.Sequence.create(moveanim,callback)
        this.mNiuNode.runAction(seq);

    },
    //停止动画
    stopAnim:function(){
        var _armature1 = this.mNiuNode.getChildByTag(10081);
        if(_armature1){
            _armature1.getAnimation().stop();
            this.mNiuNode.removeChild(_armature1);
        }
        this.stopSound();
    },
    //停止声音
    stopSound:function(){
        if(this.mSoundId > 0){
            SoundManager.stopSound(this.mSoundId);
            this.mSoundId = 0;
        }
    }
});
DNShowWinLose.create = function () {
    var sg = new DNShowWinLose();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
