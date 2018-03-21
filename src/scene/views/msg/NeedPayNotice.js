/**
 * Created by Administrator on 14-4-24.
 * 显示提示
 */
var NeedPayNotice = cc.Layer.extend({
    mIndex:0, //某位置
    mName:"",//标题
    mMsg:"",//消息内容
    mType:0, //类型 1金币不足
    mOkItem:null,//同意按钮
    mNoItem:null,//不同意按钮
    _listener:null,//监听
    mMsgLabel:null,//消息显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size_notice = cc.size(600,320);
            var size_panel_inner = cc.size(596,190);
            var  bgimg = createSysPanel(size_notice);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(0,16));
            this.addChild(innerimg);

            //var titlebg = cc.Sprite.create("#notice_title.png");
            //titlebg.setPosition(cc.p(0,size.height*0.5-16));
            //this.addChild(titlebg);

            //提示
            this.mName = sResWord.w_notice;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(430,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.38+20-6));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);



            var vsize = cc.size(480,188)
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();

            //提示
            this.mMsg = "notice!!!";
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(480,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐

            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0,1));
            layer.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;
            pMsgLabel.setColor(cc.color(60,60,60))

            var csize = pMsgLabel.getContentSize();
            pMsgLabel.setPosition(cc.p(0,csize.height));
            layer.setContentSize(csize);
            scrollview.setContentSize(csize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(-vsize.width/2,-78));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview
            if(csize.height > 188){
                scrollview.setContentOffset(cc.p(0,188-csize.height));
            }else{
                scrollview.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }



            //添加
            var okSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gotopay,cc.p(0.5,0.5),28);
            var okSprite1 =  ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gotopay,cc.p(0.5,0.5),28,1);
            var okSprite2 =  ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_gotopay,cc.p(0.5,0.5),28);
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickPay,this);
            okItem.setPosition(cc.p(size.width*0.2, -size.height*0.3-25));//设定位置
            this.mOkItem = okItem

            //添加
            var cancelSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_backhall,cc.p(0.5,0.5),28);
            var cancelSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_backhall,cc.p(0.5,0.5),28,1);
            var cancelSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_backhall,cc.p(0.5,0.5),28);
            var cancelItem = cc.MenuItemSprite.create(
                cancelSprite,
                cancelSprite1,
                cancelSprite2,
                this.clickHall,this);
            cancelItem.setPosition(cc.p(-size.width*0.2, -size.height*0.3-25));//设定位置
            this.mNoItem = cancelItem

            var closeSprite = cc.Sprite.create("#g_close_btn.png")
            var closeSprite1 = cc.Sprite.create("#g_close_btn.png")
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#g_close_btn.png")
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.clickHall,this);
            closeItem.setPosition(cc.p(size.width*0.5-26, size.height*0.5-28));//设定位置


            var menu = cc.Menu.create(okItem,cancelItem,closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //进入时执行
    onEnter:function(){
        this._super();
        log("on enter notice")

    },
    //退出时执行
    onExit:function(){

        this._super();
        log("on exit notice")
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },


    /**
     * 显示通知
     * @param type 0普通
     */
    showNotice:function(type,msg){

        this.mMsg = msg;
        this.mType = type;

        var pMsgLabel = this.mMsgLabel;
        if(pMsgLabel){
            pMsgLabel.setString(this.mMsg);
            var csize = pMsgLabel.getContentSize();
            var layer = this.mScrollView.getContainer();
            layer.setContentSize(csize);
            this.mScrollView.setContentSize(csize);
            pMsgLabel.setPosition(cc.p(0,csize.height));
            if(csize.height > 188){
                this.mScrollView.setContentOffset(cc.p(0,188-csize.height));
            }else{
                //pMsgLabel.setPosition(cc.p(0,188/2+csize.height/2));
                this.mScrollView.setContentOffset(cc.p(0,(188/2-csize.height/2)));
            }
        }

        setClickSwallows(this);
    },
    //同意
    clickPay:function(){
        log("clickPay--"+this.mType)
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        sGameData.mClickState = 3;
        if(sGameData.mCurrScene == sGameData.mMainScene){//
            gotoPay();
        }else{
            this.gotoMainFor(1);
        }

    },
    //不同意
    clickHall:function(){
        log("clickHall--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        sGameData.mClickState = 3;
        if(sGameData.mCurrScene == sGameData.mMainScene){//
            gotoShowViewForMain();
        }else{
            this.gotoMainFor(0);
        }

    },
    clickClose:function(){
        log("clickClose--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mClickState = 3;
        sGameData.mIsShowNoticeing = false;
    },
    //type 0主界面  1充值
    gotoMainFor:function(type){
        sGameData.mExitRoomForAction = type;
        goMainForPayNotice(this.mType);
    }

});
NeedPayNotice.create = function () {
    var sg = new NeedPayNotice();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
