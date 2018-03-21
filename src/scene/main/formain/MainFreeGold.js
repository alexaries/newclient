/**
 * Created by apple on 15-3-17.
 */

var MainFreeGold = cc.Node.extend({
    mIndex:0, //某位置
    mBtnItem:null,
    mTimeBg:null,
    mTipShow:null,
    mCountDownTime:0,//倒计时开始 保存的临时时间（单位 s）
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx



            var timebg = cc.Sprite.create("#btn_freeCoin_nofull.png");
            this.addChild(timebg)
            this.mTimeBg = timebg

            var tiplabel = cc.LabelTTF.create("00:00:00", sGameData.mFontname,30);
            tiplabel.setPosition(cc.p(0,-33));
            //tiplabel.setColor(cc.color(0,0,0));
            this.addChild(tiplabel,1);
            this.mTipShow = tiplabel

            //添加按钮 关闭
            var lpSprite = cc.Sprite.create("#btn_freeCoin.png");
            var lpSprite1 = cc.Sprite.create("#btn_freeCoin.png");
            lpSprite1.setColor(cc.color(200, 200, 200));
            var lpSprite2 = cc.Sprite.create("#btn_freeCoin.png");
            var lpItem = cc.MenuItemSprite.create(
                lpSprite,
                lpSprite1,
                lpSprite2,
                this.gotoLp,this);
            this.mBtnItem = lpItem;

            lpItem.setVisible(false)
            var menu = cc.Menu.create(lpItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 2);
            timebg.setVisible(false);
            tiplabel.setVisible(false);
            this.checkState();
            bRet = true;
        }
        return bRet;
    },
    checkState:function(){
        var nowTime = getNowServerTime();
        var turntime = sGameData.mUser.turntableTime + sGameData.mTurnTableTimeSpace*1000
        log("nowTime=="+nowTime)
        log("turntableTime=="+sGameData.mUser.turntableTime)
        log("mTurnTableTimeSpace=="+sGameData.mTurnTableTimeSpace)
        if(nowTime > turntime){
            this.mBtnItem.setVisible(true)
            this.mTimeBg.setVisible(false);
            this.mTipShow.setVisible(false);
        }else{
            this.mBtnItem.setVisible(false)
            this.mTimeBg.setVisible(true);
            this.mTipShow.setVisible(true);
            var otime = Math.floor((turntime - nowTime)/1000);
            var str = this.getTimeStr(otime)
            this.mTipShow.setString(str)
            this.setCountDown();
        }
    },
    gotoLp:function(){

    },
    //进入单机房间
    enterDJOpenRoom:function(gameId){
        sGameData.mCurrGameType = gameId;
        var rooms = getRoomListByOpenType(gameId)
        if(rooms.length > 0){
            var room = rooms[0];
            sGameData.mCurrRoom = room;
            if(!sGameData.mIsSendEnterRoomIng&&!sGameData.mIsEnterGameing){
                sGameData.mIsSendEnterRoomIng = true;
                sGameData.mGameNet.reConnect(room.ipAddress,room.websocketPort,1);
            }
        }else{
            showLittleNotice(sResWord.w_notopen)
        }
    },


    //设置倒计时 type
    setCountDown:function(seat,type){

        var time = (new Date()).getTime();
        this.mCountDownTime = time;
        this.unschedule(this.doCountdownUpdate);
        this.schedule(this.doCountdownUpdate,0.05);
    },
    //倒计时更新
    doCountdownUpdate:function(){

        var atime = (new Date()).getTime();
        if(atime-this.mCountDownTime > 1000){
            this.mCountDownTime = atime

            var nowTime = getNowServerTime();
            var turntime = sGameData.mUser.turntableTime + sGameData.mTurnTableTimeSpace*1000
            if(nowTime > turntime){
                this.closeClock();
                this.checkState();
            }else{
                var otime = Math.floor((turntime - nowTime)/1000);
                var str = this.getTimeStr(otime)
                this.mTipShow.setString(str)
            }

            if(sGameData.mUILayer&&!sGameData.mUILayer.visible){//隐藏之后关闭
                this.closeClock();
            }

        }

    },
    //关闭时钟
    closeClock:function(){
        this.unschedule(this.doCountdownUpdate);

    },
    getTimeStr:function(timedur){
        var str = "00:00:00"
        if(timedur > 0){
            var tsec = Math.floor(timedur);
            var hour = Math.floor(tsec/3600);
            var mins = Math.floor((tsec%3600)/60);
            var sec = tsec%60;
            str = hour
            if(hour< 10){
                str = "0"+str
            }
            str+=":"
            if(mins < 10){
                str +="0"+mins
            }else{
                str += mins
            }

            str+=":"
            if(sec < 10){
                str +="0"+sec
            }else{
                str += sec
            }

        }
        return str;
    }
});
MainFreeGold.create = function () {
    var sg = new MainFreeGold();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
