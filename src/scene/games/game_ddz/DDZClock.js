/**
 * Created by Administrator on 14-4-21.
 */
//时钟
var DDZClock = cc.Node.extend({
    mSeat:0,//位置
    mNumlabel:null,//显示数字
    mCountDown:0,//倒计时数字
    mCountDownTime:0,//倒计时开始 保存的临时时间（单位 s）
    mPos:[[185,285],[200,205],[200,205]],//坐标
    mWarningSoundId:0,//报警音效
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgimg = cc.Sprite.create("#game_clock.png")
            this.addChild(bgimg);

//            var tiplabel = cc.LabelTTF.create(""+this.mCountDown, sGameData.mFontname,30);
//            tiplabel.setPosition(cc.p(0,-5));
//            tiplabel.setColor(cc.color(0,0,0));
//            this.addChild(tiplabel,1);
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
    //设置倒计时 type
    setCountDown:function(seat,type){
        this.mSeat = seat;
        this.mCountDown = sGameData.mDDZOutCardTime;//20
        if(type==1){
            this.mCountDown = sGameData.mDDZCallLordTime;//25
        }
        this.mNumlabel.setValue(5,this.mCountDown,3,1);
        var time = (new Date()).getTime();
        this.mCountDownTime = time;
        log("time=="+time);
        this.setPos();
        this.closeSound();
        this.unschedule(this.doCountdownUpdate);
        this.schedule(this.doCountdownUpdate,0.05);
        if(this.mSeat == 0){
            this.mWarningSoundId = SoundManager.playSound(res.clock_mp3,true,SOUND_CLOCK);
        }
    },
    //倒计时更新
    doCountdownUpdate:function(){
        if(this.mCountDown > 0){
            var atime = (new Date()).getTime();
            if(atime-this.mCountDownTime > 1000){
                this.mCountDown = this.mCountDown -1;
                this.mCountDownTime = this.mCountDownTime + 1000;
                this.mNumlabel.setValue(5,this.mCountDown,3,1);
                if(this.mCountDown ==5){//剩5秒时到计时
                    if(this.mSeat == 0){
                        this.closeSound();
                        this.mWarningSoundId = SoundManager.playSound(res.warning_clock_mp3,true,SOUND_CLOCK);
                    }
                }
                if(this.mCountDown == 0){
                    this.unschedule(this.doCountdownUpdate);
                    this.closeSound();
                    sGameData.mDDZLayer.clockTimeOver();
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
    },
    //关闭声音
    closeSound:function(){
        if(this.mWarningSoundId > 0){
            SoundManager.stopSound(this.mWarningSoundId)
            this.mWarningSoundId = 0;
        }
    },
    //获取位置
    getPos:function(seat){
        var size = cc.director.getWinSize();
        var pos = cc.p(0,0)
        if(seat == 0){
            pos.x = this.mPos[seat][0];
            pos.y = this.mPos[seat][1];
        }else if(seat == 1){
            pos.x = size.width - this.mPos[seat][0];
            pos.y = size.height - this.mPos[seat][1];
        }else if(seat == 2){
            pos.x = this.mPos[seat][0];
            pos.y = size.height - this.mPos[seat][1];
        }else{
            pos.x = size.width/2;
            pos.y = size.height/2;
        }
        return pos;
    },
    //设置位置
    setPos:function(){
        var pos = this.getPos(this.mSeat);
        this.setPosition(pos);
    }
});
DDZClock.create = function () {
    var sg = new DDZClock();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};


