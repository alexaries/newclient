/**
 * Created by apple on 15-4-27.
 */
var DDZScoreItem = cc.Node.extend({
    mIndex:0, //某位置
    mShowPlayer:null,
    mType:0,//0 me 1其他
    mNameLabel:null,
    mScoreLabel:null,
    mSeatIcon:null,
    mSelSprite:null,
    mScore:0,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            var csize = cc.size(550,105);
            if(this.mIndex!=0){
                csize = cc.size(550,90);
            }
            this.setContentSize(csize)

            var headSprite = cc.Sprite.create("#player_avatar.png")
            headSprite.setTag(9001);
            this.addChild(headSprite, 0);
            headSprite.setPosition(cc.p(-csize.width/2+50,0))


            var line = cc.Sprite.create("#ddz_score_line.png")
            this.addChild(line, 0);
            line.setPosition(cc.p(0,-csize.height/2))
            line.setScaleX(csize.width/650)




            var nameLabel = cc.LabelTTF.create("aaaaaGT900", sGameData.mFontname,30);
            nameLabel.attr({
                x : -csize.width/2+100,
                y : 20,
                anchorX:0
            });
            this.addChild(nameLabel, 5);
            nameLabel.setColor(cc.color(226,191,76))
            this.mNameLabel = nameLabel;


            var scoreLabel = cc.LabelTTF.create("+50", sGameData.mFontname,30);
            scoreLabel.attr({
                x : csize.width/2-30,
                y : 0,
                anchorX:1
            });
            this.addChild(scoreLabel, 5);
            scoreLabel.setColor(cc.color(255,210,0))
            this.mScoreLabel = scoreLabel;


            var ipic = "#ddz_score_shangjia.png";
            if(this.mIndex == 1){
                ipic = "#ddz_score_xiajia.png";
            }else if(this.mIndex == 3){
                ipic = "#ddz_score_shangjia.png";
            }
            var seaticon = cc.Sprite.create(ipic);
            this.addChild(seaticon, 0);
            seaticon.setAnchorPoint(cc.p(0,0.5));
            seaticon.setPosition(cc.p(-csize.width/2+100,-20))
            this.mSeatIcon = seaticon;

//            var selsprite = cc.Sprite.create("#ddz_score_item_sel.png")
//            this.addChild(selsprite, 0);
//            selsprite.setScaleX(csize.width/650)
//            selsprite.setScaleY(csize.height/94)
//            selsprite.setVisible(false)
//            this.mSelSprite = selsprite;

            if(this.mIndex!=0){
                nameLabel.setScale(0.85);
                scoreLabel.setScale(0.85);
            }else{
                seaticon.setVisible(false);
    //            selsprite.setVisible(true)
            }

            this.setDefaultPic();
            bRet = true;
        }
        return bRet;
    },
    updateInfo:function(player,score,tax,scoreinfo){
        this.mShowPlayer = player;
        var resultscore = 0;
        if(this.mShowPlayer){
            this.mNameLabel.setString(this.mShowPlayer.nickName)
            this.loadImg();
            //
            var thetax = tax;
            var allscore = score+tax;
            this.mScore = score
            if(this.mScore > 0){
                this.mScoreLabel.setString("+"+formatcash(this.mScore));
                this.mScoreLabel.setColor(cc.color(255,210,0))
            }else{
                this.mScoreLabel.setString(""+formatcash(this.mScore));
                this.mScoreLabel.setColor(cc.color(74,211,88))
            }
            resultscore = this.mScore;
        }else{
            log("score error")
        }
        return resultscore;
    },
    choose:function(){
        //this.mSelSprite.setVisible(true);
    },
    unchoose:function(){
        //this.mSelSprite.setVisible(false);
    },
    checkClick:function(pos,scale){
        if(scale==null){
            scale = 1;
        }
        var cardsize = cc.size(650*scale,94*scale);
        var cpos = cc.p(this.x-cardsize.width/2,this.y-cardsize.height/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    },

    setDefaultPic:function(){
        var headsprite = this.getChildByTag(9001)
        if(headsprite){
            headsprite.setSpriteFrame("player_avatar.png")
            if(this.mIndex!=0) {
                //headsprite.setScale(1);
                headsprite.setScaleX(72/headsprite.width)
                headsprite.setScaleY(69/headsprite.height)
            }else{
                //headsprite.setScale(1.2);
                headsprite.setScaleX(86/headsprite.width)
                headsprite.setScaleY(82/headsprite.height)
            }
        }
    },
    //加载图片 type 1是需要重新下载
    loadImg:function(type){
        if(type == null){
            type = 0;
        }
        this.setDefaultPic();
        var avatar = this.mShowPlayer.avatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        //log("headloadImg--"+avatar)
        if(type==0){
            if(this.mIndex!=0) {
                loadImg_base(avatar, avatar, filepath, this, 9001, 72, 69, loadImgOver)
            }else{
                loadImg_base(avatar, avatar, filepath, this, 9001, 86, 82, loadImgOver)
            }
        }
    }
});
DDZScoreItem.create = function (index) {
    var sg = new DDZScoreItem();
    if (sg) {
        sg.mIndex = index
        sg.init()
        return sg;
    }
    return null;
};
