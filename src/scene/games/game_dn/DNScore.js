/**
 * Created by Administrator on 14-5-21.
 * 得分
 */
var DNScore = cc.Node.extend({
    mPos:[],//位置坐标
    mShowNums:[],//显示的数字
    mNodes:[],//基准节点
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

//            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
//            //colorlayer.setPosition(cc.p(size.width/2,size.height/2));
//            this.addChild(colorlayer);

            var pos0 = cc.p(size.width/2 - 107,size.height/2 - 154)
            var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
            var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
            var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
            var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
            var faXY =  [pos0,pos1,pos2,pos3,pos4];
            this.mPos = faXY;

            var len = sGameData.mDNLayer.MAX_PLAYERNUM;
            for( var i = 0;i<len;i++){
                var pos = this.mPos[i];

                var node = cc.Node.create();
                node.setPosition(cc.p(0,-40));
                this.addChild(node);


                var bgsprite = cc.Scale9Sprite.create();

                var score = 200000;
                var vstr = ""+score;
                if(vstr > 0){
                    vstr = "+"+score;
                }
                var slen = vstr.length
                var twidth = 40+slen*36;

                if(i>0&&i<3){
                    bgsprite.initWithSpriteFrameName("dn_hintScore4.png");
                    bgsprite.setAnchorPoint(cc.p(1,0.5));
                    bgsprite.setPosition(cc.p(pos.x+65,pos.y-7));
                }else{
                    bgsprite.initWithSpriteFrameName("dn_hintScore2.png");
                    bgsprite.setAnchorPoint(cc.p(0,0.5));
                    bgsprite.setPosition(cc.p(pos.x-65,pos.y-7));
                }
                bgsprite.setContentSize(cc.size(twidth,87));
                node.addChild(bgsprite)
                bgsprite.setTag(9001);




                var showNum0 = ShowNum.create();
                if(i>0&&i<3) {
                    showNum0.setPosition(cc.p(pos.x + 25, pos.y));
                }else{
                    showNum0.setPosition(cc.p(pos.x - 25, pos.y));
                }
                node.addChild(showNum0);
                if(i>0&&i<3){
                    showNum0.setValue(8,score,2);
                }else{
                    showNum0.setValue(9,score,1);
                }
                //showNum0.setVisible(false);
                this.mShowNums[i] = showNum0;

                this.mNodes[i] = node;
                node.setVisible(false);

            }
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置得分数据
    setValue:function(sdata){
        for(var i = 0;i<sdata.length;i++){
            var scored = sdata[i]
            var c = scored.chairId
            var score = scored.currScore
            var seat = sGameData.mDNLayer.getPlayerSeatByChairId(c)
            var showNum0 = this.mShowNums[seat]
            var ftype = 1
            if(seat>0&&seat<3){
                ftype = 2;
            }
            if(score > 0){
                showNum0.setValue(8,formatcash(score),ftype);
            }else{
                showNum0.setValue(9,formatcash(score),ftype);
            }




            showNum0.setVisible(true);

            var vstr = ""+formatcash(score);
            if(vstr > 0){
                vstr = "+"+formatcash(score);
            }
            var slen = vstr.length
            var twidth = 40+slen*36;
            var node = this.mNodes[seat];
            var bgsprite =node.getChildByTag(9001);

            if(seat>0&&seat<3){
                if(score > 0){
                    bgsprite.initWithSpriteFrameName("dn_hintScore3.png");
                }else{
                    bgsprite.initWithSpriteFrameName("dn_hintScore4.png");
                }
                bgsprite.setAnchorPoint(cc.p(1,0.5));
            }else{
                if(score > 0){
                    bgsprite.initWithSpriteFrameName("dn_hintScore1.png");
                }else {
                    bgsprite.initWithSpriteFrameName("dn_hintScore2.png");
                }
                bgsprite.setAnchorPoint(cc.p(0,0.5));
            }
            bgsprite.setContentSize(cc.size(twidth,87));


        }
        this.showAnim(sdata);
    },
    //显示动画
    showAnim:function(sdata){
        for(var i = 0;i<sdata.length;i++) {
            var scored = sdata[i]
            var c = scored.chairId
            var seat = sGameData.mDNLayer.getPlayerSeatByChairId(c)
            var node = this.mNodes[seat];
            node.setVisible(true);
            node.setPosition(cc.p(0,-40));
            node.stopAllActions();
            var topos = cc.p(0,50);
            if(seat == 1||seat == 4){
                topos = cc.p(0,120);
            }
            var moveanim = cc.MoveTo.create(0.5,topos);
            node.runAction(moveanim);
        }
    },

    //清除显示
    cleanAll:function(){
        var len = sGameData.mDNLayer.MAX_PLAYERNUM;
        for( var i = 0;i<len;i++){
            var showNum0 = this.mShowNums[i]
            showNum0.setVisible(false);
            var node = this.mNodes[i];
            node.setVisible(false);
            node.stopAllActions();
        }
    }
});
DNScore.create = function () {
    var sg = new DNScore();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};