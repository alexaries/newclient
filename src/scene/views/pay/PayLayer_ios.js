/**
 * Created by mac_apple on 16/2/19.
 */

var PayLayer_ios = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mPanelNode:null,
    mEditBox_cash:null,
    mTopTab:null,
    mBottomTab:null,
    mPayShows:[],
    mPayTypeShows:[],
    mSelectTypeItem:null,
    mSelectPay:null,
    mSelectItem:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mPayLayer = this;
            sGameData.mCurrLayer = this;

            log("PayLayer_ios start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(300,49);


            log("size_panel_inner=="+size_panel_inner.width+"|"+size_panel_inner.height);

            sGameData.mCurrPayType = PAY_DUOLE;
            //if(sGameData.mAgent == AGENT_DUOLE_DDZ){
            //    sGameData.mCurrPayType = PAY_DUOLE_DDZ;
            //}

            this.mTitle = sResWord.w_bank_savecash;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,300);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示  ,,10 新topbg
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();

            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_pay.png");
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



            //var topsprite = ButtoSpritenWithSpriteInner("#p_top_tab.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            //var topsprite1 = ButtoSpritenWithSpriteInner("#p_top_tab_sel.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            //var topsprite2 = ButtoSpritenWithSpriteInner("#p_top_tab.png","#w_v_zhifubao.png",cc.p(0.65,0.5),0);
            //var topItem = cc.MenuItemSprite.create(
            //    topsprite,
            //    topsprite1,
            //    topsprite2,
            //    this.clickTopTab,this);
            //topItem.setAnchorPoint(cc.p(0.5,0.5));
            //topItem.setPosition(cc.p(415,104));
            //this.mTopTab = topItem
            //topItem.selected();
            //
            //var bottomsprite = ButtoSpritenWithSpriteInner("#p_bottom_tab.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            //var bottomsprite1 = ButtoSpritenWithSpriteInner("#p_bottom_tab_sel.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            //var bottomsprite2 = ButtoSpritenWithSpriteInner("#p_bottom_tab.png","#w_v_weixin.png",cc.p(0.65,0.5),0);
            //var bottomItem = cc.MenuItemSprite.create(
            //    bottomsprite,
            //    bottomsprite1,
            //    bottomsprite2,
            //    this.clickBottomTab,this);
            //bottomItem.setAnchorPoint(cc.p(0.5,0.5));
            //bottomItem.setPosition(cc.p(415,-104));
            //this.mBottomTab = bottomItem;
            //
            //
            //
            //var menu = cc.Menu.create(topItem,bottomItem);
            //
            //menu.x = 0;
            //menu.y = 0;
            //this.mPanelNode.addChild(menu, 10);



            this.showLeftView();
            this.showRightView();
            this.scheduleOnce(this.initInSecondFrame,0.05);

            bRet = true;
        }
        return bRet;
    },
    initInSecondFrame:function(){
        dealClickTouch(this);

    },
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mPayLayer = null;

    },
    showLeftView:function(){

        var tiplabel = cc.LabelTTF.create(sResWord.w_pay_curruser, sGameData.mFontname, 24);
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


        var head = BaseCircleHead.create(26);
        head.attr({
            x:-329,
            y:70
        });
        this.mPanelNode.addChild(head,8);


        var userstr = "ID : "+sGameData.mUser.id;
        var cashlabel = cc.LabelTTF.create(userstr, sGameData.mFontname, 24);
        cashlabel.attr({
            x:-218,
            y:70,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(cashlabel,10);
        cashlabel.setColor(cc.color(60,60,60));



        var tip0label = cc.LabelTTF.create(sResWord.w_notice+":", sGameData.mFontname, 20);
        tip0label.attr({
            x:-362,
            y:-40,
            anchorX: 0,
            anchorY: 0.5
        });
        this.mPanelNode.addChild(tip0label,10);
        tip0label.setColor(cc.color(60,60,60));

        var tip1label = cc.LabelTTF.create(sResWord.w_pay_tip2, sGameData.mFontname, 20,//字体  ，字体大小
            cc.size(255,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        tip1label.attr({
            x:-238,
            y:-60,
            anchorX: 0.5,
            anchorY: 1
        });
        this.mPanelNode.addChild(tip1label,10);
        tip1label.setColor(cc.color(60,60,60));

        //this.loadImg();

    },
    showRightView:function(){
        sGameData.mShowPayList = getPayListByType(sGameData.mCurrPayType);

        var pwidth = 142;

        var len = sGameData.mShowPayList.length;
        log("mShowPayList len=="+len+"|"+sGameData.mCurrPayType)
        this.mPayShows = [];
        for(var i=0;i<6&&i<len;i++){
            var pay = sGameData.mShowPayList[i]
            var itemPay = ItemPay.create(i,pay);
            itemPay.setPosition(cc.p(-50+i%3*pwidth,0-160*Math.floor(i/3)));
            //itemPay.setScale(0.75);
            this.mPanelNode.addChild(itemPay,5)
            this.mPayShows.push(itemPay);
        }



    },
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        sGameData.mClickState = 1;
    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        if(sGameData.mClickState == 1){
            var item = this.checkClickCard(pos)
            if(item){
                this.clickItem(item)
            }
        }
    },


    //检查点击到那张牌
    checkClickCard:function(pos){
        var size = cc.director.getWinSize();
        //size.width/2,size.height/2-50
        var tpos = cc.p(pos.x -size.width/2,pos.y-size.height/2+50);
        var len = this.mPayShows.length;
        for(var i = len-1;i>-1;i--){
            var item = this.mPayShows[i];
            if(item.checkClick(tpos)){
                return item;
            }
        }
        return null;
    },
    clickItem:function(item){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(this.mSelectItem){
            this.mSelectItem.unchoose();
        }
        item.choose();
        this.mSelectItem = item;
        this.mSelectPay = item.mPay;

        this.click_pay();
    },
    click_pay:function(){
        log("click_pay---")
        //playClickSound();
        var pay = this.mSelectPay;
        if(pay){
            clickPay(pay);
        }

    },
    clickTopTab:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //sGameData.mCurrPayType = PAY_ALIPAY;
        //this.mTopTab.selected();
        //this.mBottomTab.unselected();
        //
        //this.showNewPayType();
    },
    clickBottomTab:function(){
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        //sGameData.mCurrPayType = PAY_WXPAY;
        //
        //this.mTopTab.unselected();
        //this.mBottomTab.selected();
        //
        //this.showNewPayType()

    },
                                         
    updateCashInfo:function(){
                                         
    },
                                         
    showNewPayType:function(){
        log("click_paytype---"+sGameData.mCurrPayType);
        sGameData.mShowPayList = getPayListByType(sGameData.mCurrPayType);
        for(var i=0;i<this.mPayShows.length;i++){
            var item = this.mPayShows[i];
            if(i<sGameData.mShowPayList.length){
                item.mPay = sGameData.mShowPayList[i];
                item.updateInfo()
                item.setVisible(true)
            }else{
                item.setVisible(false)
            }
        }
    }




});

PayLayer_ios.create = function () {
    var sg = new PayLayer_ios();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
