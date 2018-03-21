/**
 * Created by Administrator on 14-4-25.
 * 注册场景
 */
var RegLayer = cc.Layer.extend({
    mEditbox_name:null,//用户名 输入框
    mEditbox_pwd:null,//密码 输入框
    mEditbox_pwd1:null,//密码 输入框
    mNetLabel:null,//网络提示
    mName:"",//用户名
    mPwd:"",//密码
    mCheckItem:null,
    mIsAgree:true,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mRegLayer = this;
            sGameData.mCurrLayer = this;

            log("show reg layer ");

            var size = cc.director.getWinSize();

            var line1 = cc.Sprite.create("#cell_small_delimeter.png");

            line1.attr({
                x: size.width/2,
                y: size.height*0.85,
                scaleX:8,
                scaleY:4
            });
            this.addChild(line1);

            var agreetipLabel = cc.LabelTTF.create(sResWord.w_tip_agree, sGameData.mFontname, 24);
            agreetipLabel.y = size.height*0.35;
            this.addChild(agreetipLabel, 5);


            this.initView_base();
            agreetipLabel.x = size.width / 2-150+80;



            //添加文字
            var helloLabel = cc.LabelTTF.create(sResWord.w_reg_create, sGameData.mFontname, 38);
            helloLabel.x = size.width / 2;
            helloLabel.y = size.height - 60;
            this.addChild(helloLabel, 5);


            bRet = true;
        }
        return bRet;
    },
    initView_base:function(){
        var size = cc.director.getWinSize();
        var loginbg = cc.Sprite.create("#login_bg.png");
        loginbg.attr({
            x: size.width/2,
            y: size.height*0.75-85
        });
        this.addChild(loginbg);


        var input1 = cc.Scale9Sprite.create();
        input1.initWithSpriteFrameName("login_inputBox.png");
        input1.setContentSize(cc.size(231, 40))
        input1.attr({
            x: size.width/2+50,
            y: size.height*0.75+10
        });
        this.addChild(input1);
        var input2 = cc.Scale9Sprite.create();
        input2.initWithSpriteFrameName("login_inputBox.png");
        input2.setContentSize(cc.size(231, 40))
        input2.attr({
            x: size.width/2+50,
            y: size.height*0.75-50
        });
        this.addChild(input2);
        var input3 = cc.Scale9Sprite.create();
        input3.initWithSpriteFrameName("login_inputBox.png");
        input3.setContentSize(cc.size(231, 40))
        input3.attr({
            x: size.width/2+50,
            y: size.height*0.75-110
        });
        this.addChild(input3);

//            var input = cc.Sprite.create("#poker_signin_area.png");
//            input.attr({
//                x: size.width/2,
//                y: size.height*0.75-81
//            });
//            this.addChild(input);


        var w_usernamesprite = cc.Sprite.create("#login_accountTxt.png");
        w_usernamesprite.attr({
            x: size.width/2-120,
            y: size.height*0.72+28
        });
        this.addChild(w_usernamesprite);

        var w_pwdsprite = cc.Sprite.create("#login_passwordTxt.png");
        w_pwdsprite.attr({
            x: size.width/2-120,
            y: size.height*0.72-28
        });
        this.addChild(w_pwdsprite);

        var w_repwdsprite = cc.Sprite.create("#login_rePasswordTxt.png");
        w_repwdsprite.attr({
            x: size.width/2-130,
            y: size.height*0.72-88
        });
        this.addChild(w_repwdsprite);




        var s9sprite1 = cc.Scale9Sprite.create();
        s9sprite1.initWithSpriteFrameName("blank.png");
        //添加输入框
        this.mEditbox_name = null;
        if(sGameData.mCocosVerCode >=30100){
            this.mEditbox_name = new cc.EditBox(cc.size(231, 40),s9sprite1);
        }else{
            this.mEditbox_name = cc.EditBox.create(cc.size(231, 40),s9sprite1);
        }
        this.mEditbox_name.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        this.mEditbox_name.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.mEditbox_name.setString("");
        this.mEditbox_name.setPlaceHolder(sResWord.w_tip_input_name);
        this.mEditbox_name.setPlaceholderFont(sGameData.mFontname,24);
        this.mEditbox_name.setFontSize(32);
        this.mEditbox_name.setMaxLength(60);
        this.mEditbox_name.x = size.width/2+50;
        this.mEditbox_name.y = size.height*0.72+28;
        //this.mEditbox_name.setFontColor(cc.color(0, 0, 0));
        //this.mEditbox_name.setDelegate(this);
        this.addChild(this.mEditbox_name);

        //添加输入框
        var s9sprite2 = cc.Scale9Sprite.create();
        s9sprite2.initWithSpriteFrameName("blank.png");
        this.mEditbox_pwd = null;
        if(sGameData.mCocosVerCode >=30100){
            this.mEditbox_pwd = new cc.EditBox(cc.size(231, 40),s9sprite2);
        }else{
            this.mEditbox_pwd = cc.EditBox.create(cc.size(231, 40),s9sprite2);
        }
        this.mEditbox_pwd.setString("");
        this.mEditbox_pwd.setPlaceHolder("");
        this.mEditbox_pwd.setFontSize(32);
        this.mEditbox_pwd.setMaxLength(60);
        this.mEditbox_pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.mEditbox_pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        this.mEditbox_pwd.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);

        this.mEditbox_pwd.x = size.width/2+50;
        this.mEditbox_pwd.y =  size.height*0.72-28;
        //this.mEditbox_pwd.setFontColor(cc.color(0, 0, 0));
        //this.mEditbox_pwd.setDelegate(this);
        this.addChild(this.mEditbox_pwd);

        var s9sprite3 = cc.Scale9Sprite.create();
        s9sprite3.initWithSpriteFrameName("blank.png");
        this.mEditbox_pwd1 = null;
        if(sGameData.mCocosVerCode >=30100){
            this.mEditbox_pwd1 = new cc.EditBox(cc.size(231, 40),s9sprite3);
        }else{
            this.mEditbox_pwd1 = cc.EditBox.create(cc.size(231, 40),s9sprite3);
        }
        this.mEditbox_pwd1.setString("");
        this.mEditbox_pwd1.setPlaceHolder("");
        this.mEditbox_pwd1.setFontSize(32);
        this.mEditbox_pwd1.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.mEditbox_pwd1.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        this.mEditbox_pwd1.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        this.mEditbox_pwd1.x = size.width/2+50;
        this.mEditbox_pwd1.y =  size.height*0.72-88;
        //this.mEditbox_pwd1.setFontColor(cc.color(0, 0, 0));
        this.addChild(this.mEditbox_pwd1);





        //添加 登录
        var loginSprite = cc.Sprite.create("#login_returnLoginBtn.png");
        var loginSprite1 = cc.Sprite.create("#login_returnLoginBtn.png");
        loginSprite1.setColor(cc.color(200,200,200))
        var loginSprite2 = cc.Sprite.create("#login_returnLoginBtn.png");
        var loginItem = cc.MenuItemSprite.create(
            loginSprite,
            loginSprite1,
            loginSprite2,
            this.clickBackLogin,this);
        loginItem.attr({
            x:size.width/2-88,
            y:size.height*0.45+15
        });
        //添加 注册
        var regSprite = cc.Sprite.create("#login_regBtn.png");
        var regSprite1 = cc.Sprite.create("#login_regBtn.png");
        regSprite1.setColor(cc.color(200,200,200))
        var regSprite2 = cc.Sprite.create("#login_regBtn.png");
        var regItem = cc.MenuItemSprite.create(
            regSprite,
            regSprite1,
            regSprite2,
            this.clickReg,this);
        regItem.attr({
            x:size.width/2+88,
            y:size.height*0.45+15
        });

        var checkSprite = cc.Sprite.create("#button_check_c.png")
        var checkSprite1 = cc.Sprite.create("#button_check_c.png")
        var checkSprite2 = cc.Sprite.create("#button_check_c.png")
        var checkItem = cc.MenuItemSprite.create(
            checkSprite,
            checkSprite1,
            checkSprite2,
            this.clickCheck,this);
        checkItem.attr({
            x:size.width/2-230+80,
            y:size.height*0.35
        });
        this.mCheckItem = checkItem;

        var csize = cc.size(120,40)
        var color1 = cc.color(0,205,0)
        var color = cc.color(0,255,0)
        var useragreementSprite = createWordBtn(csize,sResWord.w_useragreement,cc.p(0.5,0.5),24,color)
        var useragreementSprite1 = createWordBtn(csize,sResWord.w_useragreement,cc.p(0.5,0.5),24,color1)
        var useragreementSprite2 = createWordBtn(csize,sResWord.w_useragreement,cc.p(0.5,0.5),24,color)
        var agreementItem = cc.MenuItemSprite.create(
            useragreementSprite,
            useragreementSprite1,
            useragreementSprite2,
            this.clickAgreement,this);
        agreementItem.attr({
            x:size.width/2-20+80,
            y:size.height*0.35
        });

        var menu = cc.Menu.create(loginItem,regItem,checkItem,agreementItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 5);
        //添加按钮 end
    },



    changeCheckState:function(state){
        if(state){
            var checkSprite = cc.Sprite.create("#button_check_c.png")
            var checkSprite1 = cc.Sprite.create("#button_check_c.png")
            this.mCheckItem.setNormalImage(checkSprite);
            this.mCheckItem.setSelectedImage(checkSprite1)
        }else{
            var checkSprite = cc.Sprite.create("#button_check_u.png")
            var checkSprite1 = cc.Sprite.create("#button_check_u.png")
            this.mCheckItem.setNormalImage(checkSprite);
            this.mCheckItem.setSelectedImage(checkSprite1)
        }
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mRegLayer = null;
    },
    clickAgreement:function(){
        log("clickAgreement--")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        this.gotoUserAgreement();

    },
    clickCheck:function(){
        log("clickCheck--")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(this.mIsAgree){
            this.mIsAgree = false;
            this.changeCheckState(false)
        }else{
            this.mIsAgree = true;
            this.changeCheckState(true)
        }
        log("clickCheck="+this.mIsAgree);
    },
    //返回登陆
    clickBackLogin:function(){
        log("clickBackLogin")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        var pwd1 = this.mEditbox_name.getString();
        log("sGameConfig._isLocalVersion=="+sGameConfig._isLocalVersion);
        var  hastestaction = doTestActionByInput(pwd1,this.mEditbox_name);
        if(!hastestaction){
            this.gotoLogin();
        }
    },
    //注册
    clickReg:function(){
        log("clickReg")
        if(!checkButtonEnable()){
            return;
        }
        if(!this.mIsAgree){
            showLittleNotice(sResWord.w_tip_needagree);
            return;
        }
        playClickSound();
        var name = this.mEditbox_name.getString();
        var pwd = this.mEditbox_pwd.getString();
        var pwd1 = this.mEditbox_pwd1.getString();

        var wordlenok = false;
        if (name&&name.length > 3 && pwd&& pwd.length > 3) {
            wordlenok = true;
        }

        var wordok = true
        if(!checkChars(name)){
            wordok = false;
        }
        if(!checkChars(pwd)){
            wordok = false;
        }
        if(wordlenok){
            if (wordok) {
                log("name="+name+"|"+pwd+"|"+pwd1);
                if (pwd == pwd1) {
                    this.mName = name;
                    this.mPwd = pwd;
                    if (sGameData.mGameNet) {
                        if(!sGameData.mIsSendingData) {
                            sGameData.mIsSendingData = true
                            sGameData.mGameNet.sendReg(name, pwd, sGameData.mAgent, sGameData.mGameVersion, sGameData.mPlatform, sGameData.mDeviceName,"");
                        }
                    }
                } else {
                    showLittleNotice(sResWord.w_tip_pwd_twice);
                }
            } else {
                showLittleNotice(sResWord.w_tip_input_regcheck);
            }
        }else{
            showLittleNotice(sResWord.w_tip_input_nameorpwd);

        }


        //this.gotoMain();
    },
    //保存到本地
    saveToLocal:function(type){
        saveUserInfo(this.mName,this.mPwd,type);
    },
    //清除输入框
    cleanText:function(){
        this.mEditbox_name.setString("");
        this.mEditbox_pwd.setString("");
        this.mEditbox_pwd1.setString("");
    },
    //跳转到登陆
    gotoLogin:function(){
        log("gotoLogin")
        if(sGameData.mCurrLayer!=sGameData.mLoginLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = LoginLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    },
    gotoUserAgreement:function(){
        if(sGameData.mCurrLayer!=sGameData.mUserAgreementLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = UserAgreementLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    }

});

RegLayer.create = function () {
    var sg = new RegLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

