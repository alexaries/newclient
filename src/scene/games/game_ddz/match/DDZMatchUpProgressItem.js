/**
 * Created by apple on 15-9-18.
 */

var DDZMatchUpProgressItem = cc.Node.extend({
    mIndex:0, //某位置
    mType:0,//1已经完成 2未完成
    mShowType:0,//1开赛 2晋级 3换座
    mIsEnd:false,
    mLunData:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            var bgpic = "g_matchProgress_circle.png";
            if(this.mType == 2){
                bgpic = "g_matchProgress_circle.png";
            }
            var bgSprite = cc.Sprite.create("#"+bgpic);
            this.addChild(bgSprite,1);
            if(this.mType == 2){
               // bgSprite.setColor(cc.color(200,200,200))
            }

            var numstr = ""+this.mLunData.playercount;
            if(this.mShowType == 0){
                numstr = sGameData.mCurrMatch.startPlayerCount
            }
            var numtip = cc.LabelTTF.create(numstr, sGameData.mFontname,40);
            numtip.attr({
                x : -5,
                y : 5
            });
            this.addChild(numtip, 5);
            //numtip.setColor(cc.color(0,0,0))



            var rentip = cc.LabelTTF.create(sResWord.w_match_ren, sGameData.mFontname,22);
            rentip.attr({
                x : 0+33,
                y : 0
            });
            this.addChild(rentip, 5);
            //rentip.setColor(cc.color(0,0,0))

            var msg = sResWord.w_match_start
            if(this.mShowType == 2){
                msg = sResWord.w_match_up
            }else if(this.mShowType == 3){
                msg = sResWord.w_match_changetable
            }
            var showtip = cc.LabelTTF.create(msg, sGameData.mFontname,22);
            showtip.attr({
                x : 0,
                y : 0-30
            });
            this.addChild(showtip, 5);
            //showtip.setColor(cc.color(0,0,0))


            if(this.mIsEnd){
                var endicon = cc.Sprite.create("#g_match_crown.png")
                this.addChild(endicon);
                endicon.setPosition(cc.p(0,20))
            }

            bRet = true;
        }
        return bRet;
    },
    showAnim:function(){
        var tSprite = cc.Sprite.create(res.tblank_png);
        this.addChild(tSprite);
        var animation = AnimationManager.getAnimation("gamematch_light")
        if(animation!= null){
            tSprite.setScale(0.6);
            var animate =  cc.Animate.create(animation);
            tSprite.runAction(cc.RepeatForever.create(animate));
        }
    }
});
DDZMatchUpProgressItem.create = function (type,showtype,lundata,isend) {
    var sg = new DDZMatchUpProgressItem();
    if (sg) {
        sg.mType = type;
        sg.mShowType = showtype;
        sg.mLunData = lundata;
        sg.mIsEnd = isend
        sg.init()
        return sg;
    }
    return null;
};
