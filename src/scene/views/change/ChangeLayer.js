/**
 * Created by mac_apple on 16/2/19.
 */
    
var ChangeLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mPanelNode:null,
    mEditBox_cash:null,
    mEditBox_account:null,
    mSoftCashShow:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mChangeLayer = this;
            sGameData.mCurrLayer = this;

            log("ChangeLayer start");

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

            var titleSprite = cc.Sprite.create("#w_title_change.png");
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



            var topsprite = ButtoSpritenWithSpriteInner("#p_top_tab_sel.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            var topsprite1 = ButtoSpritenWithSpriteInner("#p_top_tab_sel.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            var topsprite2 = ButtoSpritenWithSpriteInner("#p_top_tab.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            var topItem = cc.MenuItemSprite.create(
                topsprite,
                topsprite1,
                topsprite2,
                this.clickTopTab,this);
            topItem.setAnchorPoint(cc.p(0.5,0.5));
            topItem.setPosition(cc.p(415,104));

            var bottomsprite = ButtoSpritenWithSpriteInner("#p_bottom_tab.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            var bottomsprite1 = ButtoSpritenWithSpriteInner("#p_bottom_tab_sel.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            var bottomsprite2 = ButtoSpritenWithSpriteInner("#p_bottom_tab.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            var bottomItem = cc.MenuItemSprite.create(
                bottomsprite,
                bottomsprite1,
                bottomsprite2,
                this.clickBottomTab,this);
            bottomItem.setAnchorPoint(cc.p(0.5,0.5));
            bottomItem.setPosition(cc.p(415,-104));
            bottomItem.setVisible(false);


            var oksprite = cc.Sprite.create("#btn_p_change.png")
            var oksprite1 = cc.Sprite.create("#btn_p_change.png")
            oksprite1.setColor(cc.color(200,200,200));
            var oksprite2 = cc.Sprite.create("#btn_p_change.png")
            var okItem = cc.MenuItemSprite.create(
                oksprite,
                oksprite1,
                oksprite2,
                this.clickChange,this);
            okItem.setAnchorPoint(cc.p(0.5,0.5));
            okItem.setPosition(cc.p(288,-150));


            var bindsprite = cc.Sprite.create("#btn_p_bind.png")
            var bindsprite1 = cc.Sprite.create("#btn_p_bind.png")
            bindsprite1.setColor(cc.color(200,200,200));
            var bindsprite2 = cc.Sprite.create("#btn_p_bind.png")
            var bindItem = cc.MenuItemSprite.create(
                bindsprite,
                bindsprite1,
                bindsprite2,
                this.clickBind,this);
            bindItem.setAnchorPoint(cc.p(0.5,0.5));
            bindItem.setPosition(cc.p(288,-150));

            var alipay = sGameData.mUser.alipay;
            if(alipay==null||alipay==""||alipay.length<5) {
                okItem.setVisible(false);
            }else{
                bindItem.setVisible(false);
            }


            var menu = cc.Menu.create(topItem,bottomItem,okItem,bindItem);

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
        sGameData.mChangeLayer = null;

    },
    showLeftView:function(){

        var tiplabel = cc.LabelTTF.create(sResWord.w_change_cash_have, sGameData.mFontname, 24);
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



        //var tip0label = cc.LabelTTF.create(, sGameData.mFontname, 20);
        //tip0label.attr({
        //    x:-362,
        //    y:-40,
        //    anchorX: 0,
        //    anchorY: 0.5
        //});
        //this.mPanelNode.addChild(tip0label,10);
        //tip0label.setColor(cc.color(60,60,60));

        var tip1label = cc.LabelTTF.create(sResWord.w_notice+": "+sResWord.w_change_tip1, sGameData.mFontname, 20,//字体  ，字体大小
            cc.size(255,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        tip1label.attr({
            x:-238,
            y:-40,
            anchorX: 0.5,
            anchorY: 1
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(60,60,60));





    },
    showRightView:function(){


        var iconsprite = cc.Sprite.create("#icon_p_change.png")
        this.mPanelNode.addChild(iconsprite,2);
        iconsprite.setPosition(cc.p(160,60));

        var inputsprite = cc.Sprite.create("#panel_cash_input_bg1.png")
        this.mPanelNode.addChild(inputsprite,2);
        inputsprite.setPosition(cc.p(160,-80));

        var cashsprite = cc.Sprite.create("#softcash_1.png")
        this.mPanelNode.addChild(cashsprite,2);
        cashsprite.setPosition(cc.p(320,-80));

        var inputsprite1 = cc.Sprite.create("#panel_cash_input_bg1.png")
        this.mPanelNode.addChild(inputsprite1,2);
        inputsprite1.setPosition(cc.p(160,-150));



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
        aEditBox_cash.setPlaceHolder(sResWord.w_change_tip_change_num);
        aEditBox_cash.setPlaceholderFont(sGameData.mFontname,24);
        aEditBox_cash.setPlaceholderFontColor(cc.color(180,180,180));
        aEditBox_cash.setFontSize(32);
        this.mPanelNode.addChild(aEditBox_cash,15);
        this.mEditBox_cash = aEditBox_cash;


        //var s9sprite1 = createPanel(size_nick_area,"blank.png");
        //
        //var aEditBox_account = null;
        //if(sGameData.mCocosVerCode >=30100){
        //    aEditBox_account = new cc.EditBox(size_nick_area,s9sprite1);
        //}else{
        //    aEditBox_account = cc.EditBox.create(size_nick_area,s9sprite1);
        //}
        //aEditBox_account.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        //aEditBox_account.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        //aEditBox_account.setAnchorPoint(cc.p(0,0.5));
        //aEditBox_account.setPosition(cc.p(0,-150));
        //aEditBox_account.setMaxLength(12);
        ////aEditBox_account.setReturnType(kKeyboardReturnTypeDone);
        //aEditBox_account.setDelegate(this);
        //aEditBox_account.setTag(7558);
        //aEditBox_account.setString("");
        //aEditBox_account.setFontColor(cc.color(240,240,240));
        //aEditBox_account.setPlaceHolder(sResWord.w_change_tip_account);
        //aEditBox_account.setPlaceholderFont(sGameData.mFontname,24);
        //aEditBox_account.setPlaceholderFontColor(cc.color(180,180,180));
        //aEditBox_account.setFontSize(32);
        //this.mPanelNode.addChild(aEditBox_account,15);
        //this.mEditBox_account = aEditBox_account;


        var alipay = sGameData.mUser.alipay;
        var tipstr = "";
        if(alipay==null||alipay==""||alipay.length<5) {
            tipstr = sResWord.w_change_nobind
        }else{
            tipstr = hiddenEmailChar(alipay)
        }
        var tip1label = cc.LabelTTF.create(tipstr, sGameData.mFontname, 20);
        tip1label.attr({
            x:0,
            y:-150,
            anchorX: 0,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(200,200,200));
        setLabelScale(tip1label,205);

    },
    clickTopTab:function(){

    },
    clickBottomTab:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        showLittleNotice(sResWord.w_i_notopen);
    },
    clickBind:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForPlayerInfo();
    },
    clickChange:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        var alipay = sGameData.mUser.alipay;
        if(alipay==null||alipay==""||alipay.length<5) {
            showNotice(sResWord.w_notice,sResWord.w_tip_no_bind_alipay,3,5);
        }else {
            var cashnum = this.mEditBox_cash.getString();
            var account = sGameData.mUser.alipay;
            if (cashnum != null && cashnum.length > 0 && checkNumber(cashnum)) {
                var ttnum  = sGameData.mUser.softCash - formatInputcash(cashnum);
                if(cashnum >= 50 && formatcash(ttnum) >= 10){
                    sGameData.mGameNet.sendChangeCash(1,account,formatInputcash(cashnum));//1支付宝
                    this.mEditBox_cash.setString("");
                }else{
                    showLittleNotice(sResWord.w_change_tip2);
                }
            } else {
                showLittleNotice(sResWord.w_tip_input_check_num);
            }
        }

    },
    updateCash:function(){
        this.mSoftCashShow.setString(formatcash(sGameData.mUser.softCash));
    }






});

ChangeLayer.create = function () {
    var sg = new ChangeLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};