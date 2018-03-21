/**
 * 显示牌型 和 明牌 弃牌
 * Created by Administrator on 14-5-14.
 */
var ZJHShowCardType = cc.Node.extend({
    mPos:[],//位置
    mOPImgs:[null,null,null,null,null,null],//类型图
    mBGImgs:[null,null,null,null,null,null],//背景图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var pos =  sGameData.mZJHLayer.mZJHLogic.getCardTypePos();
            this.mPos = pos;

            var clen = sGameData.mZJHLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);

                var bgsprite =  cc.Sprite.create("#zjh_type_bar.png");
                this.addChild(bgsprite);
                bgsprite.setPosition(cc.p(pos.x,pos.y+10));
                bgsprite.setVisible(false);
                this.mBGImgs[i] = bgsprite
                bgsprite.setScaleX(0.5);
                bgsprite.setScaleY(0.6);

                var opimg = cc.Sprite.create("#zjh_seecard.png")
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);


                this.mOPImgs[i] = opimg;
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 类型图片  20看牌 21弃牌 22比输 30准备
     */
    showTypeImage:function(seat,type){
        var opimg = this.mOPImgs[seat];
        if(type == 20){
            opimg.setSpriteFrame("zjh_seecard.png");
        }else if(type == 21){
            opimg.setSpriteFrame("zjh_discard.png");
        }else if(type == 22){
            opimg.setSpriteFrame("zjh_compareLose.png");
        }else if(type == 30){
            opimg.setSpriteFrame("zjh_readystatus.png");
        }else if(type == 0){
            opimg.setSpriteFrame("type_zjh_shanp.png");
        }else if(type == 1){
            opimg.setSpriteFrame("type_zjh_zahua.png");
        }else if(type == 2){
            opimg.setSpriteFrame("type_zjh_duiz.png");
        }else if(type == 3){
            opimg.setSpriteFrame("type_zjh_shunz.png");
        }else if(type == 4){
            opimg.setSpriteFrame("type_zjh_jinhua.png");
        }else if(type == 5){
            opimg.setSpriteFrame("type_zjh_shunjin.png");
        }else if(type == 6){
            opimg.setSpriteFrame("type_zjh_baoz.png");
        }
        opimg.setVisible(true);

        var bgimg = this.mBGImgs[seat];
        if(type < 20){
            bgimg.setVisible(true);
        }else{
            bgimg.setVisible(false);
        }
    },
    //清除显示
    cleanOP:function(seat){
        var opimg = this.mOPImgs[seat];
        opimg.setVisible(false);
        var bgimg = this.mBGImgs[seat];
        bgimg.setVisible(false);
    },
    //清除全部
    cleanAll:function(){
        var clen = sGameData.mZJHLayer.MAX_PLAYERNUM;
        for(var i=0;i<clen;i++){
            this.cleanOP(i);
        }
    }
});
ZJHShowCardType.create = function () {
    var sg = new ZJHShowCardType();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
