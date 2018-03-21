/**
 * 显示牌型
 * Created by Administrator on 14-5-16.
 */

var DNShowCardType = cc.Node.extend({
    mPos:[], //位置
    mOPImgs:[null,null,null,null,null,null], //显示图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var pos0 = cc.p(size.width/2 + 100,size.height/2 - 212)
            var pos1 = cc.p(size.width/2 + 247,size.height/2 - 30)
            var pos2 = cc.p(size.width/2 + 247,size.height/2 + 120)
            var pos3 = cc.p(size.width/2 - 234,size.height/2 + 120)
            var pos4 = cc.p(size.width/2 - 234,size.height/2 - 30)
            var faXY =  [pos0,pos1,pos2,pos3,pos4];
            this.mPos = faXY;

            var clen = sGameData.mDNLayer.MAX_PLAYERNUM;
            for(var i=0;i<clen;i++){
                var pos = cc.p(this.mPos[i].x,this.mPos[i].y);


                var opimg = cc.Sprite.create("#dn_niu0.png")
                opimg.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(opimg);
                opimg.setVisible(false);
                if(i>0){
                    opimg.setScale(0.7)
                }


                this.mOPImgs[i] = opimg;
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 牌型图片
     */
    showTypeImage:function(seat,type,showanim){
        if(showanim == null){
            showanim = false;
        }
        var opimg = this.mOPImgs[seat];

        var DN_CARDTYPES_IMG =
            ["dn_niu0.png","dn_niu1.png","dn_niu2.png","dn_niu3.png","dn_niu4.png",
                "dn_niu5.png","dn_niu6.png","dn_niu7.png","dn_niu8.png","dn_niu9.png",
                "dn_niu10.png","dn_niu11.png","dn_niu12.png","dn_niu13.png","dn_niu14.png"];
        var pic = DN_CARDTYPES_IMG[type];
        opimg.setSpriteFrame(pic);
        opimg.setVisible(true);
        if(cc.sys.os == cc.sys.OS_WINDOWS){  //win 播放动画 有bug
            showanim = false;
        }
        if(showanim&&type > 9){
            var animend = function(tar){
                cc.log("animend");
                if(cc.sys.os == cc.sys.OS_WINDOWS){
                    tar.getAnimation().stop();
                    tar.getParent().removeChild(tar);
                }else{
                    tar.getAnimation().stop();
                    tar.getParent().removeChild(tar);
                }
                sGameData.mDNLayer.showFenpaiEnd();
            }

            var aname = "Ox_10";
            var sound = res.dn_anim_ox_10_mp3;
            if(type == 11){
                aname = "color_4";
                sound = res.dn_anim_ox_11_mp3;
            }else if(type == 12){
                aname = "color_5";
                sound = res.dn_anim_ox_11_mp3;;
            }else if(type == 13){
                aname = "bomb";
                sound = res.dn_anim_ox_13_mp3;
            }else if(type == 14){
                aname = "small";
                sound = "";
            }
            var pos = this.mPos[seat];
            var _armature = ccs.Armature.create(aname);
            _armature.getAnimation().playWithIndex(0);
            _armature.x = pos.x;
            _armature.y = pos.y;
            _armature.getAnimation().setMovementEventCallFunc(animend,this);

            _armature.setScale(0.8);
            this.addChild(_armature,88);

            if(sound.length > 0){
                SoundManager.playSound(sound);
            }
        }

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
DNShowCardType.create = function () {
    var sg = new DNShowCardType();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
