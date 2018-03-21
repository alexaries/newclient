/**
 * 显示用户操作 抢庄 不抢  投注倍数
 * Created by Administrator on 14-5-16.
 */

var DNShowOP = cc.Node.extend({
    mPos:[],//位置
    mOPImgs:[null,null,null,null,null,null],//显示图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            //var pos0 = cc.p(size.width/2 - 107,size.height/2 - 51)
            //var pos1 = cc.p(size.width/2 + 272,size.height/2 - 80)
            //var pos2 = cc.p(size.width/2 + 272,size.height/2 + 37)
            //var pos3 = cc.p(size.width/2 - 272,size.height/2 + 37)
            //var pos4 = cc.p(size.width/2 - 272,size.height/2 - 80)

            var pos0 = cc.p(size.width/2 - 107,size.height/2 - 51)
            var pos1 = cc.p(size.width/2 + 247,size.height/2 - 30)
            var pos2 = cc.p(size.width/2 + 247,size.height/2 + 120)
            var pos3 = cc.p(size.width/2 - 234,size.height/2 + 120)
            var pos4 = cc.p(size.width/2 - 234,size.height/2 - 30)

            var faXY =  [pos0,pos1,pos2,pos3,pos4];
            this.mPos = faXY;

            var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);
                var opimg = cc.Sprite.create("#dn_noSelBank_text.png")
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);
                this.mOPImgs[i] = opimg;

                //
            }

            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 操作图片  （0-4）（12345倍）  10抢庄 11不强 12 准备
     */
    showOPImage:function(seat,type){
        var opimg = this.mOPImgs[seat];
        cc.log("showOPImage="+seat+"|"+type)
        if(type == 10){
            opimg.setSpriteFrame("dn_selBank_text.png");
        }else if(type == 11){
            opimg.setSpriteFrame("dn_noSelBank_text.png");
        }else if(type == 12){
            opimg.setSpriteFrame("dn_readystatus.png");
        }
        if(type > 9){
            opimg.setVisible(true);
        }
    },
    //清除操作
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
DNShowOP.create = function () {
    var sg = new DNShowOP();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
