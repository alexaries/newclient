/**
 * Created by apple on 14-12-12.
 */
var ChangePwdLayer = BasePlayerInfoLayer.extend({  //BaseGameLayer  cc.Layer
    mEditBox_oldpwd:null,
    mEditBox_newpwd:null,
    mEditBox_renewpwd:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mChangePwdLayer = this;
            sGameData.mCurrLayer = this;

            log("ChangePwdLayer start");

            var size = cc.director.getWinSize();


            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_usercenter.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mChangePwdLayer = null;
    },
    showRightInfo:function(){

        var csize = cc.size(500,417);

        var rpanelsize = cc.size(480,417);
        var panelbg = cc.Sprite.create("#user_right_bg.png");
        this.mPanelNode.addChild(panelbg);
        panelbg.setPosition(cc.p(180,0));

        var rightbasenode = cc.Node.create();
        this.mPanelNode.addChild(rightbasenode,5);
        rightbasenode.setPosition(cc.p(210,0));
        this.mRightBaseNode = rightbasenode

        var oldtiplabel = cc.LabelTTF.create(sResWord.w_oldpwd+":",sGameData.mFontname, 24);
        oldtiplabel.setAnchorPoint(cc.p(1,0.5));
        oldtiplabel.setPosition(cc.p(-100,+csize.height*0.2+40));
        rightbasenode.addChild(oldtiplabel,2);
        oldtiplabel.setColor(cc.color(60,60,60))

        var newtiplabel = cc.LabelTTF.create(sResWord.w_newpwd+":",sGameData.mFontname, 24);
        newtiplabel.setAnchorPoint(cc.p(1,0.5));
        newtiplabel.setPosition(cc.p(-100,0+40));
        rightbasenode.addChild(newtiplabel,2);
        newtiplabel.setColor(cc.color(60,60,60))

        var renewtiplabel = cc.LabelTTF.create(sResWord.w_renewpwd+":",sGameData.mFontname, 24);
        renewtiplabel.setAnchorPoint(cc.p(1,0.5));
        renewtiplabel.setPosition(cc.p(-100,-csize.height*0.2+40));
        rightbasenode.addChild(renewtiplabel,2);
        renewtiplabel.setColor(cc.color(60,60,60))

        var inputbg1 = cc.Sprite.create("#main_cash_bg.png");
        rightbasenode.addChild(inputbg1)
        inputbg1.setAnchorPoint(cc.p(0,0.5));
        inputbg1.setPosition(cc.p(-100+csize.width*0.01,+csize.height*0.2+40));

        var inputbg2 = cc.Sprite.create("#main_cash_bg.png");
        rightbasenode.addChild(inputbg2)
        inputbg2.setAnchorPoint(cc.p(0,0.5));
        inputbg2.setPosition(cc.p(-100+csize.width*0.01,40));

        var inputbg3 = cc.Sprite.create("#main_cash_bg.png");
        rightbasenode.addChild(inputbg3)
        inputbg3.setAnchorPoint(cc.p(0,0.5));
        inputbg3.setPosition(cc.p(-100+csize.width*0.01,-csize.height*0.2+40));


        // top
        var size_nick_area = cc.size(160, 50);
        var s9sprite = createPanel(size_nick_area,"blank.png");

        var aEditBox_old = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_old = new cc.EditBox(size_nick_area,s9sprite);
        }else{
            aEditBox_old = cc.EditBox.create(size_nick_area,s9sprite);
        }
        aEditBox_old.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_old.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_old.setAnchorPoint(cc.p(0,0.5));
        aEditBox_old.setPosition(cc.p(-90+csize.width*0.01,+csize.height*0.2+40));
        aEditBox_old.setMaxLength(12);
        //aEditBox_old.setReturnType(kKeyboardReturnTypeDone);
        aEditBox_old.setDelegate(this);
        aEditBox_old.setTag(7558);
        aEditBox_old.setString("");
        //aEditBox_old.setFontColor(cc.color(72,72,72));
        aEditBox_old.setFontSize(28);
        rightbasenode.addChild(aEditBox_old,2);
        this.mEditBox_oldpwd = aEditBox_old;


        var s9sprite = createPanel(size_nick_area,"blank.png");;

        var aEditBox_new = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_new = new cc.EditBox(size_nick_area,s9sprite);
        }else{
            aEditBox_new = cc.EditBox.create(size_nick_area,s9sprite);
        }
        aEditBox_new.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_new.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_new.setAnchorPoint(cc.p(0,0.5));
        aEditBox_new.setPosition(cc.p(-90+csize.width*0.01,0+40));
        aEditBox_new.setMaxLength(12);
        //aEditBox_new.setReturnType(kKeyboardReturnTypeDone);
        aEditBox_new.setDelegate(this);
        aEditBox_new.setTag(7558);
        aEditBox_new.setString("");
        //aEditBox_new.setFontColor(cc.color(72,72,72));
        aEditBox_new.setFontSize(28);
        aEditBox_new.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        if(cc.sys.os == cc.sys.OS_ANDROID){
            aEditBox_new.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        }
        rightbasenode.addChild(aEditBox_new,2);
        this.mEditBox_newpwd = aEditBox_new;

        var s9sprite = createPanel(size_nick_area,"blank.png");;

        var aEditBox_renew = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_renew = new cc.EditBox(size_nick_area,s9sprite);
        }else{
            aEditBox_renew = cc.EditBox.create(size_nick_area,s9sprite);
        }
        aEditBox_renew.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_renew.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_renew.setAnchorPoint(cc.p(0,0.5));
        aEditBox_renew.setPosition(cc.p(-90+csize.width*0.01,-csize.height*0.2+40));
        aEditBox_renew.setMaxLength(12);
        //aEditBox_renew.setReturnType(kKeyboardReturnTypeDone);
        aEditBox_renew.setDelegate(this);
        aEditBox_renew.setTag(7558);
        aEditBox_renew.setString("");
        //aEditBox_renew.setFontColor(cc.color(72,72,72));
        aEditBox_renew.setFontSize(28);
        aEditBox_renew.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        if(cc.sys.os == cc.sys.OS_ANDROID){
            aEditBox_renew.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        }
        rightbasenode.addChild(aEditBox_renew,2);
        this.mEditBox_renewpwd = aEditBox_renew;



        var tcolor = cc.color(0,122,58)
        var changeSprite = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_changepwd_user,cc.p(0.5,0.5),24,0,tcolor)
        var changeSprite1 = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_changepwd_user,cc.p(0.5,0.5),24,1,tcolor)
        var changeSprite2 = ButtonSpriteWithWordInner("#btn_u_bg.png",sResWord.w_changepwd_user,cc.p(0.5,0.5),24,0,tcolor)
        var changeItem = cc.MenuItemSprite.create(
            changeSprite,
            changeSprite1,
            changeSprite2,
            this.clickChange,this);
        changeItem.attr({
            x:-60  ,
            y:-190,
            anchorX:0.5,
            anchorY:0
        });



        var menu = cc.Menu.create(changeItem);
        menu.x = 0;
        menu.y = 0;
        rightbasenode.addChild(menu, 5);

    },


    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //if(sGameData.mUILayer){
        //    sGameData.mUILayer.gotoMain();
        //}
        gotoShowViewForPlayerInfo();
    },
    clickTab1:function(){
        log("clickTab1")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForPlayerInfo()
    },
    clickChange:function(){
        log("clickChange")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        var old = this.mEditBox_oldpwd.getString();
        var pwd = this.mEditBox_newpwd.getString();
        var pwd1 = this.mEditBox_renewpwd.getString();

        var wordok = true
        if(!checkChars(pwd)){
            wordok = false;
        }
        if(wordok){
            if (old&&old.length > 3 && pwd&& pwd.length > 3) {
                if(pwd == pwd1){
                    if(old == sGameData.mPwd_login){
                    //if(true){
                        sGameData.mPwd_change = pwd;
                        sGameData.mGameNet.sendChangeUserInfo(8,pwd);
                        this.cleanpwd();
                    }else{
                        showLittleNotice(sResWord.w_tip_oldpwd_err);
                    }

                }else{
                    showLittleNotice(sResWord.w_tip_pwd_twice);
                }
            }else{
                showLittleNotice(sResWord.w_tip_input_changepwd);
            }
        }else{
            showLittleNotice(sResWord.w_tip_input_pwdcheck);
        }
    },
    cleanpwd:function(){
        this.mEditBox_oldpwd.setString("")
        this.mEditBox_newpwd.setString("")
        this.mEditBox_renewpwd.setString("")
    }


});

ChangePwdLayer.create = function () {
    var sg = new ChangePwdLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};