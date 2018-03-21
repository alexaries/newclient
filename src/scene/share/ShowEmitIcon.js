/**
 * Created by apple on 14-10-14.
 * 显示 发射 硬币
 */

var ShowEmitIcon = cc.Node.extend({
    mIndex:0, //某位置
    mCount:0,//发射数量
    mStartPoint:null,//开始位置
    mEndPoint:null,//返回位置
    mEndFunc:null,//结束时回调
    mIconShows:[],//硬币显示
    mType:0,// 0 金币 1元宝)
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            this.mIconShows = [];
            //xxx
            bRet = true;
        }
        return bRet;
    },
    cleanIcons:function(){
        var ilen = this.mIconShows.length;
        for(var i=0;i<ilen;i++) {
            var iconsprite = this.mIconShows[i];
            this.removeChild(iconsprite)
        }
        this.mIconShows = [];
    },
    //开始喷硬币  type(0 金币 1元宝)
    showPengqianAnim:function(shownum,type,endp){
        log("showPengqianAnim==")
        var size = cc.director.getWinSize();
        if(type == null){
            type = 1;
        }
        if(endp){
            this.mEndPoint = endp
        }
        if(this.mType != type){
            this.cleanIcons();
            this.mType = type;
        }

        if(this.mIconShows.length ==0){
            for(var i=0;i<this.mCount;i++){
                var iconsprite = null;
                if(type == 0){
                    iconsprite = cc.Sprite.create(res.penqian_png)
                }else{
                    iconsprite = cc.Sprite.create("#hardcash.png");
                }

                this.addChild(iconsprite,100);
                iconsprite.setLocalZOrder(100-i);
                this.mIconShows.push(iconsprite)
                iconsprite.setVisible(false);
            }
        }
        var ilen = this.mIconShows.length;

        if(shownum > ilen){
            shownum = ilen;
        }

        for(var i=0;i<shownum;i++){
            var iconsprite = this.mIconShows[i];
            iconsprite.stopAllActions();
            iconsprite.setVisible(false);

            iconsprite.x = this.mStartPoint.x;
            iconsprite.y = this.mStartPoint.y;

            var tempX = randomInt(600)-300
            var temph = randomInt(200)
            var show = cc.Show.create();


            var controlPoints = [ cc.p(tempX/4, 50+randomInt(200)),
                cc.p(tempX/2, 10+randomInt(100)),
                cc.p(tempX, 30-size.height / 2) ];

            var actionTo = cc.bezierBy(0.7+0.5*Math.random(), controlPoints).easing(cc.easeBounceOut());
            var delay = cc.DelayTime.create(0.1*i);
            if(i==shownum-1){
                var callback1 = cc.CallFunc.create(this.backIconTo, this);
                var seq = cc.Sequence.create(delay,show,actionTo,callback1);
                iconsprite.runAction(seq);
            }else{
                var seq = cc.Sequence.create(delay,show,actionTo);
                iconsprite.runAction(seq);
            }
        }


    },
    //所有硬币 返回某个位置
    backIconTo:function(){
        var size = cc.director.getWinSize();
        var ilen = this.mIconShows.length;
        for(var i=0;i<ilen;i++) {
            var iconsprite = this.mIconShows[i];
            iconsprite.stopAllActions();
            var moveAnim = cc.MoveTo.create(0.4,this.mEndPoint);
            if(i==ilen-1) {
                var callback1 = cc.CallFunc.create(this.doHiddenIcon, this);
                var seq = cc.Sequence.create(moveAnim,callback1);
                iconsprite.runAction(seq)
            }else{
                iconsprite.runAction(moveAnim)
            }
        }
    },
    //结束时隐藏硬币，执行结束回调
    doHiddenIcon:function(){
        var ilen = this.mIconShows.length;
        for(var i=0;i<ilen;i++) {
            var iconsprite = this.mIconShows[i];
            iconsprite.stopAllActions();
            iconsprite.setVisible(false);
        }
        if(this.mEndFunc){
            this.mEndFunc();
        }
    }

});
ShowEmitIcon.create = function (count,startP,endP,endfunc) {
    var sg = new ShowEmitIcon();
    if (sg) {
        sg.mCount = count
        sg.mStartPoint = startP
        sg.mEndPoint = endP
        sg.mEndFunc = endfunc
        sg.init()
        return sg;
    }
    return null;
};
