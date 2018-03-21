/**
 * Created by Administrator on 14-4-28.
 */
//特效显示
var DDZEffects = cc.Node.extend({
    mIndex:0, //某位置
    effectSprite:null,//特效图
    mPos:[[0,250],[200,150],[200,150]],//坐标
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsprite = cc.Sprite.create("#blank.png");
            this.addChild(bgsprite, 0);
            this.effectSprite = bgsprite;

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示特效 type 0 炸弹 1火箭 2飞机 3连队 4顺子
    showEffect:function(type,seat,toseat){
        log("showEffect a=="+type+"|"+seat+"|"+toseat)
        if(toseat == -1){
            toseat = seat;
        }
        var size = cc.director.getWinSize();
        this.effectSprite.stopAllActions();
        this.effectSprite.setScale(1)
        if(type == 0){
            var poses = [[0,-50],[size.width/2-250,size.height/2-150],[-size.width/2+250,size.height/2-150]];
            this.effectSprite.setSpriteFrame("blank.png")
            this.effectSprite.setVisible(true);
            var pos = cc.p(poses[seat][0],poses[seat][1])
            this.effectSprite.setPosition(pos);
            //this.effectSprite.setPosition(cc.p(0,50));
            this.effectSprite.setScale(1.5)
            var animation = AnimationManager.getAnimation("ddzzhadan")
            if(animation!= null){
                var animate =  cc.Animate.create(animation);
                var anim1 = cc.Hide.create();
                var callback1 = cc.CallFunc.create(this.showSound, this);
                var callback = cc.CallFunc.create(this.showEffectEnd, this);
                var delay = cc.DelayTime.create(0.2)
                if(seat == toseat){
                    var actions = cc.Sequence.create(callback1,animate,anim1,delay,callback);
                    this.effectSprite.runAction(actions)
                }else{

                    var pic = getAnimFristFrameSprite("ddzzhadan");
                    this.effectSprite.setSpriteFrame(pic);

                    var tpos = cc.p(poses[toseat][0],poses[toseat][1])
                    var jumpanim = cc.JumpTo.create(0.5,tpos,150,1);
                    //var move = cc.MoveTo.create(0.3,tpos);
                    var actions = cc.Sequence.create(jumpanim,callback1,animate,anim1,delay,callback);
                    this.effectSprite.runAction(actions)
                }
            }
        }else if(type == 1){
            this.effectSprite.setSpriteFrame("ddz_huojian.png")
            this.effectSprite.setVisible(true);
            this.effectSprite.setPosition(cc.p(0,-size.height/2-250));
            var anim = cc.MoveTo.create(1.2,cc.p(0,+size.height/2+250));
            var anim1 = cc.Hide.create();
            var callback = cc.CallFunc.create(this.showEffectEnd, this);
            var delay = cc.DelayTime.create(0.2)
            var actions = cc.Sequence.create(anim,anim1,delay,callback);
            this.effectSprite.runAction(actions);
        }else if(type == 2){
            this.effectSprite.setSpriteFrame("ddz_feiji.png")
            this.effectSprite.setVisible(true);
            this.effectSprite.setPosition(cc.p(size.width/2+210,0));
            var anim = cc.MoveTo.create(0.8,cc.p(-size.width/2-210,0));
            var anim1 = cc.Hide.create();
            var callback = cc.CallFunc.create(this.showEffectEnd, this);
            var delay = cc.DelayTime.create(0.2)
            var actions = cc.Sequence.create(anim,anim1,delay,callback);
            this.effectSprite.runAction(actions);
        }else if(type == 3){
            var pos = this.getPos(seat);
            this.effectSprite.setSpriteFrame("ddz_liandui.png")
            this.effectSprite.setVisible(true);
            this.effectSprite.setPosition(cc.p(pos.x,pos.y));
            this.effectSprite.setScale(0.1);
            var anim = cc.ScaleTo.create(0.5,1.2);
            var anim1 = cc.ScaleTo.create(0.3,1);
            var anim2 = cc.Hide.create();
            var callback = cc.CallFunc.create(this.showEffectEnd, this);
            var delay = cc.DelayTime.create(0.2)
            var actions = cc.Sequence.create(anim,anim1,anim2,delay,callback);
            this.effectSprite.runAction(actions);
        }else if(type == 4){
            var pos = this.getPos(seat);
            this.effectSprite.setSpriteFrame("ddz_shunzi.png")
            this.effectSprite.setVisible(true);
            this.effectSprite.setPosition(cc.p(pos.x,pos.y));
            this.effectSprite.setScale(0.1);
            var anim = cc.ScaleTo.create(0.5,1.2);
            var anim1 = cc.ScaleTo.create(0.3,1);
            var anim2 = cc.Hide.create();
            var callback = cc.CallFunc.create(this.showEffectEnd, this);
            var delay = cc.DelayTime.create(0.5)
            var actions = cc.Sequence.create(anim,anim1,anim2,delay,callback);
            this.effectSprite.runAction(actions);
        }
    },
    showSound:function(){
        SoundManager.playSound(res.ddz_boom_mp3,false,SOUND_EFFECT);
    },
    //特效结束
    showEffectEnd:function(){
        if(sGameData.mDDZLayer){
            sGameData.mDDZLayer.showOutCardend()
        }

    },
    //获取位置
    getPos:function(seat){
        var size = cc.director.getWinSize();
        var pos = cc.p(0,0)
        if(seat == 0){
            pos.x = 0
            pos.y = -size.height/2 + this.mPos[seat][1];
        }else if(seat == 1){
            pos.x = size.width/2 - this.mPos[seat][0];
            pos.y = size.height/2 - this.mPos[seat][1];
        }else if(seat == 2){
            pos.x = -size.width/2 + this.mPos[seat][0];
            pos.y = size.height/2 - this.mPos[seat][1];
        }
        return pos;
    }

});
DDZEffects.create = function () {
    var sg = new DDZEffects();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
