/**
 * Created by Administrator on 14-4-21.
 */
//显示操作 图片
var DDZShowOP = cc.Node.extend({
    mCanShow:[0,0,0], //能否显示
    mPos:[[0,250],[200,125],[200,125]],//位置
    mBGImgs:[null,null,null],//背景
    mOPImgs:[null,null,null],//操作图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            for(var i=0;i<3;i++){
                var pos = this.getPos(i);
                var bgimg = cc.Sprite.create("#pop.png")
                bgimg.setPosition(pos);
                if(i==1){
                    bgimg.setFlippedX(true);
                }
                this.addChild(bgimg);
                bgimg.setVisible(false);
                this.mBGImgs[i] = bgimg;
                var opimg = cc.Sprite.create("#ddz_buchu_r.png")
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);
                this.mOPImgs[i] = opimg;


            }
            bRet = true;
        }
        return bRet;
    },
    //获取位置
    getPos:function(seat){
        var size = cc.director.getWinSize();
        var pos = cc.p(0,0)
        if(seat == 0){
            pos.x = size.width/2
            pos.y = this.mPos[seat][1];
        }else if(seat == 1){
            pos.x = size.width - this.mPos[seat][0];
            pos.y = size.height - this.mPos[seat][1];
        }else if(seat == 2){
            pos.x = this.mPos[seat][0];
            pos.y = size.height - this.mPos[seat][1];
        }
        return pos;
    },
    /**
     * 显示 操作图片  1:1分 2:2分 3:3分 4不出 5不叫  6加倍 7不加倍
     * 11 看牌 12闷抓 13叫牌 14不叫 15倒 16不倒 17拉 18不拉
     */
    showOPImage:function(seat,type){
        var opimg = this.mOPImgs[seat];
        if(type == 1){
            if(seat==1){
                opimg.setSpriteFrame("ddz_1fen_r.png");
            }else{
                opimg.setSpriteFrame("ddz_1fen_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 2){
            if(seat==1){
                opimg.setSpriteFrame("ddz_2fen_r.png");
            }else {
                opimg.setSpriteFrame("ddz_2fen_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 3){
            if(seat==1){
                opimg.setSpriteFrame("ddz_3fen_r.png");
            }else {
                opimg.setSpriteFrame("ddz_3fen_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 4){
            if(seat==1){
                opimg.setSpriteFrame("ddz_buchu_r.png");
            }else {
                opimg.setSpriteFrame("ddz_buchu_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 5){
            if(seat==1){
                opimg.setSpriteFrame("ddz_bujiao_r.png");
            }else {
                opimg.setSpriteFrame("ddz_bujiao_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 6){
            if(seat==1){
                opimg.setSpriteFrame("ddz_jiabei_r.png");
            }else {
                opimg.setSpriteFrame("ddz_jiabei_l.png");
            }
            opimg.setVisible(true);
        }else if(type == 7){
            if(seat==1){
                opimg.setSpriteFrame("ddz_bujiabei_r.png");
            }else {
                opimg.setSpriteFrame("ddz_bujiabei_l.png");
            }
            opimg.setVisible(true);
        }
        if(type >10 || type == 4) {
            opimg.setScale(0.8);
        }else{
            opimg.setScale(1);
        }
        //var bgimg = this.mBGImgs[seat];
        //bgimg.setVisible(true);
    },
    //清除显示
    cleanOP:function(seat){
        var opimg = this.mOPImgs[seat];
        opimg.setVisible(false);
        var bgimg = this.mBGImgs[seat];
        bgimg.setVisible(false);
    },
    //清除显示
    cleanAll:function(seat){
        this.cleanOP(0);
        this.cleanOP(1);
        this.cleanOP(2);
    }
});
DDZShowOP.create = function () {
    var sg = new DDZShowOP();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};