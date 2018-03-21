/**
 * Created by Administrator on 14-5-21.
 * 得分
 */
var ZJHScore = cc.Node.extend({
    mPos:[],//位置
    mShowNums:[],//得分显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

//            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
//            //colorlayer.setPosition(cc.p(size.width/2,size.height/2));
//            this.addChild(colorlayer);

            var faXY =  sGameData.mZJHLayer.mZJHLogic.getScorePos()
            this.mPos = faXY;

            var len = sGameData.mZJHLayer.MAX_PLAYERNUM;
            for( var i = 0;i<len;i++){
                var pos = this.mPos[i];
                var showNum0 = ShowNum.create();
                showNum0.setPosition(pos);
                this.addChild(showNum0);
                //showNum0.setValue(1,900,3);
                showNum0.setVisible(false);
                this.mShowNums[i] = showNum0;
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
            var seat = sGameData.mZJHLayer.getPlayerSeatByChairId(c)
            var showNum0 = this.mShowNums[seat]
            showNum0.setValue(1,formatcash(score),3);
            showNum0.setVisible(true);
        }
    },
    //清除全部
    cleanScore:function(seat){
        var showNum0 = this.mShowNums[seat]
        showNum0.setVisible(false);
    },
    //清除全部
    cleanAll:function(){
        var len = sGameData.mZJHLayer.MAX_PLAYERNUM;
        for( var i = 0;i<len;i++){
            var showNum0 = this.mShowNums[i]
            showNum0.setVisible(false);
        }
    }
});
ZJHScore.create = function () {
    var sg = new ZJHScore();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};