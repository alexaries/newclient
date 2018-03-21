/**
 * Created by apple on 14-12-11.
 */
//消息详情面板
var BindPhonePanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mEditBox_num:null,
    mEditBox_vcode:null,
    mGetCodeBtn:null,
    mTimetiplabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mBindPhonePanel = this;

            log("BindPhonePanel start");



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


            var tipLabel = cc.LabelTTF.create(sResWord.w_binding_phone, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+22-15));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel);

            var numtiplabel = cc.LabelTTF.create(sResWord.w_bind_input_phonenum+":",sGameData.mFontname, 24);
            numtiplabel.setAnchorPoint(cc.p(1,0.5));
            numtiplabel.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2));
            this.addChild(numtiplabel,2);
            numtiplabel.setColor(cc.color(60,60,60));

            var vcodetiplabel = cc.LabelTTF.create(sResWord.w_bind_input_vcode+":",sGameData.mFontname, 24);
            vcodetiplabel.setAnchorPoint(cc.p(1,0.5));
            vcodetiplabel.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.05));
            this.addChild(vcodetiplabel,2);
            vcodetiplabel.setColor(cc.color(60,60,60));

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
            aEditBox_num.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2));
            aEditBox_num.setMaxLength(20);
            //aEditBox_num.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_num.setDelegate(this);
            aEditBox_num.setTag(7558);
            aEditBox_num.setString("");
            aEditBox_num.setFontColor(cc.color(200,200,200));
            aEditBox_num.setFontSize(32);
            this.addChild(aEditBox_num,2);
            this.mEditBox_num = aEditBox_num;



            var size_nick_area1 = cc.size(150, 50);

            var s9sprite1 = createInputNew(size_nick_area1);

            var aEditBox_vcode = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_vcode = new cc.EditBox(size_nick_area1,s9sprite1);
            }else{
                aEditBox_vcode = cc.EditBox.create(size_nick_area1,s9sprite1);
            }
            aEditBox_vcode.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_vcode.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_vcode.setAnchorPoint(cc.p(0,0.5));
            aEditBox_vcode.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.05));
            aEditBox_vcode.setMaxLength(20);
            //aEditBox_vcode.setReturnType(kKeyboardReturnTypeDone);
            aEditBox_vcode.setDelegate(this);
            aEditBox_vcode.setTag(7558);
            aEditBox_vcode.setString("");
            aEditBox_vcode.setFontColor(cc.color(200,200,200));
            aEditBox_vcode.setFontSize(32);
            this.addChild(aEditBox_vcode,2);
            this.mEditBox_vcode = aEditBox_vcode;




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


            var bindphoneSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_submit,cc.p(0.5,0.5),28,0)
            bindphoneSprite.setColor(cc.color(0,0,0));
            var bindphoneSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_submit,cc.p(0.5,0.5),28,1)
            var bindphoneSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_submit,cc.p(0.5,0.5),28,0)
            var bindphoneItem = cc.MenuItemSprite.create(
                bindphoneSprite,
                bindphoneSprite1,
                bindphoneSprite2,
                this.clickBindPhone,this);
            bindphoneItem.attr({
                x:size.width/2,
                y:size.height/2-csize.height*0.35,
                anchorX:0.5,
                anchorY:0
            });

            var getvcodeSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_get_vcode,cc.p(0.5,0.5),28,0)
            getvcodeSprite.setColor(cc.color(0,0,0));
            var getvcodeSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_get_vcode,cc.p(0.5,0.5),28,1)
            var getvcodeSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_bind_get_vcode,cc.p(0.5,0.5),28,0)
            var getvcodeItem = cc.MenuItemSprite.create(
                getvcodeSprite,
                getvcodeSprite1,
                getvcodeSprite2,
                this.clickGetVcode,this);
            getvcodeItem.attr({
                x:size.width/2+csize.width*0.34,
                y:size.height/2+csize.height*0.2,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mGetCodeBtn = getvcodeItem;


            var menu = cc.Menu.create(closeItem,bindphoneItem,getvcodeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            var timetiplabel = cc.LabelTTF.create(sResWord.w_bind_timetip_s2, sGameData.mFontname, 24);//垂直对齐
            timetiplabel.setAnchorPoint(cc.p(0.5,0.5));
            timetiplabel.setPosition(cc.p(size.width/2+csize.width*0.34,size.height/2+csize.height*0.2));
            this.addChild(timetiplabel,2);
            timetiplabel.setTag(8003);
            this.mTimetiplabel = timetiplabel
            timetiplabel.setColor(cc.color(60,60,60));


            var tiplabel = cc.LabelTTF.create(sResWord.w_tishi+":"+sResWord.w_bind_tip, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,0.5));
            tiplabel.setPosition(cc.p(size.width/2,size.height/2-csize.height*0.1));
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
        sGameData.mBindPhonePanel = null;
    },
    update:function(){
        this.checkState();
    },
    startShow:function(){
        this.checkState();

        this.mEditBox_num.setString("");
        this.mEditBox_vcode.setString("");

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
            sGameData.mPlayerInfoLayer.showBindPhone(false);
        }
        if(sGameData.mUILayer){
            sGameData.mUILayer.showBindPhone(false);
        }
    },
    clickGetVcode:function(){
        log("clickGetVcode--")
        playClickSound();

//        sGameData.mGetVCodeTime = (new Date()).getTime()
//        this.checkState();

        var phonenum = this.mEditBox_num.getString();
        if(phonenum!=null&& phonenum.length >=6){
            log("start get vcode")
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendBindMobileGetCode(phonenum);
            }
        }else{
            showLittleNotice(sResWord.w_bind_tip_no_num);
        }



    },
    clickBindPhone:function(){
        log("clickGetVcode--")
        playClickSound();

        var vcode = this.mEditBox_vcode.getString();
        if(vcode!=null&& vcode.length >0){
            log("start bind phone")
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendBindMobileVerifyCode(vcode);
            }
        }else{
            showLittleNotice(sResWord.w_bind_tip_no_code);
        }

    },



    checkState:function(){
        var now = (new Date()).getTime();


        var delaytime = sGameData.mSMSDelayTime;

        if(now - sGameData.mGetVCodeTime <= delaytime*1000 && now - sGameData.mGetVCodeTime >= 0){
            this.mTimetiplabel.setVisible(true)
            this.mGetCodeBtn.setVisible(false);
            var num = delaytime - Math.floor((now - sGameData.mGetVCodeTime)/1000)
            var timestr = num+sResWord.w_bind_timetip_s2
            this.mTimetiplabel.setString(timestr)
        }else{
            this.mTimetiplabel.setVisible(false)
            this.mGetCodeBtn.setVisible(true);
        }
    }







});

BindPhonePanel.create = function () {
    var sg = new BindPhonePanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};