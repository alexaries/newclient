/**
 * Created by apple on 16/2/17.
 */

var BankGetCashLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mPanelNode:null,
    mEditBox_cash:null,
    mEditBox_pwd:null,
    mSoftCashShow:null,
    mEbankCashShow:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mBankGetCashLayer = this;
            sGameData.mCurrLayer = this;

            log("BankGetCashLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(300,49);


            log("size_panel_inner=="+size_panel_inner.width+"|"+size_panel_inner.height);


            this.mTitle = sResWord.w_bank_savecash;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,300);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示  ,,10 新topbg
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();

            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_bank.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            var panelnode = cc.Node.create();
            this.addChild(panelnode,5);
            panelnode.setPosition(cc.p(size.width/2,size.height/2-50));
            this.mPanelNode = panelnode;

            //840,440
            var panelsize = cc.size(800,417);
            var panelbg = createSysPanel_black(panelsize);
            this.mPanelNode.addChild(panelbg);
            //panelbg.setPosition(cc.p(size.width/2,size.height/2-50));

            var leftbg = cc.Sprite.create("#panel_cash_bg.png");
            this.mPanelNode.addChild(leftbg,1);
            leftbg.setPosition(cc.p(-240,0));



            var topsprite = ButtoSpritenWithSpriteInner("#p_top_tab.png","#w_v_cunkuan.png",cc.p(0.65,0.5),0);
            var topsprite1 = ButtoSpritenWithSpriteInner("#p_top_tab_sel.png","#w_v_cunkuan.png",cc.p(0.65,0.5),0);
            var topsprite2 = ButtoSpritenWithSpriteInner("#p_top_tab.png","#w_v_cunkuan.png",cc.p(0.65,0.5),0);
            var topItem = cc.MenuItemSprite.create(
                topsprite,
                topsprite1,
                topsprite2,
                this.clickTopTab,this);
            topItem.setAnchorPoint(cc.p(0.5,0.5));
            topItem.setPosition(cc.p(415,104));

            var bottomsprite = ButtoSpritenWithSpriteInner("#p_bottom_tab_sel.png","#w_v_qukuan.png",cc.p(0.65,0.5),0);
            var bottomsprite1 = ButtoSpritenWithSpriteInner("#p_bottom_tab_sel.png","#w_v_qukuan.png",cc.p(0.65,0.5),0);
            var bottomsprite2 = ButtoSpritenWithSpriteInner("#p_bottom_tab.png","#w_v_qukuan.png",cc.p(0.65,0.5),0);
            var bottomItem = cc.MenuItemSprite.create(
                bottomsprite,
                bottomsprite1,
                bottomsprite2,
                this.clickBottomTab,this);
            bottomItem.setAnchorPoint(cc.p(0.5,0.5));
            bottomItem.setPosition(cc.p(415,-104));


            var oksprite = cc.Sprite.create("#btn_p_queren.png")
            var oksprite1 = cc.Sprite.create("#btn_p_queren.png")
            oksprite1.setColor(cc.color(200,200,200));
            var oksprite2 = cc.Sprite.create("#btn_p_queren.png")
            var okItem = cc.MenuItemSprite.create(
                oksprite,
                oksprite1,
                oksprite2,
                this.clickGetCash,this);
            okItem.setAnchorPoint(cc.p(0.5,0.5));
            okItem.setPosition(cc.p(288,-170));


            var menu = cc.Menu.create(topItem,bottomItem,okItem);

            menu.x = 0;
            menu.y = 0;
            this.mPanelNode.addChild(menu, 10);

            this.showLeftView();
            this.showRightView();

            bRet = true;
        }
        return bRet;
    },


    onExit:function(){
        this._super();
        sGameData.mBankGetCashLayer = null;

    },
    showLeftView:function(){

        var tiplabel = cc.LabelTTF.create(sResWord.w_bank_cash_carry, sGameData.mFontname, 24);
        tiplabel.attr({
            x:-238,
            y:140,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tiplabel,10);
        tiplabel.setColor(cc.color(60,60,60));


        var cashbg = cc.Sprite.create("#panel_cash_input_bg.png")
        this.mPanelNode.addChild(cashbg,5);
        cashbg.setPosition(cc.p(-238,70));

        var cashstr = formatcash(sGameData.mUser.softCash);
        var cashlabel = cc.LabelTTF.create(cashstr, sGameData.mFontname, 24);
        cashlabel.attr({
            x:-238,
            y:70,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(cashlabel,10);
        cashlabel.setColor(cc.color(60,60,60));
        this.mSoftCashShow = cashlabel;



        var tip1label = cc.LabelTTF.create(sResWord.w_bank_cash_save, sGameData.mFontname, 24);
        tip1label.attr({
            x:-238,
            y:-55,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(60,60,60));


        var cashbg = cc.Sprite.create("#panel_cash_input_bg.png")
        this.mPanelNode.addChild(cashbg,5);
        cashbg.setPosition(cc.p(-238,-125));

        var cash1str = formatcash(sGameData.mUser.ebankCash);
        var cash1label = cc.LabelTTF.create(cash1str, sGameData.mFontname, 24);
        cash1label.attr({
            x:-238,
            y:-125,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(cash1label,10);
        cash1label.setColor(cc.color(60,60,60));
        this.mEbankCashShow = cash1label;

        var tip1label = cc.LabelTTF.create(sResWord.w_bank_tip_pwd1, sGameData.mFontname, 20,//字体  ，字体大小
            cc.size(255,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        tip1label.attr({
            x:-238,
            y:-160,
            anchorX: 0.5,
            anchorY: 1
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(60,60,60));


    },
    showRightView:function(){


        var iconsprite = cc.Sprite.create("#icon_p_bank.png")
        this.mPanelNode.addChild(iconsprite,2);
        iconsprite.setPosition(cc.p(160,60));

        var inputsprite = cc.Sprite.create("#panel_cash_input_bg1.png")
        this.mPanelNode.addChild(inputsprite,2);
        inputsprite.setPosition(cc.p(160,-80));

        var tipwordlabel = cc.LabelTTF.create(sResWord.w_bank_tip_pwd+":", sGameData.mFontname, 20);
        tipwordlabel.attr({
            x:80,
            y:-125
        });
        this.mPanelNode.addChild(tipwordlabel,10);
        tipwordlabel.setColor(cc.color(220,220,220));

        var inputsprite1 = cc.Sprite.create("#panel_cash_input_bg1.png")
        this.mPanelNode.addChild(inputsprite1,2);
        inputsprite1.setPosition(cc.p(160,-170));

        // top
        var size_nick_area = cc.size(240, 50);
        var s9sprite = createPanel(size_nick_area,"blank.png");

        var aEditBox_cash = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_cash = new cc.EditBox(size_nick_area,s9sprite);
        }else{
            aEditBox_cash = cc.EditBox.create(size_nick_area,s9sprite);
        }
        aEditBox_cash.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC)
        aEditBox_cash.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_cash.setAnchorPoint(cc.p(0,0.5));
        aEditBox_cash.setPosition(cc.p(0,-80));
        aEditBox_cash.setMaxLength(12);
        //aEditBox_cash.setReturnType(kKeyboardReturnTypeDone);
        aEditBox_cash.setDelegate(this);
        aEditBox_cash.setTag(7558);
        aEditBox_cash.setString("");
        aEditBox_cash.setFontColor(cc.color(240,240,240));
        aEditBox_cash.setPlaceHolder(sResWord.w_bank_tip_get_num);
        aEditBox_cash.setPlaceholderFont(sGameData.mFontname,24);
        aEditBox_cash.setPlaceholderFontColor(cc.color(180,180,180));
        aEditBox_cash.setFontSize(32);
        this.mPanelNode.addChild(aEditBox_cash,15);
        this.mEditBox_cash = aEditBox_cash;


        var size_nick_area = cc.size(240, 50);
        var s9sprite1 = createPanel(size_nick_area,"blank.png");

        var aEditBox_pwd = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_pwd = new cc.EditBox(size_nick_area,s9sprite1);
        }else{
            aEditBox_pwd = cc.EditBox.create(size_nick_area,s9sprite1);
        }
        aEditBox_pwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        aEditBox_pwd.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_pwd.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_pwd.setAnchorPoint(cc.p(0,0.5));
        aEditBox_pwd.setPosition(cc.p(0,-170));
        aEditBox_pwd.setMaxLength(12);
        //aEditBox_pwd.setReturnType(kKeyboardReturnTypeDone);
        aEditBox_pwd.setDelegate(this);
        aEditBox_pwd.setTag(7558);
        aEditBox_pwd.setString("");
        aEditBox_pwd.setFontColor(cc.color(240,240,240));
        //aEditBox_pwd.setPlaceHolder(sResWord.w_bank_tip_pwd);
        //aEditBox_pwd.setPlaceholderFont(sGameData.mFontname,24);
        //aEditBox_pwd.setPlaceholderFontColor(cc.color(72,72,72));
        aEditBox_pwd.setFontSize(32);
        this.mPanelNode.addChild(aEditBox_pwd,15);
        this.mEditBox_pwd = aEditBox_pwd;




    },
    clickTopTab:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForBank();
    },
    clickBottomTab:function(){

    },
    clickGetCash:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();


        var cashnum = this.mEditBox_cash.getString();
        var pwd = this.mEditBox_pwd.getString();
        if (cashnum != null && cashnum.length > 0 && checkNumber(cashnum)) {
            if (pwd != null && pwd.length > 3 && checkChars(pwd)) {
                //showLittleNotice(sResWord.w_notopen);
                if (!sGameData.mIsSendingData) {
                    sGameData.mIsSendingData = true
                    sGameData.mGameNet.sendEbankGetCash(formatInputcash(cashnum), pwd);
                }
                this.mEditBox_cash.setString("");
                this.mEditBox_pwd.setString("");
            } else {
                showLittleNotice(sResWord.w_tip_pwd);
            }
        } else {
            showLittleNotice(sResWord.w_tip_input_check_num);
        }


    },
    updateCash:function(){
        this.mSoftCashShow.setString(formatcash(sGameData.mUser.softCash));
        this.mEbankCashShow.setString(formatcash(sGameData.mUser.ebankCash));
    }




});

BankGetCashLayer.create = function () {
    var sg = new BankGetCashLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};