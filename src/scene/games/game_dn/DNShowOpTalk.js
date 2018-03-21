/**
 * Created by apple on 14-7-3.
 * 显示操作 （talk形式）
 */

var DNShowOpTalk = cc.Node.extend({
    mIndex:0, //某位置
    mOPImgs:[null,null,null,null,null,null],//显示图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var pos0 = cc.p(size.width/2 + 8,size.height/2 - 174)
            var pos1 = cc.p(size.width/2 + 280,size.height/2 - 55)
            var pos2 = cc.p(size.width/2 + 280,size.height/2 + 110)
            var pos3 = cc.p(size.width/2 - 280,size.height/2 + 110)
            var pos4 = cc.p(size.width/2 - 280,size.height/2 - 55)
            var faXY =  [pos0,pos1,pos2,pos3,pos4];
            this.mPos = faXY;

            var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);
                var pic = "#dn_noSelBankLeftPop.png";
                if(i > 0&& i < 3){
                    pic = "#dn_noSelBankRightPop.png";
                }
                var opimg = cc.Sprite.create(pic)
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);
                this.mOPImgs[i] = opimg;

                //
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 操作图片    10抢庄 11不强
     */
    showOPImage:function(seat,type){
        var opimg = this.mOPImgs[seat];
        cc.log("showOPImage="+seat+"|"+type)
        if(type == 10){
            var pic = "dn_selBankLeftPop.png";
            if(seat > 0&& seat < 3){
                pic = "dn_selBankRightPop.png";
            }
            opimg.setSpriteFrame(pic);
        }else if(type == 11){
            var pic = "dn_noSelBankLeftPop.png";
            if(seat > 0&& seat < 3){
                pic = "dn_noSelBankRightPop.png";
            }
            opimg.setSpriteFrame(pic);
        }
        opimg.setVisible(true);

        opimg.setOpacity(255);
        var pos = cc.p(this.mPos[seat].x,this.mPos[seat].y);
        opimg.setPosition(cc.p(pos.x,pos.y));
        opimg.stopAllActions();

        opimg.setScale(0.1);
        var scaleanim = cc.ScaleTo.create(0.2,1);
        var topos = cc.p(pos.x,pos.y+60);
        var moveanim = cc.MoveTo.create(0.5, topos);
        var fadeanim = cc.FadeOut.create(0.5);
        var actions1 = cc.Spawn.create(moveanim,fadeanim)
        var callback = cc.CallFunc.create(this.showAnimOver, this);
        var actions = cc.Sequence.create(scaleanim,cc.DelayTime.create(1.3), actions1, callback);
        opimg.runAction(actions);

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
        var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
        for(var i=0;i<clen;i++){
            this.cleanOP(i);
        }
    }
});
DNShowOpTalk.create = function () {
    var sg = new DNShowOpTalk();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
