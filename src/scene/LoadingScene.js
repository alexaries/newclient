/**
 * Created by apple on 14-8-4.
 * 过渡界面
 * （避免2个场景直接切换时内存溢出）
 */

var LoadingScene = BaseScene.extend({
    mLastTargetScene:-1,//上1场景
    mTargetScene:-1,//目标场景
    mData:-1,//传递的参数
    init:function () {
        var bRet = false;
        if (this._super()) {

            log("LoadingScene--start");

            sGameData.mLoadingScene = this;
            sGameData.mCurrScene = this;

            var size = cc.director.getWinSize();


            var tipcolor = sGameData.mTipColor;
            var loadlogo = res.init_logo_png;
            //res.g_loading_logo_fsz_png,
            var shownormal = true;

            if(shownormal){
                if(sGameData.mAppLoadUseBG) {
                    cc.spriteFrameCache.addSpriteFrames(res.mainbg_plist);

                    var bgimg = cc.Sprite.create("#mainbg.png")
                    bgimg.setPosition(cc.p(size.width / 2, size.height / 2))
                    this.addChild(bgimg);
                    if(sGameData.mAppMainBGScale) {
                        bgimg.setScaleX(size.width / bgimg.width)
                        bgimg.setScaleY(size.height / bgimg.height)
                    }
                }
            }else{
                tipcolor = cc.color(255,255,255);
            }

         
            var logoimg = cc.Sprite.create(loadlogo);
                                if(logoimg){
                                    logoimg.attr({
                                                 x:size.width *0.5,
                                                 y: size.height *0.5
                                                 });
                                    this.addChild(logoimg,1);
                                }
            AnimationManager.initAllViewAnim();

            var tipLabel = cc.LabelTTF.create(sResWord.w_loading+"...", sGameData.mFontname, 24);
            tipLabel.x = size.width / 2;
            tipLabel.y = 30;
            this.addChild(tipLabel, 6);
            //tipLabel.setColor(cc.color(0,0,0));
            tipLabel.setColor(tipcolor);

            var animsprite = cc.Sprite.create(res.tblank_png);
            animsprite.setPosition(cc.p(size.width / 2,120));
            this.addChild(animsprite);
            var animation = AnimationManager.getAnimation("netwait")
            if(animation!= null){

                var frame = animation.getFrames()[0];
                var sprite = frame.getSpriteFrame()
                animsprite.setSpriteFrame(sprite);
                var animate =  cc.Animate.create(animation);
                animsprite.runAction(cc.RepeatForever.create(animate));
            }

            if(sGameData.mDelayLoadingForEnterGame){
                sGameData.mDelayLoadingForEnterGame = false;
                var randomDelayTime = 1 + Math.random()*3;
                this.scheduleOnce(this.initInSecondFrame,randomDelayTime);
            }else{
                this.scheduleOnce(this.initInSecondFrame,0.05);
            }

            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mLoadingScene = null;
    },
    //第2帧时执行
    initInSecondFrame:function(){
        log("loading --toscene= "+this.mTargetScene);
        removeSpriteChangeScene();
        loadSceneByTarget(this.mTargetScene,this.mData)
    }
});

LoadingScene.create = function (targetScene,data) {
    var sg = new LoadingScene();
    if (sg) {
        sg.mTargetScene = targetScene;
        sg.mData = data;
        sg.init()
        return sg;
    }
    return null;
};

LoadingScene.scene = function (targetScene,data) {
    var scene = cc.Scene.create();
    var layer = LoadingScene.create(targetScene,data);
    scene.addChild(layer);
    return scene;
};

