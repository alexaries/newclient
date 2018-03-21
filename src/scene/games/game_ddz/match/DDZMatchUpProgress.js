/**
 * Created by apple on 15-9-18.
 * 等待一轮结束时，显示
 * （晋级或淘汰或换座）
 */
var DDZMatchUpProgress = cc.Node.extend({
    mIndex:0, //某位置
    mBaseNode:null,
    mRankNode:null,
    mBarSprite:null,
    mSelBarSprite:null,
    mScrollView:null,
    mScrollLayer:null,
    mRankLabel:null,
    mScoreLabel:null,
    mTableCountLabel:null,
    mLordSprite:null,
    mScrollHeight:400,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            this.showInitView();

            //xxx
            bRet = true;
        }
        return bRet;
    },
    showInitView:function(){
        var size = cc.director.getWinSize();

        var vwidth = 740+(size.width-960);
        var vsize = cc.size(vwidth,this.mScrollHeight)
        var csize = cc.size(vwidth,this.mScrollHeight)
        log("scrollview view w=="+vsize.width);
        var scrollview = cc.ScrollView.create(vsize);
        var layer = cc.Layer.create();
        layer.setContentSize(csize);
        scrollview.setContentSize(csize);
        scrollview.setViewSize(vsize);
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollview.setDelegate(this);
        scrollview.setPosition(cc.p(-vwidth/2+40,-100));

        this.addChild(scrollview,8);
        scrollview.setTag(7888)
        this.mScrollLayer = layer;
        this.mScrollView = scrollview

        var bnode = cc.Node.create();
        layer.addChild(bnode,1);
        this.mBaseNode = bnode

        var bnode1 = cc.Node.create();
        layer.addChild(bnode1,2);
        this.mRankNode = bnode1

        var barSprite = cc.Sprite.create("#g_matchProgress_bg.png");
        layer.addChild(barSprite)
        barSprite.setAnchorPoint(cc.p(0,0.5))
        barSprite.setPosition(cc.p(60,110))
        this.mBarSprite = barSprite;

        var selbarSprite = cc.Sprite.create("#g_matchProgress_sel.png");
        layer.addChild(selbarSprite)
        selbarSprite.setAnchorPoint(cc.p(0,0.5))
        selbarSprite.setPosition(cc.p(60,110))
        this.mSelBarSprite = selbarSprite;

        var pSprite = cc.Sprite.create(res.tblank_png);
        pSprite.setPosition(cc.p(330,100+55));
        this.mRankNode.addChild(pSprite)
        this.mLordSprite = pSprite;


        var rankbgSprite = cc.Sprite.create("#g_matchRank_bg.png");
        rankbgSprite.setPosition(cc.p(182,133+110));
        this.mRankNode.addChild(rankbgSprite)

        var rankLabel = cc.LabelTTF.create(sResWord.w_rank+":", sGameData.mFontname,22);
        rankLabel.attr({
            x : 162,
            y : 244,
            anchorX:0
        });
        this.mRankNode.addChild(rankLabel, 5);
        this.mRankLabel = rankLabel;
        rankLabel.setColor(cc.color(120,19,13))

        var scoreLabel = cc.LabelTTF.create(sResWord.w_score+":", sGameData.mFontname,22);
        scoreLabel.attr({
            x : 162,
            y : 193,
            anchorX:0
        });
        this.mRankNode.addChild(scoreLabel, 5);
        this.mScoreLabel = scoreLabel;
        scoreLabel.setColor(cc.color(120,19,13))

        var tablecountLabel = cc.LabelTTF.create(sResWord.w_match_tip_tablecount_s1+"1"+sResWord.w_match_tip_tablecount_s2, sGameData.mFontname,20);
        tablecountLabel.attr({
            x : 340,
            y : 75-62
        });
        this.mRankNode.addChild(tablecountLabel, 5);
        this.mTableCountLabel = tablecountLabel;



    },
    updateRank:function(){
        if(!sGameData.mCurrMatch.startPlayerCount ||sGameData.mCurrMatch.startPlayerCount == 0){
            var data = sGameData.mCurrMatch.lundatas[0];
            sGameData.mCurrMatch.startPlayerCount = data.playercount
            log("startPlayerCount s2=="+sGameData.mCurrMatch.startPlayerCount)
        }
        var rank = sGameData.mCurrMatch.rank
        if(sGameData.mCurrMatch.currPlayLun == 1){
            rank = sGameData.mCurrMatch.rank +"/"+sGameData.mCurrMatch.startPlayerCount
        }else{
            var data = sGameData.mCurrMatch.lundatas[sGameData.mCurrMatch.currPlayLun-1];
            rank = sGameData.mCurrMatch.rank +"/"+data.playercount
        }
        var score = sGameData.mUser.score
        this.mRankLabel.setString(" "+rank)
        this.mScoreLabel.setString(" "+score)
        this.mTableCountLabel.setString(sResWord.w_match_tip_tablecount_s1+sGameData.mCurrMatch.currGameTableCount+sResWord.w_match_tip_tablecount_s2)
    },
    showView:function(){

        this.updateRank();

        var size = cc.director.getWinSize();
        var vwidth = 740+(size.width-960);

        this.mBaseNode.removeAllChildren();

        var currLun = sGameData.mCurrMatch.currPlayLun
        var lunnum = sGameData.mCurrMatch.lundatas.length;

        var space_width = 210; //+(size.width-960)
        if(lunnum < 4){
            space_width = 210+(size.width-960)+(4-lunnum)*130
        }
        var vwidth = 740+(size.width-960);
        if(lunnum > 4){
            vwidth = 740+(130*(lunnum-4));//size.width-960+
        }
        var csize = cc.size(vwidth,this.mScrollHeight)
        this.mScrollLayer.setContentSize(csize);
        this.mScrollView.setContentSize(csize);
        this.mScrollView.setContentOffset(cc.p(0,0));

        var vsize = this.mScrollView.getViewSize();

        //滚动界面

        log("currLun=="+currLun)

        var twidth = (lunnum - 1)*130+space_width;
        this.mBarSprite.setScaleX(twidth/54);

        var ttwidth = (currLun)*130+space_width;
        this.mSelBarSprite.setScaleX(ttwidth/55);

        var tposx = -270 + currLun*130 +space_width/2 -50;
        this.mRankNode.x = tposx
        this.mRankNode.y = 50;


        if(currLun > lunnum -3){
            this.mScrollView.setContentOffset(cc.p(vsize.width-csize.width,0));
        }else{
            if(currLun > 3){
                this.mScrollView.setContentOffset(cc.p(-(currLun-2)*130,0));
            }
        }



        for(var i = 0;i<lunnum;i++){
            var data = sGameData.mCurrMatch.lundatas[i];
            var type = 1;
            var showtype = 1;
            if(i >= currLun){
                type = 2;
            }
            if(i > 0){
                var data1 = sGameData.mCurrMatch.lundatas[i-1];
                if(data.playercount < data1.playercount){
                    showtype = 2;
                }else{
                    showtype = 3;
                }
            }
            var isend = false;
            if(i == lunnum-1){
                isend = true
            }
            var item = DDZMatchUpProgressItem.create(type,showtype,data,isend);
            this.mBaseNode.addChild(item);
            if(i == currLun -1){
                item.showAnim();
            }
            var tempx = 0;
            if(type == 2){
                tempx = space_width;
            }
            item.setPosition(cc.p(75+130*i+tempx,110));//60
        }
        this.showAnim();
    },
    showAnim:function(){
        this.mLordSprite.stopAllActions();
        var animation = AnimationManager.getAnimation("gamematch_run")
        if(animation!= null){
            var animate =  cc.Animate.create(animation);
            this.mLordSprite.runAction(cc.RepeatForever.create(animate));
        }

    },
    hidden:function(){
        //隐藏时，动画停止
    }
});
DDZMatchUpProgress.create = function () {
    var sg = new DDZMatchUpProgress();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
