/**
 * Created by apple on 14-12-11.
 */
//消息详情面板
var BindAlipayPanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mEditBox_num:null,
    mEditBox_num1:null,
    mEditBox_name:null,
    mGetCodeBtn:null,
    mTimetiplabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mBindAlipayPanel = this;

            log("BindAlipayPanel start");



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


            var tipLabel = cc.LabelTTF.create(sResWord.w_user_bindalipay, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+22-15));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel);

            var numtiplabel = cc.LabelTTF.create(sResWord.w_user_bindalipay_tip_input+":",sGameData.mFontname, 24);
            numtiplabel.setAnchorPoint(cc.p(1,0.5));
            numtiplabel.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2+40));
            this.addChild(numtiplabel,2);
            numtiplabel.setColor(cc.color(60,60,60));

            var numtiplabel2 = cc.LabelTTF.create(sResWord.w_user_bindalipay_tip_input0+":",sGameData.mFontname, 24);
            numtiplabel2.setAnchorPoint(cc.p(1,0.5));
            numtiplabel2.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2-25));
            this.addChild(numtiplabel2,2);
            numtiplabel2.setColor(cc.color(60,60,60));

            var numtiplabel1 = cc.LabelTTF.create(sResWord.w_user_bindalipay_tip_input1+":",sGameData.mFontname, 24);
            numtiplabel1.setAnchorPoint(cc.p(1,0.5));
            numtiplabel1.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2-70-20));
            this.addChild(numtiplabel1,2);
            numtiplabel1.setColor(cc.color(60,60,60));


            // top
            var size_nick_area = cc.size(300, 50);
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
            aEditBox_num.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2+40));
            aEditBox_num.setMaxLength(120);
            //aEditBox_num.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_num.setDelegate(this);
            aEditBox_num.setTag(7558);
            aEditBox_num.setString("");
            aEditBox_num.setFontColor(cc.color(200,200,200));
            aEditBox_num.setFontSize(32);
            this.addChild(aEditBox_num,2);
            this.mEditBox_num = aEditBox_num;


            var s9sprite0 = createInputNew(size_nick_area);

            var aEditBox_num1 = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_num1 = new cc.EditBox(size_nick_area,s9sprite0);
            }else{
                aEditBox_num1 = cc.EditBox.create(size_nick_area,s9sprite0);
            }
            aEditBox_num1.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_num1.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_num1.setAnchorPoint(cc.p(0,0.5));
            aEditBox_num1.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2-25));
            aEditBox_num1.setMaxLength(120);
            //aEditBox_num.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_num1.setDelegate(this);
            aEditBox_num1.setTag(7558);
            aEditBox_num1.setString("");
            aEditBox_num1.setFontColor(cc.color(200,200,200));
            aEditBox_num1.setFontSize(32);
            this.addChild(aEditBox_num1,2);
            this.mEditBox_num1 = aEditBox_num1;


            var s9sprite1 = createInputNew(size_nick_area);

            var aEditBox_name = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_name = new cc.EditBox(size_nick_area,s9sprite1);
            }else{
                aEditBox_name = cc.EditBox.create(size_nick_area,s9sprite1);
            }
            aEditBox_name.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_name.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_name.setAnchorPoint(cc.p(0,0.5));
            aEditBox_name.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2-70-20));
            aEditBox_name.setMaxLength(120);
            //aEditBox_name.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_name.setDelegate(this);
            aEditBox_name.setTag(7558);
            aEditBox_name.setString("");
            aEditBox_name.setFontColor(cc.color(200,200,200));
            aEditBox_name.setFontSize(32);
            this.addChild(aEditBox_name,2);
            this.mEditBox_name = aEditBox_name;



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


            var bindphoneSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_user_bindalipay_submit,cc.p(0.5,0.5),28,0)
            bindphoneSprite.setColor(cc.color(0,0,0));
            var bindphoneSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_user_bindalipay_submit,cc.p(0.5,0.5),28,1)
            var bindphoneSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_user_bindalipay_submit,cc.p(0.5,0.5),28,0)
            var bindphoneItem = cc.MenuItemSprite.create(
                bindphoneSprite,
                bindphoneSprite1,
                bindphoneSprite2,
                this.clickBindAli,this);
            bindphoneItem.attr({
                x:size.width/2,
                y:size.height/2-csize.height*0.35-10,
                anchorX:0.5,
                anchorY:0
            });




            var menu = cc.Menu.create(closeItem,bindphoneItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);



            var tiplabel = cc.LabelTTF.create(sResWord.w_tishi+":"+sResWord.w_user_bindalipay_tip, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,0.5));
            tiplabel.setPosition(cc.p(size.width/2,size.height/2-csize.height*0.1-20));
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
        sGameData.mBindAlipayPanel = null;
    },
    update:function(){
        this.checkState();
    },
    startShow:function(){
        this.checkState();

        this.mEditBox_num.setString("");
        this.mEditBox_num1.setString("");

        this.schedule(this.update,0.05);
    },
    stopShow:function(){
        this.unschedule(this.update);
    },
    //关闭
    clickToClose:function(){
        log("clickToClose--")
        playClickSound();
        if(sGameData.mCurrLayer == sGameData.mPlayerInfoLayer){
            sGameData.mPlayerInfoLayer.showBindPhoneAlipay(false);
        }
    },

    clickBindAli:function(){
        log("clickBindAli--")
        playClickSound();

        var account = this.mEditBox_num.getString();
        var account1 = this.mEditBox_num1.getString();
        var name = this.mEditBox_name.getString();
        if(account1 == account) {
            if ((checkNumber(account) && account.length == 11) || checkEmail(account)) {


                if (name != null && name.length > 0) {
                    //showLittleNotice(sResWord.w_notopen);

                    var tdata = {};
                    tdata.alipay = account;
                    tdata.realname = name;
                    sGameData.mTempData = tdata;
                    if (!sGameData.mIsSendingData) {
                        sGameData.mIsSendingData = true
                        sGameData.mGameNet.sendBindAlipay(account, name);
                    }
                    if (sGameData.mCurrLayer == sGameData.mPlayerInfoLayer) {
                        sGameData.mPlayerInfoLayer.showBindPhoneAlipay(false);
                    }
                } else {
                    showLittleNotice(sResWord.w_bind_tip_no_alipay_name);
                }
            } else {
                showLittleNotice(sResWord.w_bind_tip_no_alipay);
            }
        }else{
            showLittleNotice(sResWord.w_bind_tip_no_alipay_two);
        }


    },



    checkState:function(){


    }







});

BindAlipayPanel.create = function () {
    var sg = new BindAlipayPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};