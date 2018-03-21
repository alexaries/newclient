/**
 * Created by apple on 16/1/26.
 */

var ZJHJiCardInfo = cc.Node.extend({
    mIndex:0, //某位置
    mCardshows:[],//牌显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            var psize = cc.size(350,250);
            var bgSprite = createSysPanel_chatyellow(psize);
            this.addChild(bgSprite);
            this.setContentSize(psize);

            this.mCardshows = [];


            var cardLabel = cc.LabelTTF.create(sResWord.w_zjh_jicard_today+":",sGameData.mFontname,24);
            cardLabel.setAnchorPoint(cc.p(1,0.5));
            cardLabel.setPosition(cc.p(-45,67));
            this.addChild(cardLabel);
            cardLabel.setColor(cc.color(231,199,80))


            var msg = "";
            var prizeLabel = cc.LabelTTF.create(msg,sGameData.mFontname,22);
            prizeLabel.setAnchorPoint(cc.p(0.5,0.5));
            prizeLabel.setPosition(cc.p(0,5));
            prizeLabel.setTag(8001);
            this.addChild(prizeLabel);
            prizeLabel.setColor(cc.color(231,199,80))


            var infoLabel = cc.LabelTTF.create(sResWord.w_zjh_jicard_tip,sGameData.mFontname,20,//字体  ，字体大小
                cc.size(320,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_TOP);
            infoLabel.setAnchorPoint(cc.p(0.5,1));
            infoLabel.setPosition(cc.p(0,-10));
            infoLabel.setTag(8002);
            this.addChild(infoLabel);
            infoLabel.setColor(cc.color(203,224,222))


            for(var i=0;i<3;i++){
                var cardshow = BaseCard.create();
                this.addChild(cardshow)
                cardshow.setPosition(cc.p(-38+65*i,23))
                cardshow.setScale(0.35)
                //var value = i*16+5;
                //cardshow.setCardValue(value);
                cardshow.setVisible(false);
                this.mCardshows.push(cardshow);
            }


            var line2 = cc.Sprite.create("#cell_small_delimeter.png");
            line2.setPosition(cc.p(0,20));
            line2.setScale(2);
            this.addChild(line2);

            //this.showJiCardInfo();

            bRet = true;
        }
        return bRet;
    },
    showJiCardInfo:function(){
        if(sGameData.mZJHLayer.mJiCardData){
            var jicarddata = sGameData.mZJHLayer.mJiCardData;
            var pmsg = sResWord.w_zjh_jiprize+":"+getNumStr(jicarddata.pnum)
            if(jicarddata.ptype == GOODS_SOFTCASH){
                pmsg += sResWord.w_softcash;
            }else if(jicarddata.ptype == GOODS_HARDCASH){
                pmsg += sResWord.w_hardcash;
            }
            var prizeLabel = this.getChildByTag(8001);
            if(prizeLabel){
                prizeLabel.setString(pmsg);

            }
            for(var i=0;i<3;i++){
                var cardshow = this.mCardshows[i];
                cardshow.setCardValue(jicarddata.cards[i]);
                cardshow.setVisible(true);
            }
        }
    }
});
ZJHJiCardInfo.create = function () {
    var sg = new ZJHJiCardInfo();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
