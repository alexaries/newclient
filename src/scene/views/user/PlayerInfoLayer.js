/**
 * Created by Administrator on 14-5-29.
 * 玩家信息
 */
var PlayerInfoLayer = BasePlayerInfoLayer.extend({  //BaseGameLayer  cc.Layer
    mUserHead:null,//头像
    mEditBox_nickname:null,// 昵称输入框
    mSexItem:null,//性别选择按钮
    mLeftBaseNode:null,
    mRightBaseNode:null,
    mPlayerInfoPanel:null,
    mBagPropsPanel:null,
    mBindPhoneBtn:null,
    mBindAliBtn:null,
    mChangeAliBtn:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mPlayerInfoLayer = this;
            sGameData.mCurrLayer = this;

            log("PlayerInfoLayer start");



            var size = cc.director.getWinSize();

            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_usercenter.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            //添加按钮 tab1
            var tabsize = cc.size(170,45);
            var tcolor = cc.color(255,255,255);
            var t1color = cc.color(200,200,200);


            var upaccountSprite = cc.Sprite.create("#btn_u_upguest.png")
            var upaccountSprite1 = cc.Sprite.create("#btn_u_upguest.png")
            upaccountSprite1.setColor(cc.color(200,200,200));
            var upaccountSprite2 = cc.Sprite.create("#btn_u_upguest.png")
            var upaccountItem = cc.MenuItemSprite.create(
                upaccountSprite,
                upaccountSprite1,
                upaccountSprite2,
                this.clickUpAccount,this);
            upaccountItem.attr({
                x:165,
                y:150,
                anchorX:0.5,
                anchorY:0.5
            });

            var changepwdSprite = cc.Sprite.create("#btn_u_changepwd.png")
            var changepwdSprite1 = cc.Sprite.create("#btn_u_changepwd.png")
            changepwdSprite1.setColor(cc.color(200,200,200));
            var changepwdSprite2 = cc.Sprite.create("#btn_u_changepwd.png")
            var changepwdItem = cc.MenuItemSprite.create(
                changepwdSprite,
                changepwdSprite1,
                changepwdSprite2,
                this.clickChangePwd,this);
            changepwdItem.attr({
                x:190,
                y:100,
                anchorX:0.5,
                anchorY:0.5
            });



            var bindaliSprite = cc.Sprite.create("#btn_u_bindali.png")
            var bindaliSprite1 = cc.Sprite.create("#btn_u_bindali.png")
            bindaliSprite1.setColor(cc.color(200,200,200));
            var bindaliSprite2 = cc.Sprite.create("#btn_u_bindali.png")
            var bindaliItem = cc.MenuItemSprite.create(
                bindaliSprite,
                bindaliSprite1,
                bindaliSprite2,
                this.clickBindAlipay,this);
            bindaliItem.attr({
                x:100,
                y:-150,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mBindAliBtn = bindaliItem


            var tcolor = cc.color(0,122,58)
            var changeAliSprite = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_user_alipay_change,cc.p(0.5,0.5),32,0,tcolor)
            var changeAliSprite1 = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_user_alipay_change,cc.p(0.5,0.5),32,1,tcolor)
            var changeAliSprite2 = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_user_alipay_change,cc.p(0.5,0.5),32,0,tcolor)
            var changeAliItem = cc.MenuItemSprite.create(
                changeAliSprite,
                changeAliSprite1,
                changeAliSprite2,
                this.clickChangeAli,this);
            changeAliItem.attr({
                x:350,
                y:-150,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mChangeAliBtn = changeAliItem
            changeAliItem.setScale(0.7);

            var alipay = sGameData.mUser.alipay
            if(alipay==null||alipay==""||alipay.length<5) {
                changeAliItem.setVisible(false);
            }else{
                bindaliItem.setVisible(false);
            }


            var bindphoneSprite = cc.Sprite.create("#btn_u_bindphone.png")
            var bindphoneSprite1 = cc.Sprite.create("#btn_u_bindphone.png")
            bindphoneSprite1.setColor(cc.color(200,200,200));
            var bindphoneSprite2 = cc.Sprite.create("#btn_u_bindphone.png")
            var bindphoneItem = cc.MenuItemSprite.create(
                bindphoneSprite,
                bindphoneSprite1,
                bindphoneSprite2,
                this.clickBindPhone,this);
            bindphoneItem.attr({
                x:100,
                y:-80,
                anchorX:0.5,
                anchorY:0.5
            });
            this.mBindPhoneBtn = bindphoneItem
            var phone = sGameData.mUser.phone
            if(phone==null||phone==""||phone.length<6) {
            }else{
                bindphoneItem.setVisible(false);
            }
            //if(!sGameData.mAppCheckBindPhone){
            //    bindphoneItem.setVisible(false);
            //}

            var menu = null
            if(sGameData.mUser.type == 0){//游客
                menu = cc.Menu.create(bindphoneItem,bindaliItem,upaccountItem,changeAliItem);
            }else if(sGameData.mUser.type == 1){//正式账号
                menu = cc.Menu.create(bindphoneItem,bindaliItem,changepwdItem,changeAliItem);
            }
            menu.x = 0;
            menu.y = 0;
            this.mPanelNode.addChild(menu, 10);

            this.showBindState();

            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mPlayerInfoLayer = null;
    },

    showRightInfo:function(){

        var csize = cc.size(500,417);

        //800,417
        var rpanelsize = cc.size(480,417);
        var panelbg = cc.Sprite.create("#user_right_bg.png");
        this.mPanelNode.addChild(panelbg);
        panelbg.setPosition(cc.p(180,0));


        var rightbasenode = cc.Node.create();
        this.mPanelNode.addChild(rightbasenode,5);
        rightbasenode.setPosition(cc.p(30,0));
        this.mRightBaseNode = rightbasenode

        //var nicktiplabel = cc.LabelTTF.create(sResWord.w_nickname+":",sGameData.mFontname, 24);
        //nicktiplabel.setAnchorPoint(cc.p(1,0.5));
        //nicktiplabel.setPosition(cc.p(0,150));
        //rightbasenode.addChild(nicktiplabel,2);
        //nicktiplabel.setColor(cc.color(72,72,72))

        var idtiplabel = cc.LabelTTF.create("ID :",sGameData.mFontname, 24);
        idtiplabel.setAnchorPoint(cc.p(1,0.5));
        idtiplabel.setPosition(cc.p(0,100));
        rightbasenode.addChild(idtiplabel,2);
        idtiplabel.setColor(cc.color(60,60,60))


        var logintiplabel = cc.LabelTTF.create(sResWord.w_account+":",sGameData.mFontname, 24);
        logintiplabel.setAnchorPoint(cc.p(1,0.5));
        logintiplabel.setPosition(cc.p(0,150));
        rightbasenode.addChild(logintiplabel,2);
        logintiplabel.setColor(cc.color(60,60,60))




        //var inputbg1 = cc.Sprite.create("#panel_cash_input_bg1.png");
        //rightbasenode.addChild(inputbg1)
        //inputbg1.setAnchorPoint(cc.p(0,0.5));
        //inputbg1.setPosition(cc.p(csize.width*0.01,150));
        //inputbg1.setScaleY(0.9);
        //
        //var nick = sGameData.mUser.nickName
        //if(nick.length > 60){
        //    nick = nick.substring(0,60);
        //}
        //// top
        //var size_nick_area = cc.size(330, 50);
        //var s9sprite = createPanel(size_nick_area,"blank.png");
        //
        //var aEditBox_nickname = null;
        //if(sGameData.mCocosVerCode >=30100){
        //    aEditBox_nickname = new cc.EditBox(size_nick_area,s9sprite);
        //}else{
        //    aEditBox_nickname = cc.EditBox.create(size_nick_area,s9sprite);
        //}
        //aEditBox_nickname.setAnchorPoint(cc.p(0,0.5));
        //aEditBox_nickname.setPosition(cc.p(csize.width*0.01+15,150));
        //aEditBox_nickname.setMaxLength(60);
        //aEditBox_nickname.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        //aEditBox_nickname.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //aEditBox_nickname.setDelegate(this);
        //aEditBox_nickname.setTag(7558);
        //aEditBox_nickname.setString(nick);
        ////aEditBox_nickname.setFontColor(cc.color(72,72,72));
        //aEditBox_nickname.setFontSize(24);
        //rightbasenode.addChild(aEditBox_nickname,2);
        //this.mEditBox_nickname = aEditBox_nickname;


        var  username = sGameData.mUser.userName;
        if(sGameData.mUser.type == 0){//游客
            username = sResWord.w_guest;
        }
        var userlabel = cc.LabelTTF.create(username, sGameData.mFontname, 24);
        userlabel.setAnchorPoint(cc.p(0,0.5));
        userlabel.setPosition(cc.p(10,150));
        rightbasenode.addChild(userlabel,2);
        setLabelScale(userlabel,350);
        userlabel.setColor(cc.color(60,60,60))

        var idlabel = cc.LabelTTF.create(sGameData.mUser.id, sGameData.mFontname, 24);
        idlabel.setAnchorPoint(cc.p(0,0.5));
        idlabel.setPosition(cc.p(10,100));
        rightbasenode.addChild(idlabel,2);
        idlabel.setColor(cc.color(60,60,60))



        var phonetiplabel = cc.LabelTTF.create(sResWord.w_phone+":",sGameData.mFontname, 24);
        phonetiplabel.setAnchorPoint(cc.p(1,0.5));
        phonetiplabel.setPosition(cc.p(0,-80));
        rightbasenode.addChild(phonetiplabel,2);
        phonetiplabel.setColor(cc.color(60,60,60))
        phonetiplabel.setTag(8101)

        var  phonenum = sGameData.mUser.phone;
        phonenum = hiddenPhoneChar(phonenum);
        var phonelabel = cc.LabelTTF.create(phonenum, sGameData.mFontname, 24);
        phonelabel.setAnchorPoint(cc.p(0,0.5));
        phonelabel.setPosition(cc.p(10,-80));
        rightbasenode.addChild(phonelabel,2);
        phonelabel.setColor(cc.color(60,60,60))
        phonelabel.setTag(8102)

        var alitiplabel = cc.LabelTTF.create(sResWord.w_alipay+":",sGameData.mFontname, 24);
        alitiplabel.setAnchorPoint(cc.p(1,0.5));
        alitiplabel.setPosition(cc.p(0,-150));
        rightbasenode.addChild(alitiplabel,2);
        alitiplabel.setColor(cc.color(60,60,60))
        alitiplabel.setTag(8103)

        var alipay = sGameData.mUser.alipay;
        alipay = hiddenEmailChar(alipay)
        var alilabel = cc.LabelTTF.create(alipay, sGameData.mFontname, 24);
        alilabel.setAnchorPoint(cc.p(0,0.5));
        alilabel.setPosition(cc.p(10,-150));
        rightbasenode.addChild(alilabel,2);
        alilabel.setColor(cc.color(60,60,60))
        alilabel.setTag(8104)



    },

    showBindState:function(){
        var phone = sGameData.mUser.phone
        var phoneLabelstate = true;
        var phoneBtnstate = false;
        if(phone==null||phone==""||phone.length<6) {
            phoneLabelstate = false;
            phoneBtnstate = true;
        }
        var phonetiplabel = this.mRightBaseNode.getChildByTag(8101)
        if(phonetiplabel){
            phonetiplabel.setVisible(phoneLabelstate);
        }
        var phonelabel = this.mRightBaseNode.getChildByTag(8102)
        if(phonelabel){
            phonelabel.setVisible(phoneLabelstate);
            phonelabel.setString(hiddenPhoneChar(phone));
        }
        if(this.mBindPhoneBtn){
            this.mBindPhoneBtn.setVisible(phoneBtnstate);
        }

        var alipay = sGameData.mUser.alipay
        var aliLabel1state = true;
        var aliBtn1state = false;
        if(alipay==null||alipay==""||alipay.length<5) {
            aliLabel1state = false;
            aliBtn1state = true;
        }
        var alitiplabel = this.mRightBaseNode.getChildByTag(8103)
        if(alitiplabel){
            alitiplabel.setVisible(aliLabel1state);
        }
        var alilabel = this.mRightBaseNode.getChildByTag(8104)
        if(alilabel){
            alilabel.setVisible(aliLabel1state);
            alilabel.setString(hiddenEmailChar(alipay));
        }
        if(this.mBindAliBtn){
            //只有当手机号绑定成功后才显示绑定支付宝
            if(phoneLabelstate){
                this.mBindAliBtn.setVisible(aliBtn1state);
            }else{
                this.mBindAliBtn.setVisible(false);
            }
        }
        if(this.mChangeAliBtn){
            this.mChangeAliBtn.setVisible(aliLabel1state);
        }

        if(sGameData.mAppIsSubmitToAppStore){
            this.mBindAliBtn.setVisible(false);
            this.mChangeAliBtn.setVisible(false);
        }

    },




    //关闭
    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }
    },



    clickUpAccount:function(){
        log("clickUpAccount---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForUpGuest();
    },
    clickChangePwd:function(){
        log("clickChangePwd---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForChangePwd();
    },

    clickBindAlipay:function(){
        log("clickBindAlipay---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        this.showBindPhoneAlipay(true);
    },
    clickBindPhone:function(){
        log("clickBindPhone---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        this.showBindPhone(true);
    },

    clickChangeAli:function(){
        log("clickChangeAli---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        this.showChangePhoneAlipay(true);
    },
    //显示bind
    showBindPhone:function(state){
        var setl = this.getChildByTag(5555);
        if(!setl){
            setl = BindPhonePanel.create();
            if(setl){
                this.addChild(setl,50,5555);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.startShow();
            }else{
                setl.stopShow();
            }
        }
    },
    //显示bind
    showBindPhoneAlipay:function(state){
        var setl = this.getChildByTag(5656);
        if(!setl){
            setl = BindAlipayPanel.create();
            if(setl){
                this.addChild(setl,50,5656);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.startShow();
            }else{
                setl.stopShow();
            }
            this.showBindState();
        }
    },
    //显示bind
    showChangePhoneAlipay:function(state){
        var setl = this.getChildByTag(5959);
        if(!setl){
            setl = ChangeAlipayPanel.create();
            if(setl){
                this.addChild(setl,50,5959);
                setl.setPosition(cc.p(0,-50));
            }
        }
        if(setl){
            setl.setVisible(state);
            sGameData.mIsShowTopView = state;
            if(state){
                setl.startShow();
            }else{
                setl.stopShow();
            }
            this.showBindState();
        }
    },
    //输入框接口
    editBoxEditingDidBegin: function (editBox) {
        //log("editBox " + "1" + " DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        //log("editBox " + "1" + " DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {
        //log("editBox " + "1" + ", TextChanged, text: " + text);
    },

    editBoxReturn: function (editBox) {
        //log("editBox " + "1" + " was returned !");

        if(editBox == this.mEditBox_nickname){
            var name = this.mEditBox_nickname.getString();;
            if(name.length > 0){
                var wordok = true
                if(!checkCharsForNick(name)){
                    wordok = false;
                }
                if(wordok){
                    log(" name = "+name);
                    if(name != sGameData.mUser.nickName){
                        log("edit nick name");
                        sGameData.mGameNet.sendChangeUserInfo(1,name);
                    }
                }else{
                    showLittleNotice(sResWord.w_tip_input_nickcheck);
                }
            }else{
                this.mEditBox_nickname.setString(sGameData.mUser.nickName);
            }
        }
    }


});

PlayerInfoLayer.create = function () {
    var sg = new PlayerInfoLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};