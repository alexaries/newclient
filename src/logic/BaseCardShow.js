/**
 * Created by mac_apple on 16/3/3.
 */

var BaseCardShow = cc.Node.extend({
    mCardValue:0, //
    mBgSprite:null,
    mCardNode:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgSprite = cc.Sprite.create("#card_back_bg.png")
            bgSprite.attr({
                anchorX: 0,
                anchorY:0
            });
            this.addChild(bgSprite);
            this.mBgSprite = bgSprite;
            this.setContentSize(bgSprite.getContentSize());

            var basenode = cc.Node.create();
            this.addChild(basenode);
            basenode.setVisible(false);
            this.mCardNode = basenode;

            var numSprite = cc.Sprite.create("#card_w_0a.png")
            basenode.addChild(numSprite);
            numSprite.setPosition(cc.p(40,245));
            numSprite.setAnchorPoint(cc.p(0.5,1))
            numSprite.setTag(9001);

            var sSeSprite = cc.Sprite.create("#card_se_0s.png")
            basenode.addChild(sSeSprite);
            sSeSprite.setPosition(cc.p(37,150));
            sSeSprite.setTag(9002);

            var iconSprite = cc.Sprite.create("#card_se_0.png")
            basenode.addChild(iconSprite);
            iconSprite.setPosition(cc.p(120,94));
            iconSprite.setTag(9003);

            if(this.mCardValue > 0){
                this.setCardValue(this.mCardValue);
            }
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //改变牌值
    setCardValue:function(cardvalue){
        log("setCardValue=="+cardvalue);
        this.mCardValue = cardvalue;
        if(cardvalue > 0){
            this.mBgSprite.setSpriteFrame("card_bg.png");
            this.mCardNode.setVisible(true);
            this.setFormat(this.mBgSprite);

            var se = ((cardvalue&0x000000F0)>>4);//花色
            var value = cardvalue&0x0000000F;//数值 2-A


            var numSprite = this.mCardNode.getChildByTag(9001)
            if(numSprite){
                var numpic = this.getCardNumSprite(se,value)
                numSprite.setSpriteFrame(numpic);
                if(se==4||se==5){
                    numSprite.setPosition(cc.p(30,245));
                }else{
                    numSprite.setPosition(cc.p(40,245));
                }
                this.setFormat(numSprite);
            }

            var sSeSprite = this.mCardNode.getChildByTag(9002)
            if(sSeSprite){
                if(se == 4||se==5){
                    sSeSprite.setVisible(false)
                }else{
                    sSeSprite.setVisible(true)
                    var sepic = this.getCardSeSprite(se)
                    sSeSprite.setSpriteFrame(sepic);
                    if(se == 3||se == 1){
                        sSeSprite.setPosition(cc.p(36,150));
                    }else{
                        sSeSprite.setPosition(cc.p(37,150));
                    }
                    this.setFormat(sSeSprite);
                }
            }

            var iconSprite = this.mCardNode.getChildByTag(9003)
            if(iconSprite){
                var iconpic = this.getCardIcon(se,value)
                iconSprite.setSpriteFrame(iconpic);
                if(value == 11||value == 12||value == 13){
                    iconSprite.setAnchorPoint(cc.p(1,0))
                    iconSprite.setPosition(cc.p(180,20));
                }else if(se==4||se==5){
                    iconSprite.setAnchorPoint(cc.p(1,0))
                    iconSprite.setPosition(cc.p(180,20));
                }else{
                    iconSprite.setAnchorPoint(cc.p(0.5,0.5))
                    iconSprite.setPosition(cc.p(120,94));
                }
                this.setFormat(iconSprite);
            }

        }else{
            this.mBgSprite.setSpriteFrame("card_back_bg.png");
            this.mCardNode.setVisible(false);
            this.setFormat(this.mBgSprite);
        }
    },
    setFormat:function(sprite){
        //var texture = sprite.getTexture()
        //texture.setAliasTexParameters();
    },
    getCardNumSprite:function(se,value){
        var name = "card_w_0a.png"
        var tmp = se
        var tmp1 = value;
        if(tmp1 == 10){
            tmp1 = "a";
        }else if(tmp1 == 11){
            tmp1 = "b";
        }else if(tmp1 == 12){
            tmp1 = "c";
        }else if(tmp1 == 13){
            tmp1 = "d";
        }else if(tmp1 == 14){
            tmp1 = "e";
        }else if(tmp1 == 15){
            tmp1 = "f";
        }

        if(tmp == 2){
            tmp = 0
        }else  if(tmp == 3){
            tmp = 1
        }
        name = "card_w_"+tmp+tmp1+".png";
        return name;
    },
    getCardSeSprite:function(se){
        var name = "card_w_0a.png"
        name = "card_se_"+se+"s.png";
        return name;
    },
    getCardIcon:function(se,value){
        var name = "card_se_"+se+".png"
        if(value == 11){
            if(se == 0||se==2){
                name = "card_i_0b.png";
            }else{
                name = "card_i_1b.png";
            }
        }else if(value == 12){
            if(se == 0||se==2){
                name = "card_i_0c.png";
            }else{
                name = "card_i_1c.png";
            }
        }else if(value == 13){
            if(se == 0||se==2){
                name = "card_i_0d.png";
            }else{
                name = "card_i_1d.png";
            }
        }else if(se==4){
            name = "card_i_4f.png";
        }else if(se==5){
            name = "card_i_5f.png";
        }
        return name;
    }

});



BaseCardShow.create = function (cardvalue) {
    if(cardvalue == null){
        cardvalue = 0;
    }
    var sg = new BaseCardShow();
    if (sg) {
        sg.mCardValue = cardvalue;
        sg.init()
        return sg;
    }
    return null;
};
