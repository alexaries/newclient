/**
 * Created by Administrator on 14-5-27.
 */
//椅子显示
var ItemHChair = cc.Node.extend({
    mTableType:0,//0： 5人， 1:9人
    mShowVip:0,
    mSeat:-1,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var pic = this.getChairPic(this.mSeat);
            var chairNormal =  cc.Sprite.create(pic);
            if(this.mTableType == TABLE_TYPE_5){
                if(this.mSeat >= 3){
                    chairNormal.setFlippedX(true);
                }
            }else{
                if(this.mSeat >= 1 && this.mSeat<5){
                    chairNormal.setFlippedX(true);
                }
            }
            this.addChild(chairNormal);
            chairNormal.setScale(0.7);


            bRet = true;
        }
        return bRet;
    },
    //获取椅子图片
    getChairPic:function(seat){
        var pic = "";

        var temp = "";
        if(this.mShowVip){
            temp = "_vip";
        }

        if(this.mTableType == TABLE_TYPE_9){
            pic = "#game_chair_5"+temp+".png";
            if(seat == 0){
                pic = "#game_chair_5"+temp+".png";
            }else if(seat == 1||seat == 8){
                pic = "#game_chair_4"+temp+".png";
            }else if(seat == 2||seat == 7){
                pic = "#game_chair_3"+temp+".png";
            }else if(seat == 3||seat == 6){
                pic = "#game_chair_2"+temp+".png";
            }else if(seat == 4||seat == 5){
                pic = "#game_chair_1"+temp+".png";
            }
        }else{
            pic = "#game_chair_5"+temp+".png";
            if(seat == 0){
                pic = "#game_chair_5"+temp+".png";
            }else if(seat == 1||seat == 4){
                pic = "#game_chair_3"+temp+".png";
            }else if(seat == 2||seat == 3){
                pic = "#game_chair_1"+temp+".png";
            }
        }
        return pic;
    }
});
ItemHChair.create = function (seat,tabletype,showvip) {
    var sg = new ItemHChair();
    if (sg) {
        sg.mSeat = seat;
        sg.mTableType = tabletype;
        sg.mShowVip = showvip;
        sg.init();
        return sg;
    }
    return null;
};