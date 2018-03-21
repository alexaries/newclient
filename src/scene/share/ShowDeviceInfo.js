/**
 * Created by apple on 15-5-7.
 * //显示电池电量 信号
 */

var ShowDeviceInfo = cc.Node.extend({
    mIndex:0, //某位置
    mType:0,//0  图片在上 时间在下  1在1排
    mBatterySprite:null,
    mSignalSprite:null,
    mTimeLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mCurrShowDeviceInfo = this;
            sGameData.mCanUpdateDeviceInfo = true;

            var nowtime = (new Date()).getTime();
            var nowtimestr = getLocalTime_hm(nowtime);
            sGameData.mDeviceInfo_time = nowtimestr;

            //xxx
            var bpic = this.getBatteryPic();
            var batteryicon = cc.Sprite.create("#"+bpic);
            this.addChild(batteryicon);
            batteryicon.setPosition(cc.p(-17,0))
            this.mBatterySprite = batteryicon

            var spic = this.getWifiPic();
            var signalicon = cc.Sprite.create("#"+spic);
            this.addChild(signalicon);
            signalicon.setPosition(cc.p(17,0));
            this.mSignalSprite = signalicon

            var time = sGameData.mDeviceInfo_time;
            var fontsize = 30;
            if(this.mType == 1){
                fontsize = 24;
            }
            var timeLabel = cc.LabelTTF.create(time, sGameData.mFontname,fontsize);
            timeLabel.setPosition(cc.p(0,-34));
            this.addChild(timeLabel, 5);
            timeLabel.setColor(cc.color(233,155,59))
            timeLabel.enableStroke(cc.color(255,255,255),1);
            this.mTimeLabel = timeLabel;

            if(this.mType == 1){
                timeLabel.setPosition(cc.p(65,0));
            }

            bRet = true;
        }
        return bRet;
    },

    setType:function(type){
        this.mType = type;
        if(this.mType == 1){
            var fontsize = 24;
            this.mTimeLabel.setPosition(cc.p(65,0));
            this.mTimeLabel.setFontSize(fontsize);
        }else{
            var fontsize = 30;
            this.mTimeLabel.setPosition(cc.p(0,-34));
            this.mTimeLabel.setFontSize(fontsize);
        }
    },



    onExit:function(){
        this._super();
        sGameData.mCurrShowDeviceInfo = null;
        sGameData.mCanUpdateDeviceInfo = false;
    },
    getBatteryPic:function(){
        var pic = "icon_battery_1.png";
        var level = sGameData.mDeviceInfo_battery;
        if(level > 70){
            pic = "icon_battery_3.png";
        }else if(level > 35){
            pic = "icon_battery_2.png";
        }
        return pic;
    },
    getWifiPic:function(){
        var pic = "icon_wifi_1.png";
        var level = sGameData.mDeviceInfo_signal;
        if(level > 0){
            pic = "icon_wifi_2.png";
        }
        return pic;
    },
    updateInfo:function(){
        if(sGameData.mDeviceInfoHasUpdate){
            sGameData.mDeviceInfoHasUpdate = false;
            var bpic = this.getBatteryPic();
            this.mBatterySprite.setSpriteFrame(bpic)

            var spic = this.getWifiPic();
            this.mSignalSprite.setSpriteFrame(spic)

            var time = sGameData.mDeviceInfo_time;
            this.mTimeLabel.setString(time)
        }
    }

});
ShowDeviceInfo.create = function (type) {
    var sg = new ShowDeviceInfo();
    if (sg) {
        sg.mType = type;
        sg.init()
        return sg;
    }
    return null;
};
