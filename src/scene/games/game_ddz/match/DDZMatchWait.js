/**
 * Created by apple on 14-9-2.
 * 斗地主比赛 玩家数量
 */
var DDZMatchWait = cc.Node.extend({
    mIndex:0, //某位置
    mMatchNameLabel:null,
    mTimeLabel:null,
    mCountLabel:null,
    mCountbar:null,
    mSliderbg:null,
    mTime1Label:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var blockSize = cc.size(120, 28);

            var matchnameLabel = cc.LabelTTF.create(sResWord.w_match_signup_ok, sGameData.mFontname,30);
            matchnameLabel.attr({
                x : 0,
                y : 0,
                anchorY:0.5
            });
            this.addChild(matchnameLabel, 5);
            matchnameLabel.setColor(cc.color(255,255,0))
            this.mMatchNameLabel = matchnameLabel;

            var timeLabel = cc.LabelTTF.create(sResWord.w_match_start_soon, sGameData.mFontname,24);
            timeLabel.attr({
                x : 0,
                y : -50,
                anchorY:0.5
            });
            this.addChild(timeLabel, 5);
            timeLabel.setColor(cc.color(79,204,252))
            this.mTimeLabel = timeLabel

            var time1Label = cc.LabelTTF.create("", sGameData.mFontname,30);
            time1Label.attr({
                x : 5,
                y : -75,
                anchorX:0,
                anchorY:0.5
            });
            this.addChild(time1Label, 5);
            time1Label.setColor(cc.color(255,255,0))
            this.mTime1Label = time1Label
            time1Label.setVisible(false)


            var countLabel = cc.LabelTTF.create(sResWord.w_match_currcount, sGameData.mFontname,24);
            countLabel.attr({
                x : 0,
                y : -100,
                anchorY:0.5
            });
            this.addChild(countLabel, 5);
            this.mCountLabel = countLabel;

            countLabel.setColor(cc.color(240,236,139))

            var rate = 1;
            var sliderbg = cc.Sprite.create("#match_progress_bar.png")
            sliderbg.setPosition(cc.p(0,-107))
            this.addChild(sliderbg,1)
            this.mSliderbg = sliderbg;

            var trackSprite = cc.Sprite.create("#blank.png");
            trackSprite.setContentSize(cc.size(696,72));
            var progressSprite = cc.Sprite.create("#match_progress.png")
            var blankSprite = cc.Sprite.create("#blank.png")
            var tableslider = cc.ControlSlider.create(trackSprite,progressSprite ,blankSprite);
            tableslider.setAnchorPoint(cc.p(0.5, 0.5));
            tableslider.setPosition(cc.p(0+36,-107));
            tableslider.setMinimumValue(0);
            tableslider.setMaximumValue(1);
            tableslider.setValue(rate);
            tableslider.setEnabled(false);
            this.addChild(tableslider,2,7888);
            this.mCountbar = tableslider;




            this.updateInfo();

            bRet = true;
        }
        return bRet;
    },
    updateInfo:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH){
            if(sGameData.mCurrMatch.currPlayerCount == 0){
                sGameData.mCurrMatch.currPlayerCount = 1;
            }
            if(sGameData.mCurrMatch.type == MATCHSTART_COUNT){
                if(this.mMatchNameLabel){
                    this.mMatchNameLabel.setString(sGameData.mCurrMatch.name+sResWord.w_match_signup_ok);
                }

                if(this.mCountLabel){
                    this.mCountLabel.setString(sResWord.w_match_currcount+": "+sGameData.mCurrMatch.currPlayerCount+"/"+sGameData.mCurrMatch.playerUpperlimit);

                }
                if(this.mCountbar){
                    var rate = sGameData.mCurrMatch.currPlayerCount*1.0/sGameData.mCurrMatch.playerUpperlimit
                    this.mCountbar.setValue(rate);
                }

            }else{
                if(this.mMatchNameLabel){
                    this.mMatchNameLabel.setString(sGameData.mCurrMatch.name+sResWord.w_match_enter_ok);
                }
                if(this.mCountLabel){
                    this.mCountLabel.setVisible(false);
                }
                if(this.mCountbar){
                    this.mCountbar.setVisible(false);
                }
                if(this.mSliderbg) {
                    this.mSliderbg.setVisible(false);
                }
                if(this.mTimeLabel){
                    this.mTimeLabel.setAnchorPoint(cc.p(1,0.5));
                    this.mTimeLabel.setPosition(cc.p(0,-75));
                    this.mTimeLabel.setString(sResWord.w_match_countdown+":");
                }
                if(this.mTime1Label){
                    this.mTime1Label.setVisible(true);
                }
                this.startCountDown();
            }
        }
    },
    updateCount:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH) {
            if (sGameData.mCurrMatch.currPlayerCount == 0) {
                sGameData.mCurrMatch.currPlayerCount = 1;
            }
            if (sGameData.mCurrMatch.type == MATCHSTART_COUNT) {
                if (this.mCountLabel) {
                    this.mCountLabel.setString(sResWord.w_match_currcount + ": " + sGameData.mCurrMatch.currPlayerCount + "/" + sGameData.mCurrMatch.playerUpperlimit);

                }
                if (this.mCountbar) {
                    var rate = sGameData.mCurrMatch.currPlayerCount * 1.0 / sGameData.mCurrMatch.playerUpperlimit
                    this.mCountbar.setValue(rate);
                }
            }
        }
    },
    startCountDown:function(){
        this.doCountdownUpdate();
        this.unschedule(this.doCountdownUpdate);
        this.schedule(this.doCountdownUpdate,0.5);
    },
    doCountdownUpdate:function(){

        var nowtime = getNowServerTime();
        var timedur = sGameData.mCurrMatch.startTime - nowtime
        var time = "00:00:00"
        if(timedur > 0){
            var tsec = Math.floor(timedur/1000);
            if(tsec >= 60){
                var hour = Math.floor(tsec/3600);
                var mins = Math.floor((tsec%3600)/60);
                tsec = Math.floor(tsec%60);
                if(tsec<10){
                    tsec = "0"+tsec;
                }
                if(hour > 0){
                    if(hour<10){
                        hour = "0"+hour;
                    }
                    if(mins<10){
                        mins = "0"+mins;
                    }
                    time = hour+":"+mins+":"+tsec;
                }else{
                    if(mins<10){
                        mins = "0"+mins;
                    }
                    time = "00:"+mins+":"+tsec;
                }
            }else{
                if(tsec<10){
                    tsec = "0"+tsec;
                }
                time = "00:00:"+tsec;
            }
        }else{
            this.unschedule(this.doCountdownUpdate);
        }
        if(this.mTime1Label){
            this.mTime1Label.setString(time);
        }

    }
});
DDZMatchWait.create = function () {
    var sg = new DDZMatchWait();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
