/**
 * Created by Administrator on 14-5-22.
 * 显示操作 （看牌 弃牌等）
 */
var ZJHShowOP = cc.Node.extend({
    mPos:[],//位置
    mOPImgs:[null,null,null,null,null,null],//操作图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var pos =  sGameData.mZJHLayer.mZJHLogic.getOPPos()
            this.mPos = pos;

            var clen = sGameData.mZJHLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);

                var opimg = cc.Sprite.create("#zjh_msgpay1.png")
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);

                this.mOPImgs[i] = opimg;
            }
            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 操作图片  1跟注 2 加注 3看牌 4比牌 5弃牌 6准备 7 笑脸 8哭脸
     */
    showOPImage:function(seat,type){
        log("showOPImage="+seat+"|"+type)
        var opimg = this.mOPImgs[seat];
        opimg.setScale(1);
        if(type == 1){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgpay0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgpay1.png");
            }
        }else if(type == 2){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgaddpay0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgaddpay1.png");
            }
        }else if(type == 3){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgopencard0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgopencard1.png");
            }
        }else if(type == 4){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgpk0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgpk1.png");
            }
        }else if(type == 5){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgpass0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgpass1.png");
            }
        }else if(type == 6){
            if(seat == 1||seat==2){
                opimg.setSpriteFrame("zjh_msgready0.png");
            }else{
                opimg.setSpriteFrame("zjh_msgready1.png");
            }
        }else if(type == 7){
            opimg.setSpriteFrame("zjh_pkstatus0.png");
            opimg.setScale(0.5);
        }else if(type == 8){
            opimg.setSpriteFrame("zjh_pkstatus2.png");
            opimg.setScale(0.5);
        }
        opimg.setVisible(true);
        opimg.setOpacity(255);
        var pos = cc.p(this.mPos[seat].x,this.mPos[seat].y);
        opimg.setPosition(cc.p(pos.x,pos.y+10));
        opimg.stopAllActions();
        if(type == 7 || type == 8){
            opimg.setScale(0.1);
            var scaleanim = cc.ScaleTo.create(0.2,0.5);
            var topos = cc.p(pos.x,pos.y+60);
            var fadeanim = cc.FadeOut.create(0.5);
            var callback = cc.CallFunc.create(this.showAnimOver, this);
            var actions = cc.Sequence.create(scaleanim,cc.DelayTime.create(1.3), fadeanim, callback);
            opimg.runAction(actions);
        }else{
            opimg.setScale(0.1);
            var scaleanim = cc.ScaleTo.create(0.2,1);
            var topos = cc.p(pos.x,pos.y+60);
            var moveanim = cc.MoveTo.create(0.5, topos);
            var fadeanim = cc.FadeOut.create(0.5);
            var actions1 = cc.Spawn.create(moveanim,fadeanim)
            var callback = cc.CallFunc.create(this.showAnimOver, this);
            var actions = cc.Sequence.create(scaleanim,cc.DelayTime.create(1.3), actions1, callback);
            opimg.runAction(actions);
        }
    },
    //显示动画结束
    showAnimOver:function(opimg){
        opimg.setVisible(false);
    },
    //清除显示
    cleanOP:function(seat){
        var opimg = this.mOPImgs[seat];
        opimg.setVisible(false);
    },
    //清除全部
    cleanAll:function(){
        var clen = sGameData.mZJHLayer.MAX_PLAYERNUM;
        for(var i=0;i<clen;i++){
            this.cleanOP(i);
        }
    }
});
ZJHShowOP.create = function () {
    var sg = new ZJHShowOP();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};