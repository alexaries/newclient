/**
 * Created by ban on 15/04/17.
 */

var DNQiangzhuangBeiShu = cc.Node.extend({
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
                var beishuNum = " ";
                var beishuLabel = cc.LabelTTF.create(beishuNum, sGameData.mFontname, 24,
                    cc.size(800,0),  //设置文本的宽高
                    cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                    cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                beishuLabel.x = size.width / 2;
                beishuLabel.y = 80;
                beishuLabel.setPosition(cc.p(pos.x,pos.y+10));
                this.addChild(beishuLabel, 6);
                this.mOPImgs[i] = beishuLabel;

                //
            }

            //xxx
            bRet = true;
        }
        return bRet;
    },
    /**
     * 显示 操作图片    10，一倍抢庄，12，两倍抢庄，13，四倍抢庄 11不抢
     */
    showOPImage:function(seat,type){
        var opLabel = this.mOPImgs[seat];
        cc.log("showOPImage="+seat+"|"+type)
        if(type == 10){
            opLabel.setString("x1");
        }else if(type == 11){
           // opLabel.setVisible(false);
        }else if(type == 12){
            opLabel.setString("x2");
        }else if(type == 13){
            opLabel.setString("x4");
        }
        opLabel.setVisible(true);

        if(type == 11){
            opLabel.setVisible(false);
        }

    },


    /**
     * 显示 操作图片    10，一倍抢庄，12，两倍抢庄，13，四倍抢庄 11不抢
     */
    showOPBetNum:function(seat,bankbet){
        var opLabel = this.mOPImgs[seat];
        cc.log("showOPImage="+seat+"|"+bankbet)
        if(bankbet == 1){
            opLabel.setString("x1");
        }else if(bankbet == 2) {
            opLabel.setString("x2");
        }else if(bankbet == 4){
            opLabel.setString("x4");
        }
        opLabel.setVisible(true);
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

DNQiangzhuangBeiShu.create = function () {
    var sg = new DNQiangzhuangBeiShu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};