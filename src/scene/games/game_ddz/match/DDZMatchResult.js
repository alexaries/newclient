/**
 * Created by apple on 14-9-3.
 */

var DDZMatchResult = cc.Node.extend({
    mIndex:0, //某位置
    mMsgLabel:null,
    mTitleLabel:null,
    mRankLabel:null,
    mEndLabel:null,
    mPrizeNode:null,
    mPInfoShows:[],
    mCloseBtn:null,
    mPAgainBtn:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsize = cc.size(960,466);
            var point_panel_close = cc.p(4,-8);//边线的高度
            var bgsprite = cc.Sprite.create("#g_match_award.png")
            this.addChild(bgsprite)

            var titleLabel = cc.LabelTTF.create(sResWord.w_match_p_t+":", sGameData.mFontname,24);
            titleLabel.attr({
                x : -280,
                y : 110,
                anchorX:0,
                anchorY:0.5
            });
            this.addChild(titleLabel, 5);
            titleLabel.setColor(cc.color(156,36,35))
            this.mTitleLabel = titleLabel;


            var msg = sResWord.w_match_p_r_s1+"斗地主免费1圆话费赛"+sResWord.w_match_p_r_s2+"88"+sResWord.w_match_p_r_s3;
            var msglabel = cc.LabelTTF.create(msg, sGameData.mFontname,22,
                cc.size(515,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            msglabel.attr({
                x : 0,
                y : 88,
                anchorY:1
            });
            this.addChild(msglabel, 5);
            msglabel.setColor(cc.color(156,36,35))
            this.mMsgLabel = msglabel;

            var rankLabel = cc.LabelTTF.create(sResWord.w_match_p_p_s1+"88"+ sResWord.w_match_p_p_s2, sGameData.mFontname,30);
            rankLabel.attr({
                x : 0,
                y : 22,
                anchorY:0.5
            });
            this.addChild(rankLabel, 5);
            rankLabel.setColor(cc.color(156,36,35))
            this.mRankLabel = rankLabel;

            var endLabel = cc.LabelTTF.create(sResWord.w_match_p_end, sGameData.mFontname,24);
            endLabel.attr({
                x : 0,
                y : -170,
                anchorY:0.5
            });
            this.addChild(endLabel, 5);
            endLabel.setColor(cc.color(156,36,35))
            this.mEndLabel = endLabel;


            var pnode = cc.Node.create();
            this.addChild(pnode);
            this.mPrizeNode = pnode;


            var prizeLabel = cc.LabelTTF.create(sResWord.w_match_p_pinfo+":", sGameData.mFontname,22);
            prizeLabel.attr({
                x : -250,
                y : -5,
                anchorX:0,
                anchorY:0.5
            });
            this.mPrizeNode.addChild(prizeLabel, 5);
            prizeLabel.setColor(cc.color(156,36,35))

            this.mPInfoShows = [];
            for(var i = 0;i<8;i++){
                var pinfoLabel = cc.LabelTTF.create("100元话费兑换碎片 x20", sGameData.mFontname,22);
                pinfoLabel.attr({
                    x : -220 + 250*Math.floor(i/4),
                    y : -35 - (i%4)*25,
                    anchorX:0,
                    anchorY:0.5
                });
                this.mPrizeNode.addChild(pinfoLabel, 5);
                pinfoLabel.setColor(cc.color(156,36,35))
                this.setWordScale(pinfoLabel);
                this.mPInfoShows.push(pinfoLabel);
            }


            //添加按钮 关闭
            var closeSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,1);
            var closeSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.gotoClose,this);
            closeItem.attr({
                x:-100,
                y:-bgsize.height/2-40,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mCloseBtn = closeItem;

            //添加按钮 关闭
            var playagainSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_match_play_again,cc.p(0.5,0.5),28,0);
            var playagainSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_match_play_again,cc.p(0.5,0.5),28,1);
            var playagainSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_match_play_again,cc.p(0.5,0.5),28,0);
            var playItem = cc.MenuItemSprite.create(
                playagainSprite,
                playagainSprite1,
                playagainSprite2,
                this.playAgain,this);
            playItem.attr({
                x:100,
                y:-bgsize.height/2-40,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mPAgainBtn = playItem

            var menu = cc.Menu.create(closeItem,playItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 3);


            //xxx
            bRet = true;
        }
        return bRet;
    },
    showButtons:function(){
        if(sGameData.mCurrMatch.type == MATCHSTART_TIME){
            this.mCloseBtn.x = 0;
            this.mPAgainBtn.setVisible(false);
        }else{
            this.mCloseBtn.x = -100;
            this.mPAgainBtn.setVisible(true);
            this.mPAgainBtn.x = 100;
        }
    },
    playAgain:function(){
        this.setVisible(false);
        if(sGameData.mCurrMatch.type == MATCHSTART_TIME){
            goToMainFromGame(10);
        }else{
            if(!sGameData.mIsTestNoNet){
                sGameData.mCurrMatch.currPlayerCount = 0;
                var scoretype = sGameData.mMatchSignType;
                sGameNetData.mDDZMatchNet.sendDDZMatchSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId,scoretype);
            }
        }
        //sGameData.mDDZLayer.showWaitAgain();
    },
    gotoClose:function(){
        this.setVisible(false);
        if(!sGameData.mIsTestNoNet){
            goToMainFromGame(10);
        }
    },
    updateInfo:function(name,rank){
        if(!sGameData.mCurrMatch.startPlayerCount ||sGameData.mCurrMatch.startPlayerCount == 0){
            var data = sGameData.mCurrMatch.lundatas[0];
            if(data){
                sGameData.mCurrMatch.startPlayerCount = data.playercount
                log("startPlayerCount s1=="+sGameData.mCurrMatch.startPlayerCount)
            }
        }
        var msg = sResWord.w_match_p_r_s1+sGameData.mCurrMatch.name+sResWord.w_match_p_r_s2+sGameData.mCurrMatch.startPlayerCount+sResWord.w_match_p_r_s3;
        this.mMsgLabel.setString(msg);

        this.mTitleLabel.setString(sResWord.w_match_p_t+sGameData.mUser.nickName+":");

        this.mRankLabel.setString(sResWord.w_match_p_p_s1+sGameData.mCurrMatch.rank+ sResWord.w_match_p_p_s2);

        var now = (new Date()).getTime()
        var timestr = getLocalTime_day1(now)
        this.mEndLabel.setString(sResWord.w_match_p_end+timestr);

        if(sGameData.mCurrMatch){
            var goodses = sGameData.mCurrMatch.goodses
            if(goodses && goodses.length > 0){
                this.mPrizeNode.setVisible(true);
                for(var i=0;i<8;i++){
                    this.mPInfoShows[i].setVisible(false);
                }

                for(var i = 0;i<goodses.length&&i<8;i++){
                    var goods = goodses[i];
                    var msg = "";
                    if(goods.gtype == GOODS_SOFTCASH){
                        var value = goods.gvalue;
                        msg = sResWord.w_softcash+" x"+value
                    }else if(goods.gtype == GOODS_HARDCASH){
                        var value = goods.gvalue;
                        msg = sResWord.w_hardcash+" x"+value
                    }else if(goods.gtype == GOODS_RPOPS_TYPE){
                        var value = goods.gvalue;
                        var props = getPropsById(goods.gid)
                        if(props){
                            msg = props.name+" x"+value
                        }
                    }else if(goods.gtype == GOODS_PRIZES_TYPE){
                        var prize = getPrizeById(goods.gid)
                        var value = goods.gvalue;
                        if(prize){
                            msg = prize.name+" x"+value
                        }
                    }
                    this.mPInfoShows[i].setVisible(true);
                    this.mPInfoShows[i].setString(msg)
                }
            }else{
                this.mPrizeNode.setVisible(false);
            }
        }else{
            this.mPrizeNode.setVisible(false);
        }
        this.showButtons();
    },
    setWordScale:function(label){
        if(label.getContentSize().width > 250){
            label.setScale(250/label.getContentSize().width);
        }else{
            label.setScale(1);
        }
    }

});
DDZMatchResult.create = function () {
    var sg = new DDZMatchResult();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
