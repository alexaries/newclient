/**
 * 显示 总投注和 当前暗注
 * Created by Administrator on 14-5-14.
 */
var ZJHShowAllBet = cc.Node.extend({
    mAllBet:null,//总注显示
    mAnBet:null,//暗注显示
    mLunShow:null,//轮显示
    mMaxLunShow:null,//最大轮显示
    time:0,//时间 按时间减少动画总注
    mAllNum:0,//总注
    mAnimAllNum:0,//获胜时动画总注（不断减少）
    mCardshows:[],//牌显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            //this.setContentSize(bgimg.getContentSize());
            var csize = cc.size(153,52);

            this.mCardshows = [];

            var wdanzhusprite = cc.Sprite.create("#zjh_w_danzhu.png")
            wdanzhusprite.setPosition(cc.p(-50,44));
            this.addChild(wdanzhusprite,1);
            //wdanzhusprite.setScale(0.8);

            var wlunshusprite = cc.Sprite.create("#zjh_w_lun.png")
            wlunshusprite.setPosition(cc.p(-50,14));
            this.addChild(wlunshusprite,1);



            var anbet = ShowNum.create();
            anbet.setPosition(cc.p(0,44));
            this.addChild(anbet,2);
            anbet.setScale(0.8);
            this.mAnBet = anbet;


            var xieimg1 = cc.Sprite.create("#n_w_xie.png")
            xieimg1.setPosition(cc.p(22,14));
            this.addChild(xieimg1,1);
            xieimg1.setScale(0.8);


            var lunbet = ShowNum.create();
            lunbet.setPosition(cc.p(11,14));
            this.addChild(lunbet,2);
            lunbet.setScale(0.8);
           // lunbet.setValue(2,15,2,1);
            this.mLunShow = lunbet

            var maxlunbet = ShowNum.create();
            maxlunbet.setPosition(cc.p(33,14));
            this.addChild(maxlunbet,2);
            maxlunbet.setScale(0.8);
            //maxlunbet.setValue(2,20,1,1);
            this.mMaxLunShow = maxlunbet


            var betsize = cc.size(220,58);
            var allbetbg = cc.Scale9Sprite.create();
            allbetbg.initWithSpriteFrameName("zjh_betCount.png");
            allbetbg.setContentSize(betsize);
            allbetbg.setOpacity(80);
            //var allbetbg = cc.Sprite.create("#zjh_type_bar.png")
            allbetbg.setPosition(cc.p(0,-66-3));
            this.addChild(allbetbg,1);

            var allbet = ShowNum.create();
            allbet.setPosition(cc.p(0,-66));
            this.addChild(allbet,2);
            this.mAllBet = allbet;
            //allbet.setScale(0.85)



            this.showAllBet();

            bRet = true;
        }
        return bRet;
    },

    showJiCardInfo:function(){
        //if(!sGameData.mZJHCanUseJiCard){
        //    return ;
        //}
        //if(sGameData.mZJHLayer.mJiCardData){
        //    var jicarddata = sGameData.mZJHLayer.mJiCardData;
        //    var pmsg = getNumStr(jicarddata.pnum)
        //    if(jicarddata.ptype == GOODS_SOFTCASH){
        //        pmsg += sResWord.w_softcash;
        //    }else if(jicarddata.ptype == GOODS_HARDCASH){
        //        pmsg += sResWord.w_hardcash;
        //    }
        //    var prizeLabel = this.getChildByTag(8001);
        //    if(prizeLabel){
        //        prizeLabel.setString(pmsg);
        //        prizeLabel.setScale(0.9);
        //        setLabelScale(prizeLabel,70);
        //    }
        //    for(var i=0;i<3;i++){
        //        var cardshow = this.mCardshows[i];
        //        cardshow.setCardValue(jicarddata.cards[i]);
        //        cardshow.setVisible(true);
        //    }
        //}
    },

    //显示总注 等
    showAllBet:function(){
        var allbet = sGameData.mZJHLayer.mAllBetNum;
        var anzhu =  0;
        if(sGameData.mZJHLayer.mIsInGame){
            anzhu = sGameData.mZJHLayer.getCurrAnBetNum();
        }
        this.mAllNum = allbet;
        this.mAllBet.setValue(5,formatcash(allbet),3,1);
        this.mAnBet.setValue(2,formatcash(anzhu),1,1);
        var lun = sGameData.mZJHLayer.mLoopNum;
        var maxlun = sGameData.mZJHLayer.mRoundMaxBi;
        this.mLunShow.setValue(2,lun,2,1);
        this.mMaxLunShow.setValue(2,maxlun,1,1);
        //this.mLunShow.setString(lun+"/"+maxlun);
    },
    //显示动画 下分
    startShowAnim:function(){
        //this.mAllNum = 9000;
        this.time = 0;
        this.mAnimAllNum = this.mAllNum;
        this.unschedule(this.step);
        this.schedule(this.step);
    },
    //下分动画 每步改变值
    step:function (dt) {
        var runtime = 3;
        this.time += dt;
        var num = Math.floor(this.mAnimAllNum*(runtime-this.time)/runtime)
        if(this.time > runtime){
            num = 0;
            this.showAnimOver();
        }
        this.mAllBet.setValue(5,formatcash(num),3,1);
        //log("time="+this.time)
    },
    //显示动画结束
    showAnimOver:function(){
        this.time = 0;
        this.unschedule(this.step);
        this.mAllBet.setValue(5,0,3,1);
    },
    click_JiCardInfo:function(){
        log("click_JiCardInfo");
        playClickSound();
        sGameData.mZJHLayer.showJiCardView();
        this.showJiCardInfo();
    }
});
ZJHShowAllBet.create = function () {
    var sg = new ZJHShowAllBet();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
