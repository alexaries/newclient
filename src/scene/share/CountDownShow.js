/**
 * Created by Administrator on 14-4-21.
 */
var CountDownShow = cc.Node.extend({
    mType:0,//
    mNumlabel:null,//显示数字
    mCountDown:20,//倒计时数字
    mCountDownTime:0,//倒计时开始 保存的临时时间（单位 s）
    mWarningSoundId:0,//报警音效
    mFunc:null,//倒计时结束操作
    mTarget:null,
    mNumType:2,//

    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var countshow = ShowNum.create();
            countshow.setPosition(cc.p(0,-5));
            countshow.setScale(0.9);
            this.addChild(countshow,1);
            countshow.setValue(5,this.mCountDown,3,1);
            this.mNumlabel = countshow;
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置倒计时 type 0邀请好友  1扎金花继续
    setCountDown:function(type,func,tar){
        if(!type){
            type = 0;
        }

        this.mType = type;
        this.mFunc = func
        this.mTarget = tar;

        this.mNumType = 2;
        this.mCountDown = 20;//20
        if(type == 1){
            this.mNumType = 13;
            this.mCountDown = sGameData.mZJHReadyTime-1;
        }

        this.mNumlabel.setValue(this.mNumType,this.mCountDown,3,1);

        var time = (new Date()).getTime();
        this.mCountDownTime = time;
        log("time=="+time);
        this.closeSound();
        this.unschedule(this.doCountdownUpdate);
        this.schedule(this.doCountdownUpdate,0.05);
    },
    //倒计时更新
    doCountdownUpdate:function(){
        if(this.mCountDown > 0){
            var atime = (new Date()).getTime();
            if(atime-this.mCountDownTime > 1000){
                this.mCountDown = this.mCountDown -1;
                this.mCountDownTime = this.mCountDownTime + 1000;
                this.mNumlabel.setValue(this.mNumType,this.mCountDown,3,1);

                if(this.mCountDown == 0){
                    this.unschedule(this.doCountdownUpdate);
                    this.closeSound();
                    this.overtime();
                }
            }
        }else{
            this.closeSound();
            this.unschedule(this.doCountdownUpdate);
        }
    },
    overtime:function(){
        log("overtime---time")
        if(this.mFunc){
            this.mFunc(this.mTarget);
        }
    },
    //关闭时钟
    closeClock:function(){
        this.mCountDown = 0;
        this.unschedule(this.doCountdownUpdate);
        this.closeSound();
    },
    //关闭声音
    closeSound:function(){
        if(this.mWarningSoundId > 0){
            SoundManager.stopSound(this.mWarningSoundId)
            this.mWarningSoundId = 0;
        }
    },
    //设置位置
    setPos:function(){
        //var pos = this.getPos(this.mSeat);
        //this.setPosition(pos);
    }
});
CountDownShow.create = function () {
    var sg = new CountDownShow();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


