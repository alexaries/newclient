/**
 * 扎金花 比牌 输赢 （爆炸）
 * Created by Administrator on 14-5-13.
 */
var ZJHWinLose = cc.Node.extend({
    mIndex:0, //某位置
    mResultImg:[],//结果图
    mNum:0,//执行动画数量
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var aCompareCardXY = sGameData.mZJHLayer.mCompareCardXY;



            var resultsprite1 =  cc.Sprite.create("#blank.png");
            this.addChild(resultsprite1);
            resultsprite1.setPosition(cc.p(aCompareCardXY[0][0]+50,aCompareCardXY[0][1]+70));
            resultsprite1.setVisible(false);

            var resultsprite2 =  cc.Sprite.create("#blank.png");
            this.addChild(resultsprite2);
            resultsprite2.setPosition(cc.p(aCompareCardXY[1][0]+50,aCompareCardXY[1][1]+70));
            resultsprite2.setVisible(false);
            this.mResultImg = [resultsprite1,resultsprite2];


            //xxx
            bRet = true;
        }
        return bRet;
    },
    //显示输赢动画  0win 1lose
    setOPImg:function(seat,type){
        var resultsprite = this.mResultImg[seat];
        resultsprite.setSpriteFrame("blank.png")
        resultsprite.setVisible(true);
        resultsprite.stopAllActions();
        if(type == 1){
            var animation = AnimationManager.getAnimation("zjhzhadan")
            if(animation!= null){
                var animate =  cc.Animate.create(animation);
                var anim1 = cc.Hide.create();
                var callback = cc.CallFunc.create(this.showOpImageOver, this);
                var actions = cc.Sequence.create(animate,anim1,callback);
                resultsprite.runAction(actions)
            }
            this.mNum++;
        }
    },
    //显示输赢动画结束
    showOpImageOver:function(tar){
        tar.setVisible(false);
        this.mNum--;
        if(this.mNum ==0){
            sGameData.mZJHLayer.onShowWinLoseOver();
        }
    }
});
ZJHWinLose.create = function () {
    var sg = new ZJHWinLose();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
