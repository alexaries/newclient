/**
 * Created by apple on 14-7-3.
 * 显示要抢庄动画（一闪一闪）
 */

var DNShowQiangz = cc.Node.extend({
    mIndex:0, //某位置
    mIconSprites:[null,null,null,null,null],//显示图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var pos0 = cc.p(size.width/2 + 8,size.height/2 - 174)
            var pos1 = cc.p(size.width/2 + 280,size.height/2 - 0)
            var pos2 = cc.p(size.width/2 + 280,size.height/2 + 167)
            var pos3 = cc.p(size.width/2 - 280,size.height/2 + 167)
            var pos4 = cc.p(size.width/2 - 280,size.height/2 - 0)
            var faXY =  [pos0,pos1,pos2,pos3,pos4];
            this.mPos = faXY;

            var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++) {
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);
                var iconsprite = cc.Sprite.create("#dn_holdbank1.png")
                this.addChild(iconsprite)
                iconsprite.setPosition(cc.p(pos.x,pos.y+10));
                this.mIconSprites[i] = iconsprite;
                iconsprite.setVisible(false);
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示动画
    showAnim:function(seat){
        var iconsprite = this.mIconSprites[seat]
        iconsprite.stopAllActions();
        iconsprite.setVisible(true);

        var setpic1 = function(tar){
            tar.setSpriteFrame("dn_holdbank1.png")
        }
        var setpic2 = function(tar){
            tar.setSpriteFrame("dn_holdbank2.png")
        }
        var callback1 = cc.CallFunc.create(setpic1, this);
        var dealyanim = cc.DelayTime.create(0.2)
        var callback2 = cc.CallFunc.create(setpic2, this);
        var seq = cc.Sequence.create(callback1,dealyanim,callback2,dealyanim)
        iconsprite.runAction(cc.RepeatForever.create(seq));
    },
    //清除显示
    cleanOP:function(seat){
        var opimg = this.mIconSprites[seat];
        opimg.setVisible(false);
        opimg.stopAllActions();
    },
    //清除全部
    cleanAll:function(){
        var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
        for(var i=0;i<clen;i++){
            this.cleanOP(i);
        }
    }
});
DNShowQiangz.create = function () {
    var sg = new DNShowQiangz();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
