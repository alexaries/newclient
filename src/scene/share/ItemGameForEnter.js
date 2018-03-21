/**
 * Created by apple on 14-9-5.
 */

var ItemGameForEnter = cc.Node.extend({
    mIndex:0, //某位置
    mType:1,//1 normal 2 match
    mRoom:null,
    mMatch:null,
    mIsSelected:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgpic = "#item_r_bg1.png"
            if(this.mIndex%2==1){
                bgpic = "#item_r_bg2.png"
            }
            //xxx
            var bgsprite = cc.Sprite.create(bgpic);
            this.addChild(bgsprite);
            bgsprite.setTag(9001)
            var gamename = sResWord.w_ddz;
            var time = "0"+sResWord.w_match_tip_start_soon;
            var rname = "";
            if(this.mType == 1){
                gamename = getGameName(this.mRoom.gameId)
                rname = this.mRoom.roomName
                time = sResWord.w_match_tip_started;
            }else{
                gamename = getGameName(this.mMatch.gameId)
                rname = this.mMatch.name
                var nowtime = getNowServerTime();
                var timedur = this.mMatch.startTime - nowtime
                if(timedur > 0){
                    var tsec = Math.floor(timedur/1000);
                    if(tsec >= 60){
                        var hour = Math.floor(tsec/3600);
                        var mins = Math.floor((tsec%3600)/60);
                        if(hour > 0){
                            time = hour+sResWord.w_hour+mins+sResWord.w_minutes+sResWord.w_match_tip_start_soon;
                        }else{
                            time = mins+sResWord.w_minutes+sResWord.w_match_tip_start_soon;
                        }
                    }else{
                        time = tsec+sResWord.w_seconds+sResWord.w_match_tip_start_soon;
                    }

                }else{
                    time = sResWord.w_match_tip_started;
                }
            }
            var tipLabel = cc.LabelTTF.create(gamename, sGameData.mFontname, 38,
                cc.size(300,50),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(0,0+30));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel,3);


            var timeLabel = cc.LabelTTF.create(time, sGameData.mFontname, 24,
                cc.size(300,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            timeLabel.setPosition(cc.p(0,0-30));
            timeLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(timeLabel,3);

            var rnameLabel = cc.LabelTTF.create(rname, sGameData.mFontname, 24);//垂直对齐
            rnameLabel.setPosition(cc.p(0,0-92));
            rnameLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(rnameLabel,3);
            setLabelScale(rnameLabel,300);

            bRet = true;
        }
        return bRet;
    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(200,200,200));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255,255,255));
        }
    },
    checkClick:function(pos){
        var cardsize = cc.size(344,190);
        var cpos = cc.p(this.x-344/2,this.y-190/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemGameForEnter.create = function (index,type,data) {
    var sg = new ItemGameForEnter();
    if (sg) {
        sg.mIndex = index
        sg.mType = type
        if(sg.mType == 1){
            sg.mRoom = data
        }else{
            sg.mMatch = data
        }
        sg.init()
        return sg;
    }
    return null;
};
