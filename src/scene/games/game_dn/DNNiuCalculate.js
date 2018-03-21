/**
 * Created by apple on 14-7-3.
 * 算牌器
 */

var DNNiuCalculate = cc.Node.extend({
    mIndex:0, //某位置
    mNumShows:[null,null,null,null],//数字显示
    mNiuIconSprite:null,//有牛无牛标志图
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tbgSprite = cc.Sprite.create("#dn_calculateBar.png");
            this.addChild(tbgSprite);
            tbgSprite.setOpacity(180);

            var numbgSprite = cc.Sprite.create("#dn_multipleBarBtn.png");
            this.addChild(numbgSprite,1);
            numbgSprite.setPosition(cc.p(-220,0));

            var numbgSprite1 = cc.Sprite.create("#dn_multipleBarBtn.png");
            this.addChild(numbgSprite1,1);
            numbgSprite1.setPosition(cc.p(-108,0));

            var numbgSprite2 = cc.Sprite.create("#dn_multipleBarBtn.png");
            this.addChild(numbgSprite2,1);
            numbgSprite2.setPosition(cc.p(3,0));

            var numbgSprite3 = cc.Sprite.create("#dn_multipleBarBtn.png");
            this.addChild(numbgSprite3,1);
            numbgSprite3.setPosition(cc.p(118,0));




            var numshow1 = ShowNum.create();
            numshow1.setValue(6,8,3,1);
            numshow1.setPosition(cc.p(-222,0));
            numshow1.setScale(0.6);
            this.addChild(numshow1,2);
            numshow1.setVisible(false);

            var numshow2 = ShowNum.create();
            numshow2.setValue(6,8,3,1);
            numshow2.setPosition(cc.p(-108,0));
            numshow2.setScale(0.6);
            this.addChild(numshow2,2);
            numshow2.setVisible(false);

            var numshow3 = ShowNum.create();
            numshow3.setValue(6,8,3,1);
            numshow3.setPosition(cc.p(0,0));
            numshow3.setScale(0.6);
            this.addChild(numshow3,2);
            numshow3.setVisible(false);

            var numshow4 = ShowNum.create();
            numshow4.setValue(6,24,3,1);
            numshow4.setPosition(cc.p(118,0));
            numshow4.setScale(0.6);
            this.addChild(numshow4,2);
            numshow4.setVisible(false);
            this.mNumShows = [numshow1,numshow2,numshow3,numshow4]

            var niuiconSprite = cc.Sprite.create("#dn_meiniu_text.png");
            this.addChild(niuiconSprite,1);
            niuiconSprite.setPosition(cc.p(220,0));
            this.mNiuIconSprite = niuiconSprite
            niuiconSprite.setVisible(false);

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置选的牌值
    setValue:function(cards){
        var num = 0;
        for(var i=0;i<3;i++){
            var numshow = this.mNumShows[i]
            if(cards.length > i){
                numshow.setVisible(true)
                numshow.setValue(6,cards[i],3,1);
                num += cards[i];
            }else{
                numshow.setVisible(false)
            }
        }
        var tnumshow = this.mNumShows[3]
        if(cards.length > 0){
            tnumshow.setVisible(true)
            tnumshow.setValue(6,num,3,1);
            //this.setVisible(true);
        }else{
            tnumshow.setVisible(false)
            //this.setVisible(false);
        }
        if(cards.length != 3){
            this.mNiuIconSprite.setVisible(false);
        }else{
            var hasniu = false;
            if(num%10 == 0){
                hasniu = true;
            }
            this.mNiuIconSprite.setVisible(true);
            if(hasniu){
                this.mNiuIconSprite.setSpriteFrame("dn_youniu_text.png");
            }else{
                this.mNiuIconSprite.setSpriteFrame("dn_meiniu_text.png");
            }
        }
    }


});
DNNiuCalculate.create = function () {
    var sg = new DNNiuCalculate();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
