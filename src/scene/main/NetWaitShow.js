/**
 * Created by apple on 14-6-18.
 * 网络等待时 菊花
 * 0.3s 无回应 后显示等待动画
 */
var NetWaitShow = cc.Node.extend({
    mType:0,//0 网络加载 1界面加载
    mBgSprite:null,//背景
    mAnimsprite:null,//动画图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgSprite = cc.Sprite.create("#netload_bg.png");//
            this.addChild(bgSprite);
            this.mBgSprite = bgSprite;
            bgSprite.setVisible(false)

            var animsprite = cc.Sprite.create("#blank.png");
            this.addChild(animsprite);
            var animation = AnimationManager.getAnimation("netwait")
            if(animation!= null){
                var animate =  cc.Animate.create(animation);
                animsprite.runAction(cc.RepeatForever.create(animate));
            }
            this.mAnimsprite = animsprite;
            animsprite.setVisible(false)

            if(this.mType == 1){
                var versionLabel = cc.LabelTTF.create(sResWord.w_loading+"...", sGameData.mFontname, 24);
                versionLabel.x = 0;
                versionLabel.y = -40;
                this.addChild(versionLabel, 5);
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //开始动画
    startAnim:function(){ //0.3s 后显示等待动画
        var delay = cc.DelayTime.create(0.5);
        var callback = cc.CallFunc.create(this.showAnim, this);
        var actions = cc.Sequence.create(delay,callback);
        this.runAction(actions);
    },
    //显示
    showAnim:function(){
        this.stopAllActions();
        //log("showAnim--show net load")
        this.mBgSprite.setVisible(true);
        this.mAnimsprite.setVisible(true);
    },
    //停止动画
    stopAnim:function(){
        //log("showAnim--hidden net load")
        this.stopAllActions();
        this.mBgSprite.setVisible(false);
        this.mAnimsprite.setVisible(false);
    }
});
NetWaitShow.create = function (type) {
    if(type == null){
        type = 0;
    }
    var sg = new NetWaitShow();
    if (sg) {
        sg.mType = type;
        sg.init()
        return sg;
    }
    return null;
};
