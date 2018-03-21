/**
 * Created by Administrator on 14-4-21.
 */
//时钟
var DNClock = cc.Node.extend({
    mSeat:0,//位置
    mNumlabel:null,//数字显示
    mCountDown:0,//倒计时数字
    mCountDownTime:0,//倒计时开始 保存的临时时间（单位 s）
    mWarningSoundId:0,//警报声音id
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgimg = cc.Sprite.create("#dn_clock.png")
            this.addChild(bgimg);

            var countshow = ShowNum.create();
            countshow.setPosition(cc.p(1,-7));
            countshow.setScale(0.9);
            this.addChild(countshow,1);
            countshow.setValue(7,this.mCountDown,3,1);
            this.mNumlabel = countshow;
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置倒计时type
    setCountDown:function(seat,type){
        this.mSeat = seat;
        this.mCountDown = sGameData.mDNOpTime;
        if(type==1){
            this.mCountDown = sGameData.mDNReadyTime;
        }
        this.mNumlabel.setValue(7,this.mCountDown,3,1);
        var time = (new Date()).getTime();
        this.mCountDownTime = time;
        cc.log("time=="+time);
        this.setPos();
        this.closeSound();
        this.unschedule(this.doCountdownUpdate);
        this.schedule(this.doCountdownUpdate,0.05);

        if(this.mSeat == 0){
            //this.mWarningSoundId = SoundManager.playSound(res.clock_mp3,true,SOUND_CLOCK);
        }
    },
    //执行动画 （上下移动）
    doanim:function(){
        var moveAnim = cc.MoveBy.create(0.2,cc.p(0,10));
        var moveAnim1 = cc.MoveBy.create(0.2,cc.p(0,-10));
        var seq = cc.Sequence.create(moveAnim,moveAnim1);
        this.runAction(seq);
    },
    //倒计时更新
    doCountdownUpdate:function(){
        if(this.mCountDown > 0){
            var atime = (new Date()).getTime();
            if(atime-this.mCountDownTime > 1000){
                this.mCountDown = this.mCountDown -1;
                this.mCountDownTime = this.mCountDownTime + 1000;
                this.mNumlabel.setValue(7,this.mCountDown,3,1);
                if(this.mCountDown ==5){//剩5秒时到计时
                    if(this.mSeat == 0){
                        this.closeSound();
                        this.mWarningSoundId = SoundManager.playSound(res.warning_clock_mp3,true,SOUND_CLOCK);
                    }
                }
                if(this.mCountDown == 0){
                    this.unschedule(this.doCountdownUpdate);
                    this.closeSound();
                }
                if(this.mCountDown < 6){
                    this.doanim()
                }
            }
        }else{
            this.closeSound();
            this.unschedule(this.doCountdownUpdate);
        }
    },
    //关闭时钟
    closeClock:function(){
        this.mCountDown = 0;
        this.unschedule(this.doCountdownUpdate);
        this.closeSound();
        this.setVisible(false);
    },
    //关闭声音
    closeSound:function(){
        if(this.mWarningSoundId > 0){
            SoundManager.stopSound(this.mWarningSoundId)
            this.mWarningSoundId = 0;
        }
    },
    //获取位置坐标
    getPos:function(seat){
        var size = cc.director.getWinSize();
        var pos = cc.p(0,0)
        pos.x = size.width/2;
        pos.y = size.height/2+100+40;
        return pos;
    },
    //设置位置坐标
    setPos:function(){
        var pos = this.getPos(this.mSeat);
        this.setPosition(pos);
    }
});
DNClock.create = function () {
    var sg = new DNClock();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


