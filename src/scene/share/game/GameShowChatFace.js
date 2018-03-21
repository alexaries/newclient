/**
 * Created by apple on 15-12-9.
 */
//显示表情
var GameShowChatFace = cc.Node.extend({
    mIndex:0, //某位置
    mPos:[[0,250],[200,150],[200,150]],//位置
    mOPImgs:[null,null,null],//显示表情图
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            if(this.mGameType == 1) {
                this.mPos = [[size.width/2 - 47,size.height/2 - 174],
                    [size.width/2 - 237,size.height/2 - 174],
                    [size.width/2 - 411,size.height/2 - 64],
                    [size.width/2 - 380,size.height/2 + 142],
                    [size.width/2 - 196,size.height/2 + 230],
                    [size.width/2 + 196,size.height/2 + 230],
                    [size.width/2 + 380,size.height/2 + 142],
                    [size.width/2 + 403,size.height/2 - 64],
                    [size.width/2 +234,size.height/2 - 174]];
            }else if(this.mGameType == 2) {
                this.mPos = [[size.width/2,130],
                    [size.width-200,size.height-365],
                    [size.width-200,size.height-170],
                    [200,size.height-170],
                    [200,size.height-365]];
            }else if(this.mGameType == 3) {
                this.mPos = [[size.width/2 + 28,size.height/2 - 100],
                    [size.width/2 + 280,size.height/2 - 4],
                    [size.width/2 + 280,size.height/2 + 130],
                    [size.width/2 - 280,size.height/2 + 130],
                    [size.width/2 - 280,size.height/2 - 4]];
            }else if(this.mGameType == 4||this.mGameType == 7) {
                this.mPos = [[size.width/2,250],[size.width - 200,size.height - 150],[200,size.height - 150]];
            }else if(this.mGameType == 5) {
                this.mPos = [[size.width/2,150],
                    [size.width-150,size.height/2],
                    [size.width/2,size.height-150],
                    [150,size.height/2]];
            }else if(this.mGameType == 6) {
                this.mPos = [[size.width/2,150],
                    [size.width-150,size.height/2],
                    [size.width/2,size.height-150],
                    [150,size.height/2]];
            }

            var clen = sGameData.mCurrLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = this.getPos(i);

                var opimg = cc.Sprite.create("#face_01.png")
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
        pos.x = this.mPos[seat][0];
        pos.y = this.mPos[seat][1];
        return pos;
    },
    /**
     * 显示 表情图片
     */
    showFaceImage:function(seat,index){
        log("showFaceImage="+seat+"|"+index)
        var opimg = this.mOPImgs[seat];
        index = index+1;
        var picname =  "face_"+index+".png";
        if(index<10){
            picname =  "face_0"+index+".png";
        }
        opimg.setSpriteFrame(picname);
        opimg.setVisible(true);
        opimg.setOpacity(255);
        var pos = this.getPos(seat);
        opimg.setPosition(cc.p(pos.x,pos.y+10));
        opimg.stopAllActions()

        var delay = cc.DelayTime.create(0.5);
        var moveto = cc.MoveTo.create(0.3,cc.p(pos.x,pos.y+20));
        var moveto1 = cc.MoveTo.create(0.3,cc.p(pos.x,pos.y));
        var delay1 = cc.DelayTime.create(0.3);
        var fade = cc.FadeOut.create(0.4);

        var seq = cc.Sequence.create(delay,moveto,moveto1,moveto,moveto1,delay1,fade);
        opimg.runAction(seq);

    },
    //显示结束
    showAnimOver:function(opimg){
        opimg.setVisible(false);
    },
    //清除显示
    cleanOP:function(seat){
        var opimg = this.mOPImgs[seat];
        opimg.setVisible(false);
    },
    //清除显示
    cleanAll:function(){
        var clen = sGameData.mCurrLayer.MAX_PLAYERNUM;
        for(var i=0;i<clen;i++){
            this.cleanOP(i);
        }
    }
});
GameShowChatFace.create = function (gametype) {
    var sg = new GameShowChatFace();
    if (sg) {
        sg.mGameType = gametype;
        sg.init()
        return sg;
    }
    return null;
};
