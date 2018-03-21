/**
 * Created by apple on 15-12-28.
 */

var ContactKefuLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mQuesType:4,//
    mType1Btn:null,
    mType2Btn:null,
    mType3Btn:null,
    mType4Btn:null,
    mTypesBtn:[],
    mEditbox_content:null,
    mEditbox_contactinfo:null,
    mPicDatas:[],
    mPicData:"",
    mCPiclabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mContactKefuLayer = this;
            sGameData.mCurrLayer = this;

            log("ContactKefuLayer start");

            this.mPicDatas = [];

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();

            this.mTitle = sResWord.w_contactkefu;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,215);
            this.mTopShowType = 0; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 2; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();

            var bgsize1 = this.mPanelInnerSize;
            var bgSprite1 = createSysPanel_t3(bgsize1);
            bgSprite1.setPosition(cc.p(size.width * 0.5, 25));
            bgSprite1.setAnchorPoint(cc.p(0.5,0));
            this.addChild(bgSprite1,1);



            var phonelabel = cc.LabelTTF.create(sResWord.w_ques_tip1, sGameData.mFontname, 24);
            phonelabel.setAnchorPoint(cc.p(1,0.5));
            phonelabel.setPosition(cc.p(size.width-10,size.height-45));
            this.addChild(phonelabel,2);
            phonelabel.setColor(cc.color(60,60,60))

            this.initGameData();

            bRet = true;
        }
        return bRet;
    },

    initGameData:function(){
        var size = cc.director.getWinSize();
        var ttwidth = 850+(size.width-960);
        var twidth = (850+(size.width-960))/4;






        // top
        var size_content = cc.size(ttwidth, 80);
        var s9sprite = createNickArea(size_content);
        var aEditBox_content = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_content = new cc.EditBox(size_content,s9sprite);
        }else{
            aEditBox_content = cc.EditBox.create(size_content,s9sprite);
        }
        aEditBox_content.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_content.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_content.setPlaceHolder(sResWord.w_ques_login_tip);
        aEditBox_content.setPlaceholderFont(sGameData.mFontname,24);
        aEditBox_content.setAnchorPoint(cc.p(0.5,1));
        aEditBox_content.setPosition(cc.p(size.width/2,size.height-198));
        aEditBox_content.setTag(7558);
        aEditBox_content.setMaxLength(28);
        aEditBox_content.setString("");
        aEditBox_content.setFontColor(cc.color(0,0,0));
        aEditBox_content.setFontSize(24);
        this.addChild(aEditBox_content,6);
        this.mEditbox_content = aEditBox_content;
        var size_phone = cc.size(ttwidth-320, 80);
        var s9sprite1 = createNickArea(size_phone);
        var aEditBox_phone = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_phone = new cc.EditBox(size_phone,s9sprite1);
        }else{
            aEditBox_phone = cc.EditBox.create(size_phone,s9sprite1);
        }
        aEditBox_phone.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_phone.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_phone.setPlaceHolder(sResWord.w_tip_contactinfo);
        aEditBox_phone.setPlaceholderFont(sGameData.mFontname,24);
        aEditBox_phone.setAnchorPoint(cc.p(0.5,1));
        aEditBox_phone.setPosition(cc.p(size.width/2,size.height-298));
        aEditBox_phone.setTag(7558);
        aEditBox_phone.setMaxLength(28);
        aEditBox_phone.setString("");
        aEditBox_phone.setFontColor(cc.color(0,0,0));
        aEditBox_phone.setFontSize(24);
        this.addChild(aEditBox_phone,6);
        this.mEditbox_contactinfo = aEditBox_phone;



        var btnsize = cc.size(170,50)

        var type1Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24);
        var type1Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24);
        var type1Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_login,cc.p(0.6,0.5),0,24);
        var type1Item = cc.MenuItemSprite.create(
            type1Sprite,
            type1Sprite1,
            type1Sprite2,
            this.clickType1,this);
        type1Item.attr({
            x:size.width/2-twidth*3/2,
            y:size.height- 128,
            anchorX:0.5,
            anchorY:1
        });
        this.mType1Btn = type1Item;


        var type2Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24);
        var type2Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24);
        var type2Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_pay,cc.p(0.6,0.5),0,24);
        var type2Item = cc.MenuItemSprite.create(
            type2Sprite,
            type2Sprite1,
            type2Sprite2,
            this.clickType2,this);
        type2Item.attr({
            x:size.width/2-twidth/2,
            y:size.height- 128,
            anchorX:0.5,
            anchorY:1
        });
        this.mType2Btn = type2Item;

        var type3Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24);
        var type3Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24);
        var type3Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_game,cc.p(0.6,0.5),0,24);
        var type3Item = cc.MenuItemSprite.create(
            type3Sprite,
            type3Sprite1,
            type3Sprite2,
            this.clickType3,this);
        type3Item.attr({
            x:size.width/2+twidth/2,
            y:size.height- 128,
            anchorX:0.5,
            anchorY:1
        });
        this.mType3Btn = type3Item;

        var type4Sprite = createUIButtonSpriteLight(btnsize,"#checkbox_uncheck.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24);
        var type4Sprite1 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24);
        var type4Sprite2 = createUIButtonSpriteLight(btnsize,"#checkbox_checked.png",cc.p(0.1,0.5),sResWord.w_ques_other,cc.p(0.45,0.5),0,24);
        var type4Item = cc.MenuItemSprite.create(
            type4Sprite,
            type4Sprite1,
            type4Sprite2,
            this.clickType4,this);
        type4Item.attr({
            x:size.width/2+twidth*3/2,
            y:size.height- 128,
            anchorX:0.5,
            anchorY:1
        });
        this.mType4Btn = type4Item;
        type1Item.setVisible(false);
        type2Item.setVisible(false);
        type3Item.setVisible(false);
        type4Item.setVisible(false);


        var chooseSprite = ButtonSpriteWithWordInner("#btn_green_3.png",sResWord.w_choosepic,cc.p(0.5,0.5),28,0);
        var chooseSprite1 = ButtonSpriteWithWordInner("#btn_green_3.png",sResWord.w_choosepic,cc.p(0.5,0.5),28,1);
        var chooseSprite2 = ButtonSpriteWithWordInner("#btn_green_3.png",sResWord.w_choosepic,cc.p(0.5,0.5),28,0);
        var chooseItem = cc.MenuItemSprite.create(
            chooseSprite,
            chooseSprite1,
            chooseSprite2,
            this.clickChoose,this);
        chooseItem.attr({
            x:size.width/2-ttwidth/2,
            y:size.height- 298,
            anchorX:0,
            anchorY:1
        });

        var submitSprite = ButtonSpriteWithWordInner("#btn_blue_3.png",sResWord.w_submit,cc.p(0.5,0.5),28,0);
        var submitSprite1 = ButtonSpriteWithWordInner("#btn_blue_3.png",sResWord.w_submit,cc.p(0.5,0.5),28,1);
        var submitSprite2 = ButtonSpriteWithWordInner("#btn_blue_3.png",sResWord.w_submit,cc.p(0.5,0.5),28,0);
        var submitItem = cc.MenuItemSprite.create(
            submitSprite,
            submitSprite1,
            submitSprite2,
            this.clickSubmit,this);
        submitItem.attr({
            x:size.width/2+ttwidth/2,
            y:size.height- 298,
            anchorX:1,
            anchorY:1
        });


        var menu = cc.Menu.create(type1Item,type2Item,type3Item,type4Item,chooseItem,submitItem);

        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 3);

        this.mTypesBtn = [null,this.mType1Btn,this.mType2Btn,this.mType3Btn,this.mType4Btn];

        var pictiplabel = cc.LabelTTF.create(sResWord.w_tip_contact_cpic, sGameData.mFontname, 24);
        pictiplabel.setAnchorPoint(cc.p(0.5,0.5));
        pictiplabel.setPosition(cc.p(size.width/2,130));
        this.addChild(pictiplabel,2);
        //pictiplabel.setColor(cc.color(72,72,72))
        pictiplabel.setVisible(false);
        this.mCPiclabel = pictiplabel;

        this.clickType(4);
    },

    onExit:function(){
        this._super();
        sGameData.mContactKefuLayer = null;
        CallCpp.doSomeString(16,"","","","","");
    },
    clickType1:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.clickType(1);
    },
    clickType2:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.clickType(2);
    },
    clickType3:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.clickType(3);
    },
    clickType4:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.clickType(4);
    },
    clickType:function(type){
        this.mType1Btn.setEnabled(true);
        this.mType2Btn.setEnabled(true);
        this.mType3Btn.setEnabled(true);
        this.mType4Btn.setEnabled(true);

        this.mQuesType = type;
        var tips = ["",sResWord.w_ques_login_tip,sResWord.w_ques_pay_tip,sResWord.w_ques_game_tip,sResWord.w_ques_other_tip];
        this.mEditbox_content.setPlaceHolder(tips[type]);
        this.mTypesBtn[type].setEnabled(false);
    },
    clickChoose:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        sGameData.mEnterBackgroundFor = "avatar";
        if(cc.sys.isNative) {
            CallCpp.doSomeString(15, "0", "0", "", "", "");
        }
    },
    clickSubmit:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        //{
        //    var url = "http://qp.duole.cn:8861/version.do";
        //    var params = "version=1.3.20&agent=apple&deviceType=iphone"
        //
        //    var turl = url+"?"+params;
        //    CallCpp.doSomeString(17,"version",turl,"get","","");
        //}



        //{
        //    var userId = 1194;
        //    var md5Str = md5(userId + "iw729ka@$rt4ksfa#i2&^%7j134");
        //    var file = this.mPicData;
        //    var aurl = "http://qp.duole.cn/upAvatar.do";
        //    var params = "userId="+userId+"&sign="+md5Str+"&file="+file;
        //    if(file&&file.length>0){
        //        CallCpp.doSomeString(17,"avatar",aurl,"post",params,"");
        //    }else{
        //        showLittleNotice(sResWord.w_tip_contact_content);
        //    }
        //}

        {
            var deviceName = sGameData.mDeviceName;
            var deviceNo = sGameData.mGuestUUID;
            var describe = this.mEditbox_content.getString();
            var contact = this.mEditbox_contactinfo.getString();
            var imgdata = this.mPicData;
            if((imgdata&&imgdata.length>0)||(describe&&describe.length>0&&describe.indexOf(sResWord.w_ques_tip_start)==-1)){
                var aurl = sGameConfig.serverResWebhttp+"service.do"
                //aurl = "http://qpportal.duole.cn:8861/service.do";
                var aparams = "userId="+sGameData.mUser.id+"&questionType="+this.mQuesType+"&deviceName="+deviceName+"&deviceNo="+deviceNo+"&describe="+describe+"&contact="+contact+"&img="+imgdata;

                CallCpp.doSomeString(17,"contactkefu",aurl,"post",aparams,"");
            }else{
                showLittleNotice(sResWord.w_tip_contact_content);
            }
        }
    },
    showChoosePic:function(){
        var data = sGameData.mChoosePicData;
        //var pic = cc.Sprite.create();
        this.mPicData = data;
        this.mPicDatas.push(data);
        this.mCPiclabel.setVisible(true);
    },
    uploadEnd:function(){
        this.gotoClose();
    }




});

ContactKefuLayer.create = function () {
    var sg = new ContactKefuLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};