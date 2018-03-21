/**
 * Created by Administrator on 14-4-18.
 */
//用户头像
var DDZUserHead = BaseUserHead.extend({
    mIsDizhu:false,
    mShowIcon:false,
    mScashimg:null,
    mScoreimg:null,
    mScoreLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var itemsize = cc.size(120,168);

            this.setContentSize(itemsize);

            this.width = itemsize.width;
            this.height = itemsize.height;


            var headsprite = cc.Sprite.create("#player_avatar.png");
            headsprite.attr({
                x: this.width/2,
                y:this.height/2
            });
            headsprite.setTag(9001);
            this.addChild(headsprite, 0);
            headsprite.setScaleX(100/headsprite.width)
            headsprite.setScaleY(100/headsprite.height)


            var bgsprite = cc.Sprite.create("#head_frame.png");
            bgsprite.attr({
                x: this.width/2,
                y:this.height/2
            });
            this.addChild(bgsprite, 1);


            var iconsprite = cc.Sprite.create("#ddz_farmer.png");
            iconsprite.attr({
                x: this.width-2,
                y:this.height-24,
                anchorX:1,
                anchorY:1
            });
            iconsprite.setTag(9002);
            this.addChild(iconsprite, 1);
            iconsprite.setVisible(false);

            var blockSize = cc.size(120, 28);
            var nameLabel = cc.LabelTTF.create("user", sGameData.mFontname,24);
            nameLabel.attr({
                x : this.width/2,
                y : this.height-12 +tempY_a,
                anchorY:0.5
            });
            this.addChild(nameLabel, 5);
            this.mNameLabel = nameLabel;



            //var scashimg = cc.Sprite.create("#softcash_1.png")
            //scashimg.setAnchorPoint(cc.p(0,0));
            //scashimg.setScale(0.8);
            //scashimg.setPosition(cc.p(0,3));
            //this.addChild(scashimg);
            //scashimg.setVisible(false);
            //this.mScashimg = scashimg

            var softcashshow = ShowNum.create();
            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                softcashshow.setPosition(cc.p(this.width/2,13));
            }else{
                softcashshow.setPosition(cc.p(this.width/2,13));
            }
            this.addChild(softcashshow,1);
            softcashshow.setValue(4,0,3,1);
            softcashshow.setScale(1.2);
            softcashshow.setVisible(false);
            this.mCashLabel = softcashshow;

            if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
                var cscoreimg = cc.Sprite.create("#w_matchScore.png")
                cscoreimg.setAnchorPoint(cc.p(0, 1));
                cscoreimg.setScale(0.8);
                cscoreimg.setPosition(cc.p(0, -3));
                this.addChild(cscoreimg);
                //cscoreimg.setVisible(false);
                this.mScoreimg = cscoreimg
                var softcashshow = ShowNum.create();
                softcashshow.setPosition(cc.p(this.width / 2-15, -18));
                this.addChild(softcashshow, 1);
                softcashshow.setValue(4, 0, 1, 1);
                softcashshow.setScale(1.2);
                //softcashshow.setVisible(false);
                this.mScoreLabel = softcashshow;
            }


            bRet = true;
        }
        return bRet;
    },
    setXY:function(){
        var size = cc.director.getWinSize();
        if(this.mSeat==0){
            this.x = 10;
            this.y = 205;
        }else if(this.mSeat==1){
            this.x = size.width - this.width - 10;
            this.y = size.height- this.height - 30;
        }else if(this.mSeat==2){
            this.x = 10;
            this.y = size.height - this.height -30;
        }

        if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
            if(this.mSeat==1) {
                this.mScoreimg.setAnchorPoint(cc.p(1, 0.5));
                this.mScoreimg.setPosition(cc.p(-5,this.height*0.5+30))
                this.mScoreLabel.setPosition(cc.p(-50,this.height*0.5+30))
            }else if(this.mSeat==2) {
                this.mScoreimg.setAnchorPoint(cc.p(0, 0.5));
                this.mScoreimg.setPosition(cc.p(this.width+5,this.height*0.5+30))
                this.mScoreLabel.setPosition(cc.p(this.width+50,this.height*0.5+30))
            }
        }
    },
    setPlayer:function(player){
        if(player != null){
            this.mShowPlayer = player;

            var nick = getNickNameShow(this.mShowPlayer.nickName)
            if(sGameData.mUseAddressNick){
                nick = getAddressNickShow(this.mShowPlayer.ipToAddress)
            }

            this.mNameLabel.setString(nick);
            //this.mNameLabel.setString("ID"+this.mShowPlayer.id);
            this.setNameScale();
            if( this.mSeat ==0){
                this.mCashLabel.setVisible(true)
                if(sGameData.mGameMode !=GAMEMODE_MATCH_VIDEO) {
                    if (sGameData.mGameMode == GAMEMODE_NORMAL) {
                        //this.mScashimg.setVisible(true);
                        this.mCashLabel.setValue(4, formatcash(sGameData.mUser.softCash), 3, 1)
                    } else {
                        this.mScoreLabel.setValue(4, sGameData.mUser.score, 1, 1)
                        this.mCashLabel.setValue(4, formatcash(sGameData.mUser.softCash), 3, 1)
                    }
                }else{
                    this.mCashLabel.setVisible(false)
                    //this.mCashLabel.setValue(4, sGameData.mPlayerInMatchVideo.score, 3, 1)
                    this.mScoreLabel.setValue(4, sGameData.mPlayerInMatchVideo.score, 1, 1)
                }
            }else{
                this.mCashLabel.setVisible(true)
                if (sGameData.mGameMode == GAMEMODE_NORMAL) {
                    this.mCashLabel.setValue(4, formatcash(this.mShowPlayer.softCash), 3, 1)
                }


                if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                    //this.mCashLabel.setVisible(true)
                    //this.mCashLabel.setValue(4,this.mShowPlayer.softCash,3,1)
                    if(this.mSeat==2) {
                        this.mScoreLabel.setValue(4, this.mShowPlayer.score, 1, 1)
                    }else{
                        this.mScoreLabel.setValue(4, this.mShowPlayer.score, 2, 1)
                    }
                }
            }
            this.loadImg();
        }
    },
    updateCashInfo:function(){
        if(this.mShowPlayer){
            if(this.mCashLabel){
                if(this.mSeat ==0){
                    if(sGameData.mGameMode !=GAMEMODE_MATCH_VIDEO) {
                        if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                            this.mCashLabel.setValue(4, formatcash(sGameData.mUser.softCash), 3, 1)
                        } else {
                            this.mScoreLabel.setValue(4, sGameData.mUser.score, 1, 1)
                            this.mCashLabel.setValue(4, formatcash(sGameData.mUser.softCash), 3, 1)
                        }
                    }else{
                        //this.mCashLabel.setValue(4, sGameData.mPlayerInMatchVideo.score, 3, 1)
                        this.mScoreLabel.setValue(4, sGameData.mPlayerInMatchVideo.score, 1, 1)
                    }
                }else{
                    this.mCashLabel.setVisible(true)
                    if (sGameData.mGameMode == GAMEMODE_NORMAL) {
                        this.mCashLabel.setValue(4, formatcash(this.mShowPlayer.softCash), 3, 1)
                    }
                    if(sGameData.mGameMode == GAMEMODE_MATCH||sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
                        //this.mCashLabel.setVisible(true)
                        //this.mCashLabel.setValue(4,this.mShowPlayer.softCash,3,1)
                        if(this.mSeat==2) {
                            this.mScoreLabel.setValue(4, this.mShowPlayer.score, 1, 1)
                        }else{
                            this.mScoreLabel.setValue(4, this.mShowPlayer.score, 2, 1)
                        }
                    }
                }
            }
        }
    },
    setSeat:function(seat,chairId){
        this.mSeat = seat;
        if(sGameData.mIsTestNoNet&&seat!=0){
            this.mNameLabel.setString("user"+this.mSeat);
        }
    },
    setDizhu:function(isdizhu,show){
        this.mIsDizhu = isdizhu;
        this.mShowIcon = show;

        var iconsprite = this.getChildByTag(9002);
        if(iconsprite){
            if(this.mIsDizhu){
                iconsprite.setSpriteFrame("ddz_landlord.png")
            }else{
                iconsprite.setSpriteFrame("ddz_farmer.png")
            }
            iconsprite.setVisible(false);
            if(this.mShowIcon){
                iconsprite.setVisible(true);
            }
        }
    }


});

DDZUserHead.create = function () {
    var sg = new DDZUserHead();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};