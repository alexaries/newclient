/**
 * Created by apple on 15-5-19.
 */
var DownLoadGameRes = cc.Node.extend({
    mIndex:0, //某位置
    mGameId:0,
    mPercent:0,//
    mTempTime:0,

    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size_notice = cc.size(600,320);
            var  bgimg = createSysPanel(size_notice);

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();


            //提示
            var msg = sResWord.w_tip_down_title_s1;
            var pNameLabel = cc.LabelTTF.create(msg,sGameData.mFontname, 26,//字体  ，字体大小
                cc.size(480,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.3));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);


            var msg1 = sResWord.w_tip_down_percent_s1;
            var pPercentLabel = cc.LabelTTF.create(msg1,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(480,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pPercentLabel.setPosition(cc.p(0,0));
            pPercentLabel.setTag(8002);
            this.addChild(pPercentLabel,1);


            var msg2 = sResWord.w_tip_down_littletip;
            var pTipLabel = cc.LabelTTF.create(msg2,sGameData.mFontname, 22,//字体  ，字体大小
                cc.size(480,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pTipLabel.setPosition(cc.p(0,-size.height*0.3));
            pTipLabel.setTag(8003);
            this.addChild(pTipLabel,1);


            //xxx
            bRet = true;
        }
        return bRet;
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },
    //开始 下载
    showStartDownLoad:function(gameId){
        this.mGameId = gameId;
        var gamename = getGameName(gameId)
        var allsize = getGameBaseResSize(gameId,0);
        var sizestr = getFileSize(allsize);
        var msg = sResWord.w_tip_down_title_s1+gamename+sResWord.w_tip_down_title_s2+sizestr+sResWord.w_tip_down_title_s3;
        var pNameLabel = this.getChildByTag(8001);
        if(pNameLabel){
            pNameLabel.setString(msg);
        }
        var msg1 = sResWord.w_tip_down_percent_s1+"0"+sResWord.w_tip_down_percent_s2;
        var pPercentLabel = this.getChildByTag(8002);
        if(pPercentLabel){
            pPercentLabel.setString(msg1);
        }

        this.mPercent = 0;
        this.mTempTime = (new Date()).getTime();

        setClickSwallows(this);
    },
    //更新显示信息  (type 0 下载中   1下载成功  2下载失败)
    updateInfo:function(type,percent){
        var now = (new Date()).getTime();
        if(percent != this.mPercent){
            this.mPercent = percent;
            this.mTempTime = now;
        }else{
            var time = now - this.mTempTime;
            log("time==="+time+"|per="+percent);
//            if(percent<100 && time > 20*1000){ //20s 没动静当下载失败处理
//                this.mTempTime = now;
//                this.closeView();
//                this.downFail();
//            }
        }

        var pPercentLabel = this.getChildByTag(8002);
        if(pPercentLabel){
            var msg1 = "";
            if(type ==0){
                msg1 = sResWord.w_tip_down_percent_s1+percent+sResWord.w_tip_down_percent_s2;
                if(percent >= 100){
                    msg1 += sResWord.w_tip_down_percent_s3;
                }
            }else if(type ==1){
                msg1 = sResWord.w_tip_down_over;
                this.closeView();
            }else{
                msg1 = sResWord.w_tip_down_fail;
                this.closeView();
            }
            pPercentLabel.setString(msg1);
        }
    },
    //停止显示
    closeView:function(){
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
    },

    downFail:function(){
        log("down fail-20s---"+this.mGameId)
        //CallCpp.doSomeString(890, "" , "" , "", "", "");
        var gamename = getGameName(this.mGameId);
        var word  = gamename+sResWord.w_tip_down_fail;
        showLittleNotice(word);
        sGameData.mIsDownLoadingGameRes = false;
        sGameData.mDowningGameResDatas = [];
    }

});
DownLoadGameRes.create = function () {
    var sg = new DownLoadGameRes();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
