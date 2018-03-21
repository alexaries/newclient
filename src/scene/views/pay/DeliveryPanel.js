/**
 * Created by ban on 08/04/17.
 */
var DeliveryPanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mEditBox_order:null,
    mGetCodeBtn:null,
    mTimetiplabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mDeliveryPanel = this;

            log("DeliveryPanel start");

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            this.addChild(colorlayer);
            colorlayer.setPosition(cc.p(0,50));
            var size_panel = cc.size(800, 465); //800 463  680, 385
            var size_panel_inner = cc.size(770, 350);//650 230
            var point_btn_buycash = cc.p(0,-0.36);
            var point_panel_close = cc.p(4,-4);//边线的高度


            var  bgimg = createSysPanel(size_panel);
            bgimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();

            var innerimg = createSysPanel_yellow(size_panel_inner);
            innerimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(innerimg);

            //var titlebg = cc.Sprite.create("#notice_title.png");
            //titlebg.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+22));
            //this.addChild(titlebg);


            var tipLabel = cc.LabelTTF.create(sResWord.w_tihuo_panel_title, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+22-15));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel);

            var ordertiplabel = cc.LabelTTF.create(sResWord.w_tihuo_order_str+":",sGameData.mFontname, 24);
            ordertiplabel.setAnchorPoint(cc.p(1,0.5));
            ordertiplabel.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2));
            this.addChild(ordertiplabel,2);
            ordertiplabel.setColor(cc.color(60,60,60));

            // top
            var size_nick_area = cc.size(400, 50);
            var s9sprite = createInputNew(size_nick_area);

            var aEditBox_num = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_num = new cc.EditBox(size_nick_area,s9sprite);
            }else{
                aEditBox_num = cc.EditBox.create(size_nick_area,s9sprite);
            }
            aEditBox_num.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_num.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_num.setAnchorPoint(cc.p(0,0.5));
            aEditBox_num.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2));
            aEditBox_num.setMaxLength(40);
            //aEditBox_num.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_num.setDelegate(this);
            aEditBox_num.setTag(7558);
            aEditBox_num.setString("");
            aEditBox_num.setFontColor(cc.color(200,200,200));
            aEditBox_num.setFontSize(32);
            this.addChild(aEditBox_num,2);
            this.mEditBox_order = aEditBox_num;

            //添加按钮 关闭
            var closesprite = cc.Sprite.create("#g_close_btn.png");
            var closesprite1 = cc.Sprite.create("#g_close_btn.png");
            var closesprite2 = cc.Sprite.create("#g_close_btn.png");
            closesprite1.setColor(cc.color(200, 200, 200));
            var closeItem = cc.MenuItemSprite.create(
                closesprite,
                closesprite1,
                closesprite2,
                this.clickToClose,this);
            closeItem.setAnchorPoint(cc.p(1,1));
            closeItem.setPosition(cc.p(size.width/2+csize.width/2-8,size.height/2+csize.height/2-6));


            var tihuoSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_tihuo_btn_str,cc.p(0.5,0.5),28,0)
            tihuoSprite.setColor(cc.color(0,0,0));
            var tihuoSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_tihuo_btn_str,cc.p(0.5,0.5),28,1)
            var tihuoSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_tihuo_btn_str,cc.p(0.5,0.5),28,0)
            var tihuoItem = cc.MenuItemSprite.create(
                tihuoSprite,
                tihuoSprite1,
                tihuoSprite2,
                this.clickDelivery,this);
            tihuoItem.attr({
                x:size.width/2,
                y:size.height/2-csize.height*0.35,
                anchorX:0.5,
                anchorY:0
            });

            var menu = cc.Menu.create(closeItem,tihuoItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            var tiplabel = cc.LabelTTF.create(sResWord.w_tishi+":"+sResWord.w_tihuo_tip, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,0.5));
            tiplabel.setPosition(cc.p(size.width/2,size.height/2-csize.height*0.1 + 30));
            tiplabel.setTag(8002);
            this.addChild(tiplabel,2);
            tiplabel.setColor(cc.color(60,60,60));



            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mDeliveryPanel = null;
    },

    startShow:function(){
        this.clearOrderEditBox();
    },

    clearOrderEditBox:function(){
        this.mEditBox_order.setString("");
    },

    stopShow:function(){

    },

    //关闭
    clickToClose:function(){
        log("clickToClose--")
        playClickSound();
        if(sGameData.mCurrLayer == sGameData.mPayLayer){
            sGameData.mPayLayer.showDelivery(false);
        }
    },

    clickDelivery:function(){
        var userId = sGameData.mUser.id;
        var orderStr = this.mEditBox_order.getString();
        if(orderStr!=null&& orderStr.length >=6){
            log("start Delivery")
            var url = "http://test.smtyg.com/pay/sendgoods.php";
            var params = "id="+userId+"&"+"orderNo="+orderStr;
            var turl = url+"?"+params;
            log("delivery url = " + turl);
            CallCpp.doSomeString(17,"tihuoApply",turl,"get","","");
        }else{
            showLittleNotice(sResWord.w_tihuo_tip_no_order);
        }

    },
});

DeliveryPanel.create = function () {
    var sg = new DeliveryPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};