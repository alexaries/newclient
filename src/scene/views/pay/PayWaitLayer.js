/**
 * Created by ban on 31/12/16.
 */
var PayWaitLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size = cc.director.getWinSize();
            var bgSprite = cc.Sprite.create("#netload_bg.png");//
            this.addChild(bgSprite);
            var animsprite = cc.Sprite.create("#blank.png");
            this.addChild(animsprite);
            var animation = AnimationManager.getAnimation("netwait")
            if(animation!= null){
                var animate =  cc.Animate.create(animation);
                animsprite.runAction(cc.RepeatForever.create(animate));
            }

            setClickSwallows(this);
            bRet = true;

        }
        return bRet;
    },
    //进入时执行
    onEnter:function(){
        this._super();
        log("on enter notice")
    },
    //退出时执行
    onExit:function(){
        this._super();
        log("on exit notice")

    },

    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    }
});
PayWaitLayer.create = function () {
    var sg = new PayWaitLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

