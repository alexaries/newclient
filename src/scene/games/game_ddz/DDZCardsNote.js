/**
 * Created by Administrator on 14-4-21.
 */
//记牌器
var DDZCardsNote = cc.Node.extend({
    mIndex:0, //某位置
    mOutCards:[],//出牌值（3-17）的数量
    mType:0,//显示类型 0 显示出了多少 1显示剩余多少
    mOutBtn:null,//出牌标志按钮
    mHasBtn:null,//剩余标志按钮
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            this.mType = 0;

            var bgsprite = cc.Sprite.create("#ddz_card_counter_bg.png");
            bgsprite.attr({
                anchorX:0.5,
                anchorY:1
            });
            this.addChild(bgsprite, 0);

            for(var i=3;i<18;i++){  //0-19
                var numlabel = cc.LabelTTF.create(""+0, sGameData.mFontname,20);
                numlabel.setPosition(cc.p(-bgsprite.width/2 - 56 +26*i,-47));
                numlabel.setColor(cc.color(0,0,0));
                numlabel.setTag(8500+i);
                this.addChild(numlabel,1);
            }
            this.reinit();

//            var textsprite = cc.Sprite.create("#ddz_w_out.png")
//            textsprite.setPosition(cc.p(bgsprite.width/2-30,-32));
//            this.addChild(textsprite, 1);

            var outSprite = cc.Sprite.create("#ddz_w_out.png")
            var outSprite1 = cc.Sprite.create("#ddz_w_out.png")
            var outSprite2 = cc.Sprite.create("#ddz_w_out.png")
            var outItem = cc.MenuItemSprite.create(
                outSprite,
                outSprite1,
                outSprite2,
                this.click_showhas,this);
            outItem.attr({
                x:bgsprite.width/2-30,
                y:-33
            });
            this.mOutBtn = outItem

            var hasSprite = cc.Sprite.create("#ddz_w_sy.png")
            var hasSprite1 = cc.Sprite.create("#ddz_w_sy.png")
            var hasSprite2 = cc.Sprite.create("#ddz_w_sy.png")
            var hasItem = cc.MenuItemSprite.create(
                hasSprite,
                hasSprite1,
                hasSprite2,
                this.click_showout,this);
            hasItem.attr({
                x:bgsprite.width/2-30,
                y:-33
            });
            hasItem.setVisible(false);
            this.mHasBtn = hasItem

            var menu = cc.Menu.create(outItem,hasItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);



            bRet = true;
        }
        return bRet;
    },
    //重新初始化
    reinit:function(){
        for(var i=0;i<20;i++){  //0-19
            this.mOutCards[i] = 0;
        }
        this.setShow();
    },
    //选择出牌模式
    click_showout:function(){
        log("click_showout-")
        playClickSound();
        this.mOutBtn.setVisible(true);
        this.mHasBtn.setVisible(false);
        this.mType = 0;
        this.setShow();
    },
    //选择剩余模式
    click_showhas:function(){
        log("click_showhas-")
        playClickSound();
        this.mOutBtn.setVisible(false);
        this.mHasBtn.setVisible(true);
        this.mType = 1;
        this.setShow();
    },
    //添加出的牌
    addOutCards:function(cards){
        for(i=0; i < cards.length; i++){
            var n= cards[i] & 0x0000000F;
            var hua=((cards[i] & 0x000000F0) >> 4);
            if (n == 2){
                n=15;
            }else if (n == 15){
                n=hua == 4 ? 16 : 17;
            }
            this.mOutCards[n]++;
        }
        this.setShow();
    },
    //重新显示
    setShow:function(){
        if(this.mType ==0){
            for(var i=3;i<18;i++){  //0-19
                var numlabel = this.getChildByTag(8500+i)
                numlabel.setString(""+this.mOutCards[i]);
            }
        }else{
            for(var i=3;i<16;i++){  //0-19
                var numlabel = this.getChildByTag(8500+i)
                numlabel.setString(""+(4-this.mOutCards[i]));
            }
            for(var i=16;i<18;i++){  //0-19
                var numlabel = this.getChildByTag(8500+i)
                numlabel.setString(""+(1-this.mOutCards[i]));
            }
        }
    }
});
DDZCardsNote.create = function () {
    var sg = new DDZCardsNote();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
