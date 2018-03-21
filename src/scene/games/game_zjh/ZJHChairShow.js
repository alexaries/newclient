/**
 * 显示椅子
 * Created by Administrator on 14-5-13.
 */

var ZJHChairShow = cc.Node.extend({
    mSeat:-1,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var pic = this.getChairPic(this.mSeat);
            var chairNormal =  cc.Sprite.create(pic);
            if(this.mSeat >= 3){
                chairNormal.setFlippedX(true);
            }
            this.addChild(chairNormal);

            this.setContentSize(chairNormal.getContentSize())
            var csize = this.getContentSize();

            var pos = this.getSitPos(this.mSeat);
            var playerSit =  cc.Sprite.create("#game_player_sit.png");
            playerSit.setPosition(pos)
            this.addChild(playerSit);
            if(sGameData.mUseRandomSit){
                playerSit.setVisible(false);
            }

            bRet = true;
        }
        return bRet;
    },
    //获取sit标志位置
    getSitPos:function(seat){
        var pos = cc.p(0,0);
        if(seat == 1){
            pos = cc.p(87,70);
        }else if(seat == 2){
            pos = cc.p(0,125);
        }else if(seat == 3){
            pos = cc.p(0,125);
        }else if(seat == 4){
            pos = cc.p(-87,70);
        }
        return pos;
    },
    //设置坐标
    setXY:function(){
        var size = cc.director.getWinSize();

        //log("this.mSeat="+this.mSeat)
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 174)
        var pos1 = cc.p(size.width/2 + 357,size.height/2 - 84)
        var pos2 = cc.p(size.width/2 + 290,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 290,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 357,size.height/2 - 84)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var tpos = pos[this.mSeat]
        this.x = tpos.x
        this.y = tpos.y
    },
    //获取椅子图片
    getChairPic:function(seat){
        var pic = "";
        if(seat == 0){
            pic = "#game_chair_5_vip.png";
        }else if(seat == 1||seat == 4){
            pic = "#game_chair_3_vip.png";
        }else if(seat == 2||seat == 3){
            pic = "#game_chair_1_vip.png";
        }
        return pic;
    }

});
ZJHChairShow.create = function (seat) {
    var sg = new ZJHChairShow();
    if (sg) {
        sg.mSeat = seat;
        sg.init()
        return sg;
    }
    return null;
};
