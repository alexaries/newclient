/**
 * Created by Administrator on 14-5-30.
 */
//消息详情面板
var HelpPanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mQuesType:0,//
    mType1Btn:null,
    mType2Btn:null,
    mType3Btn:null,
    mType4Btn:null,
    mTypesBtn:[],
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mHelpPanel = this;

            log("HelpPanel start");
            this.mPicDatas = [];


            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(0,50))
            this.addChild(colorlayer);
            var size_panel = cc.size(800, 465); //800 463  680, 385
            var size_panel_inner = cc.size(796, 310);//650 230
            var point_btn_buycash = cc.p(0,-0.38);
            var point_panel_close = cc.p(4,-4);//边线的高度


            var  bgimg = createSysPanel(size_panel);
            bgimg.setPosition(cc.p(size.width/2,size.height/2));
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(size.width/2,size.height/2+20));
            this.addChild(innerimg);


            var tipLabel = cc.LabelTTF.create(sResWord.w_contactkefu, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+8));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            this.addChild(tipLabel);



            var tip1Label = cc.LabelTTF.create(sResWord.w_ques_tip1, sGameData.mFontname, 24);//垂直对齐
            tip1Label.setPosition(cc.p(size.width/2-295,size.height/2-csize.height*0.3+40+55));
            tip1Label.setAnchorPoint(cc.p(0,0.5));
            this.addChild(tip1Label);
            tip1Label.setColor(cc.color(60,60,60))

            var tip2Label = cc.LabelTTF.create(sResWord.w_ques_tip2, sGameData.mFontname, 24);//垂直对齐
            tip2Label.setPosition(cc.p(size.width/2-295,size.height/2-csize.height*0.3+40+15));
            tip2Label.setAnchorPoint(cc.p(0,0.5));
            this.addChild(tip2Label);
            tip2Label.setColor(cc.color(60,60,60))


            var ttwidth = 600;
            var size_content1 = cc.size(ttwidth, 60);
            var s9sprite0 = createInputNew(size_content1);
            this.addChild(s9sprite0)
            s9sprite0.setAnchorPoint(cc.p(0.5,1));
            s9sprite0.setPosition(cc.p(size.width/2,size.height-218));

            //var size_phone1 = cc.size(ttwidth, 60);
            //var s9sprite01 = createInputNew(size_phone1);
            //this.addChild(s9sprite01)
            //s9sprite01.setAnchorPoint(cc.p(0.5,1));
            //s9sprite01.setPosition(cc.p(size.width/2,size.height-328));


            // top
            var size_content = cc.size(ttwidth, 60);
            var s9sprite = cc.Scale9Sprite.create();
            s9sprite.initWithSpriteFrameName("blank.png");
            var aEditBox_content = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_content = new cc.EditBox(size_content,s9sprite);
            }else{
                aEditBox_content = cc.EditBox.create(size_content,s9sprite);
            }
            aEditBox_content.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)//cc.EDITBOX_INPUT_MODE_SINGLELINE
            aEditBox_content.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_content.setPlaceHolder(sResWord.w_ques_tip_q);
            aEditBox_content.setPlaceholderFont(sGameData.mFontname,24);
            aEditBox_content.setAnchorPoint(cc.p(0.5,1));
            aEditBox_content.setPosition(cc.p(size.width/2,size.height-218));
            aEditBox_content.setTag(7558);
            aEditBox_content.setMaxLength(400);
            aEditBox_content.setString("");
            aEditBox_content.setFontColor(cc.color(200,200,200));
            aEditBox_content.setFontName(sGameData.mFontname)
            aEditBox_content.setFontSize(30);
            this.addChild(aEditBox_content,6);
            this.mEditbox_content = aEditBox_content;


            //var size_phone = cc.size(ttwidth, 60);
            //var s9sprite1 = cc.Scale9Sprite.create();
            //s9sprite1.initWithSpriteFrameName("blank.png");
            //var aEditBox_phone = null;
            //if(sGameData.mCocosVerCode >=30100){
            //    aEditBox_phone = new cc.EditBox(size_phone,s9sprite1);
            //}else{
            //    aEditBox_phone = cc.EditBox.create(size_phone,s9sprite1);
            //}
            //aEditBox_phone.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            //aEditBox_phone.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            //aEditBox_phone.setPlaceHolder(sResWord.w_tip_contactinfo);
            //aEditBox_phone.setPlaceholderFont(sGameData.mFontname,24);
            //aEditBox_phone.setAnchorPoint(cc.p(0.5,1));
            //aEditBox_phone.setPosition(cc.p(size.width/2,size.height-328));
            //aEditBox_phone.setTag(7558);
            //aEditBox_phone.setMaxLength(60);
            //aEditBox_phone.setString("");
            //aEditBox_phone.setFontColor(cc.color(200,200,200));
            //aEditBox_phone.setFontName(sGameData.mFontname)
            //aEditBox_phone.setFontSize(30);
            //this.addChild(aEditBox_phone,6);
            //this.mEditbox_contactinfo = aEditBox_phone;


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



            var btnsize = cc.size(170,50)
            var twidth = (650+(size.width-960))/4;
            var wcolor = cc.color(255,255,255);

            var type1Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24,wcolor);
            var type1Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24,wcolor);
            var type1Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24,wcolor);
            var type1Item = cc.MenuItemSprite.create(
                type1Sprite,
                type1Sprite1,
                type1Sprite2,
                this.clickType1,this);
            type1Item.attr({
                x:size.width/2+30-twidth*3/2,
                y:size.height/2+158,
                anchorX:0.5,
                anchorY:1
            });
            this.mType1Btn = type1Item;

            this.mQuesType = 1;
            type1Item.setEnabled(false);


            var type2Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24,wcolor);
            var type2Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24,wcolor);
            var type2Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24,wcolor);
            var type2Item = cc.MenuItemSprite.create(
                type2Sprite,
                type2Sprite1,
                type2Sprite2,
                this.clickType2,this);
            type2Item.attr({
                x:size.width/2+30-twidth/2,
                y:size.height/2+158,
                anchorX:0.5,
                anchorY:1
            });
            this.mType2Btn = type2Item;

            var type3Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24,wcolor);
            var type3Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24,wcolor);
            var type3Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24,wcolor);
            var type3Item = cc.MenuItemSprite.create(
                type3Sprite,
                type3Sprite1,
                type3Sprite2,
                this.clickType3,this);
            type3Item.attr({
                x:size.width/2+30+twidth/2,
                y:size.height/2+158,
                anchorX:0.5,
                anchorY:1
            });
            this.mType3Btn = type3Item;

            var type4Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24,wcolor);
            var type4Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24,wcolor);
            var type4Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24,wcolor);
            var type4Item = cc.MenuItemSprite.create(
                type4Sprite,
                type4Sprite1,
                type4Sprite2,
                this.clickType4,this);
            type4Item.attr({
                x:size.width/2+30+twidth*3/2,
                y:size.height/2+158,
                anchorX:0.5,
                anchorY:1
            });
            this.mType4Btn = type4Item;
            type1Item.setVisible(false);
            type2Item.setVisible(false);
            type3Item.setVisible(false);
            type4Item.setVisible(false);


            var submitsprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_submit, cc.p(0.5,0.5), 32,0);
            var submitsprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_submit, cc.p(0.5,0.5), 32,1);
            var submitsprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_submit, cc.p(0.5,0.5), 32,0);

            var submitItem = cc.MenuItemSprite.create(
                submitsprite,
                submitsprite1,
                submitsprite2,
                this.clickSubmit,this);
            submitItem.setPosition(cc.p(size.width/2-150,size.height/2+csize.height*point_btn_buycash.y));
            submitItem.setScale(0.8);



            var close1sprite = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,0);
            var close1sprite1 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,1);
            var close1sprite2 = ButtonSpriteWithWordInner("#btn_blue_2.png",sResWord.w_close, cc.p(0.5,0.5), 32,0);

            var close1Item = cc.MenuItemSprite.create(
                close1sprite,
                close1sprite1,
                close1sprite2,
                this.clickToClose,this);
            close1Item.setPosition(cc.p(size.width/2+150,size.height/2+csize.height*point_btn_buycash.y));
            close1Item.setScale(0.8);


            var menu = cc.Menu.create(closeItem,close1Item,submitItem,type1Item,type2Item,type3Item,type4Item);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.mTypesBtn = [null,this.mType1Btn,this.mType2Btn,this.mType3Btn,this.mType4Btn];

            this.clickType(4);

            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mHelpPanel = null;
    },

    //关闭
    clickToClose:function() {
        log("clickToClose--")
        playClickSound();

        var content = this.mEditbox_content.getString();
        if (doTestActionByInput(content, this.mEditbox_content)) {

        }else{
            sGameData.mMsgLayer.clickShowHelp(false);
        }
    },
    //设置消息
    setValue:function(){
        //this.mEditbox_contactinfo.setString("");
        this.mEditbox_content.setString("");
    },
    clickSubmit:function(){

        var contactinfo = "0000000000";//this.mEditbox_contactinfo.getString();
        var content = this.mEditbox_content.getString();
        if (doTestActionByInput(content, this.mEditbox_content)) {

        }else {
            if (content != null && content.length >= 10 && content.length <= 500 && content != sResWord.w_ques_tip_q) {
                var uid = sGameData.mUser.id;
                var qtype = this.mQuesType;
                sGameData.mGameNet.sendQuestionService(uid, qtype, sGameData.mDeviceName, sGameData.mPlatform, content, contactinfo);
                sGameData.mMsgLayer.clickShowHelp(false);
                //this.mEditbox_contactinfo.setString("");
                this.mEditbox_content.setString("");

            } else {
                showLittleNotice(sResWord.w_tip_input_check_content);
            }
        }
    },
    clickType1:function(){

        playClickSound();
        this.clickType(1);
    },
    clickType2:function(){

        playClickSound();
        this.clickType(2);
    },
    clickType3:function(){

        playClickSound();
        this.clickType(3);
    },
    clickType4:function(){

        playClickSound();
        this.clickType(4);
    },
    clickType:function(type){
        this.mType1Btn.setEnabled(true);
        this.mType2Btn.setEnabled(true);
        this.mType3Btn.setEnabled(true);
        this.mType4Btn.setEnabled(true);

        this.mQuesType = type;

        this.mTypesBtn[type].setEnabled(false);
    }




});

HelpPanel.create = function () {
    var sg = new HelpPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};