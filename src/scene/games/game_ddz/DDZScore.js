/**
 * Created by apple on 15-4-27.
 */
var DDZScore = cc.Node.extend({
    mIndex:0, //某位置
    mItems:[],
    mScale:1,
    mSelItem:null,
    mTitleSprite:null,
    mScoreDatas:[],
    mInfoDatas:[],
    mInfoLabelsNum:0,
    mScoreLabel:null,
    mInfoLabels:[],
    mScrollView:null,
    mMeWin:false,
    mMyBeishu:1,//自己总的倍数
    mMatchRankLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            var bgsprite = cc.Sprite.create("#ddz_score_bg.png")
            this.addChild(bgsprite);

            var csize = bgsprite.getContentSize();
            this.setContentSize(csize);

            if(this.mItems ==0){
                this.initItems();
            }

            this.mInfoLabelsNum = 0;

            var scashimg = cc.Sprite.create("#softcash_1.png")
            scashimg.setAnchorPoint(cc.p(0,0.5));
            //scashimg.setScale(0.45);
            scashimg.setPosition(cc.p(-csize.width/2+20,-csize.height/2+50))
            this.addChild(scashimg,4);

            var softcashshow = ShowNum.create();
            softcashshow.setPosition(cc.p(-csize.width/2+58,-csize.height/2+50))
            softcashshow.setScale(0.8)
            this.addChild(softcashshow,4);
            softcashshow.setValue(2,sGameData.mUser.softCash,1,1);
            this.mSoftcashshow = softcashshow

            var matchrankLabel = cc.LabelTTF.create(sResWord.w_rank+":", sGameData.mFontname,30);
            matchrankLabel.setPosition(cc.p(0,-csize.height/2+50))
            this.addChild(matchrankLabel, 5);
            this.mMatchRankLabel = matchrankLabel;


            var closeSprite = cc.Sprite.create("#ddz_score_close.png")
            var closeSprite1 = cc.Sprite.create("#ddz_score_close.png")
            closeSprite1.setColor(cc.color(200,200,200))
            var closeSprite2 = cc.Sprite.create("#ddz_score_close.png")
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.op_close,this);
            closeItem.setPosition( cc.p(csize.width/2-20,csize.height/2-10));
            //操作按钮
            var pOperateMenu = cc.Menu.create(closeItem);
            this.addChild(pOperateMenu, 65);
            pOperateMenu.setPosition(cc.p(0,0))

            var titleSprite = cc.Sprite.create("#blank.png")
            this.addChild(titleSprite,10);
            titleSprite.setVisible(false);
            titleSprite.setPosition( cc.p(0,csize.height/2+10));
            this.mTitleSprite = titleSprite;




            var dizhuTipLabel = cc.LabelTTF.create(sResWord.w_ddz_difen, sGameData.mFontname,30);
            dizhuTipLabel.attr({
                x : csize.width/2-360,
                y : 195,
                anchorX:0
            });
            this.addChild(dizhuTipLabel, 5);
            dizhuTipLabel.setColor(cc.color(255,210,0))

            var dizhu = 1;
            if (sGameData.mGameMode == GAMEMODE_NORMAL) {
                if (sGameData.mCurrRoom) {
                    dizhu = formatcash(sGameData.mCurrRoom.basicPoint);
                }
            }else{
                if(sGameData.mCurrMatch){
                    dizhu = sGameData.mCurrMatch.basicGScore
                }
            }
            var dizhuLabel = cc.LabelTTF.create(""+dizhu, sGameData.mFontname,30);
            dizhuLabel.attr({
                x : csize.width/2-20,
                y : 195,
                anchorX:1
            });
            this.addChild(dizhuLabel, 5);
            dizhuLabel.setColor(cc.color(255,210,0))




            var allTipLabel = cc.LabelTTF.create(sResWord.w_ddz_heji, sGameData.mFontname,30);
            allTipLabel.attr({
                x : csize.width/2-360,
                y : -122,
                anchorX:0
            });
            this.addChild(allTipLabel, 5);
            allTipLabel.setColor(cc.color(255,210,0))


            var scoreLabel = cc.LabelTTF.create(""+0, sGameData.mFontname,30);
            scoreLabel.attr({
                x : csize.width/2-20,
                y : -122,
                anchorX:1
            });
            this.addChild(scoreLabel, 5);
            scoreLabel.setColor(cc.color(255,210,0))
            this.mScoreLabel = scoreLabel


            var vsize = cc.size(365,246);
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();
            var scsize = cc.size(365,246);

            layer.setContentSize(scsize);
            scrollview.setContentSize(scsize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(csize.width/2-365,-81));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview

            scrollview.setContentOffset(cc.p(0,246-scsize.height));


            this.initItemInfos(8);

            bRet = true;
        }
        return bRet;
    },
    op_close:function(){
        sGameData.mClickState = 3;
        this.hidden();
        if(sGameData.mDDZLayer){
            sGameData.mDDZLayer.showScoreBtn(true);
        }
    },
    hidden:function(){
        this.setVisible(false);
        this.mTitleSprite.setVisible(false);
        this.stopLoseAnim();
    },
    initItems:function(){
        this.mItems = [];
        var posy = [0,-97,-187,-277];
        for(var i=0;i<3;i++){
            var item = DDZScoreItem.create(i)
            this.addChild(item);
            item.setPosition(cc.p(-184,163+posy[i]));
            this.mItems.push(item)
            if(i ==0){
                this.mSelItem = item;
            }
        }
    },
    getSeatInfoByC:function(chairs){
        var info = "";
        for(var i=0;i<chairs.length;i++){
            var c = Number(chairs[i]);
            var seat = sGameData.mDDZLayer.getPlayerSeatByChairId(c);
            if(seat == 0){
                info += sResWord.w_ddz_seat_0;
            }else if(seat == 1){
                info += sResWord.w_ddz_seat_1;
            }else if(seat == 2){
                info += sResWord.w_ddz_seat_2;
            }
            if(i!=chairs.length-1){
                info+=","
            }
        }
        return info
    },
    initItemInfos:function(num){
        var startI = this.mInfoLabelsNum;;
        if(num > this.mInfoLabelsNum){
            log("---add new score info---")
            this.mInfoLabelsNum = num;
        }

        var layer = this.mScrollView.getContainer();

        var scsize = cc.size(365,this.mInfoLabelsNum*30);
        layer.setContentSize(scsize)
        this.mScrollView.setContentSize(scsize);
        this.mScrollView.setContentOffset(cc.p(0,246-scsize.height));
        var csize = this.getContentSize();

        var len = this.mInfoLabelsNum;
        for(var i =startI;i<len;i++){
            var infoLabel = cc.LabelTTF.create("抓"+i,sGameData.mFontname,22);
            infoLabel.attr({
                x : 0,
                y : scsize.height-15-30*i,
                anchorX:0
            });
            layer.addChild(infoLabel, 5);
            this.mInfoLabels[i*3] = infoLabel;

            var infoLabel2 = cc.LabelTTF.create("x1",sGameData.mFontname,22);
            infoLabel2.attr({
                x : 350,
                y : scsize.height-15-30*i,
                anchorX:1
            });
            layer.addChild(infoLabel2, 5);
            this.mInfoLabels[i*3+2] = infoLabel2;
            infoLabel.setVisible(false);
            infoLabel2.setVisible(false);
        }

        for(var i =0;i<len;i++){
            var infoLabel = this.mInfoLabels[i*3];
            infoLabel.setPosition(cc.p(0,scsize.height-15-30*i))

            var infoLabel2 = this.mInfoLabels[i*3+2];
            infoLabel2.setPosition(cc.p(350,scsize.height-15-30*i))
        }

    },
    showItemInfo:function(){

        var csize = this.getContentSize();
        var infos = this.mInfoDatas
        var score = 0;
        log("showItemInfo=="+infos.length)
        this.initItemInfos(infos.length);

        var color = cc.color(255,210,0)
        if(!this.mMeWin){
            color = cc.color(74,211,88)
        }
        var beishu = this.mMyBeishu;
        this.mScoreLabel.setString(""+beishu+sResWord.w_ddz_bei); //获取 自己的 倍数（没算春天）
        this.mScoreLabel.setColor(color);

        for(var i=0;i<infos.length;i++){
            var info1 = infos[i][0];
            var info2 = infos[i][1];
            log("info=="+info1+":"+info2)
            if(info1&&info1.length > 0){
                //var color = cc.color(255,210,0)
                var infoLabel = this.mInfoLabels[i*3];
                infoLabel.setString(info1)

                var infoLabel2 = this.mInfoLabels[i*3+2];
                infoLabel2.setString(info2)

                infoLabel.setColor(color);
                infoLabel2.setColor(color);
                infoLabel.setVisible(true);
                infoLabel2.setVisible(true);
            }
        }
        var num = infos.length;
        log("score num="+num+"--"+this.mInfoLabelsNum)
        if(num < this.mInfoLabelsNum){
            for(var i=num;i<this.mInfoLabelsNum;i++){
                var infoLabel = this.mInfoLabels[i*3];
                if(infoLabel){
                    infoLabel.setVisible(false);
                }
                var infoLabel2 = this.mInfoLabels[i*3+2];
                if(infoLabel2){
                    infoLabel2.setVisible(false);
                }
            }
        }

    },
    updateCash:function(){
        this.mSoftcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);

        if(sGameData.mGameMode == GAMEMODE_NORMAL){
            this.mMatchRankLabel.setVisible(false)
        }else{
            this.mMatchRankLabel.setVisible(true)
            var msg = sResWord.w_match_rank_c0;
            var color = cc.color(255,210,0)
            if(sGameData.mCurrMatch.rankchange > 0){
                msg = sResWord.w_match_rank_c1;
                color = cc.color(255,210,0)
            }else if(sGameData.mCurrMatch.rankchange < 0){
                msg = sResWord.w_match_rank_c2;
                color = cc.color(32,168,57)
            }
            this.mMatchRankLabel.setString(sResWord.w_rank+":"+sGameData.mCurrMatch.rank+"/"+sGameData.mCurrMatch.currPlayerCount+" "+msg)
            this.mMatchRankLabel.setColor(color)
        }

    },
    //type 1win 2lose
    showAnim:function(type){
        //return;
        this.setVisible(true);
        this.mTitleSprite.setVisible(true);
        this.mTitleSprite.setSpriteFrame("blank.png")
        var animname = "ddz_win"
        var mp3name = "";//res.ddz_e_win_mp3;
        if(type == 2){
            animname = "ddz_lose"
            //mp3name = res.ddz_e_lost_mp3;
        }
        var animation = AnimationManager.getAnimation(animname)
        if(animation!= null){
            var animate =  cc.Animate.create(animation);
            this.mTitleSprite.stopAllActions();
            this.mTitleSprite.runAction(animate)
            if(mp3name&&mp3name.length > 0){
                SoundManager.playSound(mp3name);
            }
        }
        this.unschedule(this.showWinGoldAnim);
        if(type == 1){
            this.mNum = 100;
            this.schedule(this.showWinGoldAnim,0.05);
        }
    },
    //显示金币动画
    showWinGoldAnim:function(){
        this.mNum--
        if(this.mNum==0){
            this.unschedule(this.showWinGoldAnim);
        }
        var size = cc.director.getWinSize();
        var goldpic = "#ddz_g_"+(randomInt(3)+1)+".png"
        var goldsprite = cc.Sprite.create(goldpic);
        this.addChild(goldsprite);
        var randx = randomInt(size.width)-size.width/2;
        goldsprite.setPosition(cc.p(randx,size.height/2));
        var topos = cc.p(randx,-size.height/2);
        var moveAnim = cc.MoveTo.create(0.6,topos)
        var callback = cc.CallFunc.create(this.showGoldOver, this);
        var actions = cc.Sequence.create(moveAnim,callback);
        goldsprite.runAction(actions)
    },
    //停止失败动画
    stopLoseAnim:function(){
        this.unschedule(this.showWinGoldAnim);
    },
    //显示金币动画结束
    showGoldOver:function(goldsprite){
        this.removeChild(goldsprite);
    },
    showScore:function(datas,infos,mybeishu){
        log("showScore----")
        this.setVisible(true);
        this.mScoreDatas = datas;
        this.mInfoDatas = infos;
        this.mMyBeishu = mybeishu;
        for(var i=0;i<datas.length;i++){
            var resultData = this.mScoreDatas[i];
            var chairId = resultData.chairId;
            var player = sGameData.mDDZLayer.getPlayerByChairId(chairId);
            var seat = sGameData.mDDZLayer.getPlayerSeatByChairId(chairId);
            var score = resultData.score;
            var item = this.mItems[seat];
            var tax = 0;
            var scoreinfo = [];
            var resultscore = item.updateInfo(player,score,tax,scoreinfo);
            if(seat ==0){
                this.mSelItem = item;
                item.choose();
                if(resultscore > 0){
                    this.mMeWin = true;
                    this.showAnim(1)
                }else{
                    this.mMeWin = false;
                    this.showAnim(2)
                }

            }else{
                item.unchoose();
            }
        }
        this.showItemInfo()
        this.updateCash();
    },
    checkClick:function(pos){
//        var pos1 = cc.p(pos.x-this.x,pos.y-this.y)
//        for(var i=0;i<3;i++){
//            var item = this.mItems[i];
//            if(item.checkClick(pos1,this.mScale)){
//                return item;
//            }
//        }
        return null;
    },
    checkClickItem:function(pos){
        var item = this.checkClick(pos)
        if(item){
            if(this.mSelItem){
                this.mSelItem.unchoose();
            }
            this.mSelItem = item;
            this.mSelItem.choose();
            this.showItemInfo(this.mSelItem.mIndex)
        }
    }

});
DDZScore.create = function () {
    var sg = new DDZScore();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
