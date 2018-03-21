/**
 * Created by apple on 14-12-23.
 */
var ItemRankList = cc.TableViewCell.extend({
    mIndex:0, //某位置
    mType:0,//0内容 1title
    mUser:null,
    mCashLabel:null,
    mNameLabel:null,
    mRankLabel:null,
    mIRankSprite:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            //单元格背景
            var ccsize = cc.size(360,47);
            //var sprite =  createHallListbg(ccsize)
            //sprite.setContentSize(ccsize)
            //sprite.setAnchorPoint(cc.p(0, 0));
            //sprite.setPosition(cc.p(0, 0));
            ////sprite.setScaleY(0.5);
            //sprite.setTag(9100);
            //this.addChild(sprite);
            var bgSprite = cc.Sprite.create("#rank_bg.png");
            this.addChild(bgSprite);
            bgSprite.setAnchorPoint(cc.p(0, 0));
            bgSprite.setPosition(cc.p(0, 0));

            this.setContentSize(ccsize);
            var itemsize = this.getContentSize()

            var ranklabel = cc.LabelTTF.create("1", sGameData.mFontname, 22);
            ranklabel.setPosition(cc.p(itemsize.width*0.1,itemsize.height*0.5));
            this.addChild(ranklabel,1);
            this.mRankLabel = ranklabel



            var namelabel = cc.LabelTTF.create("", sGameData.mFontname, 22);
            namelabel.setPosition(cc.p(itemsize.width*0.43,itemsize.height*0.5));
            this.addChild(namelabel,1);
            this.mNameLabel = namelabel

            var cashlabel = cc.LabelTTF.create("0", sGameData.mFontname, 22);
            cashlabel.setPosition(cc.p(itemsize.width*0.83,itemsize.height*0.5));
            this.addChild(cashlabel,1);
            this.mCashLabel = cashlabel

            this.updateInfo(this.mUser);

            if(this.mType == 0){
                this.showBG();
            }
            //xxx
            bRet = true;
        }
        return bRet;
    },

    showBG:function(){
        var itemsize = this.getContentSize()
        var splitname = "#button_small_delimeter.png"
        var splitname1 = "#line1.png"

        var rankbg = cc.Sprite.create("#i_rank_bg.png")
        rankbg.attr({
            x:itemsize.width*0.1,
            y:itemsize.height*0.5
        });
        rankbg.setScale(0.7);
        this.addChild(rankbg);
        this.mIRankSprite = rankbg;

    },


    updateInfo:function(){
        //this.mUser = user;
        if(this.mUser){

            if(sGameData.mRankType == 1){//
                this.mRankLabel.setString(this.mUser.rank);
                this.mNameLabel.setString(getNickNameShow(hiddenNickChar(this.mUser.nickName)));
                this.mCashLabel.setString(formatcash(this.mUser.score));
            }else if(sGameData.mRankType == 3){
                var time = "";//getLocalTime_mini(this.mUser.createTime)
                this.mRankLabel.setString(this.mUser.rank);
                this.mNameLabel.setString(getNickNameShow(hiddenNickChar(this.mUser.nickName)));
                this.mCashLabel.setString(this.mUser.level);
            }else if(sGameData.mRankType == 4){//
                this.mRankLabel.setString(this.mUser.rank);
                this.mNameLabel.setString(getNickNameShow(hiddenNickChar(this.mUser.nickName)));
                this.mCashLabel.setString(formatcash(this.mUser.score));
            }
        }else{
            this.mNameLabel.setString("");
            this.mCashLabel.setString("");
            this.mRankLabel.setString("");
        }

        if(this.mNameLabel.getContentSize().width > 175){
            this.mNameLabel.setScale(175/this.mNameLabel.getContentSize().width);
        }else{
            this.mNameLabel.setScale(1);
        }

        if(this.mCashLabel.getContentSize().width > 115){
            this.mCashLabel.setScale(115/this.mCashLabel.getContentSize().width);
        }else{
            this.mCashLabel.setScale(1);
        }

        if(this.mUser){
            if(this.mUser.rank<4){
                this.mRankLabel.setVisible(false);
                if(this.mIRankSprite) {
                    this.mIRankSprite.setSpriteFrame("i_rank_" + this.mUser.rank + ".png")
                    this.mIRankSprite.setScale(1);
                }
            }else{
                if(this.mIRankSprite) {
                    this.mRankLabel.setVisible(true);
                    this.mIRankSprite.setSpriteFrame("i_rank_bg.png")
                    this.mIRankSprite.setScale(0.7);
                }
            }
        }

    },
    showTitle:function(w1,w2,w3){
        this.mRankLabel.setString(w1);
        this.mNameLabel.setString(w2);
        this.mCashLabel.setString(w3);
        //this.mRankLabel.setColor(cc.color(241,247,40));
        //this.mNameLabel.setColor(cc.color(241,247,40));
        //this.mCashLabel.setColor(cc.color(241,247,40));

    },
    //选中
    choose:function()
    {
        this.mIsSelected = true;
//        var sprite1 = this.getChildByTag(9001);
//        if(sprite1){
//            sprite1.setColor(cc.color(220, 220, 220));
//        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
//        var sprite1 = this.getChildByTag(9001);
//        if(sprite1){
//            sprite1.setColor(cc.color(255, 255, 255));
//        }
    }

});
ItemRankList.create = function (user,type) {
    if(!type){
        type = 0;
    }
    var sg = new ItemRankList();
    if (sg) {
        sg.mUser = user;
        sg.mType = type;
        sg.init()
        return sg;
    }
    return null;
};
